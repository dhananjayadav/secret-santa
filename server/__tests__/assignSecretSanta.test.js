const request = require("supertest");
const app = require("../server");
const path = require("path");

describe("POST /api/assignments", () => {
  it("should return a CSV file with valid assignments", async () => {
    const response = await request(app)
      .post("/api/secret-santa/assign")
      .attach("employees", path.join(__dirname, "mocks", "employees.csv"))
      .attach("lastYear", path.join(__dirname, "mocks", "lastYear.csv"));

    expect(response.status).toBe(200);
    expect(response.headers["content-type"]).toBe("text/csv; charset=utf-8");
    expect(response.headers["content-disposition"]).toContain(
      "filename=assignments.csv"
    );
    expect(response.text).toContain(
      "Employee_Name,Employee_EmailID,Secret_Child_Name,Secret_Child_EmailID"
    );
  });

  it("should return 400 for missing files", async () => {
    const response = await request(app).post("/api/secret-santa/assign");
    expect(response.status).toBe(400);
  });

  it("should return 400 for invalid file format", async () => {
    const response = await request(app)
      .post("/api/assignments")
      .attach("employees", path.join(__dirname, "mocks", "employees.csv"))
      .attach("lastYear", path.join(__dirname, "mocks", "invalidLastYear.csv"));

    expect(response.status).toBe(400);
  });

  it("should return error if required fields are missing in CSV", async () => {
    const response = await request(app)
      .post("/api/assignments")
      .attach(
        "employees",
        path.join(__dirname, "mocks", "invalidEmployees.csv")
      )
      .attach("lastYear", path.join(__dirname, "mocks", "lastYear.csv"));

    expect(response.status).toBe(400);
  });
});
