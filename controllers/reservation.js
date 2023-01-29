const Reservation = require("../models/Reservation");

exports.createReservation = async (req, res) => {
  try {
    const { date, time, person, contact } = req.body;
    const newData = {
      username: req.user.username,
      date: date,
      time: time,
      person: person,
      contact: contact,
    };
    const reservation = await new Reservation(newData).save();
    res.send(reservation);
  } catch (err) {
    res.status(500).send("Create reservation error!!");
  }
};

exports.listReservation = async (req, res) => {
  try {
    const reservation = await Reservation.find();
    res.send(reservation);
  } catch (err) {
    res.status(500).send("List reservation error!!");
  }
};

exports.deleteReservation = async (req, res) => {
  try {
    const id = req.params.id;
    const reservation = await Reservation.findOneAndDelete({ _id: id });
    res.send(reservation);
  } catch (err) {
    res.status(500).send("List reservation error!!");
  }
};
