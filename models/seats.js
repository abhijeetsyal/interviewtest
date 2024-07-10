const mongoose = require('mongoose');

const seatSchema = new mongoose.Schema({
  booking_name: String,
  seat_num: Number,
  booked: Boolean
});



module.exports = mongoose.model('Seat', seatSchema);
