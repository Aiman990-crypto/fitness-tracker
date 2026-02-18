// src/pages/AddWorkout.jsx
import React, { useState, useEffect } from "react";
import { saveWorkout, getWorkouts } from "../utils/storage";
import WorkoutCard from "../components/WorkoutCard";

export default function AddWorkout() {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [exercises, setExercises] = useState([{ name: "", duration: "", calories: "" }]);
  const [recentWorkouts, setRecentWorkouts] = useState([]);

  // Load existing workouts on mount
  useEffect(() => {
    const workouts = getWorkouts();
    setRecentWorkouts(workouts.reverse());
  }, []);

  // Add new workout
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !date) return alert("Fill all workout fields");

    // Validate exercises
    for (const ex of exercises) {
      if (!ex.name || !ex.duration || !ex.calories) {
        return alert("Fill all exercise fields");
      }
    }

    const newWorkout = {
      id: Date.now(),
      name,
      date,
      exercises: exercises.map((ex) => ({
        name: ex.name,
        duration: Number(ex.duration),
        calories: Number(ex.calories),
      })),
    };

    saveWorkout(newWorkout);
    setRecentWorkouts((prev) => [newWorkout, ...prev]);

    // Reset form
    setName("");
    setDate("");
    setExercises([{ name: "", duration: "", calories: "" }]);
  };

  // Update exercise inputs
  const handleExerciseChange = (index, field, value) => {
    const updated = [...exercises];
    updated[index][field] = value;
    setExercises(updated);
  };

  // Add new empty exercise row
  const addExerciseRow = () => {
    setExercises([...exercises, { name: "", duration: "", calories: "" }]);
  };

  // Remove exercise row
  const removeExerciseRow = (index) => {
    const updated = exercises.filter((_, i) => i !== index);
    setExercises(updated);
  };

  // Delete workout
  const removeWorkout = (id) => {
    const updated = recentWorkouts.filter((w) => w.id !== id);
    setRecentWorkouts(updated);
    localStorage.setItem("workouts", JSON.stringify(updated.reverse()));
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Add Workout</h1>

      {/* Add Workout Form */}
      <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mb-8">
        <div>
          <label className="block mb-1 font-semibold">Workout Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 rounded border"
          />
        </div>

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
            <div key={idx} className="flex gap-2 mb-2 items-center">
              <input
                type="text"
                placeholder="Exercise Name"
                value={ex.name}
                onChange={(e) => handleExerciseChange(idx, "name", e.target.value)}
                className="p-2 rounded border flex-1"
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
                  className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  ✕
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addExerciseRow}
            className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            + Add Exercise
          </button>
        </div>

        <button
          type="submit"
          className="mt-4 px-6 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
        >
          Add Workout
        </button>
      </form>

      {/* Recent Workouts */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Recent Workouts</h2>
        {recentWorkouts.length === 0 ? (
          <p className="text-gray-500">No recent workouts yet!</p>
        ) : (
          <div className="flex gap-6 overflow-x-auto pb-4">
            {recentWorkouts.map((w) => (
              <div
                key={w.id}
                className="bg-white p-4 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300"
              >
                <WorkoutCard workout={w} deleteWorkout={removeWorkout} />
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
