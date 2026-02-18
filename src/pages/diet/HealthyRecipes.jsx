// src/pages/diet/HealthyRecipes.jsx
import React, { useState } from "react";

const recipesData = [
  {
    id: 1,
    name: "Grilled Chicken Salad",
    calories: 400,
    goal: "Weight Loss",
    ingredients: ["Chicken Breast", "Lettuce", "Olive Oil", "Tomatoes"],
    steps: [
      "Season chicken with salt and pepper.",
      "Grill 5–6 minutes each side.",
      "Chop vegetables.",
      "Slice chicken and mix together.",
      "Drizzle olive oil and serve.",
    ],
    benefits: "High protein, low carbs — helps fat loss while preserving muscle.",
  },
  {
    id: 2,
    name: "Quinoa Power Bowl",
    calories: 550,
    goal: "Muscle Gain",
    ingredients: ["Quinoa", "Chickpeas", "Spinach", "Avocado"],
    steps: [
      "Cook quinoa.",
      "Roast chickpeas lightly.",
      "Add spinach and sliced avocado.",
      "Combine everything in a bowl.",
    ],
    benefits: "Provides sustained energy and supports muscle recovery.",
  },
  {
    id: 3,
    name: "Smoothie Bowl",
    calories: 300,
    goal: "Weight Loss",
    ingredients: ["Banana", "Berries", "Greek Yogurt", "Chia Seeds"],
    steps: [
      "Blend banana, berries, and yogurt.",
      "Pour into a bowl.",
      "Top with chia seeds.",
    ],
    benefits: "Rich in fiber and antioxidants — keeps you full longer.",
  },
  {
    id: 4,
    name: "Salmon & Steamed Veggies",
    calories: 600,
    goal: "Muscle Gain",
    ingredients: ["Salmon", "Broccoli", "Sweet Potato"],
    steps: [
      "Season salmon and bake for 12–15 minutes.",
      "Steam broccoli.",
      "Boil or roast sweet potato.",
      "Serve together.",
    ],
    benefits: "Omega-3 improves recovery and boosts metabolism.",
  },
  {
    id: 5,
    name: "Egg Avocado Toast",
    calories: 450,
    goal: "Maintenance",
    ingredients: ["Eggs", "Whole Grain Bread", "Avocado"],
    steps: [
      "Toast bread.",
      "Cook eggs to preference.",
      "Mash avocado and spread.",
      "Top with egg.",
    ],
    benefits: "Balanced fats + protein for steady daily energy.",
  },
  {
    id: 6,
    name: "Oats & Peanut Butter Bowl",
    calories: 520,
    goal: "Muscle Gain",
    ingredients: ["Oats", "Peanut Butter", "Milk", "Banana"],
    steps: [
      "Cook oats with milk.",
      "Add peanut butter and stir.",
      "Top with banana slices.",
    ],
    benefits: "High-calorie clean meal ideal for bulking and strength.",
  },
  {
    id: 7,
    name: "Greek Yogurt Parfait",
    calories: 280,
    goal: "Weight Loss",
    ingredients: ["Greek Yogurt", "Granola", "Honey", "Berries"],
    steps: [
      "Add yogurt to a glass.",
      "Layer berries and granola.",
      "Drizzle honey.",
    ],
    benefits: "High protein snack that controls hunger cravings.",
  },
  {
    id: 8,
    name: "Brown Rice Chicken Bowl",
    calories: 480,
    goal: "Maintenance",
    ingredients: ["Brown Rice", "Chicken", "Vegetables"],
    steps: [
      "Cook brown rice.",
      "Grill chicken.",
      "Stir-fry vegetables.",
      "Combine everything.",
    ],
    benefits: "Balanced carbs + protein for all-day productivity.",
  },
  {
    id: 9,
    name: "Lentil (Daal) Power Meal",
    calories: 420,
    goal: "Weight Loss",
    ingredients: ["Lentils", "Spices", "Salad", "Olive Oil"],
    steps: [
      "Boil lentils.",
      "Add spices and simmer.",
      "Serve with fresh salad.",
    ],
    benefits: "Plant protein + fiber improves digestion and fat loss.",
  },
  {
    id: 10,
    name: "Beef & Sweet Potato Plate",
    calories: 650,
    goal: "Muscle Gain",
    ingredients: ["Lean Beef", "Sweet Potato", "Green Beans"],
    steps: [
      "Grill lean beef.",
      "Roast sweet potato.",
      "Steam green beans.",
      "Serve together.",
    ],
    benefits: "Iron-rich meal to support muscle growth and strength.",
  },
  {
    id: 11,
    name: "Vegetable Omelette",
    calories: 320,
    goal: "Weight Loss",
    ingredients: ["Eggs", "Spinach", "Capsicum", "Onion"],
    steps: [
      "Whisk eggs.",
      "Cook vegetables in pan.",
      "Add eggs and cook until set.",
    ],
    benefits: "Low calorie, high protein — perfect breakfast cut meal.",
  },
  {
    id: 12,
    name: "Tuna Whole-Wheat Wrap",
    calories: 370,
    goal: "Maintenance",
    ingredients: ["Tuna", "Whole Wheat Wrap", "Lettuce", "Yogurt Sauce"],
    steps: [
      "Mix tuna with yogurt sauce.",
      "Add lettuce to wrap.",
      "Fill with tuna mixture and roll.",
    ],
    benefits: "Lean protein meal great for light lunch.",
  },
  {
    id: 13,
    name: "Protein Pancakes",
    calories: 430,
    goal: "Muscle Gain",
    ingredients: ["Oats", "Eggs", "Protein Powder", "Banana"],
    steps: [
      "Blend ingredients.",
      "Cook pancakes on non-stick pan.",
      "Flip and cook both sides.",
    ],
    benefits: "Perfect pre-workout meal for energy and recovery.",
  },
  {
    id: 14,
    name: "Chickpea Salad",
    calories: 350,
    goal: "Weight Loss",
    ingredients: ["Chickpeas", "Cucumber", "Tomato", "Lemon"],
    steps: [
      "Mix boiled chickpeas with vegetables.",
      "Add lemon and seasoning.",
      "Serve fresh.",
    ],
    benefits: "High fiber meal that supports gut health.",
  },
  {
    id: 15,
    name: "Grilled Paneer Bowl",
    calories: 500,
    goal: "Muscle Gain",
    ingredients: ["Paneer", "Rice", "Vegetables"],
    steps: [
      "Grill paneer cubes.",
      "Cook rice.",
      "Stir-fry vegetables.",
      "Combine in bowl.",
    ],
    benefits: "Excellent vegetarian protein source for muscle building.",
  },
];


export default function HealthyRecipes() {
  const [search, setSearch] = useState("");
  const [goalFilter, setGoalFilter] = useState("All");
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const filteredRecipes = recipesData.filter((recipe) => {
    const matchesSearch = recipe.name.toLowerCase().includes(search.toLowerCase());
    const matchesGoal = goalFilter === "All" || recipe.goal === goalFilter;
    return matchesSearch && matchesGoal;
  });

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-2">Healthy Recipes</h1>
      <p className="text-gray-600 mb-6">Choose meals based on your fitness goal.</p>

      {/* 🔎 Search + Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search recipes..."
          className="p-2 border rounded w-full md:w-1/2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="p-2 border rounded w-full md:w-1/4"
          value={goalFilter}
          onChange={(e) => setGoalFilter(e.target.value)}
        >
          <option value="All">All Goals</option>
          <option value="Weight Loss">Weight Loss</option>
          <option value="Muscle Gain">Muscle Gain</option>
          <option value="Maintenance">Maintenance</option>
        </select>
      </div>

      {/* 🍽 Recipe Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredRecipes.map((recipe) => (
          <div
            key={recipe.id}
            className="bg-white p-5 rounded-xl shadow hover:shadow-xl transition"
          >
            <h2 className="text-xl font-semibold">{recipe.name}</h2>
            <p className="text-sm text-gray-500">{recipe.goal}</p>
            <p className="mt-2 font-medium">{recipe.calories} kcal</p>

            <button
              className="mt-4 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
              onClick={() => setSelectedRecipe(recipe)}
            >
              View Details
            </button>
          </div>
        ))}
      </div>

      {/* 📖 Recipe Modal */}
      {selectedRecipe && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          onClick={() => setSelectedRecipe(null)}
        >
          <div
            className="bg-white p-6 rounded-xl w-[90%] md:w-[520px] max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()} // prevents click blocking issue
          >
            <h2 className="text-2xl font-bold mb-2">{selectedRecipe.name}</h2>
            <p className="text-gray-600 mb-3">
              {selectedRecipe.calories} kcal • {selectedRecipe.goal}
            </p>

            <h3 className="font-semibold">Ingredients:</h3>
            <ul className="list-disc ml-6 mb-4">
              {selectedRecipe.ingredients.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>

            <h3 className="font-semibold">How to Make:</h3>
            <ol className="list-decimal ml-6 mb-4">
              {selectedRecipe.steps.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>

            <h3 className="font-semibold">Benefits:</h3>
            <p className="text-gray-700 mb-5">{selectedRecipe.benefits}</p>

            <button
              className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800"
              onClick={() => setSelectedRecipe(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
