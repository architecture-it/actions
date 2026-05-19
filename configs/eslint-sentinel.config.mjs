import path from "node:path";
import { fileURLToPath } from "node:url";

import { fixupConfigRules, fixupPluginRules } from "@eslint/compat";
import prettier from "eslint-plugin-prettier";
import _import from "eslint-plugin-import";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import globals from "globals";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";
import jest from "eslint-plugin-jest";

const ignores = [
  "**/node_modules",
  "**/storybook-static",
  "**/dist",
  "**/.next",
  "**/coverage",
  "**/build",
  "**/public",
  "**/__snapshots__",
];

const basicRules = {
  "import/order": [
    "warn",
    {
      "newlines-between": "always",
    },
  ],
  quotes: "off",
  semi: ["error", "always"],
  "no-restricted-syntax": [
    "warn",
    {
      selector:
        "CallExpression[callee.object.name='console'][callee.property.name=/^(log|warn|error|info|trace)$/]",
      message: "Prefer using the standard logger from '@architecture-it/core/logger'",
    },
  ],
  "prettier/prettier": [
    "error",
    {
      singleQuote: false,
      trailingComma: "all",
      semi: true,
      tabWidth: 2,
      printWidth: 100,
      bracketSpacing: true,
      arrowParens: "always",
      endOfLine: "auto",
    },
  ],
  "no-unused-vars": [
    "warn",
    {
      args: "after-used",
      ignoreRestSiblings: true,
      argsIgnorePattern: "^_",
      varsIgnorePattern: "^_",
    },
  ],
  "padding-line-between-statements": [
    "error",
    {
      blankLine: "always",
      prev: "*",
      next: "return",
    },
    {
      blankLine: "always",
      prev: ["const", "let", "var"],
      next: "*",
    },
    {
      blankLine: "any",
      prev: ["const", "let", "var"],
      next: ["const", "let", "var"],
    },
  ],
  "no-debugger": "warn",
};

const tsRules = {
  "no-unused-vars": "off",
  "@typescript-eslint/no-empty-object-type": [
    "error",
    {
      allowInterfaces: "always",
    },
  ],
  "@typescript-eslint/no-explicit-any": [
    "warn",
    {
      fixToUnknown: true,
      ignoreRestArgs: true,
    },
  ],
  "@typescript-eslint/no-unused-vars": [
    "warn",
    {
      args: "all",
      argsIgnorePattern: "^_",
      caughtErrors: "all",
      caughtErrorsIgnorePattern: "^_",
      destructuredArrayIgnorePattern: "^_",
      varsIgnorePattern: "^_",
      ignoreRestSiblings: true,
    },
  ],
  "no-unused-expressions": "off",
  "@typescript-eslint/no-unused-expressions": [
    "warn",
    {
      allowShortCircuit: true,
    },
  ],
  "@typescript-eslint/no-require-imports": "warn",
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

/**
 * @type {import("eslint").Linter.Config[]}
 */
export default [
  {
    ignores: ignores,
  },
  {
    files: ["*.test.ts", "*.test.tsx", "*.spec.ts", "*.spec.tsx", "*.test.js", "*.spec.js"],
    ...jest.configs["flat/all"],
    ignores: ignores,
  },
  ...fixupConfigRules(
    compat.extends("plugin:prettier/recommended", "plugin:@typescript-eslint/recommended"),
  ),
  {
    plugins: {
      prettier: fixupPluginRules(prettier),
      import: fixupPluginRules(_import),
      "@typescript-eslint": fixupPluginRules(typescriptEslint),
    },
    ignores: ignores,

    languageOptions: {
      globals: {
        ...globals.browser,
      },

      parser: tsParser,
      ecmaVersion: "latest",
      sourceType: "module",

      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },

    rules: {
      ...basicRules,
      ...tsRules,
    },
  },
];
