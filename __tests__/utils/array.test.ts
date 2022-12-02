import { split, splitFromString } from "../../src/utils/array";

test("should split the string correctly", async () => {
  await expect(splitFromString("")).toEqual([]);
  await expect(splitFromString("a")).toEqual(["a"]);
  await expect(splitFromString("a,,c")).toEqual(["a", "c"]);
  await expect(splitFromString("a,b,c")).toEqual(["a", "b", "c"]);
});

test("should split the array correctly", async () => {
  await expect(split(["a,b", "c"])).toEqual(["a", "b", "c"]);
  await expect(split(["a,b", "", "d"])).toEqual(["a", "b", "d"]);
});
