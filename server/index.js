const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");
const todoRoutes = require("./routes/todoRoutes");

const app = express();

dotenv.config();
app.use(cors());
app.use(bodyParser.json());

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("mongodb connected successfully"))
  .catch((err) => console.log("mongodb error : ", err));

app.use("/users", userRoutes);

app.use("/todos", todoRoutes);

app.listen(process.env.PORT, () =>
  console.log(`server running at PORT : ${process.env.PORT}`)
);
