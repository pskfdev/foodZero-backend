const express = require("express");
const router = express.Router();

// controllers
const { createReservation, listReservation, deleteReservation } = require("../controllers/reservation");

// middleware
const { auth, adminCheck } = require("../middleware/auth");
//@Endpoint     http://localhost:5000/api/reservation
router.post("/reservation",auth, createReservation);
router.get("/reservation", listReservation);
router.delete("/reservation/:id", deleteReservation);

module.exports = router;
