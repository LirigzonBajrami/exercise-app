const express = require("express");
const router = express.Router();
const {
  getExercises,
  getExercise,
  addExercise,
  deleteExercise,
  updateExercise,
} = require("../controllers/exerciseController");

// import requireAuth middleware
const { requireAuth } = require("../middleware/requireAuth");

// Only if user is logged in can use those routes
router.use(requireAuth);

// GET All exercises
router.get("/", getExercises);

// GET a single exercise
router.get("/:id", getExercise);

// POST a new exercise
router.post("/", addExercise);

// DELETE an exercise
router.delete("/:id", deleteExercise);

// UPDATE an exercise
router.patch("/:id", updateExercise);

module.exports = router;
