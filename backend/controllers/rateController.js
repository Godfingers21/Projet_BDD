const Rate = require('../models/rate');

const createRate = async (req, res) => {
    const rate = req.body;
    try {
        const newRate = await Rate.create(rate);
        res.status(201).json(newRate);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateRate = async (req, res) => {
    const rate = req.body;
    try {
        const updatedRate = await Rate.update(rate);
        if (updatedRate) {
            res.json(updatedRate);
        } else {
            res.status(404).json({ error: "Rate not found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteRate = async (req, res) => {
    const rate = req.body;
    console.log(rate);
    try {
        const deletedRate = await Rate.delete(rate);
        if (deletedRate) {
            res.json(deletedRate);
        } else {
            res.status(404).json({ error: "Rate not found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getRateByBoardId = async (req, res) => {
    const { id } = req.params;
    try {
        const rate = await Rate.getByBoardId(id);
        if (rate) {
            res.json(rate);
        } else {
            res.status(404).json({ error: "Rate not found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getRateByUserId = async (req, res) => {
    const { id } = req.params;
    try {
        const rate = await Rate.getByUserId(id);
        if (rate) {
            res.json(rate);
        } else {
            res.status(404).json({ error: "Rate not found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getRateByBoardId,
    getRateByUserId,
    createRate,
    updateRate,
    deleteRate
};