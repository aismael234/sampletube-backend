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

// app.use(
//   cors({
//     origin: "http://sample.tube",
//   })
// );

// Set up a whitelist and check against it:
var whitelist = [
  "http://sample.tube",
  "http://www.sample.tube",
  "http://sampletube.netlify.app",
];
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};
// Then pass them to cors:
app.use(cors(corsOptions));

// app.use((req, res, next) => {
//     const allowedOrigins = ['http://sample.tube', 'http://sampletube.netlify.app'];
//     const origin = req.headers.origin;
//     if (allowedOrigins.includes(origin)) {
//          res.setHeader('Access-Control-Allow-Origin', origin);
//     }
//     //res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:5173');
//     res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
//     res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//     res.header('Access-Control-Allow-Credentials', true);
//     return next();
//   });

app.use("/api/videos", require("./routes/videoRoutes"));

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
