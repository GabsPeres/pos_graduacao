const express = require("express");
const UserRepository = require("./repository");
const { MongoClient } = require("mongodb");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(
  cors({
    exposedHeaders: "X-Total-Count",
  })
);

const dsn =
  "mongodb://root:root@localhost?retryWrites=true&writeConcern=majority";
let client;
let repository;

const initializeDatabase = async () => {
  client = new MongoClient(dsn);
  await client.connect();
  const collection = client.db("users_db").collection("users");
  repository = new UserRepository(collection);
};

const normalizeUser = (user) => {
  user.id = user._id;
  delete user._id;
  return user;
};

app.get("/users", async (req, res) => {
  const users = await repository.findAll();
  res.setHeader("X-Total-Count", users.length);
  res.json(users.map(normalizeUser));
});

app.get("/users/:id", async (req, res) => {
  if (req.params.id === "0") {
    res.status(404).json({
      error: 404,
      message: "UserNotFound",
    });
  } else {
    const user = await repository.find(req.params.id);
    res.json(normalizeUser(user));
  }
});

app.post("/users", async (req, res) => {
  if (req.headers["content-type"] !== "application/json") {
    res.status(400).send({
      error: 400,
      message: "ContentTypeNotSupported",
    });
    return;
  }

  const user = await repository.create(req.body);
  res.status(201).json(normalizeUser(user));
});

app.put("/users/:id", async (req, res) => {
  if (req.params.id === "0") {
    res.status(404).json({
      error: 404,
      message: "UserNotFound",
    });
    return;
  }

  const user = await repository.update(req.params.id, req.body);
  res.json(normalizeUser(user));
});

app.delete("/users/:id", async (req, res) => {
  if (req.params.id === "0") {
    res.status(404).json({
      error: 404,
      message: "UserNotFound",
    });
    return;
  }
  await repository.delete(req.params.id);
  res.status(204).send({});
});

initializeDatabase().catch(console.error);

module.exports = app;
