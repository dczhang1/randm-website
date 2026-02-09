#!/usr/bin/env python3
"""
Convert subgroup meta-analysis Excel file to JSON for web display.
Updates both assets/data/subgroup-results.json and the embedded
FALLBACK_DATA in assets/js/subgroup-analysis.js.
"""

import pandas as pd
import json
import re
import sys
from pathlib import Path

def convert_excel_to_json(excel_path, json_path, js_path=None):
    """Convert Excel file to JSON format. Optionally update JS embed."""
    try:
        df = pd.read_excel(excel_path)
        data = df.to_dict('records')

        for record in data:
            for key in ['k', 'N']:
                if key in record and pd.notna(record[key]):
                    try:
                        record[key] = int(record[key])
                    except (ValueError, TypeError):
                        pass
            for key in ['r', 'rho']:
                if key in record and pd.notna(record[key]):
                    try:
                        record[key] = float(record[key])
                    except (ValueError, TypeError):
                        pass

        with open(json_path, 'w') as f:
            json.dump(data, f, indent=2, default=str)
        print(f"Wrote {len(data)} records to {json_path}")

        if js_path and js_path.exists():
            compact = json.dumps(data, separators=(',', ':'), ensure_ascii=False)
            js = js_path.read_text()
            pat = r'var FALLBACK_DATA = \[.*?\];'
            new = 'var FALLBACK_DATA = ' + compact + ';'
            if re.search(pat, js, re.DOTALL):
                js = re.sub(pat, new, js, count=1, flags=re.DOTALL)
                js_path.write_text(js)
                print(f"Updated FALLBACK_DATA in {js_path.name}")
            else:
                print("Warning: FALLBACK_DATA pattern not found in JS", file=sys.stderr)

        return True
    except Exception as e:
        print(f"Error: {e}", file=sys.stderr)
        return False

if __name__ == '__main__':
    script_dir = Path(__file__).parent
    excel_path = script_dir.parent / 'osf' / 'outputs' / 'tables' / 'subgroup_meta_analysis_results.xlsx'
    json_path = script_dir / 'assets' / 'data' / 'subgroup-results.json'
    js_path = script_dir / 'assets' / 'js' / 'subgroup-analysis.js'
    json_path.parent.mkdir(parents=True, exist_ok=True)
    ok = convert_excel_to_json(excel_path, json_path, js_path)
    sys.exit(0 if ok else 1)
