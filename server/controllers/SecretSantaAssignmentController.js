const BadRequestError = require('../errors/BadRequestError');
const SecretSantaService = require('../services/SecretSantaService');
const FILE_MIME_TYPES = require("../utils/constants/fileMimeTypes");
const convertXlsxToCsv = require('../utils/convertXlsxToCsv');

const MAX_FILE_SIZE = 20 * 1024 * 1024;

const isValidMimeType = (file) =>
  file.mimetype === FILE_MIME_TYPES.CSV || file.mimetype === FILE_MIME_TYPES.XLSX;

class SecretSantaAssignmentController {
  static assignSanta(req, res, next) {
    try {
      let employeeFile = req.files['employees'];
      let lastYearFile = req.files['lastYear'];

      if(!employeeFile || !lastYearFile) {
        throw new BadRequestError("employee csv and lastYear CSV file is required");
      }

      if (!isValidMimeType(employeeFile) || !isValidMimeType(lastYearFile)) {
        throw new BadRequestError("Invalid file format, should be CSV or XLSX.");
      }

      if (employeeFile.size > MAX_FILE_SIZE || lastYearFile.size > MAX_FILE_SIZE) {
        throw new BadRequestError("Files should not be more than 20 MB.");
      }

      const employeesCSV = employeeFile.mimetype === FILE_MIME_TYPES.XLSX
        ? convertXlsxToCsv(employeeFile.data)
        : employeeFile.data.toString('utf8');

      const lastYearCSV = lastYearFile.mimetype === FILE_MIME_TYPES.XLSX
        ? convertXlsxToCsv(lastYearFile.data)
        : lastYearFile.data.toString('utf8');

      const outputCSV = SecretSantaService.assign(employeesCSV, lastYearCSV);
      res.setHeader('Content-Disposition', 'attachment; filename=assignments.csv');
      res.setHeader('Content-Type', 'text/csv');
      res.send(outputCSV);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = SecretSantaAssignmentController;