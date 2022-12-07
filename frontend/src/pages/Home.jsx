import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getExercises } from "../features/exerciseSlice";

import ExerciseDetails from "../components/ExerciseDetails";
import ExerciseForm from "../components/ExerciseForm";
import { useState } from "react";
import { login } from "../features/userSlice";

const Home = () => {
  const exercises = useSelector((state) => state.exercise.exercises);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch(login(user));
    }
  }, []);

  useEffect(() => {
    const fetchExercises = async () => {
      const res = await fetch("http://localhost:5000/api/exercises", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const data = await res.json();

      if (res.ok) {
        dispatch(getExercises(data)); //data is payload
      }
    };
    if (user) {
      fetchExercises();
    }
  }, [dispatch, user]);

  return (
    <div className="home">
      <ExerciseForm />
      <div className="exercises">
        {exercises?.map((exercise) => (
          <ExerciseDetails key={exercise._id} exercise={exercise} />
        ))}
      </div>
    </div>
  );
};

export default Home;
