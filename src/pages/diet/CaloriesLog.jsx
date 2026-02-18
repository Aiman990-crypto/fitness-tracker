// src/pages/diet/CaloriesLog.jsx
import React, { useState, useEffect } from "react";

// Helpers (same storage used in MealPlans)
const getMeals = () => JSON.parse(localStorage.getItem("meals") || "[]");
const getGoal = () => localStorage.getItem("dietGoal") || "Maintain";

const calorieTargets = {
  "Weight Loss": 1800,
  "Maintain": 2200,
  "Muscle Gain": 2700,
};

const days = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];

export default function CaloriesLog() {
  const [meals, setMeals] = useState([]);
  const [selectedDay, setSelectedDay] = useState(days[new Date().getDay() - 1] || "Monday");
  const [goal, setGoal] = useState("Maintain");

  // Load meals + goal once
  useEffect(() => {
    setMeals(getMeals());
    setGoal(getGoal());
  }, []);

  // Meals for selected day
  const todaysMeals = meals.filter((m) => m.day === selectedDay);

  // Total calories
  const totalCalories = todaysMeals.reduce((sum, m) => sum + m.calories, 0);

  const target = calorieTargets[goal];
  const percentage = Math.min((totalCalories / target) * 100, 100);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-2">Calories Tracker</h1>
      <p className="text-gray-600 mb-6">
        Monitor your daily intake based on your diet goal.
      </p>

      {/* Day Selector */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {days.map((d) => (
          <button
            key={d}
            onClick={() => setSelectedDay(d)}
            className={`px-4 py-2 rounded ${
              selectedDay === d ? "bg-purple-500 text-white" : "bg-white shadow"
            }`}
          >
            {d}
          </button>
        ))}
      </div>

      {/* Summary Card */}
      <div className="bg-white p-5 rounded-xl shadow mb-6">
        <h2 className="text-xl font-semibold">{selectedDay} Summary</h2>
        <p className="text-gray-600">Goal: {goal}</p>

        <div className="mt-3 text-lg font-bold">
          {totalCalories} / {target} kcal
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 h-4 rounded mt-3">
          <div
            className={`h-4 rounded ${
              totalCalories > target ? "bg-red-500" : "bg-green-500"
            }`}
            style={{ width: `${percentage}%` }}
          />
        </div>

        <p className="text-sm mt-2 text-gray-500">
          {totalCalories > target
            ? "You exceeded your calorie goal"
            : "You're within your calorie goal"}
        </p>
      </div>

      {/* Meal List */}
      {todaysMeals.length === 0 ? (
        <p className="text-gray-500">No meals logged for this day.</p>
      ) : (
        <div className="space-y-3">
          {todaysMeals.map((meal) => (
            <div
              key={meal.id}
              className="flex justify-between items-center bg-white p-4 rounded shadow"
            >
              <div>
                <h3 className="font-semibold">{meal.name}</h3>
                <p className="text-sm text-gray-500">{meal.type}</p>
              </div>

              <div className="text-purple-600 font-bold">
                {meal.calories} kcal
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
