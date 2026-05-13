#!/usr/bin/env bash
# Envía un reporte XML a la API de Sentinel.
#
# Variables de entorno requeridas:
#   SENTINEL_URL     - URL base de la API (sin trailing slash)
#   SCAN_ID          - ID del scan creado en Sentinel
#   SENSOR_ID        - ID del sensor al que pertenece el reporte
#   REPORT_PATH      - Ruta absoluta al archivo XML a enviar
#   IS_LAST_REPORT   - "true" si es el último reporte del scan, "false" si no
set -euo pipefail

echo "Enviando reporte a Sentinel: ${REPORT_PATH}"

HTTP_STATUS=$(curl -s -X POST \
  "${SENTINEL_URL}/api/v1/scans/${SCAN_ID}/sensors/${SENSOR_ID}/report" \
  -H "Content-Type: multipart/form-data" \
  -F "report=@${REPORT_PATH}" \
  -F "isLastReport=${IS_LAST_REPORT}" \
  --connect-timeout 30 \
  --max-time 300 \
  -w "%{http_code}" \
  -o sentinel_response.txt)

echo "HTTP Status: ${HTTP_STATUS}"
echo "Response body:"
cat sentinel_response.txt

if [ "${HTTP_STATUS}" -ge 200 ] && [ "${HTTP_STATUS}" -lt 300 ]; then
  echo "Upload OK"
else
  echo "Upload FAILED"
  exit 1
fi
