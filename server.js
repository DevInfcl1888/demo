const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const LayoutData = require("./model/layout");
const { AltWebModel } = require("./model/web");
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

app.post("/api/layout", async (req, res) => {
  try {
    const { cardlayout, category } = req.body;

    // Helper function to validate fontSize
    const isValidFontSize = (fontSize) => fontSize >= 16 && fontSize <= 30;
    const isValidFontcat = (fontSize) => fontSize >= 8 && fontSize <= 12;

    // Validate fontSize for each component
    if (
      cardlayout?.fontSize &&
      !isValidFontSize(cardlayout.fontSize)
      // (category?.fontSize && !isValidFontcat(category.fontSize))
    ) {
      return res.status(400).send({
        error: "Validation error",
        message: "Card Layout fontSize must be between 16 and 30",
      });
    }
    if (
      // (cardlayout?.fontSize && !isValidFontSize(cardlayout.fontSize)) ||
      category?.fontSize &&
      !isValidFontcat(category.fontSize)
    ) {
      return res.status(400).send({
        error: "Validation error",
        message: "Category fontSize must be between 8 and 12",
      });
    }

    // Proceed to replace data
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

// app.post("/api/layout", async (req, res) => {
//   try {
//     await LayoutData.deleteMany(); // Delete all existing documents
//     const data = new LayoutData(req.body);
//     await data.save();
//     res
//       .status(201)
//       .send({ message: "Old data deleted and new data saved", data });
//   } catch (error) {
//     res.status(400).send({ error: "Failed to replace data", details: error });
//   }
// });

app.post("/api/web", async (req, res) => {
  try {
    await AltWebModel.deleteMany(); // Clear the alternate collection
    const data = new AltWebModel(req.body);
    await data.save();
    res.status(201).send({
      message: "Old data deleted and new data saved to alternate_web",
      data,
    });
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
app.get("/api/web", async (req, res) => {
  try {
    const data = await AltWebModel.findOne();
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send({ error: "Failed to retrieve data" });
  }
});
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
