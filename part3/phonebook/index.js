const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json()); //useful if you're working with req.body obj

const data = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/", (req, res) => {
  res.send("Hello World");
});

// fetches every person
app.get("/api/persons", (req, res) => {
  res.status(200).json(data);
});

// fetch a single person
app.get("/api/:id", (req, res) => {
  const person = data.find((p) => p.id === Number(req.params.id));
  if (person){
      res.status(200).json(person)
  }else{
    res.status(404).json({"error": "Person not found"})
  }
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
