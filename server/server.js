const express = require("express");
const indexRouter = require("./routes");

const app = express();
const PORT = 9000;

app.use(cors());
app.use(fileUpload());

app.use("/api", indexRouter);

app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`);
})