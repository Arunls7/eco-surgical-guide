"""
SurgGreen — Base de Connaissances (20 matériaux)
Données issues de la littérature scientifique — références citées par matériau
"""

MATERIAUX = {

    # MÉTAUX (5)
    "titane_grade5": {
        "nom": "Titane Grade 5 (Ti-6Al-4V)", "categorie": "Métal",
        "reference": "Gao C. et al., J Clean Prod 2021",
        "co2_kg_par_kg": 45.0, "recyclable": True, "biodegradable": False, "duree_vie_implant_ans": 25,
        "types_chirurgie": ["orthopédie", "traumatologie", "rachis", "dentaire"],
        "indication": "Plaques, vis, prothèses hanche/genou, cages rachidiennes",
        "taux_succes_pct": 96, "biocompatibilite": 5, "resistance_mecanique": 5,
        "elasticite": 2, "osteointegration": 5, "radio_opaque": True,
        "compatible_irm": True, "retrait_possible": True, "prix_relatif": 3,
        "disponibilite": 5, "risque_infection": 2, "risque_allergie": 1, "risque_corrosion": 1,
    },
    "acier_316L": {
        "nom": "Acier Inoxydable 316L", "categorie": "Métal",
        "reference": "WorldSteel Association, LCA Steel 2020",
        "co2_kg_par_kg": 6.1, "recyclable": True, "biodegradable": False, "duree_vie_implant_ans": 10,
        "types_chirurgie": ["traumatologie", "orthopédie", "fixation externe"],
        "indication": "Fixateurs externes, plaques temporaires",
        "taux_succes_pct": 91, "biocompatibilite": 3, "resistance_mecanique": 5,
        "elasticite": 1, "osteointegration": 2, "radio_opaque": True,
        "compatible_irm": False, "retrait_possible": True, "prix_relatif": 1,
        "disponibilite": 5, "risque_infection": 3, "risque_allergie": 3, "risque_corrosion": 3,
    },
    "cobalt_chrome": {
        "nom": "Alliage Cobalt-Chrome (CoCrMo)", "categorie": "Métal",
        "reference": "Hedberg Y. et al., Acta Biomater 2014",
        "co2_kg_par_kg": 51.0, "recyclable": True, "biodegradable": False, "duree_vie_implant_ans": 20,
        "types_chirurgie": ["orthopédie", "prothèses articulaires", "dentaire"],
        "indication": "Têtes prothèses hanche/genou, bridges dentaires",
        "taux_succes_pct": 94, "biocompatibilite": 3, "resistance_mecanique": 5,
        "elasticite": 1, "osteointegration": 3, "radio_opaque": True,
        "compatible_irm": False, "retrait_possible": True, "prix_relatif": 3,
        "disponibilite": 4, "risque_infection": 2, "risque_allergie": 4, "risque_corrosion": 2,
    },
    "magnesium_bioresorbable": {
        "nom": "Magnésium Biodégradable (Mg-Zn-Ca)", "categorie": "Métal",
        "reference": "Zhao D. et al., Bioact Mater 2021",
        "co2_kg_par_kg": 14.8, "recyclable": False, "biodegradable": True, "duree_vie_implant_ans": 2,
        "types_chirurgie": ["pédiatrie", "traumatologie", "chirurgie de la main"],
        "indication": "Vis résorbables, fixation pédiatrique",
        "taux_succes_pct": 88, "biocompatibilite": 4, "resistance_mecanique": 3,
        "elasticite": 4, "osteointegration": 4, "radio_opaque": True,
        "compatible_irm": True, "retrait_possible": False, "prix_relatif": 4,
        "disponibilite": 2, "risque_infection": 2, "risque_allergie": 1, "risque_corrosion": 4,
    },
    "nitinol": {
        "nom": "Nitinol (NiTi — mémoire de forme)", "categorie": "Métal",
        "reference": "Morgan N.B., Mater Sci Eng A 2004",
        "co2_kg_par_kg": 89.0, "recyclable": True, "biodegradable": False, "duree_vie_implant_ans": 20,
        "types_chirurgie": ["rachis", "chirurgie mini-invasive"],
        "indication": "Agrafes rachidiennes, instruments endoscopiques",
        "taux_succes_pct": 92, "biocompatibilite": 4, "resistance_mecanique": 4,
        "elasticite": 5, "osteointegration": 2, "radio_opaque": True,
        "compatible_irm": True, "retrait_possible": True, "prix_relatif": 5,
        "disponibilite": 3, "risque_infection": 2, "risque_allergie": 3, "risque_corrosion": 2,
    },

    # POLYMÈRES (5)
    "peek": {
        "nom": "PEEK (Polyétheréthercétone)", "categorie": "Polymère",
        "reference": "PlasticsEurope, Eco-profiles PEEK 2019",
        "co2_kg_par_kg": 9.8, "recyclable": False, "biodegradable": False, "duree_vie_implant_ans": 25,
        "types_chirurgie": ["rachis", "neurochirurgie", "maxillo-facial", "orthopédie"],
        "indication": "Cages intersomatiques, plaques crâniennes",
        "taux_succes_pct": 93, "biocompatibilite": 5, "resistance_mecanique": 4,
        "elasticite": 4, "osteointegration": 2, "radio_opaque": False,
        "compatible_irm": True, "retrait_possible": True, "prix_relatif": 4,
        "disponibilite": 4, "risque_infection": 2, "risque_allergie": 1, "risque_corrosion": 1,
    },
    "pla_biodegradable": {
        "nom": "PLA Biodégradable (Acide Polylactique)", "categorie": "Polymère",
        "reference": "Vink E.T.H. et al., Polym Degrad Stab 2004",
        "co2_kg_par_kg": 2.1, "recyclable": True, "biodegradable": True, "duree_vie_implant_ans": 2,
        "types_chirurgie": ["pédiatrie", "maxillo-facial", "chirurgie de la main"],
        "indication": "Vis résorbables, broches pédiatriques",
        "taux_succes_pct": 87, "biocompatibilite": 4, "resistance_mecanique": 2,
        "elasticite": 3, "osteointegration": 3, "radio_opaque": False,
        "compatible_irm": True, "retrait_possible": False, "prix_relatif": 2,
        "disponibilite": 4, "risque_infection": 2, "risque_allergie": 2, "risque_corrosion": 1,
    },
    "uhmwpe": {
        "nom": "UHMWPE (Polyéthylène Ultra Haute Masse)", "categorie": "Polymère",
        "reference": "Kurtz S.M., UHMWPE Handbook 3rd Ed, Elsevier 2016",
        "co2_kg_par_kg": 2.8, "recyclable": False, "biodegradable": False, "duree_vie_implant_ans": 20,
        "types_chirurgie": ["orthopédie", "prothèses articulaires"],
        "indication": "Inserts tibials genou, cotyles hanche",
        "taux_succes_pct": 94, "biocompatibilite": 5, "resistance_mecanique": 3,
        "elasticite": 4, "osteointegration": 1, "radio_opaque": False,
        "compatible_irm": True, "retrait_possible": True, "prix_relatif": 2,
        "disponibilite": 5, "risque_infection": 2, "risque_allergie": 1, "risque_corrosion": 1,
    },
    "pmma": {
        "nom": "PMMA (Ciment Osseux Acrylique)", "categorie": "Polymère",
        "reference": "Lewis G., J Biomed Mater Res B 1997",
        "co2_kg_par_kg": 3.4, "recyclable": False, "biodegradable": False, "duree_vie_implant_ans": 15,
        "types_chirurgie": ["orthopédie", "rachis", "neurochirurgie"],
        "indication": "Scellement prothèses, vertébroplastie",
        "taux_succes_pct": 89, "biocompatibilite": 3, "resistance_mecanique": 3,
        "elasticite": 1, "osteointegration": 1, "radio_opaque": True,
        "compatible_irm": True, "retrait_possible": False, "prix_relatif": 1,
        "disponibilite": 5, "risque_infection": 3, "risque_allergie": 3, "risque_corrosion": 1,
    },
    "plga": {
        "nom": "PLGA (Copolymère PLA-PGA)", "categorie": "Polymère",
        "reference": "Athanasiou K.A. et al., Biomaterials 1996",
        "co2_kg_par_kg": 3.1, "recyclable": False, "biodegradable": True, "duree_vie_implant_ans": 1,
        "types_chirurgie": ["pédiatrie", "chirurgie de la main", "maxillo-facial", "traumatologie"],
        "indication": "Vis résorbables, sutures, membranes régénération",
        "taux_succes_pct": 85, "biocompatibilite": 4, "resistance_mecanique": 2,
        "elasticite": 3, "osteointegration": 3, "radio_opaque": False,
        "compatible_irm": True, "retrait_possible": False, "prix_relatif": 3,
        "disponibilite": 4, "risque_infection": 2, "risque_allergie": 2, "risque_corrosion": 1,
    },

    # CÉRAMIQUES (5)
    "hydroxyapatite": {
        "nom": "Hydroxyapatite (HA)", "categorie": "Céramique",
        "reference": "Dorozhkin S.V., Biomaterials 2010",
        "co2_kg_par_kg": 3.2, "recyclable": False, "biodegradable": True, "duree_vie_implant_ans": 10,
        "types_chirurgie": ["orthopédie", "dentaire", "rachis", "chirurgie osseuse"],
        "indication": "Revêtements prothèses, comblement osseux",
        "taux_succes_pct": 89, "biocompatibilite": 5, "resistance_mecanique": 2,
        "elasticite": 1, "osteointegration": 5, "radio_opaque": True,
        "compatible_irm": True, "retrait_possible": False, "prix_relatif": 2,
        "disponibilite": 4, "risque_infection": 1, "risque_allergie": 1, "risque_corrosion": 1,
    },
    "zircone": {
        "nom": "Zircone (Y-TZP stabilisée yttrium)", "categorie": "Céramique",
        "reference": "Piconi C. & Maccauro G., Biomaterials 1999",
        "co2_kg_par_kg": 12.5, "recyclable": False, "biodegradable": False, "duree_vie_implant_ans": 25,
        "types_chirurgie": ["dentaire", "orthopédie", "prothèses articulaires"],
        "indication": "Têtes prothèses hanche, couronnes dentaires",
        "taux_succes_pct": 94, "biocompatibilite": 5, "resistance_mecanique": 4,
        "elasticite": 2, "osteointegration": 3, "radio_opaque": True,
        "compatible_irm": True, "retrait_possible": True, "prix_relatif": 4,
        "disponibilite": 3, "risque_infection": 1, "risque_allergie": 1, "risque_corrosion": 1,
    },
    "alumine": {
        "nom": "Alumine (Al₂O₃ haute densité)", "categorie": "Céramique",
        "reference": "Chevalier J. & Gremillard L., J Eur Ceram Soc 2009",
        "co2_kg_par_kg": 8.2, "recyclable": False, "biodegradable": False, "duree_vie_implant_ans": 25,
        "types_chirurgie": ["orthopédie", "prothèses articulaires"],
        "indication": "Têtes et cotyles prothèses totales hanche",
        "taux_succes_pct": 95, "biocompatibilite": 5, "resistance_mecanique": 4,
        "elasticite": 1, "osteointegration": 2, "radio_opaque": True,
        "compatible_irm": True, "retrait_possible": True, "prix_relatif": 4,
        "disponibilite": 3, "risque_infection": 1, "risque_allergie": 1, "risque_corrosion": 1,
    },
    "tcp": {
        "nom": "Phosphate Tricalcique β (β-TCP)", "categorie": "Céramique",
        "reference": "Bohner M., Injury 2000",
        "co2_kg_par_kg": 2.9, "recyclable": False, "biodegradable": True, "duree_vie_implant_ans": 2,
        "types_chirurgie": ["orthopédie", "dentaire", "chirurgie osseuse", "maxillo-facial"],
        "indication": "Comblement cavités osseuses, greffes sinus",
        "taux_succes_pct": 86, "biocompatibilite": 5, "resistance_mecanique": 1,
        "elasticite": 1, "osteointegration": 5, "radio_opaque": True,
        "compatible_irm": True, "retrait_possible": False, "prix_relatif": 2,
        "disponibilite": 4, "risque_infection": 1, "risque_allergie": 1, "risque_corrosion": 1,
    },
    "bioglass": {
        "nom": "Bioglass 45S5", "categorie": "Céramique",
        "reference": "Hench L.L., J Am Ceram Soc 1991",
        "co2_kg_par_kg": 4.1, "recyclable": False, "biodegradable": True, "duree_vie_implant_ans": 3,
        "types_chirurgie": ["orthopédie", "dentaire", "chirurgie osseuse", "ORL"],
        "indication": "Comblement osseux, reconstruction osselets ORL",
        "taux_succes_pct": 84, "biocompatibilite": 5, "resistance_mecanique": 1,
        "elasticite": 1, "osteointegration": 5, "radio_opaque": False,
        "compatible_irm": True, "retrait_possible": False, "prix_relatif": 3,
        "disponibilite": 3, "risque_infection": 1, "risque_allergie": 1, "risque_corrosion": 1,
    },

    # COMPOSITES & BIOSOURCÉS (5)
    "fibre_carbone_peek": {
        "nom": "Composite Fibre de Carbone / PEEK", "categorie": "Composite",
        "reference": "Duflou J.R. et al., CIRP Ann 2012",
        "co2_kg_par_kg": 29.5, "recyclable": False, "biodegradable": False, "duree_vie_implant_ans": 25,
        "types_chirurgie": ["rachis", "orthopédie oncologique", "traumatologie"],
        "indication": "Tiges rachidiennes, plaques reconstruction oncologique",
        "taux_succes_pct": 94, "biocompatibilite": 5, "resistance_mecanique": 5,
        "elasticite": 4, "osteointegration": 2, "radio_opaque": False,
        "compatible_irm": True, "retrait_possible": True, "prix_relatif": 5,
        "disponibilite": 3, "risque_infection": 1, "risque_allergie": 1, "risque_corrosion": 1,
    },
    "os_allogene": {
        "nom": "Os Allogène (greffe osseuse humaine)", "categorie": "Biosourcé",
        "reference": "Vavken P. et al., Clin Orthop Relat Res 2010",
        "co2_kg_par_kg": 1.8, "recyclable": False, "biodegradable": True, "duree_vie_implant_ans": 5,
        "types_chirurgie": ["orthopédie", "rachis", "traumatologie", "oncologie osseuse"],
        "indication": "Comblement défects osseux, arthrodèses",
        "taux_succes_pct": 82, "biocompatibilite": 4, "resistance_mecanique": 3,
        "elasticite": 5, "osteointegration": 5, "radio_opaque": True,
        "compatible_irm": True, "retrait_possible": False, "prix_relatif": 3,
        "disponibilite": 2, "risque_infection": 4, "risque_allergie": 3, "risque_corrosion": 1,
    },
    "ha_collagene": {
        "nom": "Composite Hydroxyapatite / Collagène", "categorie": "Composite",
        "reference": "Roveri N. & Palazzo B., Nanotechnol Percept 2006",
        "co2_kg_par_kg": 5.3, "recyclable": False, "biodegradable": True, "duree_vie_implant_ans": 3,
        "types_chirurgie": ["orthopédie", "dentaire", "chirurgie osseuse", "maxillo-facial"],
        "indication": "Substitut osseux biomimétique, régénération guidée",
        "taux_succes_pct": 86, "biocompatibilite": 5, "resistance_mecanique": 2,
        "elasticite": 3, "osteointegration": 5, "radio_opaque": False,
        "compatible_irm": True, "retrait_possible": False, "prix_relatif": 3,
        "disponibilite": 3, "risque_infection": 2, "risque_allergie": 2, "risque_corrosion": 1,
    },
    "titane_poreux_3d": {
        "nom": "Titane Poreux Impression 3D (Ti6Al4V ELI)", "categorie": "Composite",
        "reference": "Murr L.E. et al., J Mech Behav Biomed 2010",
        "co2_kg_par_kg": 89.0, "recyclable": True, "biodegradable": False, "duree_vie_implant_ans": 25,
        "types_chirurgie": ["orthopédie", "rachis", "oncologie osseuse"],
        "indication": "Implants sur-mesure, cages rachidiennes poreuses",
        "taux_succes_pct": 95, "biocompatibilite": 5, "resistance_mecanique": 5,
        "elasticite": 3, "osteointegration": 5, "radio_opaque": True,
        "compatible_irm": True, "retrait_possible": True, "prix_relatif": 5,
        "disponibilite": 2, "risque_infection": 2, "risque_allergie": 1, "risque_corrosion": 1,
    },
    "soie_bombyx": {
        "nom": "Soie Bombyx mori (biopolymère)", "categorie": "Biosourcé",
        "reference": "Altman G.H. et al., Biomaterials 2003",
        "co2_kg_par_kg": 0.9, "recyclable": False, "biodegradable": True, "duree_vie_implant_ans": 1,
        "types_chirurgie": ["chirurgie de la main", "maxillo-facial", "pédiatrie", "chirurgie reconstructrice"],
        "indication": "Sutures résorbables, échafaudages ligamentaires",
        "taux_succes_pct": 83, "biocompatibilite": 4, "resistance_mecanique": 2,
        "elasticite": 4, "osteointegration": 2, "radio_opaque": False,
        "compatible_irm": True, "retrait_possible": False, "prix_relatif": 2,
        "disponibilite": 3, "risque_infection": 2, "risque_allergie": 3, "risque_corrosion": 1,
    },
}


def get_materiaux_par_chirurgie(type_chirurgie: str) -> list:
    return [m for m in MATERIAUX.values()
            if type_chirurgie.lower() in [t.lower() for t in m["types_chirurgie"]]]

def score_clinique(m: dict) -> float:
    score = ((m["taux_succes_pct"] / 100) * 4 + (m["biocompatibilite"] / 5) * 3 +
             (m["osteointegration"] / 5) * 2 - (m["risque_infection"] / 5) * 0.5 -
             (m["risque_allergie"] / 5) * 0.5)
    return round(min(max(score, 0), 10), 2)

def score_environnemental(m: dict) -> float:
    score = 10 - min(m["co2_kg_par_kg"] / 10, 9)
    if m["biodegradable"]: score += 0.5
    if m["recyclable"]:    score += 0.5
    return round(min(score, 10), 2)

def top3_recommandation(type_chirurgie: str, poids: dict = None) -> list:
    if poids is None:
        poids = {"perf": 0.5, "co2": 0.3, "dispo": 0.13, "prix": 0.07}
    candidats = get_materiaux_par_chirurgie(type_chirurgie)
    resultats = []
    for m in candidats:
        perf = score_clinique(m)
        if perf < 8: continue
        n_co2   = max(0, 10 - (m["co2_kg_par_kg"] / 10))
        n_dispo = max(0, (m["disponibilite"] / 5) * 10)
        n_prix  = max(0, 10 - (m["prix_relatif"] / 5) * 10)
        score_final = (perf * poids["perf"] + n_co2 * poids["co2"] +
                       n_dispo * poids["dispo"] + n_prix * poids["prix"])
        resultats.append({
            "nom": m["nom"], "reference": m["reference"],
            "score_final": round(score_final, 2), "score_clinique": perf,
            "score_env": score_environnemental(m), "co2_kg_par_kg": m["co2_kg_par_kg"],
            "taux_succes_pct": m["taux_succes_pct"], "biodegradable": m["biodegradable"],
            "retrait_possible": m["retrait_possible"], "compatible_irm": m["compatible_irm"],
            "prix_relatif": m["prix_relatif"], "disponibilite": m["disponibilite"],
        })
    resultats.sort(key=lambda x: x["score_final"], reverse=True)
    return resultats[:3]

if __name__ == "__main__":
    print(f"Base chargée : {len(MATERIAUX)} matériaux\n")
    for chirurgie in ["rachis", "orthopédie", "traumatologie"]:
        res = top3_recommandation(chirurgie)
        print(f"Top 3 — {chirurgie} :")
        for i, m in enumerate(res, 1):
            print(f"  {'🥇🥈🥉'[i-1]} {m['nom']} | Score: {m['score_final']} | CO₂: {m['co2_kg_par_kg']}kg")
        print()