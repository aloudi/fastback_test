// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcrypt');

const hashPassword = (password) => {
  return bcrypt.hash(password, 10);
};

module.exports = {
  hashPassword,
};
