const BadRequestError = require('../errors/BadRequestError');
const Employee = require('../models/Employee');
const { parseCSV, generateCSV } = require('../utils/CSVUtil');
const shuffle = require('../utils/shuffle');

class SecretSantaService {
  static assign(employeesCSV, lastYearCSV) {
    const employeesRaw = parseCSV(employeesCSV);
    const lastYearRaw = parseCSV(lastYearCSV);

    employeesRaw.forEach((e, i) => {
      if (!e.Employee_Name || !e.Employee_EmailID) {
        throw new BadRequestError(`Missing fields in employees.csv at row ${i + 1}`);
      }
    });

    lastYearRaw.forEach((row, i) => {
      if (!row.Employee_EmailID || !row.Secret_Child_EmailID) {
        throw new BadRequestError(`Missing fields in lastYear.csv at row ${i + 1}`);
      }
    });

    const employees = employeesRaw.map(e => new Employee(e.Employee_Name, e.Employee_EmailID));
    const lastYearMap = Object.fromEntries(
      lastYearRaw.map(row => [row.Employee_EmailID, row.Secret_Child_EmailID])
    );

    const givers = [...employees];
    const receivers = shuffle([...employees]);

    for (let attempts = 0; attempts < 1000; attempts++) {
      let isValid = true;
      const assignments = [];

      for (let i = 0; i < givers.length; i++) {
        const giver = givers[i];
        const receiver = receivers[i];

        if (
          giver.email === receiver.email ||
          lastYearMap[giver.email] === receiver.email
        ) {
          isValid = false;
          shuffle(receivers);
          break;
        }

        assignments.push({
          Employee_Name: giver.name,
          Employee_EmailID: giver.email,
          Secret_Child_Name: receiver.name,
          Secret_Child_EmailID: receiver.email
        });
      }

      if (isValid) {
        return generateCSV(assignments);
      }
    }

    throw new BadRequestError('Could not generate a valid Secret Santa assignment.');
  }
}

module.exports = SecretSantaService;
