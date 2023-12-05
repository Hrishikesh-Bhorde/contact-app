const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const connectDB = require("./config/dbConnection");
const dotenv = require("dotenv").config();

const app = express();

app.set("view engine", "ejs");

const port = process.env.PORT || 5000;

connectDB();

app.use(express.json()); // a express provided middleware to parse JSON body req.

app.use(errorHandler); // A custom made middleware to show errors in JSON format

app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

app.listen(port, () => {
  console.log(`Server running on Port : ${port}`);
});
