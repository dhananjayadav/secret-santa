const express = require("express");
const SecretSantaAssignmentController = require("../controllers/SecretSantaAssignmentController");

const secretSantaRouter = express.Router();

secretSantaRouter.post("/assign", SecretSantaAssignmentController.assignSanta);

module.exports = secretSantaRouter;