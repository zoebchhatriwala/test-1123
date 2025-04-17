const express = require("express");
const {
  saveGameData,
  getGameData,
} = require("../controllers/memoryController");
const router = express.Router();

// Route to save game data
router.post("/save", saveGameData);

// Route to get game data (if needed in the future)
router.get("/get/:userId", getGameData);

module.exports = router;
