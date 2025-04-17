const Save = require("../models/save");

exports.saveGameData = async (req, res) => {
  const { userID, gameDate, failed, difficulty, completed, timeTaken } =
    req.body;

  try {
    // Check if required fields are present
    if (
      !userID ||
      !gameDate ||
      difficulty === undefined ||
      completed === undefined ||
      timeTaken === undefined
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Save game data to the database
    const newSave = new Save({
      userID,
      gameDate,
      failed,
      difficulty,
      completed,
      timeTaken,
    });

    // Save the new save instance to the database
    await newSave.save();

    // Send success response
    res.status(201).json({ message: "Game data saved successfully" });
  } catch (error) {
    console.error("Error saving game data:", error);
    res.status(500).json({ message: "Error saving game data", error });
  }
};

exports.getGameData = async (req, res) => {
  // Extract userId from request parameters
  const { userId } = req.params;

  try {
    // Fetch game data for the given userId
    const gameData = await Save.find({ userID: userId });

    // Check if game data exists
    if (!gameData || gameData.length === 0) {
      return res.status(404).json({ message: "No game data found" });
    }

    // Send success response with game data
    res
      .status(200)
      .json({ message: "Game data retrieved successfully", gameData });
  } catch (error) {
    console.error("Error retrieving game data:", error);
    res.status(500).json({ message: "Error retrieving game data", error });
  }
};
