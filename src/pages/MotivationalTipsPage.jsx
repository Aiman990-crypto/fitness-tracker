// src/pages/MotivationalTipsPage.jsx
import React, { useMemo } from "react";

// Tips with categories
const tips = [
  { text: "Consistency beats motivation. Show up even when you don’t feel like it.", category: "Mindset" },
  { text: "Hydrate well — dehydration reduces strength and endurance.", category: "Nutrition" },
  { text: "Track your progress to stay accountable and motivated.", category: "Mindset" },
  { text: "Focus on proper form, not heavier weight.", category: "Training" },
  { text: "Sleep is where recovery and muscle growth actually happen.", category: "Recovery" },
  { text: "Warm up before workouts to prevent injuries.", category: "Training" },
  { text: "Your body adapts — increase intensity gradually.", category: "Training" },
  { text: "Eat protein after workouts to repair muscles.", category: "Nutrition" },
  { text: "Rest days are part of training, not a break from it.", category: "Recovery" },
  { text: "Small progress daily leads to massive results yearly.", category: "Mindset" },
];

// Category colors
const categoryStyles = {
  Mindset: "bg-purple-100 text-purple-700",
  Training: "bg-blue-100 text-blue-700",
  Nutrition: "bg-green-100 text-green-700",
  Recovery: "bg-orange-100 text-orange-700",
};

export default function MotivationalTipsPage() {
  // Random Tip of the Day (changes on refresh)
  const tipOfTheDay = useMemo(
    () => tips[Math.floor(Math.random() * tips.length)],
    []
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-6">
      {/* 🔥 Hero Section */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-3">
          Stay Motivated 💪
        </h1>
        <p className="text-gray-600 max-w-xl mx-auto">
          Success in fitness isn’t about perfection — it’s about showing up
          consistently and building habits that last.
        </p>
      </div>

      {/* 🌟 Tip of the Day */}
      <div className="max-w-3xl mx-auto mb-12">
        <div className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white p-8 rounded-2xl shadow-xl text-center">
          <h2 className="text-xl font-semibold mb-2">🌟 Tip of the Day</h2>
          <p className="text-lg">{tipOfTheDay.text}</p>
        </div>
      </div>

      {/* 🧠 Tips Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tips.map((tip, idx) => (
          <div
            key={idx}
            className="group bg-white p-6 rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-gray-100"
          >
            {/* Category Badge */}
            <span
              className={`text-xs px-3 py-1 rounded-full font-semibold ${categoryStyles[tip.category]}`}
            >
              {tip.category}
            </span>

            {/* Tip Text */}
            <p className="mt-4 text-gray-700 leading-relaxed">
              {tip.text}
            </p>

            {/* Decorative Line */}
            <div className="mt-6 h-1 w-0 group-hover:w-full bg-gradient-to-r from-purple-400 to-indigo-400 transition-all duration-300 rounded-full"></div>
          </div>
        ))}
      </div>

      {/* 🚀 Bottom Motivation */}
      <div className="text-center mt-16">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">
          Keep Going — You're Doing Great 🚀
        </h3>
        <p className="text-gray-600">
          Fitness is a journey. Every workout, every healthy meal, every rest day
          is part of building a stronger you.
        </p>
      </div>
    </div>
  );
}
