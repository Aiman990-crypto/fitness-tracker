// src/pages/WorkoutDetailsPage.jsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getWorkouts } from "../utils/storage";

const WorkoutDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const workouts = getWorkouts();
  const workout = workouts.find((w) => w.id === Number(id));

  if (!workout) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Workout not found</p>
      </div>
    );
  }

  const exercises = workout.exercises || [];

  return (
    <div className="min-h-screen p-6 bg-gray-50 flex flex-col items-center">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-3xl">
        <h1 className="text-3xl font-bold mb-4">{workout.name}</h1>
        <p className="text-gray-500 mb-6">
          Date: {new Date(workout.date).toLocaleDateString()}
        </p>

        <h2 className="text-2xl font-semibold mb-2">Exercises</h2>
        {exercises.length === 0 ? (
          <p className="text-gray-500">No exercises added yet.</p>
        ) : (
          <ul className="space-y-2">
            {exercises.map((ex, idx) => (
              <li
                key={idx}
                className="p-3 bg-gray-100 rounded-lg flex justify-between"
              >
                <span>{ex.name}</span>
                <span>
                  {ex.duration} mins / {ex.calories} cal
                </span>
              </li>
            ))}
          </ul>
        )}

        <button
          onClick={() => navigate(-1)}
          className="mt-6 px-6 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition"
        >
          ← Back
        </button>
      </div>
    </div>
  );
};

export default WorkoutDetailsPage;
