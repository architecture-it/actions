import os from "os";
import process from "process";

import { getWorkspacePath } from "../../src/utils/file";

test("should return a valid workspace path", async () => {
  const tempDir = os.tmpdir();

  process.env["GITHUB_WORKSPACE"] = tempDir;

  expect(getWorkspacePath()).toBe(tempDir);
});
