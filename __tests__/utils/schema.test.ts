import { validate } from "../../src/utils/schema";
import { parseYaml } from "../../src/utils/string";

test("should be a valid yml", async () => {
  const jsonSchema = {
    type: "object",
    properties: {
      bar: {
        type: "number"
      },
      foo: {
        type: "string"
      }
    }
  };

  const content = `
        bar: 122
        foo: test
    `;

  const contentAsJson = parseYaml("fake.yml", content);

  await expect(validate(jsonSchema, contentAsJson as string).errors.length).toBe(0);
});

test("should be a invalid yml", async () => {
  const jsonSchema = {
    type: "object",
    properties: {
      analytics: {
        type: "boolean"
      }
    }
  };

  const content = "analytics: 122";

  const contentAsJson = parseYaml("fake.yml", content);

  await expect(validate(jsonSchema, contentAsJson as string).errors.length).toBe(1);
});

test("should throw exception when the parameters are invalid ones", async () => {
  const fakeJsonSchema = {};
  const fakeYaml = {};

  // @ts-expect-error
  expect(() => validate(null, null)).toThrow(Error);
  // @ts-expect-error
  expect(() => validate(null, fakeYaml)).toThrow(Error);
  // @ts-expect-error
  expect(() => validate(fakeJsonSchema, null)).toThrow(Error);

  // @ts-expect-error
  expect(() => validate(undefined, undefined)).toThrow(Error);
  // @ts-expect-error
  expect(() => validate(undefined, fakeYaml)).toThrow(Error);
  // @ts-expect-error
  expect(() => validate(fakeJsonSchema, undefined)).toThrow(Error);
});
