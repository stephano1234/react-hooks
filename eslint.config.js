import { includeIgnoreFile } from "@eslint/compat";
import js from "@eslint/js";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";
import { fileURLToPath } from "node:url";
import tseslint from "typescript-eslint";

const gitignorePath = fileURLToPath(new URL(".gitignore", import.meta.url));

export default tseslint.config(includeIgnoreFile(gitignorePath), {
  extends: [js.configs.recommended, ...tseslint.configs.recommended],
  files: ["**/*.{ts,tsx}"],
  languageOptions: {
    ecmaVersion: 2020,
    globals: globals.browser,
  },
  plugins: {
    "react-hooks": reactHooks,
    "react-refresh": reactRefresh,
  },
  rules: {
    ...reactHooks.configs.recommended.rules,
    "react-refresh/only-export-components": [
      "error",
      { allowConstantExport: true },
    ],
    "react-hooks/exhaustive-deps": "error",
    "array-callback-return": ["error", { checkForEach: true, allowVoid: true }],
    "no-duplicate-imports": ["error", { includeExports: true }],
    "no-promise-executor-return": ["error", { allowVoid: true }],
    "no-self-compare": "error",
    "no-useless-assignment": "error",
    "require-atomic-updates": "error",
    camelcase: "error",
    complexity: "error",
    "consistent-return": ["error", { treatUndefinedAsUnspecified: true }],
    curly: "error",
    "default-case": "error",
    "default-case-last": "error",
    "default-param-last": "error",
    "dot-notation": "error",
    eqeqeq: "error",
    "max-params": ["error", 3],
    "new-cap": "error",
    "no-case-declarations": "error",
    "no-console": "error",
    "no-implicit-coercion": "error",
  },
});
