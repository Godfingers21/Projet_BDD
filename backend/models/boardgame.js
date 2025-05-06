const db = require('../config/db');

const BoardGame = {
    getAll: () => {
        return new Promise((resolve, reject) => {
            db.query('SELECT description FROM BoardGame', (err, results) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(results);
                }
            });
        });
    },

    getById: (id) => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM BoardGame WHERE boardgame_id = ?', [id], (err, results) => {
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

module.exports = BoardGame;