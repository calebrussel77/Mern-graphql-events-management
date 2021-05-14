const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../../models/user");

module.exports = {
  users: async () => {
    try {
      const users = await User.find().populate("createdEvents").exec();
      return users;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  createUser: async (args) => {
    try {
      const userFound = await User.findOne({ email: args.userInput.email });

      if (userFound) {
        throw new Error("User already exist !");
      }
      const user = new User({
        name: args.userInput.name,
        email: args.userInput.email,
        password: bcrypt.hashSync(args.userInput.password, 10),
      });
      const newUser = await user.save();
      return newUser;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  login: async ({ email, password }) => {
    try {
      const user = await User.findOne({ email });

      if (!user) {
        throw new Error("User not Found. ");
      }
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        throw new Error("Email and password doesn't match.");
      }
      const token = await jwt.sign(
        { userId: user._id, email: user.email, name: user.name },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h",
        }
      );

      return {
        userId: user._id,
        token,
        totkenExpiration: 1,
      };
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
};
