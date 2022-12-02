import * as core from "@actions/core";

import {
  exists,
  getContentFromJson,
  getContentFromUrl,
  getContentFromYaml,
  isWorkspaceEmpty,
  loadFiles,
} from "./utils/file";
import { validate } from "./utils/schema";
import { getInput, getInputAsArray } from "./utils/action";
import { split } from "./utils/array";
import { inputValidations } from "./utils/validations";

async function run(): Promise<void> {
  try {
    if (isWorkspaceEmpty()) {
      throw new Error(
        "Workspace is empty. Did you forget to run 'actions/checkout' before running this Github Action?"
      );
    }

    const inputJsonSchemaFile = getInput("jsonSchemaFile", { required: true });
    const inputYamlFiles = getInputAsArray("yamlFiles", { required: true });
    const inputFilesSeparator = getInput("filesSeparator", { required: false });

    const isInWorkspace = exists(inputJsonSchemaFile);

    inputValidations(inputJsonSchemaFile, inputYamlFiles);

    const yamlFiles = split(inputYamlFiles, inputFilesSeparator);

    let schemaContentAsJson;

    if (isInWorkspace) {
      schemaContentAsJson = await getContentFromJson(inputJsonSchemaFile);
    } else {
      schemaContentAsJson = await getContentFromUrl(inputJsonSchemaFile);
    }

    const files = loadFiles(yamlFiles);

    core.info(`Found ${files.size} file(s). Checking them:`);

    const validFiles: string[] = [];
    const invalidFiles: string[] = [];

    for (const file of files) {
      core.debug(`Processing: ${file}`);

      const yamlContentAsJson = getContentFromYaml(file);

      const result = validate(schemaContentAsJson, yamlContentAsJson as string);

      if (result.errors.length === 0) {
        core.info(`✅ ${file}`);

        validFiles.push(file);
      } else {
        core.info(`❌ ${file}`);

        invalidFiles.push(file);

        for (const error of result.errors) {
          core.info(`    - ${error.stack}`);
        }
      }
    }

    core.info("Done. All files checked");

    core.setOutput("validFiles", validFiles.join(","));
    core.setOutput("invalidFiles", invalidFiles.join(","));

    if (invalidFiles.length !== 0) {
      throw new Error(`It was found ${invalidFiles.length} invalid file(s)`);
    }
  } catch (error: unknown) {
    const message = (error as Error)?.message;

    core.setFailed(message);
  }
}

run();
