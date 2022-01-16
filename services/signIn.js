const { verifyPassword } = require('../dao/encryptDecrypt');
const { exicuteQuery } = require('../dao/exicuteQuery');
const { generateToken } = require('../dao/jwt_dao');
const { STATUS_RESPONSE } = require('../utils/constants');

function validateLoginData(loginData, errors) {
  console.log('In validateLoginData');
  if (typeof loginData.user_name !== 'string') {
    errors.push('Invalid User name.');
  }

  if (typeof loginData.password !== 'string') {
    errors.push('Invalid Password.');
  }
}

function checkCredential(loginData, done) {
  try {
    console.log('In checkCredential');
    exicuteQuery(
      `select * from user_details where user_name = '${loginData.user_name}'`,
      async (err, result) => {
        if (err) {
          console.log(err);
          return done(
            {
              code: 500,
              response: 'Failed to sigh-in. Please try after some time.',
            },
            null
          );
        } else if (result.rows.length) {
          let userCreds = result.rows[0];
          if (userCreds.user_name !== loginData.user_name) {
            return done({ code: 401, response: 'Incorrect username.' }, null);
          } else if (
            !(await verifyPassword(
              loginData.password,
              userCreds.hashed_password
            ))
          ) {
            return done({ code: 401, response: 'Incorrect password.' }, null);
          } else {
            return done(null, true);
          }
        } else {
          return done(
            {
              code: 401,
              response: 'You are not signed-up, please do sign-up.',
            },
            null
          );
        }
      }
    );
  } catch (err) {
    console.log(err);
    return false;
  }
}

async function signIn(loginData, done) {
  console.log('In signIn');
  let errors = [];
  await validateLoginData(loginData, errors);
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

  checkCredential(loginData, (err, result) => {
    if (err) {
      return done(
        {
          code: err.code,
          response: {
            status: STATUS_RESPONSE.FAILED,
            message: err.response,
          },
        },
        null
      );
    }

    generateToken(loginData, (err, resp) => {
      if (err) {
        return done(
          {
            code: 500,
            response: {
              status: STATUS_RESPONSE.FAILED,
              message: 'Failed to sigh-in. Please try after some time.',
            },
          },
          null
        );
      }
      return done(null, {
        status: STATUS_RESPONSE.SUCCESS,
        message: 'Signed-in Successfully.',
        token: resp,
      });
    });
  });
}

module.exports = {
  signIn,
};
