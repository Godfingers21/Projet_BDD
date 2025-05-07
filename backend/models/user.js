const db = require('../config/db.js');
const { create } = require('./rate.js');

const User = {
    create: (user) => {
        console.log(user.username, user.email, user.password, user.role);
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO Users (username, email, password, role) VALUES (?, ?, ?, ?)', [user.username, user.email, user.password, user.role], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    },
    update: (user) => {
        return new Promise((resolve, reject) => {
            db.query('UPDATE Users SET username = ?, password = ?, email = ?, role = ?, WHERE id = ?', [user.username, user.password, user.email, user.role, user.id], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    },
    delete: (user) => {
        return new Promise((resolve, reject) => {
            db.query('DELETE FROM Users WHERE id = ?', [user.id], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            }); 
        });
    },
    getByEmail: (email) => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM Users WHERE email = ?', [email], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }
};

module.exports = User;