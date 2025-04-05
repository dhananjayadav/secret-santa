const express = require("express");
const secretSantaRouter = require("./secretSantaRoutes");

const indexRouter = express.Router();

indexRouter.use("/secret-santa", secretSantaRouter);

module.exports = indexRouter;