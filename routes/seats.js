const express = require('express');
const router = express.Router();
const Seat = require('../models/seats');
const mongoose = require('mongoose');






// Booking API
router.post('/book', async (req, res) => {
  const { booking_name, seats_required } = req.body;

  if (!booking_name || !seats_required || seats_required <= 0 || seats_required > 7) {
    return res.status(400).json({ error: 'Invalid booking request' });
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Find available seats
    const availableSeats = await Seat.find({ booked: false })
      .sort({ seat_num: 1 })
      .limit(seats_required)
      .session(session);

    if (availableSeats.length < seats_required) {
      await session.abortTransaction();
      return res.status(400).json({ error: 'Not enough seats available' });
    }

    // Book the seats
    const updatePromises = availableSeats.map(seat => 
      Seat.updateOne(
        { _id: seat._id },
        { $set: { booked: true, booking_name: booking_name } }
      ).session(session)
    );

    await Promise.all(updatePromises);

    await session.commitTransaction();
    res.json({
      message: 'Booking successful',
      seats: availableSeats.map(seat => seat.seat_num)
    });
  } catch (error) {
    await session.abortTransaction();
    console.error('Booking error:', error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    session.endSession();
  }
});




   
router.put('/unbook-all', async (req, res) => {
  try {
    await Seat.updateMany({}, { booked:false,booking_name:null });
    res.send('All seat bookings removed');
  } catch (error) {
    res.status(400).send(error.message);
  }
});




module.exports = router;

