const CustomDateDefinition = require("../../utils/CustomDateDefinition");
const usersResolver = require("./users");
const eventsResolver = require("./events");
const bookingResolver = require("./booking");

module.exports = {
  Date: CustomDateDefinition,
  ...usersResolver,
  ...eventsResolver,
  ...bookingResolver,
};
