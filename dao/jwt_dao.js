const jwt = require('jsonwebtoken');
const { STATUS_RESPONSE } = require('../utils/constants');

function generateToken(payload, done) {
  try {
    jwt.sign(
      { payload },
      'secretkey',
      { expiresIn: '10h' },
      async (err, token) => {
        if (err) {
          return done(
            {
              status: STATUS_RESPONSE.ERROR,
              message: 'Error While Generating JWT Token',
            },
            null
          );
        }
        return done(null, token);
      }
    );
  } catch (err) {
    console.log(err);
    return done(
      {
        status: STATUS_RESPONSE.ERROR,
        message: 'Error While Generating JWT Token',
      },
      null
    );
  }
}

function verifyToken(req, done) {
  try {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
      const bearer = bearerHeader.split(' ');
      const bearerToken = bearer[1];
      req.token = bearerToken;
      if (typeof req.token !== 'undefined') {
        req.token = req.token.substr(1, req.token.length - 2);
      }
      jwt.verify(req.token, 'secretkey', async (err, decoded) => {
        if (err) {
          return done(
            {
              status: STATUS_RESPONSE.FAILED,
              message: 'Token is Expired',
            },
            null
          );
        } else {
          var dbData = decoded.body;
          return done(null, dbData);
        }
      });
    } else {
      return done(
        {
          status: STATUS_RESPONSE.FAILED,
          message: 'Token is Missing',
        },
        null
      );
    }
  } catch (err) {
    console.log(err);
    return done(
      {
        status: STATUS_RESPONSE.ERROR,
        message: 'Error While Verifying JWT Token',
      },
      null
    );
  }
}

module.exports = {
  generateToken,
  verifyToken,
};
