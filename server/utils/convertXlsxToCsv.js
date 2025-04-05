const XLSX = require('xlsx');

function convertXlsxToCsv(xlsxInput) {
  const workbook = typeof xlsxInput === 'string'
    ? XLSX.readFile(xlsxInput)
    : XLSX.read(xlsxInput, { type: 'buffer' });

  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];

  const csv = XLSX.utils.sheet_to_csv(sheet, { blankrows: false });
  return csv;
}

module.exports = convertXlsxToCsv;