// https://docs.expo.dev/guides/using-eslint/
module.exports = {
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "expo",
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: { project: ["./tsconfig.json"] },
    plugins: ["@typescript-eslint"],
    rules: {
        "consistent-return": 2,
    },
    ignorePatterns: ["babel.config.js", ".eslintrc.js"],
};
