const bcrypt = require('bcryptjs');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');

function getEncrypt(data) {
  return new Promise(async (resolve, reject) => {
    try {
      console.log('In getEncrypt');
      resolve(cryptr.encrypt(data));
    } catch (err) {
      console.log(err);
      reject('Cannot encrypt');
    }
  });
}

function getDecrypt(data) {
  return new Promise(async (resolve, reject) => {
    try {
      console.log('In getDecrypt');
      resolve(cryptr.decrypt(data));
    } catch (err) {
      console.log(err);
      reject('Cannot encrypt');
    }
  });
}

function hashPassword(data) {
  return new Promise(async (resolve, reject) => {
    try {
      console.log('In hashPassword');
      bcrypt.genSalt(10, function (err, Salt) {
        // The bcrypt is used for encrypting password.
        bcrypt.hash(data, Salt, function (err, hash) {
          if (err) {
            console.log('Cannot encrypt', err);
            reject('Cannot encrypt');
          }
          resolve(hash);
        });
      });
      // return cryptr.encrypt(data);
    } catch (err) {
      console.log(err);
      reject('Cannot encrypt');
    }
  });
}

function verifyPassword(password, hashedPassword) {
  return new Promise(async (resolve, reject) => {
    try {
      console.log('In verifyPassword');
      bcrypt.compare(password, hashedPassword, async function (err, isMatch) {
        if (isMatch) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    } catch (err) {
      console.log(err);
      resolve(false);
    }
  });
}

module.exports = {
  getEncrypt,
  getDecrypt,
  hashPassword,
  verifyPassword,
};
