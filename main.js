const { json } = require("body-parser");
const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const port = 3000;
app.use(express.json());

//1.
app.post("/user", (req, res, next) => {
  console.log(req.body);
  fs.readFile(path.resolve("./users.json"), (err, data) => {
    if (err) {
      res.status(404).json({ message: "error reading file " });
    }

    const jsonData = JSON.parse(data);

    const user = jsonData.find((u) => u.email === req.body.email);
    console.log(user);
    if (!user) {
      jsonData.push(req.body);
      fs.writeFile(
        path.resolve("./users.json"),
        JSON.stringify(jsonData),
        (err) => {
          if (err) {
            return res.status(500).json({ message: "Error writing file" });
          }

          res.status(200).json({ message: "User added successfully" });
        }
      );
    } else {
      res.status(404).json({ message: "email already exists" });
    }
  });
});
//2.
app.patch("/user/:id", (req, res, next) => {
  const id = parseInt(req.params.id);
  console.log(id);
  fs.readFile(path.resolve("./users.json"), (err, data) => {
    if (err) {
      res.status(404).json({ message: "error reading file " });
    }

    const jsonData = JSON.parse(data);
    console.log(jsonData);

    const userIndex = jsonData.findIndex((u) => u.id === id);
    console.log(userIndex);
    if (userIndex !== -1) {
      const updates = req.body;
      jsonData[userIndex] = {
        ...jsonData[userIndex],
        ...updates,
      };
      fs.writeFile(
        path.resolve("./users.json"),
        JSON.stringify(jsonData),
        (err) => {
          if (err) {
            return res.status(500).json({ message: "Error writing file" });
          }

          res.status(200).json({ message: "User updated successfully" });
        }
      );
    } else {
      res.status(404).json({ message: "User ID not found." });
    }
  });
});
//3.
app.delete("/user/:id", (req, res, next) => {
  const id = parseInt(req.params.id);
  console.log(id);
  fs.readFile(path.resolve("./users.json"), (err, data) => {
    if (err) {
      res.status(404).json({ message: "error reading file " });
    }

    const jsonData = JSON.parse(data);
    console.log(jsonData);

    const userIndex = jsonData.findIndex((u) => u.id === id);

    console.log(userIndex);
    if (userIndex !== -1) {
      jsonData.splice(userIndex, 1);
      console.log(jsonData);
      fs.writeFile(
        path.resolve("./users.json"),
        JSON.stringify(jsonData),
        (err) => {
          if (err) {
            return res.status(500).json({ message: "Error writing file" });
          }

          res.status(200).json({ message: "User deleted successfully" });
        }
      );
    } else {
      res.status(404).json({ message: "User ID not found." });
    }
  });
});
// 5.
app.get("/user", (req, res, next) => {
  fs.readFile(path.resolve("./users.json"), (err, data) => {
    const parsedData = JSON.parse(data);
    console.log(parsedData);
    res.json({ message: "Done", users: parsedData });
  });
});

//4.
app.get("/user/getByName", (req, res, next) => {
  const { name } = req.query;
  console.log(name);

  fs.readFile(path.resolve("./users.json"), (err, data) => {
    const parsedData = JSON.parse(data);
    console.log(parsedData);
    const user = parsedData.find((u) => u.name === name);
    if (user) {
      res.json({ user });
    } else {
      res.status(404).json({ message: "User name not found" });
    }
  });
});
//6.
app.get("/user/filter", (req, res, next) => {
  const { minAge } = req.query;
  const age = +minAge;
  console.log(age);

  fs.readFile(path.resolve("./users.json"), (err, data) => {
    const parsedData = JSON.parse(data);
    console.log(parsedData);
    const result = parsedData.filter((user) => user.age >= age);

    if (result.length) {
      res.json({ message: "Done", users: result });
    } else {
      res.status(404).json({ message: "no user found" });
    }
  });
});

// 7.
app.get("/user/:id", (req, res, next) => {
  const id = parseInt(req.params.id);
  console.log(id);
  fs.readFile(path.resolve("./users.json"), (err, data) => {
    if (err) {
      res.status(404).json({ message: "error reading file " });
    }

    const jsonData = JSON.parse(data);
    console.log(jsonData);

    const user = jsonData.find((u) => u.id === id);

    console.log(user);
    if (user) {
      res.json({ message: "Done", user });
    } else {
      res.status(404).json({ message: "User ID not found." });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
