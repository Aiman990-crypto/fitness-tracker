// src/context/WorkoutContext.jsx
import { createContext, useContext, useState } from "react";

// Create context
const WorkoutContext = createContext();

// Provider component
export const WorkoutProvider = ({ children }) => {
  const [workouts, setWorkouts] = useState([]);

  // Add a workout
  const addWorkout = (workout) => {
    setWorkouts((prev) => [...prev, workout]);
  };

  // Remove a workout
  const removeWorkout = (id) => {
    setWorkouts((prev) => prev.filter((w) => w.id !== id));
  };

  return (
    <WorkoutContext.Provider value={{ workouts, addWorkout, removeWorkout }}>
      {children}
    </WorkoutContext.Provider>
  );
};

// Custom hook
export const useWorkouts = () => useContext(WorkoutContext);
