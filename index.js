const express = require('express');
const mysql = require('mysql2/promise');

const app = express();

// Enable CORS for all routes
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Use JSON body parser only for methods that expect a body
app.use((req, res, next) => {
  if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
    express.json()(req, res, next);
  } else {
    next();
  }
});

// MySQL connection pool setup
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'missinglink',
  database: 'watch_management'
});

// POST - Add a new watch
app.post('/api/watches', async (req, res) => {
  const { name, price, category } = req.body;
  if (!name || price === undefined) {
    return res.status(400).json({ error: 'Name and price are required' });
  }

  try {
    const [result] = await pool.query(
      'INSERT INTO watches (name, price, category) VALUES (?, ?, ?)',
      [name, price, category || 'casual']
    );
    res.status(201).json({ id: result.insertId, name, price, category: category || 'casual' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET - Get all watches
app.get('/api/watches', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM watches');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT - Update watch price
app.put('/api/watches/:id', async (req, res) => {
  const { id } = req.params;
  const { price } = req.body;

  if (price === undefined) {
    return res.status(400).json({ error: 'Price is required' });
  }

  try {
    const [result] = await pool.query(
      'UPDATE watches SET price = ? WHERE id = ?',
      [price, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Watch not found' });
    }
    res.json({ message: 'Watch updated', id, price });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE - Delete a watch
app.delete('/api/watches/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query(
      'DELETE FROM watches WHERE id = ?',
      [id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Watch not found' });
    }
    res.json({ message: 'Watch deleted', id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Error handler for invalid JSON
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ error: 'Invalid JSON format' });
  }
  next();
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});