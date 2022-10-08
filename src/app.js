const express = require('express');
const connection = require('./db/connection');

const app = express();

app.use(express.json());

app.get('/products', async (_req, res) => {
    const [result] = await connection.execute(
        'SELECT * FROM products',
);
        res.status(200).json(result);
});

app.get('/products/:id', async (req, res) => {
    const id = Number(req.params.id);
    const [result] = await connection.execute(
        'SELECT * FROM products WHERE id = ?', [id],
);

      if (!result.length > 0) {
        return res.status(400).json({ message: 'Id inválido' });
      }
        res.status(200).json(result);
});

app.post('/products', async (req, res) => {
    const { name, price, inStock } = req.body;
    const [result] = await connection.execute(
        'INSERT INTO products (name, price, in_stock) VALUES(?, ?, ?)', [name, price, inStock],
    );
    const newProduct = {
        id: result.insertId,
        name,
        price,
        inStock,
    };
    return res.status(201).json(newProduct);    
});
app.put('/products/:id', async (req, res) => {
    const id = Number(req.params.id);
    const { name, price, inStock } = req.body;
    const [result] = await connection.execute(
   'UPDATE products SET name = ?, price = ?, in_stock = ? WHERE id = ?', [name, price, inStock, id],
    );
    if (result.affectedRows !== 0) {
 return res.status(200)
        .json({ message: 'Update realizado com sucesso' }); 
}
    return res.status(400).json({ message: 'erro ao tentar realizar um update' });
});

app.delete('/products/:id', async (req, res) => {
    const id = Number(req.params.id);
    const [result] = await connection.execute(
        'DELETE FROM products WHERE id = ?', [id],
    );
    if (result.affectedRows !== 0) {
          return res.status(200).json({ message: 'Produto deletado com sucesso' });
    }
    return res.status(400).json({ message: 'Erro ao tentar deletar' });
});

module.exports = app;