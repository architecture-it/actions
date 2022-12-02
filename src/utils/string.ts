import * as yaml from "js-yaml";

export function isString(str: unknown) {
  return typeof str === "string" || str instanceof String;
}

export function isBlank(str: string) {
  if (!str) {
    return true;
  }

  if (!isString(str)) {
    return false;
  }

  return str.trim().length === 0;
}

export function parseJson(file: string, content: string) {
  if (isBlank(content)) {
    throw new Error("file content is blank");
  }

  try {
    return JSON.parse(content);
  } catch (ex) {
    throw new Error(`${file} is invalid. Reason: ${ex}`);
  }
}

export function parseYaml(file: string, content: string) {
  if (isBlank(content)) {
    throw new Error("file content is blank");
  }

  try {
    return yaml.load(content);
  } catch (ex) {
    throw new Error(`${file} is invalid. Reason: ${ex}`);
  }
}
