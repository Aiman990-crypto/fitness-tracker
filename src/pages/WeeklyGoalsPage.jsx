// src/pages/WeeklyGoalsPage.jsx
import React, { useState, useEffect } from "react";
import { useWorkouts } from "../context/WorkoutContext";

export default function WeeklyGoalsPage() {
  const { workouts } = useWorkouts();

  // Weekly goal targets
  const weeklyGoal = {
    workouts: 5, // target workouts per week
    calories: 2000, // kcal
    duration: 300, // minutes
  };

  // Get current week's start and end
  const currentWeekStart = new Date();
  currentWeekStart.setDate(currentWeekStart.getDate() - currentWeekStart.getDay()); // Sunday
  const currentWeekEnd = new Date(currentWeekStart);
  currentWeekEnd.setDate(currentWeekEnd.getDate() + 6); // Saturday

  // Filter workouts for this week
  const weeklyWorkouts = workouts.filter((w) => {
    const date = new Date(w.date);
    return date >= currentWeekStart && date <= currentWeekEnd;
  });

  // Weekly progress calculations
  const workoutsCompleted = weeklyWorkouts.length;
  const caloriesBurned = weeklyWorkouts.reduce(
    (sum, w) =>
      sum + w.exercises.reduce((s, ex) => s + Number(ex.calories || 0), 0),
    0
  );
  const durationMinutes = weeklyWorkouts.reduce(
    (sum, w) =>
      sum + w.exercises.reduce((s, ex) => s + Number(ex.duration || 0), 0),
    0
  );

  // Helper function to calculate percent
  const progressPercent = (value, goal) =>
    Math.min(Math.round((value / goal) * 100), 100);

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <h1 className="text-3xl font-bold mb-8 text-center">📅 Weekly Goals</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Workouts Completed */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-lg font-semibold mb-2">Workouts Completed</h2>
          <p className="text-gray-500 mb-4">
            {workoutsCompleted} / {weeklyGoal.workouts}
          </p>
          <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
            <div
              className="bg-purple-500 h-4 rounded-full transition-all duration-1000 ease-in-out"
              style={{
                width: `${progressPercent(workoutsCompleted, weeklyGoal.workouts)}%`,
              }}
            ></div>
          </div>
        </div>

        {/* Calories Burned */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-lg font-semibold mb-2">Calories Burned</h2>
          <p className="text-gray-500 mb-4">
            {caloriesBurned} / {weeklyGoal.calories} kcal
          </p>
          <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
            <div
              className="bg-yellow-500 h-4 rounded-full transition-all duration-1000 ease-in-out"
              style={{
                width: `${progressPercent(caloriesBurned, weeklyGoal.calories)}%`,
              }}
            ></div>
          </div>
        </div>

        {/* Total Duration */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-lg font-semibold mb-2">Total Duration</h2>
          <p className="text-gray-500 mb-4">
            {durationMinutes} / {weeklyGoal.duration} mins
          </p>
          <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
            <div
              className="bg-green-500 h-4 rounded-full transition-all duration-1000 ease-in-out"
              style={{
                width: `${progressPercent(durationMinutes, weeklyGoal.duration)}%`,
              }}
            ></div>
          </div>
        </div>
      </div>

      {/* Motivational Note */}
      <div className="mt-8 bg-indigo-100 p-6 rounded-xl shadow-lg">
        <h3 className="text-xl font-semibold mb-2">💡 Keep Going!</h3>
        <p className="text-gray-700">
          Every small workout counts! Track your progress daily and stay consistent.
        </p>
      </div>
    </div>
  );
}
