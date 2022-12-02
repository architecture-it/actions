import * as fs from "fs";
import path from "path";
import process from "process";

import { glob } from "glob";
import * as core from "@actions/core";
import { HttpClient } from "@actions/http-client";

import { parseJson, parseYaml } from "./string";

export function isWorkspaceEmpty() {
  return isEmpty(getWorkspacePath());
}

export function getWorkspacePath() {
  return process.env["GITHUB_WORKSPACE"] || "";
}

export function exists(fileOrPath: fs.PathLike) {
  return fs.existsSync(fileOrPath);
}

export function loadFiles(array: fs.PathLike[]) {
  core.debug("Loading all files");

  const files = new Set<string>();

  for (const el of array) {
    core.debug(`Processing: ${el}`);

    const filePaths = searchFiles(el.toString());

    for (const file of filePaths) {
      core.debug(`Adding file: ${file}`);
      files.add(file);
    }
  }

  return files;
}

export function searchFiles(pattern: string) {
  const options = {
    cwd: getWorkspacePath(),
  };

  return glob.sync(pattern, options);
}

export function isEmpty(pathToValidate: fs.PathLike) {
  if (!exists(pathToValidate)) {
    throw new Error(`${pathToValidate} does not exist`);
  }

  return fs.readdirSync(pathToValidate).length === 0;
}

export function getContent(file: string, encoding: fs.ObjectEncodingOptions["encoding"] = "utf-8") {
  const filePath = path.join(getWorkspacePath(), file);

  return fs.readFileSync(filePath, { encoding });
}

export async function getContentFromUrl(url: string) {
  const client = new HttpClient();

  const { result } = await client.getJson(url);

  return result;
}

export function isValidUrl(url: string) {
  try {
    new URL(url);

    return true;
  } catch {
    return false;
  }
}

export async function getContentFromJson(
  file: string,
  encoding: fs.ObjectEncodingOptions["encoding"] = "utf-8"
) {
  let content: string | Buffer = "";

  content = getContent(file, encoding);

  return parseJson(file, content.toString());
}

export function getContentFromYaml(
  file: string,
  encoding: fs.ObjectEncodingOptions["encoding"] = "utf-8"
) {
  const content = getContent(file, encoding);

  return parseYaml(file, content.toString());
}
