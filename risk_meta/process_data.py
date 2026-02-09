import pandas as pd
import json
import numpy as np
import os

def process_data():
    # Load data
    input_path = 'data/dat_dvs_clean.csv'
    if not os.path.exists(input_path):
        print(f"Error: {input_path} not found.")
        return

    df = pd.read_csv(input_path)

    # Outcome mapping
    outcome_map = {
        'CWB': 'Counterproductive Work Behavior',
        'OCB': 'Organizational Citizenship Behavior',
        'SAFINCID': 'Safety Incidents',
        'SAFCOMPLY': 'Safety Compliance',
        'TASK': 'Task Performance',
        'TRNINT': 'Turnover Intentions',
        'TRNBEH': 'Turnover Behavior',
        'POSDEV': 'Positive Deviance',
        'CREATIVEP': 'Creative Performance'
    }

    studies = []
    llm_ratings_list = []

    for index, row in df.iterrows():
        # Handle N/A and NaNs
        def get_val(val, default=None):
            if pd.isna(val) or val == 'N/A' or val == 'NA':
                return default
            try:
                return float(val)
            except:
                return str(val)

        outcome_code = row['outcome']
        if outcome_code not in outcome_map:
            continue

        n = get_val(row['n'], 0)
        rxy = get_val(row['rxy'], 0)
        vi = get_val(row['vi'], 0)
        
        rxy_c = get_val(row['rxy_c'])
        vi_c = get_val(row['vi_c'])

        # Determine which ES to use for CI calculation
        # If corrected is available, use it. Otherwise use raw.
        if rxy_c is not None and vi_c is not None:
            es = rxy_c
            var = vi_c
            is_corrected = True
        else:
            es = rxy
            var = vi
            is_corrected = False
            # If rxy_c is None, set it to rxy or None? 
            # The design plan expects effect_size_corrected. 
            # If we don't have it, maybe we should just use rxy for visualization but note it?
            # Or just leave rxy_c as None.
            
        
        # Calculate CI
        # CI = ES +/- 1.96 * sqrt(var)
        if var is not None and var > 0:
            ci_lower = es - 1.96 * np.sqrt(var)
            ci_upper = es + 1.96 * np.sqrt(var)
        else:
            ci_lower = None
            ci_upper = None

        # LLM Ratings
        risk_avg = get_val(row['risk_avg'])
        benefit_avg = get_val(row['benefit_avg'])
        uncertainty_avg = get_val(row['uncertainty_avg'])
        val_avg = get_val(row['val_avg'])

        study = {
            "id": row['effectsize_ID'],
            "reference": row['reference'],
            "doi": "", # Not in CSV
            "year": get_val(row['publication_year']),
            "outcome": outcome_code,
            "outcome_full": outcome_map.get(outcome_code, outcome_code),
            "risk_measure_type": row['risk_variable_type'],
            "n": n,
            "effect_size_raw": rxy,
            "effect_size_corrected": rxy_c if rxy_c is not None else rxy, # Fallback to raw if corrected missing?
            "ci_lower": ci_lower,
            "ci_upper": ci_upper,
            "publication_type": row['document_type'],
            "country": row['country'],
            "risk_measure_name": row['risk_measure'],
            "risk_reliability": get_val(row['risk_reliability'], "NR"),
            "outcome_measure_name": row['outcome_variable'],
            "outcome_reliability": get_val(row['outcome_reliability'], "NR"),
            "llm_ratings": {
                "personal_risk": risk_avg,
                "personal_benefit": benefit_avg,
                "uncertainty": uncertainty_avg,
                "org_valence": val_avg
            }
        }
        studies.append(study)
        
        if risk_avg is not None:
            llm_ratings_list.append({
                "outcome": outcome_code,
                "personal_risk": risk_avg,
                "personal_benefit": benefit_avg,
                "uncertainty": uncertainty_avg,
                "org_valence": val_avg
            })

    # Save studies.json
    output_dir = 'web_page/assets/data'
    with open(f'{output_dir}/studies.json', 'w') as f:
        json.dump(studies, f, indent=2)

    # Aggregate LLM ratings
    llm_df = pd.DataFrame(llm_ratings_list)
    llm_agg = llm_df.groupby('outcome').mean().to_dict('index')
    
    # Format for llm-ratings.json
    # { "CWB": { ... }, ... }
    # It seems to_dict('index') does exactly that if index is outcome.
    
    with open(f'{output_dir}/llm-ratings.json', 'w') as f:
        json.dump(llm_agg, f, indent=2)
        
    print(f"Generated studies.json ({len(studies)} studies) and llm-ratings.json")

if __name__ == "__main__":
    process_data()
