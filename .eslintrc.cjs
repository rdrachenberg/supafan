/** @type {import("eslint").Linter.Config} */
const config = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
  plugins: ["@typescript-eslint"],
  extends: [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended-type-checked",
    "plugin:@typescript-eslint/stylistic-type-checked",
  ],
  rules: {
    "@typescript-eslint/no-non-null-asserted-optional-chain": "off",
    "@typescript-eslint/no-unsafe-argument": "off",
    "@typescript-eslint/await-thenable": "off",
    "@typescript-eslint/no-empty-interface" : "off",
    "@typescript-eslint/consistent-type-definitions" : "off",
    "@typescript-eslint/no-misused-promises": "off",
    "@typescript-eslint/no-unsafe-member-access": "off",
    "@typescript-esling/no-explicit-any": "off",
    "@typescript-eslint/non-nullable-type-assertion-style": "off",
    "@next/next/no-img-element": "off",
    "@typescript-eslint/no-redundant-type-constituents": "off",
    // These opinionated rules are enabled in stylistic-type-checked above.
    // Feel free to reconfigure them to your own preference.
  },
};

module.exports = config;
