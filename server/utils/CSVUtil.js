const papaParse = require('papaparse');

function parseCSV(csvString) {
  return papaParse.parse(csvString, {
    header: true,
    skipEmptyLines: true
  }).data;
}

function generateCSV(data) {
  return papaParse.unparse(data);
}


module.exports = { parseCSV, generateCSV };