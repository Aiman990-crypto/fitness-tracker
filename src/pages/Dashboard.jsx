// src/pages/Dashboard.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import WorkoutCard from "../components/WorkoutCard";
import { useWorkouts } from "../context/WorkoutContext";
import { exercises } from "../data/exercises";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function Dashboard() {
  const { workouts, removeWorkout } = useWorkouts();
  const sampleWeeklyData = [
  { day: "Mon", workouts: 2 },
  { day: "Tue", workouts: 1 },
  { day: "Wed", workouts: 3 },
  { day: "Thu", workouts: 2 },
  { day: "Fri", workouts: 1 },
  { day: "Sat", workouts: 0 },
  { day: "Sun", workouts: 2 },
];

  const [showAll, setShowAll] = useState(false);
  const displayedExercises = showAll ? exercises : exercises.slice(0, 3);
const sampleUpcomingWorkout = {
  name: "Full Body Strength",
  date: new Date().setDate(new Date().getDate() + 1), // tomorrow
};
  // Stats
  const totalWorkouts = workouts.length;
  const totalCalories = workouts.reduce(
    (sum, w) =>
      sum + w.exercises.reduce((s, ex) => s + Number(ex.calories || 0), 0),
    0
  );
  const totalDuration = workouts.reduce(
    (sum, w) =>
      sum + w.exercises.reduce((s, ex) => s + Number(ex.duration || 0), 0),
    0
  );

  const recentWorkouts = [...workouts]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 4);

  // Weekly Summary with Recharts
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const weeklyData = daysOfWeek.map((day, idx) => ({
    day,
    workouts: workouts.filter((w) => new Date(w.date).getDay() === idx).length,
  }));

  // Next Workout
  const upcomingWorkout =
    workouts
      .filter((w) => new Date(w.date) >= new Date())
      .sort((a, b) => new Date(a.date) - new Date(b.date))[0] || null;

  // Personal Bests
  const maxCaloriesWorkout =
    workouts.length > 0
      ? workouts.reduce((max, w) => {
          const cals = w.exercises.reduce(
            (s, ex) => s + Number(ex.calories || 0),
            0
          );
          return cals > max ? cals : max;
        }, 0)
      : 0;

  const maxDurationWorkout =
    workouts.length > 0
      ? workouts.reduce((max, w) => {
          const dur = w.exercises.reduce(
            (s, ex) => s + Number(ex.duration || 0),
            0
          );
          return dur > max ? dur : max;
        }, 0)
      : 0;

  // Daily Tip
  const tips = [
    "Stay hydrated before your workout!",
    "Stretch for 5 mins before exercising.",
    "Track your progress daily.",
    "Prioritize sleep for recovery.",
    "Maintain proper form to avoid injuries.",
  ];
  const dailyTip = tips[Math.floor(Math.random() * tips.length)];

  return (
    <div className="min-h-screen bg-gray-50 p-6 space-y-8">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-800">
            🏋️ Fitness Dashboard
          </h1>
          <p className="text-gray-500 mt-1">Track your workouts & progress</p>
        </div>
        <Link
          to="/analytics"
          className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold px-5 py-2 rounded-full shadow hover:scale-105 transition-transform"
        >
          View Analytics
        </Link>
      </header>

      {/* Stats Cards */}
      <section className="grid md:grid-cols-4 gap-6">
        <div className="card3d p-5 rounded-xl shadow-lg bg-gradient-to-br from-purple-500 to-indigo-500 text-white">
          <h2 className="text-lg font-semibold">Total Workouts</h2>
          <p className="text-3xl font-bold mt-1">{totalWorkouts}</p>
        </div>
        <div className="card3d p-5 rounded-xl shadow-lg bg-gradient-to-br from-yellow-400 to-orange-500 text-white">
          <h2 className="text-lg font-semibold">Calories Burned</h2>
          <p className="text-3xl font-bold mt-1">{totalCalories}</p>
        </div>
        <div className="card3d p-5 rounded-xl shadow-lg bg-gradient-to-br from-green-400 to-teal-500 text-white">
          <h2 className="text-lg font-semibold">Total Duration</h2>
          <p className="text-3xl font-bold mt-1">{totalDuration} mins</p>
        </div>
        <div className="card3d p-5 rounded-xl shadow-lg bg-gradient-to-br from-pink-400 to-red-500 text-white">
          <h2 className="text-lg font-semibold">Active Days</h2>
          <p className="text-3xl font-bold mt-1">
            {new Set(workouts.map((w) => w.date)).size}
          </p>
        </div>
      </section>

     
      {/* Weekly Summary */}
      <section className="p-6 bg-white rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-4">📊 Weekly Summary</h2>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart
            data={weeklyData}
            margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="day"
              tick={{ fill: "#6b7280", fontSize: 14 }}
            />
            <YAxis tick={{ fill: "#6b7280", fontSize: 14 }} />
            <Tooltip
              contentStyle={{ backgroundColor: "#f9fafb", borderRadius: 8 }}
              itemStyle={{ color: "#7c3aed", fontWeight: "bold" }}
            />
            <Bar
              dataKey="workouts"
              fill="#7c3aed"
              radius={[5, 5, 0, 0]}
              barSize={40}
            />
          </BarChart>
        </ResponsiveContainer>
      </section>

      {/* Next Workout */}
      {upcomingWorkout && (
        <section className="p-6 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold mb-2">⏱ Next Workout</h2>
          <p className="text-gray-700">
            {upcomingWorkout.name} on{" "}
            {new Date(upcomingWorkout.date).toLocaleDateString(undefined, {
              weekday: "short",
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </p>
        </section>
      )}

      {/* Personal Bests */}
      <section className="grid md:grid-cols-2 gap-6">
        <div className="card3d p-6 bg-gradient-to-r from-green-100 to-teal-100 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-1">🔥 Max Calories Burned</h2>
          <p className="text-3xl font-bold">{maxCaloriesWorkout}</p>
        </div>
        <div className="card3d p-6 bg-gradient-to-r from-yellow-100 to-orange-200 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-1">⏳ Longest Duration</h2>
          <p className="text-3xl font-bold">{maxDurationWorkout} mins</p>
        </div>
      </section>

     


      {/* Daily Fitness Tip */}
      <section className="card3d p-6 bg-gradient-to-r from-indigo-200 to-purple-200 rounded-xl shadow-lg hover:scale-105">
        <h3 className="text-xl font-semibold mb-2">💡 Daily Tip</h3>
        <p>{dailyTip}</p>
      </section>
    </div>
  );
}
