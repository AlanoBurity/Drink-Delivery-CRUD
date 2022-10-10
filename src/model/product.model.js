const connection = require('./db/connection');

const getAllItems = async () => {
    const [result] = await connection.execute('SELECT * FROM products');
    return result;
};

module.exports = {
    getAllItems,
};