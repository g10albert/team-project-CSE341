const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const routes = require("./routes");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8080;

// Initialize Database Connection
connectDB();

// Core Application Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Primary Global Root Router
app.use("/", routes);

app.listen(PORT, () => {
  console.log(`Server actively responsive and spinning on port: ${PORT}`);
});
