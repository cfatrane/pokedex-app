// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: [
    "expo",
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    // "plugin:react-native/recommended",
    "plugin:prettier/recommended",
  ],
  plugins: ["react", "react-native", "prettier"],
  rules: {
    // C
    camelcase: "warn",
    "capitalized-comments": "off",
    // D
    "default-param-last": ["error"],
    // E
    eqeqeq: "error",
    // I
    "import/order": [
      2,
      {
        groups: [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
          "type",
        ],
        "newlines-between": "always",
        pathGroups: [
          {
            pattern: "react",
            group: "builtin",
            position: "before",
          },
          {
            pattern: "api/**",
            group: "internal",
            position: "before",
          },
          {
            pattern: "@/assets/**",
            group: "internal",
            position: "before",
          },

          {
            pattern: "@/components/**",
            group: "internal",
            position: "before",
          },
          {
            pattern: "@/constants/**",
            group: "internal",
            position: "before",
          },
          {
            pattern: "@/helpers/**",
            group: "internal",
            position: "before",
          },
          {
            pattern: "@/navigation",
            group: "internal",
            position: "before",
          },
          {
            pattern: "@/redux/**",
            group: "internal",
            position: "before",
          },
          {
            pattern: "@/screens/**",
            group: "internal",
            position: "before",
          },
          {
            pattern: "@/type/**",
            group: "internal",
            position: "before",
          },
          {
            pattern: "@/utils/**",
            group: "internal",
            position: "before",
          },
        ],
        distinctGroup: true,
        pathGroupsExcludedImportTypes: ["react", "react-native", "expo"],
        alphabetize: {
          order:
            "asc" /* sort in ascending order. Options: ['ignore', 'asc', 'desc'] */,
          caseInsensitive: true /* ignore case. Options: [true, false] */,
        },
      },
    ],
    // N
    "no-console": ["warn", { allow: ["error"] }],
    // "no-relative-import-paths/no-relative-import-paths": [
    //   "warn",
    //   { allowSameFolder: true, rootDir: "./" },
    // ],
    // P
    "padding-line-between-statements": [
      "error",
      { blankLine: "always", prev: "*", next: "return" },
      { blankLine: "always", prev: "*", next: "function" },
      { blankLine: "always", prev: "*", next: "block-like" },

      { blankLine: "always", prev: ["import"], next: "*" },
      {
        blankLine: "any",
        prev: ["import"],
        next: ["import"],
      },
      { blankLine: "always", prev: ["const", "let", "var"], next: "*" },
      {
        blankLine: "any",
        prev: ["const", "let", "var"],
        next: ["const", "let", "var"],
      },
    ],
    "prefer-const": "error",
    "prefer-object-spread": "warn",
    // R
    "require-await": "error",
    // S
    // "sort-keys": ["warn", "asc"],
    "sort-vars": "error",
    // "sort-imports": ["off"],

    // React
    "react/jsx-newline": 1,
    "react/jsx-no-useless-fragment": [2, { allowExpressions: true }],
    "react/jsx-sort-props": [1, { ignoreCase: true }],
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off",

    // React Native
    // "react-native/no-unused-styles": 2,
    // "react-native/split-platform-components": 2,
    // "react-native/no-inline-styles": 2,
    // "react-native/no-color-literals": 2,
    // "react-native/no-raw-text": 2,
    // "react-native/no-single-element-style-arrays": 2,
  },
};
