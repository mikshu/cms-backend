const bcrypt = require("bcryptjs");
const User = require("../../models/user");
const { getUsersMap } = require('../../helpers')
const jwt = require('jsonwebtoken');
module.exports = {
  createUser: async (args) => {
    try {
      const existingUser = await User.findOne({ email: args.userInput.email });
      if (existingUser) {
        throw new Error("User exists already.");
      }
      const hashedPassword = await bcrypt.hash(args.userInput.password, 12);

      const user = new User({
        userName: args.userInput.userName,
        email: args.userInput.email,
        password: hashedPassword,
      });

      const result = await user.save();
      return { email: result.email, _id: result._id, userName: result.userName };
    } catch (err) {
      throw err;
    }
  },
  getUsers: async () => {
    try {
      const users = await User.find();
      return users.map(user => {
        return getUsersMap(user);
      });
    } catch (err) {
      throw err;
    }
  },
  login: async ({email, password}) => {
    const user = await User.findOne({email});
    if(!user) {
      throw new Error('User does not exist!!');
    }
    const isEqual = bcrypt.compare(password, user.password);
    if(!isEqual) {
      throw new Error('Password is incorrect!!');
    }
    const token = jwt.sign({email: user.email, userId: user._id}, 'secretkey', {expiresIn: '1h'});
    return {userId: user._id, email: user.email, token, tokenExpiration : 1}
  }
};
