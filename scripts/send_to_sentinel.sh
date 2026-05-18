#!/usr/bin/env bash
# Envía un reporte a la API de Sentinel.
#
# Variables de entorno requeridas:
#   SENTINEL_URL     - URL base de la API (sin trailing slash)
#   SCAN_ID          - ID del scan creado en Sentinel
#   SENSOR_ID        - ID del sensor al que pertenece el reporte
#   REPORT_PATH      - Ruta absoluta al archivo a enviar
#   CONTENT_TYPE     - Tipo de contenido: "application/json" o "application/xml"
#                      (por defecto: "application/xml" con envío multipart/form-data)
#   IS_LAST_REPORT   - "true" si es el último reporte del scan, "false" si no
set -uo pipefail

CONTENT_TYPE="${CONTENT_TYPE:-application/xml}"

echo "Enviando reporte a Sentinel: ${REPORT_PATH} (${CONTENT_TYPE})"

if [ "${CONTENT_TYPE}" = "application/json" ]; then
  # Envío directo del cuerpo JSON
  HTTP_STATUS=$(curl -s -X POST \
    "${SENTINEL_URL}/api/v1/scans/${SCAN_ID}/sensors/${SENSOR_ID}/report?isLastReport=${IS_LAST_REPORT}" \
    -H "Content-Type: application/json" \
    -d "@${REPORT_PATH}" \
    --connect-timeout 30 \
    --max-time 300 \
    -w "%{http_code}" \
    -o sentinel_response.txt)
else
  # Envío multipart/form-data (XML u otros formatos binarios)
  HTTP_STATUS=$(curl -s -X POST \
    "${SENTINEL_URL}/api/v1/scans/${SCAN_ID}/sensors/${SENSOR_ID}/report" \
    -H "Content-Type: multipart/form-data" \
    -F "report=@${REPORT_PATH}" \
    -F "isLastReport=${IS_LAST_REPORT}" \
    --connect-timeout 30 \
    --max-time 300 \
    -w "%{http_code}" \
    -o sentinel_response.txt)
fi

RESPONSE_BODY=$(cat sentinel_response.txt)

echo "HTTP Status: ${HTTP_STATUS}"
echo "Response body:"
echo "${RESPONSE_BODY}"

if [ "${HTTP_STATUS}" -ge 200 ] && [ "${HTTP_STATUS}" -lt 300 ]; then
  echo "Upload OK"
else
  echo "::warning::Sentinel upload FAILED for sensor '${SENSOR_ID}'. HTTP Status: ${HTTP_STATUS}. Response: ${RESPONSE_BODY}"
fi
