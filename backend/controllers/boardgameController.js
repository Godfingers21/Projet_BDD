const BoardGame = require('../models/boardgame');
const axios = require('axios');
const xml2js = require('xml2js');

const getAllBoardGames = async(req, res) => {
    const limit = parseInt(req.query.limit) || 10;
    const offset = parseInt(req.query.offset) || 0;
    const sort = req.query.sort || "name";
    const category = req.query.category;
    const publisher = req.query.publisher;
    const players = req.query.players;
    
    try {
        const boardgames = await BoardGame.getAll(limit, offset, sort, category, publisher, players);
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

const getBoardGameByCategory = async(req, res) => {
    const {categoryId} = req.params;
    try {
        const boardgames = await BoardGame.getByCategory(categoryId);
        res.json(boardgames);
    }
    catch{
        res.status(500).json({error : error.message});
    }
};

const getBoardGameByPublisher = async(req, res) => {
    const {publisherId} = req.params;
    try {
        const boardgames = await BoardGame.getByPublisher(publisherId);
        res.json(boardgames);
    }
    catch{
        res.status(500).json({error : error.message});
    }
};

const getCategories = async(req, res) => {
    try {
        const categories = await BoardGame.getAllCategories();
        res.json(categories);
    } catch(error) {
        res.status(500).json({error: error.message});
    }
};

const getPublishers = async(req, res) => {
    try {
        const publishers = await BoardGame.getAllPublishers();
        res.json(publishers);
    } catch(error) {
        res.status(500).json({error: error.message});
    }
};

const getBoardGameImage = async(req, res) => {
    const {ids} = req.query;
    try {
        const response = await axios.get(`https://www.boardgamegeek.com/xmlapi2/thing?id=${ids}`);
        const parser = new xml2js.Parser();
        parser.parseString(response.data, (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            const images = result.items.item.map((item) => ({
                id: item.id, // ID du jeu
                image: item.image[0], // URL de l'image
            }));
            res.json(images);
        });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports = {
    getCategories,
    getPublishers,
    getBoardGameImage,
    getBoardGameByCategory,
    getBoardGameByPublisher,
    getAllBoardGames,
    getBoardGameById
};