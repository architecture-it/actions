import { getInput, getInputAsArray } from "../../src/utils/action";

function getInputName(name: string) {
  return `INPUT_${name.replace(/ /g, "_").toUpperCase()}`;
}

export function setInput(name: string, value: any) {
  process.env[getInputName(name)] = value;
}

test("should return a input trimmed", () => {
  setInput("jsonSchemaFile", " fake_file.xml ");

  expect(getInput("jsonSchemaFile", { required: true })).toBe("fake_file.xml");
});

test("should return a list of inputs", () => {
  setInput(
    "jsonSchemaFile",
    `
        a
        b
        c
    `
  );

  const output = getInputAsArray("jsonSchemaFile", { required: true });

  expect(output).toEqual(["a", "b", "c"]);
});
