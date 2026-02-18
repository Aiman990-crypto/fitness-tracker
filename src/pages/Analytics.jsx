// src/pages/Analytics.jsx
import React, { useEffect, useState } from "react";
import { getWorkouts } from "../utils/storage";
import { Link } from "react-router-dom";
import ProgressChart from "../components/ProgressChart";

export default function Analytics() {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    try {
      const saved = getWorkouts();

      if (!Array.isArray(saved)) {
        setWorkouts([]);
        return;
      }

      const safeWorkouts = saved
        .filter(Boolean) // remove null/undefined
        .map((w) => ({
          id: w.id || Math.random().toString(),
          name: w.name || "Unnamed Workout",
          date: w.date ? new Date(w.date).toISOString() : new Date().toISOString(),
          exercises: Array.isArray(w.exercises) ? w.exercises : [],
        }));

      setWorkouts(safeWorkouts);
    } catch (err) {
      console.error("Error loading workouts:", err);
      setWorkouts([]);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6 space-y-8">
      <Link
        to="/dashboard"
        className="text-blue-500 font-semibold hover:underline"
      >
        ← Back to Dashboard
      </Link>

      <h1 className="text-3xl font-bold">📊 Workout Analytics</h1>

      {workouts.length === 0 ? (
        <p className="mt-6 text-gray-600">
          No workouts yet. Add some from Dashboard!
        </p>
      ) : (
        <div className="space-y-6">
          <div className="max-w-4xl mx-auto">
            <ProgressChart workouts={workouts} />
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">All Workouts</h2>
            <ul className="space-y-3">
              {workouts.map((w) => (
                <li
                  key={w.id}
                  className="p-4 bg-white rounded-xl shadow flex justify-between items-center hover:shadow-lg transition"
                >
                  <div>
                    <p className="font-semibold">{w.name}</p>
                    <p className="text-gray-500">
                      {new Date(w.date).toLocaleDateString()}
                    </p>
                  </div>
                  <Link
                    to={`/workouts/${w.id}`}
                    className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition"
                  >
                    View Details
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
