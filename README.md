# Configuración inicial de Copilot en la nube

Es un ejemplo de uso de la acción de configuración de Copilot en la nube. Para usarlo, simplemente crea un nuevo workflow en tu repositorio con el siguiente contenido:

```yaml
name: "Copilot Setup Steps"

on:
  workflow_dispatch:

jobs:
  # The job MUST be called `copilot-setup-steps` or it will not be picked up by Copilot.
  copilot-setup-steps:
    runs-on: ubuntu-latest
    permissions:
      contents: read

    steps:
      - name: Checkout code
        uses: actions/checkout@v5

      - name: Setup Copilot
        uses: architecture-it/actions@copilot-setup
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          workflow: ${{ vars.WORKFLOW_CI }}
          github_username: ${{ secrets.GITHUB_USERNAME }}

```