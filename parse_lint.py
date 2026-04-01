import json
import os

try:
    for encoding in ['utf-16', 'utf-8', 'utf-16-le', 'utf-16-be']:
        try:
            with open('final_lint.json', 'r', encoding=encoding) as f:
                content = f.read()
                if content.startswith('\ufeff'):
                    content = content[1:]
                data = json.loads(content)
                break
        except Exception:
            continue
    else:
        print("Could not read file")
        exit(1)

    with open('full_lint_report.txt', 'w', encoding='utf-8') as out:
        for file_data in data:
            file_path = file_data.get('filePath', 'unknown')
            messages = file_data.get('messages', [])
            for msg in messages:
                out.write(f"{file_path}:{msg.get('line')}:{msg.get('column')} - {msg.get('message')} ({msg.get('ruleId')})\n")
    print("Full report written to full_lint_report.txt")
except Exception as e:
    print(f"Error: {e}")
