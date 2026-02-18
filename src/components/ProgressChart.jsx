// src/components/ProgressChart.jsx
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function ProgressChart({ workouts = [] }) {
  // ✅ Ensure workouts is always an array
  const safeWorkouts = Array.isArray(workouts) ? workouts.filter(Boolean) : [];

  // ✅ Prepare chart data safely
  const data = safeWorkouts
    .map((w) => {
      const exercises = Array.isArray(w.exercises) ? w.exercises : [];

      const calories = exercises.reduce(
        (sum, ex) => sum + Number(ex?.calories || 0),
        0
      );

      const duration = exercises.reduce(
        (sum, ex) => sum + Number(ex?.duration || 0),
        0
      );

      // Use today as fallback if date missing/invalid
      const dateObj = w.date ? new Date(w.date) : new Date();

      return {
        date: isNaN(dateObj.getTime())
          ? new Date().toLocaleDateString()
          : dateObj.toLocaleDateString(),
        calories,
        duration,
      };
    })
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  // ✅ If no data, show friendly message
  if (data.length === 0) {
    return (
      <div className="p-6 bg-white rounded shadow text-gray-500 text-center">
        No progress data yet. Add exercises to workouts to see analytics.
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-xl font-bold mb-4">📈 Progress Over Time</h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />

          {/* ✅ Colored lines with labels */}
          <Line
            type="monotone"
            dataKey="calories"
            stroke="#f97316" // orange
            strokeWidth={3}
            name="Calories Burned"
          />
          <Line
            type="monotone"
            dataKey="duration"
            stroke="#3b82f6" // blue
            strokeWidth={3}
            name="Duration (min)"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
