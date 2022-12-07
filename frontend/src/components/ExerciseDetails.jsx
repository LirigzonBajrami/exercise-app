import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteExercise } from "../features/exerciseSlice";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const ExerciseDetails = ({ exercise }) => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const handleClick = async () => {
    if (!user) {
      return;
    }

    const res = await fetch(
      "http://localhost:5000/api/exercises/" + exercise._id,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    const data = await res.json();

    if (res.ok) {
      dispatch(deleteExercise(data));
    }
  };

  return (
    <div className="exercise-details">
      <h4>{exercise.title}</h4>
      <p>
        <strong>Load (kg):</strong> {exercise.load}
      </p>
      <p>
        <strong>Repetitions:</strong> {exercise.repetitions}
      </p>
      <p>
        {formatDistanceToNow(new Date(exercise.createdAt), { addSuffix: true })}
      </p>
      <span className="material-symbols-outlined delete" onClick={handleClick}>
        delete
      </span>
    </div>
  );
};

export default ExerciseDetails;
