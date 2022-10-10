const app = require('./app');

const connection = require('./model/db/connection');

require('dotenv').config();

app.listen(process.env.PORT, async () => {
    console.log(`API drink delivery está em execução na porta ${process.env.PORT}`);

    const [result] = await connection.execute('SELECT 1');
    if (result) {
      console.log('MySQL connection OK');
    } 
});