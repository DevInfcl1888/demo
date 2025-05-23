const mongoose = require("mongoose");

const webSchema = new mongoose.Schema({
  Footer: {
    text1: String,
    text2: String,
    text3: String,
    text4: String,
  },
  Support: {
    address: String,
    website: String,
    phone_number: String,
  },
  Account: {
    text5: String,
    text6: String,
    text7: String,
    text8: String,
  },
  Quicklink: {
    text9: String,
    text10: String,
    text11: String,
    text12: String,
  },
  DownloadApp: {
    image: String,
    logo1: String,
    logo2: String,
    logo3: String,
  },
  deals: {
    image1: String,
    title: String,
    price: Number,
    originalPrice: Number,
    discount: Number,
    rating: Number,
    reviews: Number,
  },
});

// Export two models for different collections
module.exports = {
  WebModel: mongoose.model("Web", webSchema, "web"),
  AltWebModel: mongoose.model("AltWeb", webSchema, "alternate_web"), // <- Use different collection name here
};
