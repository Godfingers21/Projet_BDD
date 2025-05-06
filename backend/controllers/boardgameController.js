const BoardGame = require('../models/boardgame');

const getAllBoardGames = async(req, res) => {
    try {
        const boardgames = await BoardGame.getAll();
        res.json(boardgames);
    }
    catch(error){
        res.status(500).json({error : error.message});
    }
};

const getBoardGameById = async(req, res) => {
    const {id} = req.params;
    try {
        const boardgame = await BoardGame.getById(id);
        if (boardgame) {
            res.json(boardgame);
        }
        else{
            res.status(404).json({error : "Board Game not found"});
        }
    }
    catch{
        res.status(500).json({error : error.message});
    }
};

module.exports = {
    getAllBoardGames,
    getBoardGameById
};