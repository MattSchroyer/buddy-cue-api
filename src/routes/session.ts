import { Router } from "express";

// This will help us connect to the database
import db from "../db/connection.js";

// This help convert the id from string to ObjectId for the _id.
import { ObjectId } from "mongodb";
import type { SessionRequest } from "./types/session.d.ts";

// router is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /session.
const router = Router();

const collectionName = "sessions";

// This section will help you get a list of all the sessions.
router.get("/", async (req, res) => {
  let collection = await db.collection(collectionName);
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});

// This section will help you get a single session by id
router.get("/:id", async (req: SessionRequest, res) => {
  let collection = await db.collection(collectionName);
  let query = { _id: new ObjectId(req.params.id) };
  let result = await collection.findOne(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

// This section will help you create a new session.
router.post("/", async (req: SessionRequest, res) => {
  try {
    let newDocument = {
      user: req.body.user,
      meat: req.body.meat,
      weight: req.body.weight,
      timeTemp: req.body.timeTemp,
    };
    let collection = await db.collection(collectionName);
    let result = await collection.insertOne(newDocument);
    res.send(result).status(204);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding session");
  }
});

// This section will help you update a session by id.
router.patch("/:id", async (req: SessionRequest, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const updates = {
      $set: {
        user: req.body.user,
        meat: req.body.meat,
        weight: req.body.weight,
        timeTemp: req.body.timeTemp,
      },
    };

    let collection = await db.collection(collectionName);
    let result = await collection.updateOne(query, updates);
    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating session");
  }
});

// This section will help you delete a session
router.delete("/:id", async (req: SessionRequest, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };

    const collection = db.collection(collectionName);
    let result = await collection.deleteOne(query);

    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting session");
  }
});

export default router;