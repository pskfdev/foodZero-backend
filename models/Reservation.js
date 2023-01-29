const mongoose = require("mongoose");

const ReservationSchema = new mongoose.Schema(
  {
    username: {
      type: String,
    },
    date: {
      type: String,
    },
    time: {
      type: String,
    },
    person: {
      type: String,
    },
    contact: {
      type: Number,
    },
  },
  { timestamps: true }
);
module.exports = Reservation = mongoose.model("reservation", ReservationSchema);
