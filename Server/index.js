const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();
const port = 3001;
const cors = require("cors");

app.use(cors());

app.use(bodyParser.json());

app.get("/getUsers", (req, res) => {
  // Read existing users from the file
  const users = JSON.parse(fs.readFileSync("users.json", "utf8"));

  res.json({ users });
});

app.post("/addUser", (req, res) => {
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ error: "Please enter a valid username" });
  }

  // Read existing users from the file
  const users = JSON.parse(fs.readFileSync("users.json", "utf8"));

  //   Check if the username already exists
  if (users.includes(username)) {
    return res.status(400).json({ error: "Username Exists already" });
  }

  // Add the new username
  users.push(username);

  // Write the updated users array back to the file
  fs.writeFileSync("users.json", JSON.stringify(users, null, 2), "utf8");

  res.json({ success: true, message: "User added successfully" });
});

app.delete("/deleteUser", (req, res) => {
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ error: "Please enter a valid username" });
  }

  // Read existing users from the file
  const users = JSON.parse(fs.readFileSync("users.json", "utf8"));

  //   Check if the username already exists
  if (users.includes(username)) {
    users.splice(users.indexOf(username), 1);
  }

  // Add the new username
  // users.push(username);

  // Write the updated users array back to the file
  fs.writeFileSync("users.json", JSON.stringify(users, null, 2), "utf8");

  res.json({ success: true, message: "User deleted successfully" });
});
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
