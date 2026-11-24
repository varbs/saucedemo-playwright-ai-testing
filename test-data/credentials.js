const credentials = {
  standardUser: {
    username: process.env.STANDARD_USER,
    password: process.env.PASSWORD,
  },

  lockedOutUser: {
    username: process.env.LOCKED_OUT_USER,
    password: process.env.PASSWORD,
  },

  wrongPasswordUser: {
    username: process.env.STANDARD_USER,
    password: process.env.WRONG_PASSWORD,
  },

  emptyUsernamePassword: {
    username: '',
    password: '',
  }
  
};

module.exports = { credentials };