const Exercise = require("../models/exerciseModel");
const mongoose = require("mongoose");

// GET All exercises function
const getExercises = async (req, res) => {
  const user_id = req.user._id;
  try {
    // find documents with certain user_id
    const exercises = await Exercise.find({ user_id }).sort({ createdAt: -1 });
    res.status(200).json(exercises);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// GET a single exercise function
const getExercise = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "This exercise is not valid!" });
  }

  try {
    const exercise = await Exercise.findById(id);

    if (!exercise) {
      return res.status(404).json({ error: "Cannot find this exercise!" });
    }

    res.status(200).json(exercise);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// POST a new exercise function
const addExercise = async (req, res) => {
  const { title, load, repetitions } = req.body;

  // Validation
  let emptyFields = [];
  if (!title) {
    emptyFields.push("title");
  }
  if (!load) {
    emptyFields.push("load");
  }
  if (!repetitions) {
    emptyFields.push("repetitions");
  }

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields });
  }

  try {
    const user_id = req.user._id;
    const exercise = await Exercise.create({
      title,
      load,
      repetitions,
      user_id,
    });
    res.status(200).json(exercise);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE an exercise function
const deleteExercise = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "This exercise is not valid!" });
  }

  try {
    const exercise = await Exercise.findOneAndDelete({ _id: id });

    if (!exercise) {
      return res.status(404).json({ error: "Cannot find this exercise!" });
    }

    res.status(200).json(exercise);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// UPDATE an exercise function
const updateExercise = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "This exercise is not valid!" });
  }

  try {
    const exercise = await Exercise.findOneAndUpdate(
      { _id: id },
      {
        ...req.body,
      },
      { new: true }
    );

    if (!exercise) {
      return res.status(404).json({ error: "Cannot find this exercise!" });
    }

    res.status(200).json(exercise);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getExercises,
  getExercise,
  addExercise,
  deleteExercise,
  updateExercise,
};
