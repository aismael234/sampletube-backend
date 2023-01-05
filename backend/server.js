const express = require("express");
const cors = require("cors");
const colors = require("colors");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  cors({
    origin: "http://127.0.0.1:5173",
  })
);

app.use("/api/videos", require("./routes/videoRoutes"));

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
