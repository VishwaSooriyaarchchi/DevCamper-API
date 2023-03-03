const express = require("express");
const dotenv = require("dotenv");
const logger = require("./middleware/logger");
const errorHandler = require("./middleware/error");
const connectDB = require("./config/db");
const colors = require("colors");

//load env vars
dotenv.config({ path: "./config/config.env" });

//Connect to database
connectDB();

//Routes files
const bootcamps = require("./routes/bootcamps");
const morgan = require("morgan");

const app = express();

//Body Parser
app.use(express.json());

//dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//Mount routers
app.use("/api/v1/bootcamps", bootcamps);

//error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);

// hanlde unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red.bold);
  //  close sever & exit process
  server.close(() => process.exit(1));
});
