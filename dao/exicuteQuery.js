//Description : This module is respnosible for exicution of given queries
let { getPoolConnection } = require('./connectPsql');
let pool = getPoolConnection();
function exicuteQuery(query, done) {
  pool.query(query, async (err, result) => {
    if (err) {
      console.log(err);
      done(true, null);
    } else {
      done(null, result);
    }
  });
  return;
}

module.exports = {
  exicuteQuery,
};
