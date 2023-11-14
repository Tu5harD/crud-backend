const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();
const PORT = process.env.DATABASE || 3001;

dotenv.config({ path: "./config.env" });

const mongoose = require("mongoose");

const URL = process.env.DATABASE;

mongoose
  .connect(URL)
  .then(console.log("Connection is succesful"))
  .catch((error) => console.log(error));

const UserData = require("./src/modules/users");

app.use(cors());
app.use(express.json());



// UserData.create({
//   name:"Vishal Dukane",
//   email: "vish@gmai.com"
// });


app.get("/get", async (req, res) => {
  try {
    const userData = await UserData.find();
    console.log("Fetched data:", userData);
    res.json(userData);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Error fetching users" });
  }
});


app.post("/create", async (req, res) => {
  try {
    const userData = await UserData.create(req.body);
    res.json(userData);
    console.log(userData);
  } catch (error) {
    console.log("Error found in adding ", error);
  }
});

// app.delete("/delete/:id", async (req, res) => {
//   try {
//     const id = req.params.id;
//     const userData = await UserData.findByIdAndDelete({ _id: id });
//     res.json(userData);
//     console.log(userData);
//   } catch (error) {
//     console.log("Error found in adding ", error);
//   }
// });
app.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const userData = await UserData.findByIdAndDelete({ _id: id });
    res.json(userData);
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Error deleting user" });
  }
});
app.listen(PORT, () => {
  console.log(`Connection is succesful at port ${PORT}`);
});
