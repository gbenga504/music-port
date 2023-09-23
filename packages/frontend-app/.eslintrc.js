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
    jsxPragma: "React",
    jsxFragmentName: null,
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
  },
  overrides: [
    // Config files
    {
      files: [
        "webpack.config.js",
        "test-setup/jest-custom-environment.js",
        "tailwind.config.js",
        "test-setup/jest.d.ts",
      ],
      rules: {
        "@typescript-eslint/no-var-requires": "off",
        "@typescript-eslint/consistent-type-imports": "off",
        "no-var": "off",
      },
    },

    // Hooks
    {
      files: "src/app/hooks/*.ts",
      rules: {
        "unicorn/filename-case": [
          "error",
          {
            cases: {
              camelCase: true,
            },
          },
        ],
      },
    },
  ],
};
