const { getDecrypt } = require('../dao/encryptDecrypt');
const { exicuteQuery } = require('../dao/exicuteQuery');
const { STATUS_RESPONSE } = require('../utils/constants');

async function getAllUserData(done) {
  console.log('In getAllUserData');
  exicuteQuery(
    `select * from user_details order by created_date_time`,
    async (err, result) => {
      if (err) {
        console.log(err);
        return done(
          {
            code: 500,
            response: {
              status: STATUS_RESPONSE.FAILED,
              message:
                'Failed to get all user data. Please try after some time.',
            },
          },
          null
        );
      } else if (result.rows.length) {
        let responseObj = {};
        for (let userDataObj of result.rows) {
          responseObj[userDataObj.user_id] = {
            user_name: userDataObj.user_name,
            contact_number: userDataObj.contact_number,
            password: await getDecrypt(userDataObj.encrypted_password),
            created_date_time: userDataObj.created_date_time,
          };
        }
        return done(null, {
          status: STATUS_RESPONSE.SUCCESS,
          result: responseObj,
        });
      } else {
        return done(null, {
          status: STATUS_RESPONSE.SUCCESS,
          message: "Don't have any user data.",
        });
      }
    }
  );
}

module.exports = {
  getAllUserData,
};
