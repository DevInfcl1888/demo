const mongoose = require("mongoose");

const layoutSchema = new mongoose.Schema({
  // fontSize: {
  //   id: String,
  //   screen: String,
  //   size: Number,
  // },
  // textPadding: {
  //   id: String,
  //   screen: String,
  //   size: Number,
  // },
  // layout: {
  //   id: String,
  //   screen: String,
  //   height: Number,
  //   width: Number,
  // },
  cardlayout: {
    id: String,
    screen: String,
    layout: String,
    fontSize: Number,
  },
  category: {
    Id: String,
    screen: String,
    fontSize: Number,
  },
});

module.exports = mongoose.model("LayoutData", layoutSchema);
