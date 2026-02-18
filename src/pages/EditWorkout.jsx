// src/pages/EditWorkout.jsx
import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getWorkouts } from "../utils/storage";

export default function EditWorkout() {
  const { id } = useParams();
  const navigate = useNavigate();

  // ✅ Load workouts ONLY once
  const [workouts] = useState(() => getWorkouts());

  const workoutToEdit = workouts.find((w) => w.id === Number(id));

  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [exercises, setExercises] = useState([
    { name: "", duration: "", calories: "" },
  ]);

  // ✅ Prevent resetting form while typing
  const initialized = useRef(false);

  // Prefill form when workout loads
  useEffect(() => {
    if (!workoutToEdit || initialized.current) return;

    setName(workoutToEdit.name || "");
    setDate(workoutToEdit.date || "");
    setExercises(
      workoutToEdit.exercises?.length
        ? workoutToEdit.exercises.map((ex) => ({
            name: ex.name?.toString() || "",
            duration: ex.duration?.toString() || "",
            calories: ex.calories?.toString() || "",
          }))
        : [{ name: "", duration: "", calories: "" }]
    );

    initialized.current = true; // ✅ run only once
  }, [workoutToEdit]);


  // Show error if workout not found
  if (!workoutToEdit) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Workout not found</p>
      </div>
    );
  }

  // Handle exercises change
  const handleExerciseChange = (index, field, value) => {
    const updated = [...exercises];
    updated[index] = { ...updated[index], [field]: value };
    setExercises(updated);
  };

  const addExerciseRow = () =>
    setExercises([...exercises, { name: "", duration: "", calories: "" }]);

  const removeExerciseRow = (index) =>
    setExercises(exercises.filter((_, i) => i !== index));

  // Submit updated workout
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !date) return alert("Fill all workout fields");

    for (const ex of exercises) {
      if (!ex.name || !ex.duration || !ex.calories) {
        return alert("Fill all exercise fields");
      }
    }

    const updatedWorkout = {
      ...workoutToEdit,
      name,
      date,
      exercises: exercises.map((ex) => ({
        name: ex.name,
        duration: Number(ex.duration),
        calories: Number(ex.calories),
      })),
    };

    const updatedWorkouts = workouts.map((w) =>
      w.id === updatedWorkout.id ? updatedWorkout : w
    );

    localStorage.setItem("workouts", JSON.stringify(updatedWorkouts));
    navigate("/"); // go back to dashboard
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Edit Workout</h1>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
        {/* Workout Name */}
        <div>
          <label className="block mb-1 font-semibold">Workout Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 rounded border"
          />
        </div>

        {/* Date */}
        <div>
          <label className="block mb-1 font-semibold">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-2 rounded border"
          />
        </div>

        {/* Exercises */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Exercises</h2>
          {exercises.map((ex, idx) => (
            <div key={idx} className="flex gap-2 mb-2 items-center flex-wrap">
              <input
                type="text"
                placeholder="Exercise Name"
                value={ex.name}
                onChange={(e) => handleExerciseChange(idx, "name", e.target.value)}
                className="p-2 rounded border flex-1 min-w-[120px]"
              />
              <input
                type="number"
                placeholder="Duration (min)"
                value={ex.duration}
                onChange={(e) => handleExerciseChange(idx, "duration", e.target.value)}
                className="p-2 rounded border w-28"
              />
              <input
                type="number"
                placeholder="Calories"
                value={ex.calories}
                onChange={(e) => handleExerciseChange(idx, "calories", e.target.value)}
                className="p-2 rounded border w-28"
              />
              {exercises.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeExerciseRow(idx)}
                  className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                >
                  ✕
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addExerciseRow}
            className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
          >
            + Add Exercise
          </button>
        </div>

        <button
          type="submit"
          className="mt-4 px-6 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
