require('dotenv').config();

module.exports = {
    // Database connection information
    'database': process.env.DATABASE,
    // Setting port for server
    'port': process.env.PORT || 3000,
};
