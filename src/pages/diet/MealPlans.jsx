// src/pages/diet/MealPlans.jsx
import React, { useState, useEffect } from "react";

// ---------- Storage Helpers ----------
const getMeals = () => JSON.parse(localStorage.getItem("meals") || "[]");
const saveMeals = (meals) => localStorage.setItem("meals", JSON.stringify(meals));

const getGoal = () => localStorage.getItem("dietGoal") || "Maintain";
const saveGoal = (goal) => localStorage.setItem("dietGoal", goal);

// ---------- Constants ----------
const days = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];

const calorieTargets = {
  "Weight Loss": 1800,
  "Maintain": 2200,
  "Muscle Gain": 2700,
};

export default function MealPlans() {
  const [meals, setMeals] = useState([]);
  const [goal, setGoal] = useState("Maintain");

  const [name, setName] = useState("");
  const [type, setType] = useState("Breakfast");
  const [day, setDay] = useState("Monday");
  const [calories, setCalories] = useState("");
  const [benefits, setBenefits] = useState("");

  // Load once
  useEffect(() => {
    setMeals(getMeals());
    setGoal(getGoal());
  }, []);

  // ---------- Add Meal ----------
  const addMeal = (e) => {
    e.preventDefault();
    if (!name || !calories) return alert("Fill all required fields");

    const newMeal = {
      id: Date.now(),
      name,
      type,
      day,
      calories: Number(calories),
      benefits,
    };

    const updated = [...meals, newMeal];
    setMeals(updated);
    saveMeals(updated);

    setName("");
    setCalories("");
    setBenefits("");
  };

  // ---------- Delete ----------
  const deleteMeal = (id) => {
    const updated = meals.filter((m) => m.id !== id);
    setMeals(updated);
    saveMeals(updated);
  };

  // ---------- Change Goal ----------
  const changeGoal = (g) => {
    setGoal(g);
    saveGoal(g);
  };

  // ---------- Calories Per Day ----------
  const caloriesByDay = days.reduce((acc, d) => {
    acc[d] = meals
      .filter((m) => m.day === d)
      .reduce((sum, m) => sum + m.calories, 0);
    return acc;
  }, {});

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Weekly Diet Planner</h1>

      {/* Goal Selection */}
      <div className="mb-6">
        <h2 className="font-semibold mb-2">Diet Goal</h2>
        <div className="flex gap-3">
          {["Weight Loss","Maintain","Muscle Gain"].map((g) => (
            <button
              key={g}
              onClick={() => changeGoal(g)}
              className={`px-4 py-2 rounded ${
                goal === g ? "bg-purple-500 text-white" : "bg-white shadow"
              }`}
            >
              {g}
            </button>
          ))}
        </div>
        <p className="text-gray-600 mt-2">
          Daily Target: <strong>{calorieTargets[goal]} kcal</strong>
        </p>
      </div>

      {/* Add Meal */}
      <form onSubmit={addMeal} className="bg-white p-4 rounded shadow mb-8 space-y-3">
        <h2 className="text-xl font-semibold">Add Meal</h2>

        <input
          type="text"
          placeholder="Meal Name"
          value={name}
          onChange={(e)=>setName(e.target.value)}
          className="w-full p-2 border rounded"
        />

        <div className="flex gap-3">
          <select value={type} onChange={(e)=>setType(e.target.value)} className="p-2 border rounded">
            <option>Breakfast</option>
            <option>Lunch</option>
            <option>Dinner</option>
            <option>Snack</option>
          </select>

          <select value={day} onChange={(e)=>setDay(e.target.value)} className="p-2 border rounded">
            {days.map(d=> <option key={d}>{d}</option>)}
          </select>

          <input
            type="number"
            placeholder="Calories"
            value={calories}
            onChange={(e)=>setCalories(e.target.value)}
            className="p-2 border rounded"
          />
        </div>

        <textarea
          placeholder="Benefits (optional)"
          value={benefits}
          onChange={(e)=>setBenefits(e.target.value)}
          className="w-full p-2 border rounded"
        />

        <button className="px-4 py-2 bg-green-500 text-white rounded">
          + Add Meal
        </button>
      </form>

      {/* Weekly View */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {days.map((d) => (
          <div key={d} className="bg-white p-4 rounded shadow">
            <h3 className="font-bold text-lg">{d}</h3>

            <p className={`text-sm mb-2 ${
              caloriesByDay[d] > calorieTargets[goal]
                ? "text-red-500"
                : "text-green-600"
            }`}>
              
            </p>

            <div className="space-y-2">
              {meals.filter(m=>m.day===d).map(meal=>(
                <div key={meal.id} className="border p-2 rounded">
                  <strong>{meal.name}</strong>
                  <p className="text-sm">{meal.type} • {meal.calories} kcal</p>
                  <button
                    onClick={()=>deleteMeal(meal.id)}
                    className="text-red-500 text-xs"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
