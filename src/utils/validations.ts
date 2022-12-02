import { exists, isValidUrl } from "./file";
import { isBlank } from "./string";

export function inputValidations(inputJsonSchemaFile: string, inputYamlFiles: string[]) {
  const isInWorkspace = exists(inputJsonSchemaFile);
  const isValidUri = isValidUrl(inputJsonSchemaFile);

  if (isBlank(inputJsonSchemaFile)) {
    throw new Error("The 'jsonSchemaFile' parameter should not be blank");
  }

  if (!isInWorkspace && !isValidUri) {
    throw new Error(`${inputJsonSchemaFile} could not be found in workspace or http valid url`);
  }

  if (isBlank(inputYamlFiles.join())) {
    throw new Error("The 'yamlFiles' parameter should not be blank");
  }
}
