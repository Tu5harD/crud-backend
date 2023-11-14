const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3001;

require("./src/db/connection");
const UserData = require("./src/modules/users");
app.use(cors());
app.use(express.json());

// addData();
// async function addData() {
//   const newUser = new UserData({
//     name: "Vish Dukane",
//     email: "vish@example.com",
//   });

//   // Save the new user to the database
//   await newUser
//     .save()
//     .then((savedUser) => {
//       console.log("User saved:", savedUser);
//     })
//     .catch((error) => {
//       console.error("Error saving user:", error);
//     });
// }

// app.get("/userdata", function (req, res) {
//   UserData.find()
//     .then((data) => res.json(data))
//     .catch((err) => console.log(err));
// });

app.get("/userdata", async (req, res) => {
  try {
    const userData = await UserData.find();
    res.json(userData);
    console.log(userData);
  } catch (error) {
    console.log("Error found in adding ", error);
  }
});

app.post("/createUser", async (req, res) => {
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
