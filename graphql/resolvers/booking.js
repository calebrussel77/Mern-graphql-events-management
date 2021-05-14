const Booking = require("../../models/booking");

module.exports = {
  bookings: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("You are not authenticated");
    }
    try {
      const bookings = await Booking.find()
        .populate("userId")
        .populate("eventId")
        .exec();

      return bookings;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  bookEvent: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("You are not authenticated");
    }
    try {
      const booking = new Booking({
        eventId: args.eventId,
        userId: req.userData._id,
      });
      const newBooking = await booking.save();

      if (newBooking) {
        const populatedBooking = await Booking.findOne({ _id: newBooking._id })
          .populate("userId")
          .populate("eventId")
          .exec();

        return populatedBooking;
      }
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  cancelBooking: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("You are not authenticated");
    }
    try {
      await Booking.deleteOne({ _id: args.bookingId });
      return { msg: "Booking delete succesfully." };
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
};
