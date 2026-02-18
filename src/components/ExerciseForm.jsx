import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function ExerciseForm({ addExercise }) {
  const [name, setName] = useState("");
  const [duration, setDuration] = useState("");
  const [calories, setCalories] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !duration || !calories) {
      alert("Fill all fields");
      return;
    }

    const newExercise = {
      id: uuidv4(),
      name,
      duration,
      calories,
    };

    addExercise(newExercise);

    setName("");
    setDuration("");
    setCalories("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded shadow mb-6"
    >
      <h2 className="text-xl font-semibold mb-3">Add Exercise</h2>

      <input
        className="border p-2 mr-2"
        placeholder="Exercise (Push Ups)"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        className="border p-2 mr-2"
        placeholder="Duration (mins)"
        type="number"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
      />

      <input
        className="border p-2 mr-2"
        placeholder="Calories Burned"
        type="number"
        value={calories}
        onChange={(e) => setCalories(e.target.value)}
      />

      <button className="bg-green-500 text-white px-4 py-2">
        Add Exercise
      </button>
    </form>
  );
}
