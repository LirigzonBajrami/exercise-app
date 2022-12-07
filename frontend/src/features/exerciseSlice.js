import { createSlice } from "@reduxjs/toolkit";

const exerciseSlice = createSlice({
  name: "exercise",
  initialState: { exercises: null },
  reducers: {
    getExercises(state, action) {
      state.exercises = action.payload;
    },
    createExercise(state, action) {
      state.exercises = [action.payload, ...state.exercises];
    },
    deleteExercise(state, action) {
      state.exercises = state.exercises.filter(
        (exercise) => exercise._id !== action.payload._id
      );
    },
  },
});

export const { getExercises, createExercise, deleteExercise } =
  exerciseSlice.actions;

export default exerciseSlice.reducer;
