module.exports = {
  ...require('gts/.prettierrc.json'),
  importOrder: ['^@app/(.*)$', '^[./]'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};
