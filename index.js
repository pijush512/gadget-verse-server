const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config(); // .env ফাইল ব্যবহারের জন্য

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


// const express = require("express");
// const cors = require("cors");
// const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
// require("dotenv").config();

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());

// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.5fdvbil.mongodb.net/?appName=Cluster0`;

// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   },
// });

// // ডাটাবেস কালেকশন ডিফাইন করা (গ্লোবালি)
// let itemCollection;

// async function connectDB() {
//   if (!itemCollection) {
//     await client.connect();
//     const database = client.db("gadgetVerse");
//     itemCollection = database.collection("items");
//     console.log("Connected to MongoDB");
//   }
//   return itemCollection;
// }

// // --- API Routes ---

// // All Item Get
// app.get("/items", async (req, res) => {
//   try {
//     const collection = await connectDB();
//     const result = await collection.find().sort({ _id: -1 }).toArray();
//     res.json(result); // res.send এর বদলে res.json ব্যবহার করা নিরাপদ
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // Single Item Get
// app.get("/items/:id", async (req, res) => {
//   try {
//     const collection = await connectDB();
//     const id = req.params.id;
//     const query = { _id: new ObjectId(id) };
//     const result = await collection.findOne(query);
//     res.json(result);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // Add Item
// app.post("/add-item", async (req, res) => {
//   try {
//     const collection = await connectDB();
//     const newItem = req.body;
//     const result = await collection.insertOne(newItem);
//     res.json(result);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// app.get("/", (req, res) => {
//   res.send("GadgetVerse Server is Active and Running!");
// });

// // Vercel এর জন্য এক্সপোর্ট
// module.exports = app;