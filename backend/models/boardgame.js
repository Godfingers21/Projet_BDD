const db = require('../config/db');

const BoardGame = {
    getAll: (limit, offset) => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM BoardGame LIMIT ? OFFSET ?', [limit, offset], (err, results) => {
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
            db.query(
                `SELECT 
                    BoardGame.*,
                    GROUP_CONCAT(DISTINCT Category.category_name) AS categories,
                    GROUP_CONCAT(DISTINCT Publisher.publisher_name) AS publishers,
                    GROUP_CONCAT(DISTINCT Artist.artist_name) AS artists,
                    GROUP_CONCAT(DISTINCT Designer.designer_name) AS designers
                 FROM BoardGame
                 LEFT JOIN Classification ON BoardGame.boardgame_id = Classification.boardgame_id
                 LEFT JOIN Category ON Classification.category_id = Category.category_id
                 LEFT JOIN Publish ON BoardGame.boardgame_id = Publish.boardgame_id
                 LEFT JOIN Publisher ON Publish.publisher_id = Publisher.publisher_id
                 LEFT JOIN Draw ON BoardGame.boardgame_id = Draw.boardgame_id
                 LEFT JOIN Artist ON Draw.artist_id = Artist.artist_id
                 LEFT JOIN Design ON BoardGame.boardgame_id = Design.boardgame_id
                 LEFT JOIN Designer ON Design.designer_id = Designer.designer_id
                 WHERE BoardGame.boardgame_id = ?`,
                [id],
                (err, results) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(results[0]);
                    }
                }
);
        });
    },

    getByCategory: (categoryId) => {
        return new Promise((resolve, reject) => {
            db.query(
                `SELECT BoardGame.* 
                FROM BoardGame 
                JOIN Classification ON BoardGame.boardgame_id = Classification.boardgame_id 
                WHERE Classification.category_id = ?`, 
                [categoryId], 
                (err, results) => {
                if (err) { 
                    reject(err);
                }
                else {
                    resolve(results);
                }
            });
        });
    },
    
    getByPublisher: (publisherId) => {
        return new Promise((resolve, reject) => {
            db.query(
                `SELECT BoardGame.* 
                FROM BoardGame 
                JOIN Publish ON BoardGame.boardgame_id = Publish.boardgame_id
                WHERE Publisher.publisher_id = ?`, 
                [publisherId], 
                (err, results) => {
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