"""
Convierte coverage-final.json (formato Istanbul — usado por Jest y Vitest) a Cobertura XML.
Equivalente a Coverlet de .NET.

Variables de entorno requeridas:
  COVERAGE_DIR  - directorio donde se encuentra coverage-final.json
  XML_OUTPUT    - ruta de salida del archivo XML
"""
import json
import os
from datetime import datetime, timezone
from pathlib import Path
import xml.etree.ElementTree as ET

coverage_dir = Path(os.environ["COVERAGE_DIR"])
xml_output = os.environ["XML_OUTPUT"]

coverage_file = coverage_dir / "coverage-final.json"

root = ET.Element("coverage", {
    "version": "1",
    "timestamp": str(int(datetime.now(timezone.utc).timestamp())),
    "generatedAt": datetime.now(timezone.utc).isoformat(),
    "tool": "istanbul",
})

packages_elem = ET.SubElement(root, "packages")
package_elem = ET.SubElement(packages_elem, "package", {
    "name": ".",
    "line-rate": "0",
    "branch-rate": "0",
    "complexity": "0",
})
classes_elem = ET.SubElement(package_elem, "classes")

total_lines = 0
covered_lines = 0
total_branches = 0
covered_branches = 0

if coverage_file.exists():
    with coverage_file.open("r", encoding="utf-8") as f:
        coverage_data = json.load(f)

    for file_path, file_cov in coverage_data.items():
        s = file_cov.get("s", {})
        s_map = file_cov.get("statementMap", {})
        b = file_cov.get("b", {})
        b_map = file_cov.get("branchMap", {})

        file_total = len(s)
        file_covered = sum(1 for c in s.values() if c > 0)
        file_rate = round(file_covered / file_total, 4) if file_total > 0 else 1.0

        file_branch_total = sum(len(counts) for counts in b.values())
        file_branch_covered = sum(sum(1 for c in counts if c > 0) for counts in b.values())
        file_branch_rate = round(file_branch_covered / file_branch_total, 4) if file_branch_total > 0 else 1.0

        total_lines += file_total
        covered_lines += file_covered
        total_branches += file_branch_total
        covered_branches += file_branch_covered

        class_elem = ET.SubElement(classes_elem, "class", {
            "name": Path(file_path).name,
            "filename": file_path,
            "line-rate": str(file_rate),
            "branch-rate": str(file_branch_rate),
            "complexity": "0",
        })

        # Methods element (empty — Istanbul doesn't track per-method easily)
        ET.SubElement(class_elem, "methods")
        lines_elem = ET.SubElement(class_elem, "lines")

        for stmt_id, count in s.items():
            loc = s_map.get(stmt_id, {}).get("start", {})
            line_num = loc.get("line", 0)
            ET.SubElement(lines_elem, "line", {
                "number": str(line_num),
                "hits": str(count),
                "branch": "false",
            })

        for branch_id, counts in b.items():
            branch_info = b_map.get(branch_id, {})
            loc = branch_info.get("loc", {}).get("start", {})
            line_num = loc.get("line", 0)
            for idx, count in enumerate(counts):
                ET.SubElement(lines_elem, "line", {
                    "number": str(line_num),
                    "hits": str(count),
                    "branch": "true",
                    "condition-coverage": f"{idx}",
                })

overall_line_rate = round(covered_lines / total_lines, 4) if total_lines > 0 else 1.0
overall_branch_rate = round(covered_branches / total_branches, 4) if total_branches > 0 else 1.0

root.set("line-rate", str(overall_line_rate))
root.set("branch-rate", str(overall_branch_rate))
root.set("lines-covered", str(covered_lines))
root.set("lines-valid", str(total_lines))
root.set("branches-covered", str(covered_branches))
root.set("branches-valid", str(total_branches))

ET.ElementTree(root).write(xml_output, encoding="utf-8", xml_declaration=True)
print(f"Reporte de cobertura generado: {xml_output} (line-rate: {overall_line_rate}, branch-rate: {overall_branch_rate})")
