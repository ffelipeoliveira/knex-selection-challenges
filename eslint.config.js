import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";



export default defineConfig([
  { files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"], plugins: { js }, extends: ["eslint:recommended", "plugin:react/recommended", "plugin:prettier/recommended"], rules: {"react/react-in-jsx-scope": "off"}},
  { files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"], languageOptions: { globals: globals.browser }, env: {"browser": true, "jest": true}},
  tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
]);
