module.exports = {
  bracketSpacing: true,
  singleQuote: true,
  jsxBracketSameLine: false,
  trailingComma: "all",
  printWidth: 80,
  endOfLine: "lf",
  overrides: [
    {
      files: ["*.{md,yml,yaml}"],
      options: {
        printWidth: 100,
        proseWrap: "always",
      },
    },
  ],
};
