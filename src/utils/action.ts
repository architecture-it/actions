import * as core from "@actions/core";

export function getInputAsArray(name: string, options: core.InputOptions): string[] {
  return core
    .getInput(name, options)
    .split("\n")
    .map((s) => s.trim())
    .filter((x) => x !== "");
}

export function getInput(name: string, options: core.InputOptions): string {
  let input = core.getInput(name, options);

  if (input) {
    input = input.trim();
  }

  return input;
}
