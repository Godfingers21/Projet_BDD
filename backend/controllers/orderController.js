// controllers/orderController.js
const db = require('../config/dbAsync'); // et pas ../config/db du coup
const crypto = require('crypto');

function generateOrderNum() {
  const rand1 = Math.floor(1000 + Math.random() * 9000); // 4 chiffres
  const letters = Math.random().toString(36).substring(2, 4).toUpperCase(); // 2 lettres
  const rand2 = Math.floor(100000 + Math.random() * 900000); // 6 chiffres
  return `${rand1}${letters}${rand2}`;
}

const createOrder = async (req, res) => {
  const user_id = req.userId; // récupéré depuis le token avec verifyToken
  const { nom, prenom, last4_card, address, cart_items } = req.body;

  if (!nom || !prenom || !last4_card || !address || !cart_items?.length) {
    return res.status(400).json({ error: 'Champs manquants pour la commande.' });
  }

  const conn = await db.getConnection();
  await conn.beginTransaction();

  try {
    // 1. Ajouter l'adresse (avec region au lieu de departement)
    const [addressResult] = await conn.query(
      'INSERT INTO Address (numero, rue, ville, code_postal, region, pays) VALUES (?, ?, ?, ?, ?, ?)',
      [address.numero, address.rue, address.ville, address.code_postal, address.region, address.pays]
    );

    const address_id = addressResult.insertId;

    // 2. Générer un order_num
    const order_num = generateOrderNum();

    // 3. Créer la commande (Orders)
    const [orderResult] = await conn.query(
      'INSERT INTO Orders (order_num, user_id, nom, prenom, address_id, last4_card) VALUES (?, ?, ?, ?, ?, ?)',
      [order_num, user_id, nom, prenom, address_id, last4_card]
    );

    const order_id = orderResult.insertId;

    // 4. Insérer les jeux dans OrderItem
    for (const item of cart_items) {
      await conn.query(
        'INSERT INTO OrderItem (order_id, boardgame_id, quantity, price) VALUES (?, ?, ?, ?)',
        [order_id, item.boardgame_id, item.quantity, item.price]
      );
    }

    await conn.commit();
    conn.release();

    res.status(201).json({ message: 'Commande créée avec succès', order_num });
  } catch (error) {
    await conn.rollback();
    conn.release();
    console.error('Erreur lors de la création de la commande :', error);
    res.status(500).json({ error: 'Erreur lors de la création de la commande.' });
  }
};

const getMyOrders = async (req, res) => {
  const user_id = req.userId;

  try {
    const conn = await db.getConnection();

    // Récupérer toutes les commandes de l'utilisateur
    const [orders] = await conn.query(
      'SELECT * FROM Orders WHERE user_id = ? ORDER BY created_at DESC',
      [user_id]
    );

    for (const order of orders) {
      // Pour chaque commande, récupérer les items associés + nom du jeu
      const [items] = await conn.query(
        `SELECT oi.boardgame_id, oi.quantity, oi.price, bg.name 
         FROM OrderItem oi
         JOIN BoardGame bg ON oi.boardgame_id = bg.boardgame_id
         WHERE oi.order_id = ?`,
        [order.order_id]
      );

      // Ajouter les items et calculer le total
      order.items = items;
      order.total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    }

    conn.release();
    res.json(orders);
  } catch (err) {
    console.error('Erreur lors de la récupération des commandes :', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

module.exports = {
  createOrder,
  getMyOrders
};