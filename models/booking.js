const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const BookingSchema = new Schema(
  {
    eventId: { type: Schema.Types.ObjectId, ref: "Event" },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

module.exports =
  mongoose.models?.Booking || mongoose.model("Booking", BookingSchema);
