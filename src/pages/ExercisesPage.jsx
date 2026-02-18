// src/pages/ExercisesPage.jsx
import React from "react";

// Updated & extended exercises data
const exercises = [
  { name: "Push-Ups", benefit: "Builds chest, triceps, and core strength." },
  { name: "Squats", benefit: "Strengthens quads, glutes, hamstrings, and core." },
  { name: "Plank", benefit: "Improves core stability and overall posture." },
  { name: "Lunges", benefit: "Tones legs and glutes, improves balance." },
  { name: "Burpees", benefit: "Full-body cardio exercise for endurance and strength." },
  { name: "Bicep Curls", benefit: "Isolates and strengthens the biceps." },
  { name: "Tricep Dips", benefit: "Tones the triceps and strengthens arms." },
  { name: "Mountain Climbers", benefit: "Cardio + core strength exercise." },
  { name: "Jumping Jacks", benefit: "Full-body warm-up and cardio exercise." },
  { name: "Deadlifts", benefit: "Strengthens back, glutes, and hamstrings." },
  { name: "Bench Press", benefit: "Builds chest, shoulders, and triceps." },
  { name: "Shoulder Press", benefit: "Strengthens shoulders and upper arms." },
  { name: "Leg Raises", benefit: "Targets lower abs for core definition." },
  { name: "Russian Twists", benefit: "Oblique strengthening and core stability." },
  { name: "Pull-Ups", benefit: "Strengthens back, shoulders, and arms." },
  { name: "High Knees", benefit: "Cardio move to increase heart rate and agility." },
  { name: "Jump Squats", benefit: "Explosive leg exercise for power and endurance." },
  { name: "Glute Bridges", benefit: "Targets glutes and hamstrings effectively." },
  { name: "Chest Fly", benefit: "Isolation exercise for chest muscles." },
  { name: "Lat Pulldown", benefit: "Strengthens upper back and lats." },
];

export default function ExercisesPage() {
  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-gray-50 to-indigo-50">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
        💪  Exercises & Their Benefits
      </h1>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {exercises.map((ex, idx) => (
          <div
            key={idx}
            className="bg-white p-5 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-gray-100"
          >
            <h3 className="text-xl font-semibold mb-2">{ex.name}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{ex.benefit}</p>
          </div>
        ))}
      </div>

      <div className="text-center mt-12 text-gray-600">
        <p>Stay consistent, perform exercises correctly, and combine with proper nutrition for best results!</p>
      </div>
    </div>
  );
}
