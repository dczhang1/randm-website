import json
import os

def embed_data():
    json_path = 'web_page/assets/data/studies.json'
    js_path = 'web_page/assets/js/data-table.js'
    
    if not os.path.exists(json_path):
        print("Error: JSON file not found")
        return

    with open(json_path, 'r') as f:
        data = json.load(f)
    
    js_content = f"""
const studyData = {json.dumps(data)};

$(document).ready(function() {{
    let table = $('#studiesTable').DataTable({{
        data: studyData,
        columns: [
            {{ data: 'reference' }},
            {{ data: 'year' }},
            {{ data: 'outcome_full' }},
            {{ data: 'n' }},
            {{ data: 'effect_size_raw', render: function(data) {{ return (data !== null && data !== undefined) ? data.toFixed(2) : ''; }} }},
            {{ 
                data: 'effect_size_corrected', 
                render: function(data, type, row) {{ 
                    if (data === null || data === undefined) return '';
                    let val = parseFloat(data).toFixed(2);
                    return `<strong>${{val}}</strong>`;
                }} 
            }},
            {{ data: 'risk_measure_name' }}
        ],
        responsive: true,
        pageLength: 25,
        order: [[ 1, 'desc' ]],
        language: {{
            search: "_INPUT_",
            searchPlaceholder: "Search studies..."
        }}
    }});

    // Custom filtering
    $('#filter-outcome').on('change', function() {{
        // The column index 2 corresponds to 'outcome_full'
        // The select values are codes (e.g. 'CWB'), but the column has full names.
        // We need to map the code to the full name for the search.
        
        const outcomeMap = {{
            'CWB': 'Counterproductive Work Behavior',
            'OCB': 'Organizational Citizenship Behavior',
            'SAFINCID': 'Safety Incidents',
            'SAFCOMPLY': 'Safety Compliance',
            'TASK': 'Task Performance',
            'TRNINT': 'Turnover Intentions',
            'TRNBEH': 'Turnover Behavior',
            'POSDEV': 'Positive Deviance',
            'CREATIVEP': 'Creative Performance'
        }};
        
        let val = $(this).val();
        let searchVal = val ? outcomeMap[val] : '';
        
        // Exact match for the column to avoid partial matches if names overlap
        // using DataTables regex search or just smart search. 
        // Simple search should suffice for these distinct names.
        table.column(2).search(searchVal).draw();
    }});
}});
"""
    
    with open(js_path, 'w') as f:
        f.write(js_content)
    
    print("Successfully embedded JSON data into data-table.js")

if __name__ == "__main__":
    embed_data()
