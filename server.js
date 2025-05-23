const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const LayoutData = require("./model/layout");

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(
  "mongodb+srv://pundirrahul2001:Rjn58Ch2dzdf2SOD@mydev.svubrpl.mongodb.net/layoutDB",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// Routes

// POST - Save layout data
// app.post("/api/layout", async (req, res) => {
//   try {
//     const data = new LayoutData(req.body);
//     await data.save();
//     res.status(201).send({ message: "Data saved", data });
//   } catch (error) {
//     res.status(400).send({ error: "Failed to save data", details: error });
//   }
// });
// POST - Delete previous and save new layout data
app.post("/api/layout", async (req, res) => {
  try {
    await LayoutData.deleteMany(); // Delete all existing documents
    const data = new LayoutData(req.body);
    await data.save();
    res
      .status(201)
      .send({ message: "Old data deleted and new data saved", data });
  } catch (error) {
    res.status(400).send({ error: "Failed to replace data", details: error });
  }
});

// GET - Retrieve all layout data
// app.get("/api/layout", async (req, res) => {
//   try {
//     const data = await LayoutData.find();
//     res.status(200).send(data);
//   } catch (error) {
//     res.status(500).send({ error: "Failed to retrieve data" });
//   }
// });
app.get("/api/layout", async (req, res) => {
  try {
    const data = await LayoutData.findOne();
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send({ error: "Failed to retrieve data" });
  }
});
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
