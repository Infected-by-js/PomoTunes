module.exports = {
  plugins: [require('@trivago/prettier-plugin-sort-imports')],
  singleQuote: true,
  bracketSpacing: false,
  printWidth: 95,
  trailingComma: 'es5',
  endOfLine: 'lf',
  tabWidth: 2,
  semi: true,

  importOrder: [
    '^react$',
    '^@react(.*)$',
    '<THIRD_PARTY_MODULES>',

    '^@/contexts(.*)$',
    '^@/pages(.*)$',
    '^@/features(.*)$',
    '^@/shared(.*)$',

    '^../(.*)$',
    '^./(.*)$',
  ],
  importOrderSortSpecifiers: true,
};
