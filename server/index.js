require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const userRoutes = require("./routes/users");
const jobsRoutes = require("./routes/jobs");
const authRoutes = require("./routes/auth");

// database connection
connection();

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.use("/api/users", userRoutes);
app.use("/api/jobs", jobsRoutes);
app.use("/api/auth", authRoutes);

const port = process.env.PORT || 10000;
app.listen(port, console.log(`Listening on port ${port}...`));
