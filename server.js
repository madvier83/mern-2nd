require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected To Database"));

app.use(express.json());

const studentsRouter = require("./routes/students.js");
app.use("/students", studentsRouter);

app.listen(3000, () => console.log("Server Started"));
