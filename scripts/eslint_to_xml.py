"""
Convierte el reporte JSON de ESLint a formato Checkstyle XML compatible con la API de Sentinel.

Variables de entorno requeridas:
  JSON_INPUT  - ruta al archivo JSON generado por ESLint (--format json)
  XML_OUTPUT  - ruta de salida del archivo XML
"""
import json
import os
from datetime import datetime, timezone
from pathlib import Path
import xml.etree.ElementTree as ET

json_input = os.environ["JSON_INPUT"]
xml_output = os.environ["XML_OUTPUT"]

root = ET.Element("checkstyle", {
    "version": "eslint",
    "generatedAt": datetime.now(timezone.utc).isoformat(),
})

json_path = Path(json_input)
if json_path.exists():
    with json_path.open("r", encoding="utf-8") as f:
        results = json.load(f)

    for file_result in results:
        file_elem = ET.SubElement(root, "file", {"name": file_result.get("filePath", "")})
        for msg in file_result.get("messages", []):
            severity_num = msg.get("severity", 1)
            severity = "error" if severity_num == 2 else "warning"
            ET.SubElement(file_elem, "error", {
                "line": str(msg.get("line", "")),
                "column": str(msg.get("column", "")),
                "severity": severity,
                "message": msg.get("message", ""),
                "source": msg.get("ruleId", "") or "",
            })
else:
    ET.SubElement(root, "file", {"name": "no-results", "error": "ESLint output not found"})

ET.ElementTree(root).write(xml_output, encoding="utf-8", xml_declaration=True)
print(f"Reporte ESLint generado: {xml_output}")
