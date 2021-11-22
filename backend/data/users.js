const bcrypt = require("bcryptjs");

const users = [
  {
    name: "John Doe",
    email: "john@example.com",
    password: bcrypt.hashSync("8888", 10),
  },
  {
    name: "Marry Doe",
    email: "marry@example.com",
    password: bcrypt.hashSync("8888", 10),
  },
];

module.exports = users;
