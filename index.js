const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config(); 

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// gadgetVerse
// CDwXUq874P9jRhW5

// const uri = `mongodb+srv://gadgetVerse:CDwXUq874P9jRhW5@cluster0.5fdvbil.mongodb.net/?appName=Cluster0`
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.5fdvbil.mongodb.net/?appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // MongoDB Connect
    const database = client.db("gadgetVerse");
    const itemCollection = database.collection("items");

    //  All Item Get
    app.get("/items", async (req, res) => {
      // const cursor = itemCollection.find();
      const result = await itemCollection.find().sort({_id: -1}).toArray();
      res.send(result);
    });

    app.get("/items/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }; 
      const result = await itemCollection.findOne(query);
      res.send(result);
    });

    // Add Item
    app.post("/add-item", async (req, res) => {
      const newItem = req.body;
      const result = await itemCollection.insertOne(newItem);
      res.send(result);
    });

    console.log("Connected to MongoDB successfully!");
  } finally {
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("GadgetVere is running!");
});

// app.listen(port, () => {
//   console.log(`Server is running at http://localhost:${port}`);
// });
module.exports = app;

