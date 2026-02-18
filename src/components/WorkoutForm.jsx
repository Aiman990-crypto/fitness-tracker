import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function WorkoutForm({ addWorkout }) {
  const [name, setName] = useState("");
  const [date, setDate] = useState(null); // null initially for DatePicker

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !date) {
      alert("Please fill all fields");
      return;
    }

    const newWorkout = {
      id: uuidv4(),
      name,
      date: date.toISOString().split("T")[0], // store as YYYY-MM-DD
      exercises: [],
    };

    addWorkout(newWorkout);

    setName("");
    setDate(null);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 max-w-3xl mx-auto transform transition hover:scale-105 duration-300"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white p-5 rounded-xl mb-6 shadow-lg">
        <h2 className="text-2xl font-bold">➕ Add New Workout</h2>
        <p className="text-sm opacity-90 mt-1">
          Keep track of your daily fitness activities
        </p>
      </div>

      {/* Inputs */}
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <input
          type="text"
          placeholder="Workout Name (e.g., Leg Day)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="flex-1 border-2 border-gray-200 p-3 rounded-xl shadow-inner focus:ring-2 focus:ring-purple-400 focus:outline-none transition"
        />

        {/* Date Picker */}
        <DatePicker
          selected={date}
          onChange={(date) => setDate(date)}
          placeholderText="Select Date"
          className="border-2 border-gray-200 p-3 rounded-xl shadow-inner focus:ring-2 focus:ring-purple-400 focus:outline-none w-full md:w-auto"
          dateFormat="yyyy-MM-dd"
        />

        <button
          type="submit"
          className="px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold rounded-xl shadow-lg hover:scale-105 hover:shadow-2xl transition transform duration-300"
        >
          Add Workout
        </button>
      </div>
    </form>
  );
}
