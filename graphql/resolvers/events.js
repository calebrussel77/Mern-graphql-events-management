const Event = require("../../models/event");
const User = require("../../models/user");

module.exports = {
  events: async () => {
    try {
      const events = await Event.find().populate("createdBy").exec();
      return events;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  createEvent: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("You are not authenticated");
    }
    const event = new Event({
      title: args.eventInput.title,
      description: args.eventInput.description,
      price: +args.eventInput.price,
      createdBy: req.userData._id,
    });
    try {
      const newEvent = await event.save();
      if (newEvent) {
        const userFound = await User.findOne({
          _id: newEvent.createdBy,
        })
          .populate("createdEvents")
          .exec();

        userFound.createdEvents.push(newEvent);

        await userFound.save();

        return { ...newEvent._doc, createdBy: { ...userFound._doc } };
      }
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
};
