const validatePhoneNumber = require('validate-phone-number-node-js');
const { hashPassword, getEncrypt } = require('../dao/encryptDecrypt');
const { exicuteQuery } = require('../dao/exicuteQuery');
const { STATUS_RESPONSE } = require('../utils/constants');
const { getTimeStamp } = require('../utils/getTimeStamp');

function validateUserData(userData, errors) {
  return new Promise(async (resolve, reject) => {
    console.log('In validateUserData');
    if (
      typeof userData.user_name !== 'string' ||
      userData.user_name.length === 0
    ) {
      errors.push('Invalid User name.');
    }
    if (
      userData.phone_number.length === 0 ||
      !validatePhoneNumber.validate(userData.phone_number)
    ) {
      errors.push('Invalid Phone_number.');
    }
    if (
      typeof userData.password !== 'string' ||
      userData.password.length === 0
    ) {
      errors.push('Invalid Password.');
    }

    exicuteQuery(
      `select * from user_details where user_name = '${userData.user_name}'`,
      (err, result) => {
        if (err) {
          console.log(err);
          reject('Failed to sign-up.');
        } else if (result.rows.length) {
          errors.push('Given user_name is already exists.');
        }
        exicuteQuery(
          `select * from user_details where contact_number = ${userData.phone_number}`,
          (err, result) => {
            if (err) {
              console.log(err);
              reject('Failed to sign-up.');
            } else if (result.rows.length) {
              errors.push('Given Phone number is already signed-up.');
            }
            resolve('');
          }
        );
      }
    );
  });
}

async function createUser(userData, done) {
  try {
    console.log('In createUser');
    let query = `INSERT INTO user_details(user_id, user_name, contact_number, hashed_password, encrypted_password, created_date_time)
    VALUES(${new Date().getTime()}, '${userData.user_name}', ${
      userData.phone_number
    }, '${await hashPassword(userData.password)}', '${await getEncrypt(
      userData.password
    )}', '${getTimeStamp()}')`;

    console.log('Insert Query : ', query);
    exicuteQuery(query, (err, result) => {
      if (err) {
        console.log(err);
        return done(true, null);
      }
      return done(null, true);
    });
  } catch (err) {
    console.log(err);
    return done(true, null);
  }
}

async function signUp(userData, done) {
  console.log('In signUp');
  let errors = [];
  await validateUserData(userData, errors);
  if (errors.length) {
    return done(
      {
        code: 500,
        response: {
          status: STATUS_RESPONSE.FAILED,
          message: errors,
        },
      },
      null
    );
  }

  createUser(userData, (err, result) => {
    if (err) {
      return done(
        {
          code: 500,
          response: {
            status: STATUS_RESPONSE.FAILED,
            message: 'Failed to sigh-up. Please try after some time.',
          },
        },
        null
      );
    }
    return done(null, {
      status: STATUS_RESPONSE.SUCCESS,
      message: 'Signed-up Successfully.',
    });
  });
}

module.exports = {
  signUp,
};
