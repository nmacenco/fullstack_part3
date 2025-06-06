const express = require("express");
const app = express();

let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

// Middleware

/**
 * Generates a unique 16-digit ID using Math.random()
 * @returns {string} A 16-digit unique ID
 */
function generateId() {
  // Generate a large random number (16 digits)
  // Using Math.random() * 10^16 to get a number between 0 and 10^16
  // Then converting to string and padding with zeros if needed
  return (Math.random() * Math.pow(10, 16)).toString().padStart(16, "0");
}

app.use(express.json());

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/info", (request, response) => {
  response.send(
    "Phonebook has info for " + persons.length + " people<br>" + new Date()
  );
});

app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const person = persons.find((person) => person.id === id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.post("/api/persons", (request, response) => {
  const { name, number } = request.body;

  if (!name || !number) {
    return response.status(400).send({ error: "name or number missing" });
  }
  const id = generateId();
  const person = {
    id: id,
    name,
    number,
  };

  const existingPerson = persons.find((p) => p.name === name);
  if (existingPerson) {
    return response.status(400).send({ error: "name must be unique" });
  } else {
    persons = persons.concat(person);
    response.json(person);
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const person = persons.find((person) => person.id === id);
  console.log("person", person);

  if (!person) {
    return response.status(404).json({ error: "Person not found" });
  } else {
    persons = persons.filter((person) => person.id !== id);
    response.status(204).end();
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
