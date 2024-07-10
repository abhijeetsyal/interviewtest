const mongoose = require('mongoose');
const { initializeSeats } = require('../models/seats_init');
require('dotenv').config();
const connectDB = async () => {
  
const uri=`mongodb+srv://${process.env["MONGO_USER"]}:${process.env["MONGO_PASS"]}@cluster0.xyih8cu.mongodb.net/seatsdb?retryWrites=true&w=majority&appName=Cluster0`;

console.log('uri-------',uri)
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    initializeSeats();
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Could not connect to MongoDB', error);
    process.exit(1);
  }
};

module.exports = connectDB;
