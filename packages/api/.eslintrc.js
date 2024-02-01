module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:unicorn/recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  plugins: ["import", "unused-imports"],
  env: {
    node: true, // Node.js global variables and Node.js scoping
    es2018: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest", // This sets the parser option
  },
  rules: {
    // This should be enabled when the project compiles fully to ES modules
    "unicorn/prefer-module": "off",

    // Look into this again sometime in future
    "unicorn/consistent-function-scoping": "off",
    "unicorn/no-array-reduce": "off",

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
    "padding-line-between-statements": [
      "error",
      {
        blankLine: "always",
        prev: "*",
        next: "return",
      },
    ],
    "unicorn/prevent-abbreviations": "off",
    "unicorn/switch-case-braces": "off",
    "unicorn/prefer-query-selector": "off",
    "unicorn/no-null": "off",
    "unicorn/prefer-top-level-await": "off",
    "unicorn/no-array-for-each": "off",
    "no-inner-declarations": "off",
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
    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/consistent-type-imports": "error",
    "@typescript-eslint/ban-ts-comment": "off",
    "unused-imports/no-unused-imports": "error",
  },
  overrides: [
    // Config files
    {
      files: ["test-setup/jest.d.ts"],
      rules: {
        "@typescript-eslint/ban-types": "off",
        "@typescript-eslint/consistent-type-imports": "off",
        "import/order": "off",
      },
    },

    // GraphQL gen
    {
      files: [
        "src/graphql/graphql.gen.ts",
        "src/graphql/graphql-client.gen.ts",
      ],
      rules: {
        "@typescript-eslint/ban-types": "off",
        "@typescript-eslint/consistent-type-imports": "off",
        "import/order": "off",
      },
    },
  ],
};
