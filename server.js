const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = new sqlite3.Database(':memory:');

db.serialize(() => {
    db.run("CREATE TABLE employees (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, position TEXT, salary REAL)");

    const stmt = db.prepare("INSERT INTO employees (name, position, salary) VALUES (?, ?, ?)");
    stmt.run("John Doe", "Developer", 60000);
    stmt.run("Jane Smith", "Manager", 80000);
    stmt.run("Alice Johnson", "Designer", 55000);
    stmt.run("Bob Brown", "Sales", 50000);
    stmt.run("Charlie Davis", "Support", 45000);
    stmt.run("Diana Evans", "HR", 70000);
    stmt.run("Frank Green", "Marketing", 65000);
    stmt.run("Grace Harris", "Finance", 75000);
    stmt.run("Henry Jackson", "IT", 72000);
    stmt.run("Ivy King", "Admin", 48000);
    stmt.finalize();
});

app.get('/employees', (req, res) => {
    db.all("SELECT * FROM employees", (err, rows) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(rows);
    });
});

app.post('/employees', (req, res) => {
    const { name, position, salary } = req.body;
    db.run("INSERT INTO employees (name, position, salary) VALUES (?, ?, ?)", [name, position, salary], function(err) {
        if (err) {
            return res.status(500).send(err);
        }
        res.json({ id: this.lastID, name, position, salary });
    });
});

app.put('/employees/:id', (req, res) => {
    const { id } = req.params;
    const { name, position, salary } = req.body;
    db.run("UPDATE employees SET name = ?, position = ?, salary = ? WHERE id = ?", [name, position, salary, id], function(err) {
        if (err) {
            return res.status(500).send(err);
        }
        res.json({ changes: this.changes });
    });
});

// Add delete functionality
app.delete('/employees/:id', (req, res) => {
    const { id } = req.params;
    db.run("DELETE FROM employees WHERE id = ?",  id, function(err) {
        if (err) {
            return res.status(500).send(err);
        }
        res.json({ changes: this.changes });
    });
});

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});
