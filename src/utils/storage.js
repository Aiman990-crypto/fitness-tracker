// src/utils/storage.js

// Get all workouts
export function getWorkouts() {
  const stored = localStorage.getItem("workouts");
  return stored ? JSON.parse(stored) : [];
}

// Save a new workout
export function saveWorkout(workout) {
  const workouts = getWorkouts();
  workouts.push(workout);
  localStorage.setItem("workouts", JSON.stringify(workouts));
}

// Get workout by ID
export function getWorkoutById(id) {
  const workouts = getWorkouts();
  return workouts.find((w) => w.id === Number(id));
}
