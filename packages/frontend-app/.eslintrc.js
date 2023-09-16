module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:unicorn/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
  ],
  plugins: ["import", "react"],
  env: {
    browser: true, // browser global variables
    node: true, // Node.js global variables and Node.js scoping
    es2018: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest", // This sets the parser option
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    // This should be enabled when the project compiles fully to ES modules
    "unicorn/prefer-module": "off",

    // Look into this again sometime in future
    "unicorn/consistent-function-scoping": "off",

    "import/order": [
      "error",
      {
        groups: [
          "builtin",
          "external",
          "internal",
          "sibling",
          "parent",
          "index",
          "object",
          "type",
        ],
        "newlines-between": "always",
        alphabetize: {
          order: "asc",
        },
      },
    ],
    "unicorn/prevent-abbreviations": "off",
    "unicorn/switch-case-braces": "off",
    "unicorn/prefer-query-selector": "off",
    "unicorn/filename-case": [
      "error",
      {
        cases: {
          kebabCase: true,
          pascalCase: true,
        },
      },
    ],
    "@typescript-eslint/no-explicit-any": "off",
  },
};
