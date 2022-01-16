const Pool = require('pg').Pool;
function getPoolConnection() {
  const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: '944894Cd@',
    port: 5432,
  });
  return pool;
}

module.exports = {
  getPoolConnection,
};
