const { exicuteQuery } = require('../dao/exicuteQuery');
const { STATUS_RESPONSE } = require('../utils/constants');

async function deleteUsersData(phone_numbers, done) {
  console.log('In deleteUsersData');
  let errors = [];
  for (let contact_number of phone_numbers) {
    exicuteQuery(
      `delete from user_details where contact_number = ${contact_number}`,
      async (err, result) => {
        if (err) {
          console.log(err);
          errors.push('Not able to delete data of ' + contact_number);
        }
      }
    );
  }

  if (errors.length) {
    return done(
      {
        code: 500,
        response: {
          status: STATUS_RESPONSE.FAILED,
          message: 'Failed to get all user data. Please try after some time.',
          errors,
        },
      },
      null
    );
  }
  return done(null, {
    status: STATUS_RESPONSE.SUCCESS,
    message: 'Successfully deleted the data of all user.',
  });
}

module.exports = {
  deleteUsersData,
};
