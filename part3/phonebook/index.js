const express = require("express");
const app = express();
const PORT = 3000;
const cors = require("cors");
require("dotenv").config();
app.use(cors());
const People = require("./models/people");
const mongoose = require("mongoose");

app.use(express.json()); //useful if you're working with req.body obj

// let data = [
//   {
//     id: 1,
//     name: "Arto Hellas",
//     number: "040-123456",
//   },
//   {
//     id: 2,
//     name: "Ada Lovelace",
//     number: "39-44-5323523",
//   },
//   {
//     id: 3,
//     name: "Dan Abramov",
//     number: "12-43-234345",
//   },
//   {
//     id: 4,
//     name: "Mary Poppendieck",
//     number: "39-23-6423122",
//   },
// ];

mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.MONGODB_URL)
  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

app.get("/", (req, res) => {
  res.send("Hello World");
});

// fetches every person
app.get("/api/persons", async (req, res) => {
  const persons = await People.find({});
  res.status(200).json(persons);
});

//  add a new person
app.post("/api/persons", (req, res) => {
  // error handling
  if (!req.body.name) {
    return res.status(400).json({ error: "name missing" });
  }
  if (!req.body.number) {
    return res.status(400).json({ error: "number missing" });
  }
  let duplicate = data.find((person) => person.name === req.body.name);
  if (duplicate) {
    return res.status(400).json({ error: "name already exists" });
  }

  const newPerson = {
    id: Math.max(...data.map((p) => p.id)) + 1,
    name: req.body.name,
    number: req.body.number,
  };
  data.push(newPerson);
  res.status(201).json(newPerson);
});

// fetch a single person
app.get("/api/:id", (req, res) => {
  const person = data.find((p) => p.id === Number(req.params.id));
  if (person) {
    res.status(200).json(person);
  } else {
    res.status(404).json({ error: "Person not found" });
  }
});

// deletes a person
app.delete("/api/:id", (req, res) => {
  data = data.filter((p) => p.id !== Number(req.params.id));
  res.status(204).end();
});

app.get("/info", (req, res) => {
  res.setHeader("Content-Type", "text/html");
  res.write(`App has info for ${data.length} people`);
  res.write(`</br>`);
  res.write(`${new Date()}`);
  res.end();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

module.exports = app;
