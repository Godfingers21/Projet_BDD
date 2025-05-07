const db = require('../config/db');

const Rate = {
    create: (rate) => {
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO Rate (boardgame_id, user_id, rate) VALUES (?, ?, ?)', [rate.boardgame_id, rate.user_id, rate.rate], (err, results) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(results);
                }
            });
        });
    },
    update : (rate) => {
        return new Promise((resolve, reject) => {
            db.query('UPDATE Rate SET rate = ? WHERE user_id = ? AND boardgame_id = ?', [rate.rate, rate.user_id, rate.boardgame_id], (err, results) => {
                if (err) { 
                    reject(err);
                }
                else {
                    resolve(results);
                }
            });
        });
    },

    delete: (rate) => {
        return new Promise((resolve, reject) => {
            console.log(rate);
            db.query('DELETE FROM Rate WHERE user_id = ? AND boardgame_id = ?', [rate.user_id, rate.boardgame_id], (err, results) => {
                if (err) { 
                    reject(err);
                }
                else {
                    resolve(results);
                }
            });
        });
    },
    getByBoardId: (id) => {
        return new Promise((resolve, reject) => {
            db.query('SELECT rate FROM Rate WHERE boardgame_id = ?', [id], (err, results) => {
                if (err) { 
                    reject(err);
                }
                else {
                    resolve(results);
                }
            });
        });
    },
    getByUserId: (id) => {
        return new Promise((resolve, reject) => {
            db.query('SELECT rate FROM Rate WHERE user_id = ?', [id], (err, results) => {
                if (err) { 
                    reject(err);
                }
                else {
                    resolve(results);
                }
            });
        });
    } 
};

module.exports = Rate