const Seat=require('./seats')
async function initializeSeats() {
    const count = await Seat.countDocuments();
    if (count === 0) {
      const seats = Array.from({ length: 80 }, (_, i) => ({ seat_num: i + 1 }));
      await Seat.insertMany(seats);
      console.log('Seats initialized');
    }
  }

  module.exports={initializeSeats}