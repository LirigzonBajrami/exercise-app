import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { createExercise } from "../features/exerciseSlice";

const ExerciseForm = () => {
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [repetitions, setRepetitions] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in!");
      return;
    }

    const exercise = { title, load, repetitions };

    const res = await fetch("http://localhost:5000/api/exercises", {
      method: "POST",
      body: JSON.stringify(exercise),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error);
      setEmptyFields(data.emptyFields);
    }

    if (res.ok) {
      setError(null);
      setEmptyFields([]);
      setTitle("");
      setLoad("");
      setRepetitions("");
      dispatch(createExercise(data));
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Exercise</h3>
      <label>Exercise Title:</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyFields.includes("title") ? "error" : ""}
      />
      <label>Load (kg):</label>
      <input
        type="number"
        onChange={(e) => setLoad(e.target.value)}
        value={load}
        className={emptyFields.includes("load") ? "error" : ""}
      />
      <label>Repetitions:</label>
      <input
        type="number"
        onChange={(e) => setRepetitions(e.target.value)}
        value={repetitions}
        className={emptyFields.includes("repetitions") ? "error" : ""}
      />
      <button>Add Exercise</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default ExerciseForm;
