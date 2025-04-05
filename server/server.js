const express = require("express");
const indexRouter = require("./routes");
const errorHandler = require("./middlewares/errorHandler");

const app = express();
const PORT = 9000;

app.use(cors());
app.use(fileUpload());

app.use("/api", indexRouter);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`);
})