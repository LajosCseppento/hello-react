module.exports = {
  ...require('gts/.prettierrc.json'),
  plugins: [require('@trivago/prettier-plugin-sort-imports')],
  importOrder: ['^@app/(.*)$', '^[./]'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};
