const Buy = require('../models/buy');
const BoardGame = require('../models/boardgame');

const createPurchase = async (req, res) => {
    const { boardgame_id, adresse } = req.body;
    const user_id = req.userId; // L'ID de l'utilisateur vient du middleware d'authentification
    
    if (!boardgame_id || !adresse) {
        return res.status(400).json({ error: "Board game ID and delivery address are required" });
    }
    
    try {
        // Vérifier si le jeu existe
        const game = await BoardGame.getById(boardgame_id);
        if (!game) {
            return res.status(404).json({ error: "Board game not found" });
        }
        
        // Créer l'achat
        const purchase = await Buy.create({ user_id, boardgame_id, adresse });
        
        res.status(201).json({
            message: "Purchase created successfully",
            purchase: {
                user_id,
                boardgame_id,
                adresse
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getUserPurchases = async (req, res) => {
    const user_id = req.userId; // L'ID de l'utilisateur vient du middleware d'authentification
    
    try {
        const purchases = await Buy.getByUserId(user_id);
        res.json(purchases);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createPurchase,
    getUserPurchases
};