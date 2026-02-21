"""
SurgGreen — Agent Expert LangGraph
5 nœuds de raisonnement séquentiels :
  1. Extraction du contexte clinique
  2. Filtrage des matériaux éligibles
  3. Application des règles de sécurité
  4. Scoring personnalisé
  5. Justification sourcée
"""

import os
import json
from typing import TypedDict, List, Dict, Any

from langgraph.graph import StateGraph, END
from langchain_anthropic import ChatAnthropic
from langchain_core.messages import HumanMessage, SystemMessage

from knowledge_base import MATERIAUX

# ─────────────────────────────────────────
# 1. ÉTAT PARTAGÉ entre tous les nœuds
# ─────────────────────────────────────────

class SurgGreenState(TypedDict):
    # Inputs
    description_chirurgien: str
    poids: Dict[str, float]          # {"perf": 0.5, "co2": 0.3, "dispo": 0.13, "prix": 0.07}

    # Résultats intermédiaires (chaque nœud remplit sa partie)
    contexte_clinique: Dict[str, Any]       # Nœud 1
    candidats_filtres: List[Dict]           # Nœud 2
    candidats_securises: List[Dict]         # Nœud 3
    candidats_scores: List[Dict]            # Nœud 4
    recommandations_finales: List[Dict]     # Nœud 5

    # Trace de raisonnement complète (pour la démo)
    trace: List[str]


# ─────────────────────────────────────────
# LLM
# ─────────────────────────────────────────

llm = ChatAnthropic(model="claude-opus-4-6", max_tokens=1000)


# ─────────────────────────────────────────
# NŒUD 1 — Extraction du contexte clinique
# ─────────────────────────────────────────

def extraire_contexte(state: SurgGreenState) -> SurgGreenState:
    """Claude lit la description du chirurgien et extrait les contraintes clés."""

    types_disponibles = list(set(
        t for m in MATERIAUX.values() for t in m["types_chirurgie"]
    ))

    messages = [
        SystemMessage(content="""Tu es un expert en chirurgie orthopédique et biomatériaux.
Extrais les informations cliniques clés d'une description chirurgicale.
Réponds UNIQUEMENT en JSON valide, sans texte avant ou après."""),
        HumanMessage(content=f"""Description : "{state['description_chirurgien']}"

Types disponibles : {types_disponibles}

JSON attendu :
{{
  "type_chirurgie": "type parmi la liste",
  "retrait_prevu": true/false,
  "patient_jeune": true/false,
  "irm_necessaire": true/false,
  "biodegradable_prefere": true/false,
  "contraintes": "résumé 1 phrase",
  "confiance": "haute/moyenne/faible"
}}""")
    ]

    response = llm.invoke(messages)
    texte = response.content.replace("```json", "").replace("```", "").strip()
    contexte = json.loads(texte)

    trace = state.get("trace", [])
    trace.append(f"✅ Nœud 1 — Contexte extrait : {contexte['type_chirurgie']} | Confiance : {contexte['confiance']}")

    return {**state, "contexte_clinique": contexte, "trace": trace}


# ─────────────────────────────────────────
# NŒUD 2 — Filtrage des matériaux éligibles
# ─────────────────────────────────────────

def filtrer_materiaux(state: SurgGreenState) -> SurgGreenState:
    """Garde uniquement les matériaux compatibles avec le type de chirurgie."""

    type_chir = state["contexte_clinique"]["type_chirurgie"]

    candidats = [
        {**m, "id": k}
        for k, m in MATERIAUX.items()
        if type_chir.lower() in [t.lower() for t in m["types_chirurgie"]]
    ]

    trace = state["trace"]
    trace.append(f"✅ Nœud 2 — {len(candidats)} matériaux compatibles avec '{type_chir}'")

    return {**state, "candidats_filtres": candidats, "trace": trace}


# ─────────────────────────────────────────
# NŒUD 3 — Règles de sécurité non-négociables
# ─────────────────────────────────────────

def appliquer_securite(state: SurgGreenState) -> SurgGreenState:
    """
    Applique les règles de sécurité clinique.
    Un matériau exclu ici ne peut PAS apparaître dans le Top 3.
    """

    ctx = state["contexte_clinique"]
    securises = []
    exclus = []

    for m in state["candidats_filtres"]:
        raisons_exclusion = []

        # Règle 1 — Score clinique minimum
        perf = (
            (m["taux_succes_pct"] / 100) * 4 +
            (m["biocompatibilite"] / 5) * 3 +
            (m["osteointegration"] / 5) * 2 -
            (m["risque_infection"] / 5) * 0.5 -
            (m["risque_allergie"] / 5) * 0.5
        )
        perf = round(min(max(perf, 0), 10), 2)

        if perf < 8:
            raisons_exclusion.append(f"Score clinique insuffisant ({perf}/10 < 8)")

        # Règle 2 — Retrait prévu mais impossible
        if ctx.get("retrait_prevu") and not m["retrait_possible"]:
            raisons_exclusion.append("Retrait prévu mais matériau non extractible")

        # Règle 3 — IRM nécessaire mais incompatible
        if ctx.get("irm_necessaire") and not m["compatible_irm"]:
            raisons_exclusion.append("Suivi IRM nécessaire mais matériau incompatible")

        # Règle 4 — Patient jeune → durée de vie minimum 10 ans
        if ctx.get("patient_jeune") and m["duree_vie_implant_ans"] < 10:
            raisons_exclusion.append(f"Patient jeune mais durée de vie trop courte ({m['duree_vie_implant_ans']} ans)")

        if raisons_exclusion:
            exclus.append({"nom": m["nom"], "raisons": raisons_exclusion})
        else:
            securises.append({**m, "perf_score": perf})

    trace = state["trace"]
    trace.append(f"✅ Nœud 3 — {len(securises)} matériaux passent la sécurité | {len(exclus)} exclus")
    for e in exclus:
        trace.append(f"   ⛔ {e['nom']} : {' + '.join(e['raisons'])}")

    return {**state, "candidats_securises": securises, "trace": trace}


# ─────────────────────────────────────────
# NŒUD 4 — Scoring personnalisé
# ─────────────────────────────────────────

def scorer_materiaux(state: SurgGreenState) -> SurgGreenState:
    """Calcule le score final pondéré pour chaque matériau sécurisé."""

    p = state["poids"]

    scores = []
    for m in state["candidats_securises"]:
        n_co2   = max(0, 10 - (m["co2_kg_par_kg"] / 5))
        n_dispo = max(0, (m["disponibilite"] / 5) * 10)
        n_prix  = max(0, 10 - (m["prix_relatif"] / 5) * 10)

        score_final = (
            m["perf_score"]  * p.get("perf", 0.5) +
            n_co2            * p.get("co2",  0.3) +
            n_dispo          * p.get("dispo", 0.13) +
            n_prix           * p.get("prix",  0.07)
        )

        scores.append({
            **m,
            "score_final":           round(score_final, 2),
            "score_co2":             round(n_co2, 2),
            "score_dispo":           round(n_dispo, 2),
            "score_prix":            round(n_prix, 2),
        })

    scores.sort(key=lambda x: x["score_final"], reverse=True)
    top3 = scores[:3]

    trace = state["trace"]
    trace.append(f"✅ Nœud 4 — Scoring terminé")
    for i, m in enumerate(top3):
        trace.append(f"   {'🥇🥈🥉'[i]} {m['nom']} → {m['score_final']}/10")

    return {**state, "candidats_scores": top3, "trace": trace}


# ─────────────────────────────────────────
# NŒUD 5 — Justification sourcée
# ─────────────────────────────────────────

def justifier_recommandations(state: SurgGreenState) -> SurgGreenState:
    """Claude rédige une justification clinique pour chaque matériau recommandé."""

    ctx = state["contexte_clinique"]
    top3 = state["candidats_scores"]

    if not top3:
        trace = state["trace"]
        trace.append("⛔ Nœud 5 — Aucun matériau à justifier")
        return {**state, "recommandations_finales": [], "trace": trace}

    materiaux_str = json.dumps(
        [{k: v for k, v in m.items() if k not in ["types_chirurgie", "indication", "id"]} for m in top3],
        ensure_ascii=False, indent=2
    )

    messages = [
        SystemMessage(content="""Tu es un expert en biomatériaux chirurgicaux.
Rédige une justification clinique concise pour chaque matériau recommandé.
Mentionne toujours : pourquoi ce matériau est adapté à CE contexte spécifique, 
l'avantage environnemental si pertinent, et une mise en garde si nécessaire.
Réponds UNIQUEMENT en JSON valide."""),
        HumanMessage(content=f"""Contexte clinique : {json.dumps(ctx, ensure_ascii=False)}

Top 3 matériaux : {materiaux_str}

Génère un JSON avec exactement cette structure :
[
  {{
    "nom": "nom du matériau",
    "justification": "2-3 phrases de justification clinique adaptée au contexte",
    "avantage_env": "1 phrase sur l'impact environnemental",
    "mise_en_garde": "1 phrase si applicable, sinon null"
  }}
]""")
    ]

    response = llm.invoke(messages)
    texte = response.content.replace("```json", "").replace("```", "").strip()
    justifications = json.loads(texte)

    # Fusionner scores + justifications
    recommandations = []
    for m, j in zip(top3, justifications):
        recommandations.append({**m, **j})

    trace = state["trace"]
    trace.append("✅ Nœud 5 — Justifications générées")

    return {**state, "recommandations_finales": recommandations, "trace": trace}


# ─────────────────────────────────────────
# CONSTRUCTION DU GRAPHE
# ─────────────────────────────────────────

def construire_agent() -> StateGraph:
    graph = StateGraph(SurgGreenState)

    # Ajout des nœuds
    graph.add_node("extraire_contexte",        extraire_contexte)
    graph.add_node("filtrer_materiaux",        filtrer_materiaux)
    graph.add_node("appliquer_securite",       appliquer_securite)
    graph.add_node("scorer_materiaux",         scorer_materiaux)
    graph.add_node("justifier_recommandations",justifier_recommandations)

    # Connexions séquentielles
    graph.set_entry_point("extraire_contexte")
    graph.add_edge("extraire_contexte",         "filtrer_materiaux")
    graph.add_edge("filtrer_materiaux",         "appliquer_securite")
    graph.add_edge("appliquer_securite",        "scorer_materiaux")
    graph.add_edge("scorer_materiaux",          "justifier_recommandations")
    graph.add_edge("justifier_recommandations", END)

    return graph.compile()


# ─────────────────────────────────────────
# FONCTION PRINCIPALE — à appeler depuis app.py
# ─────────────────────────────────────────

def lancer_agent(description: str, poids: dict) -> SurgGreenState:
    """
    Lance l'agent SurgGreen complet.

    Args:
        description : description en langage naturel du chirurgien
        poids       : {"perf": 0.5, "co2": 0.3, "dispo": 0.13, "prix": 0.07}

    Returns:
        L'état final avec recommandations_finales et trace complète
    """
    agent = construire_agent()

    etat_initial: SurgGreenState = {
        "description_chirurgien":   description,
        "poids":                    poids,
        "contexte_clinique":        {},
        "candidats_filtres":        [],
        "candidats_securises":      [],
        "candidats_scores":         [],
        "recommandations_finales":  [],
        "trace":                    ["🚀 Agent SurgGreen démarré"],
    }

    return agent.invoke(etat_initial)


# ─────────────────────────────────────────
# TEST EN LIGNE DE COMMANDE
# ─────────────────────────────────────────

if __name__ == "__main__":
    resultat = lancer_agent(
        description="plaque d'ostéosynthèse tibiale, patient jeune de 22 ans, retrait prévu dans 18 mois",
        poids={"perf": 0.5, "co2": 0.3, "dispo": 0.13, "prix": 0.07}
    )

    print("\n=== TRACE DE RAISONNEMENT ===")
    for etape in resultat["trace"]:
        print(etape)

    print("\n=== RECOMMANDATIONS FINALES ===")
    medailles = ["🥇", "🥈", "🥉"]
    for i, m in enumerate(resultat["recommandations_finales"]):
        print(f"\n{medailles[i]} {m['nom']} — Score : {m['score_final']}/10")
        print(f"   Clinique     : {m['perf_score']}/10")
        print(f"   CO₂          : {m['co2_kg_par_kg']} kg/kg")
        print(f"   Justification: {m['justification']}")
        print(f"   Environnement: {m['avantage_env']}")
        if m.get("mise_en_garde"):
            print(f"   ⚠️  Mise en garde : {m['mise_en_garde']}")
