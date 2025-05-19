const db = require('../config/db');

const Buy = {
    create: (purchase) => {
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO Buy (user_id, boardgame_id, adresse) VALUES (?, ?, ?)', 
                [purchase.user_id, purchase.boardgame_id, purchase.adresse], 
                (err, results) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(results);
                    }
                }
            );
        });
    },

    getByUserId: (userId) => {
        return new Promise((resolve, reject) => {
            db.query(`
                SELECT Buy.user_id, Buy.boardgame_id, Buy.adresse, 
                       BoardGame.name, BoardGame.price, BoardGame.image_url 
                FROM Buy 
                JOIN BoardGame ON Buy.boardgame_id = BoardGame.boardgame_id 
                WHERE Buy.user_id = ?`,
                [userId], 
                (err, results) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(results);
                    }
                }
            );
        });
    }
};

module.exports = Buy;