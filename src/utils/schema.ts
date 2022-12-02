import { type Schema, Validator } from "jsonschema";

export const SCHEMA_AS_JSON_REQUIRED = "schemaContentAsJson is required";
export const YAML_CONTENT_REQUIRED = "yamlContentAsJson is required";

export function validate(schemaContentAsJson: Schema, yamlContentAsJson: string) {
  if (!schemaContentAsJson) {
    throw new Error(SCHEMA_AS_JSON_REQUIRED);
  }

  if (!yamlContentAsJson) {
    throw new Error(YAML_CONTENT_REQUIRED);
  }

  return new Validator().validate(yamlContentAsJson, schemaContentAsJson);
}
