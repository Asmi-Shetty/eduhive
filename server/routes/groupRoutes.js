
const express = require('express');
const router = express.Router();
const authenticateJWT = require('../middleware/authMiddleware');


router.post('/create', authenticateJWT, async (req, res) => {
    console.log("Received request in /create");
    console.log("Authenticated User:", req.user); // Debugging line
  
    
  
    if (!req.user || !req.user.userId) {
      return res.status(401).json({ error: "Unauthorized: User ID missing" });
    }
  
    try {
        const { name, description } = req.body;
      const group = new Group({
        name,
        description,
        members: [req.user.id],
        createdBy: req.user.id
      });
  
      await group.save();
      res.status(201).send(group);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  


router.get('/', authenticateJWT, async (req, res) => {
  const groups = await Group.find({ members: req.user.userId });
  res.status(200).send(groups);
});

module.exports = router;