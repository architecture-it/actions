export function splitFromString(str: string, separator = ",") {
  return str
    .split(separator)
    .map((s) => s.trim())
    .filter((x) => x !== "");
}

export function split(array: string[], separator = ",") {
  let result: string[] = [];

  for (const e of array) {
    result = [...result, ...splitFromString(e, separator)];
  }

  return result;
}
