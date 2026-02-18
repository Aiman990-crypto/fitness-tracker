// src/components/WorkoutCard.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa"; // icons for buttons

const WorkoutCard = ({ workout, deleteWorkout }) => {
  const exercises = workout.exercises || [];
  const navigate = useNavigate();

  const handleEdit = () => navigate(`/workouts/edit/${workout.id}`);

  return (
    <div className="bg-white p-5 rounded-2xl shadow-lg w-64 flex flex-col justify-between hover:shadow-xl transition-shadow">
      {/* Workout Info */}
      <div>
        <h3 className="text-lg font-bold mb-2 text-gray-800">{workout.name}</h3>
        <p className="text-gray-500 mb-1">
          <span className="font-semibold">Date:</span>{" "}
          {new Date(workout.date).toLocaleDateString()}
        </p>
        <p className="text-gray-500">
          <span className="font-semibold">Exercises:</span> {exercises.length}
        </p>
      </div>

      {/* Buttons */}
      <div className="flex gap-2 mt-4 flex-wrap">
        <Link
          to={`/workouts/${workout.id}`}
          className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-purple-500 text-white text-sm font-semibold rounded-xl hover:bg-purple-600 hover:shadow-md transition"
        >
          <FaEye /> View
        </Link>

        <button
          onClick={handleEdit}
          className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-yellow-500 text-white text-sm font-semibold rounded-xl hover:bg-yellow-600 hover:shadow-md transition"
        >
          <FaEdit /> Edit
        </button>

        {deleteWorkout && (
          <button
            onClick={() => deleteWorkout(workout.id)}
            className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-red-500 text-white text-sm font-semibold rounded-xl hover:bg-red-600 hover:shadow-md transition"
          >
            <FaTrash /> Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default WorkoutCard;
