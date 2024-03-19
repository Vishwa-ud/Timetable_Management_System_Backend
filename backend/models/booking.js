const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    classroom: { type: mongoose.Schema.Types.ObjectId, ref: 'Classroom', required: true },
    resources: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Resource' }],
    date: { type: Date, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true }
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
