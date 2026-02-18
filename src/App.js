// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import WeeklyGoalsPage from "./pages/WeeklyGoalsPage";

// Layout & Pages
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import AddWorkoutPage from "./pages/AddWorkoutPage";
import ExercisesPage from "./pages/ExercisesPage";
import AnalyticsPage from "./pages/Analytics";
import MotivationalTipsPage from "./pages/MotivationalTipsPage";
import MealPlans from "./pages/diet/MealPlans";
import CaloriesLog from "./pages/diet/CaloriesLog";
import HealthyRecipes from "./pages/diet/HealthyRecipes";
import WorkoutDetails from "./pages/WorkoutDetails";
import EditWorkout from "./pages/EditWorkout";
// Context
import { WorkoutProvider } from "./context/WorkoutContext";

function App() {
  return (
    <WorkoutProvider>
      <Router>
        <Routes>
          {/* All pages share the same Layout (Sidebar stays persistent) */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/dashboard" />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="add-workout" element={<AddWorkoutPage />} />
            <Route path="exercises" element={<ExercisesPage />} />
            <Route path="analytics" element={<AnalyticsPage />} />
            <Route path="weekly-goals" element={<WeeklyGoalsPage />} />
            <Route path="tips" element={<MotivationalTipsPage />} />
             <Route path="/workouts/:id" element={<WorkoutDetails />} />
              <Route path="/workouts/edit/:id" element={<EditWorkout />} />
            <Route path="/diet/meal-plans" element={<MealPlans />} />
            <Route path="/diet/calories-log" element={<CaloriesLog />} />
           <Route path="/diet/recipes" element={<HealthyRecipes />} />
          </Route>

          {/* Optional: fallback for 404 */}
          <Route path="*" element={<h1 className="text-center mt-20 text-2xl">Page Not Found</h1>} />
        </Routes>
      </Router>
    </WorkoutProvider>
  );
}

export default App;
