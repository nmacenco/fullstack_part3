const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const app = express();
const Person = require("./person");
const generateId = require("./utils/index");

// Middlewares

app.use(express.json());
app.use(express.static("dist"));

morgan.token("body", (req) => {
  return JSON.stringify(req.body);
});
app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms - body: :body"
  )
);

app.use(cors());

app.get("/api/persons", (request, response) => {
  Person.find({}).then((result) => {
    response.json(result);
  });
});

app.get("/info", async (request, response) => {
  const personsCount = await Person.countDocuments({});

  response.send(
    "Phonebook has info for " + personsCount + " people<br>" + new Date()
  );
});

app.get("/api/persons/:id", (request, response, next) => {
  const id = request.params.id;
  Person.findById(id)
    .then((note) => {
      if (!note) {
        return response.status(404).json({ error: "Person not found" }).end();
      }
      return response.json(note);
    })
    .catch((error) => next(error));
});

app.post("/api/persons", async (request, response) => {
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

  const existingPerson = await Person.findOne({ name });
  if (existingPerson) {
    return response.status(400).send({ error: "name must be unique" });
  } else {
    Person.create(person).then((result) => {
      response.json(result);
    });
  }
});

app.put("/api/persons/:id", (request, response, next) => {
  const { name, number } = request.body;

  const person = {
    name,
    number,
  };

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then((updatedPerson) => {
      response.json(updatedPerson);
    })
    .catch((error) => next(error));
});

app.delete("/api/persons/:id", (request, response, next) => {
  const id = request.params.id;

  Person.findByIdAndDelete(id)
    .then((result) => {
      if (!result) {
        return response.status(404).json({ error: "Person not found" }).end();
      }
      response.status(204).end();
    })
    .catch((error) => next(error));
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }

  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
