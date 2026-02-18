// src/components/Sidebar.jsx
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaDumbbell,
  FaChartLine,
  FaMedal,
  FaClipboardList,
  FaLightbulb,
  FaChartBar,
  FaAppleAlt,
} from "react-icons/fa";

export default function Sidebar() {
  const location = useLocation();
  const [expandedPanels, setExpandedPanels] = useState({});

  // Auto-expand panels if a sub-item is active
  useEffect(() => {
    menuItems.forEach((item) => {
      if (item.subItems?.some((sub) => sub.path === location.pathname)) {
        setExpandedPanels((prev) => ({ ...prev, [item.panel]: true }));
      }
    });
  }, [location.pathname]);

  const togglePanel = (panel) => {
    setExpandedPanels((prev) => ({ ...prev, [panel]: !prev[panel] }));
  };

  const menuItems = [
    { name: "Dashboard", icon: <FaChartLine />, path: "/dashboard" },
    { name: "Add Workout", icon: <FaDumbbell />, path: "/add-workout" },
    { name: "Exercise Guidance", icon: <FaClipboardList />, path: "/exercises" },
    { name: "Analytics", icon: <FaChartBar />, path: "/analytics" },
    { name: "Weekly Goals", icon: <FaMedal />, path: "/weekly-goals" },
    { name: "Motivational Tips", icon: <FaLightbulb />, path: "/tips" },
    {
      name: "Diet & Nutrition",
      icon: <FaAppleAlt />,
      panel: "diet",
      subItems: [
        { name: "Meal Plans", path: "/diet/meal-plans" },
        { name: "Calories Log", path: "/diet/calories-log" },
        { name: "Healthy Recipes", path: "/diet/recipes" },
      ],
    },
  ];

  return (
    <div className="w-64 h-screen bg-gray-900 text-white flex flex-col p-4 space-y-2 shadow-lg">
      <h1 className="text-2xl font-bold mb-8 text-center tracking-wide">Fitness Tracker</h1>

      {menuItems.map((item, idx) => {
        const isActivePanel =
          item.subItems?.some((sub) => sub.path === location.pathname) || location.pathname === item.path;

        return (
          <div key={idx}>
            {item.path ? (
              // Top-level link
              <Link
                to={item.path}
                className={`flex items-center gap-3 p-3 rounded-lg transition ${
                  isActivePanel
                    ? "bg-gradient-to-r from-purple-500 to-indigo-500 font-semibold shadow-lg"
                    : "hover:bg-gray-700"
                }`}
              >
                {item.icon} <span>{item.name}</span>
              </Link>
            ) : (
              // Panel with subItems
              <div>
                <button
                  onClick={() => togglePanel(item.panel)}
                  className={`flex items-center gap-3 w-full p-3 rounded-lg transition ${
                    isActivePanel
                      ? "bg-gradient-to-r from-purple-500 to-indigo-500 font-semibold shadow-lg"
                      : "hover:bg-gray-700"
                  }`}
                >
                  {item.icon} <span>{item.name}</span>
                </button>

                {expandedPanels[item.panel] && (
                  <div className="ml-8 mt-2 space-y-1 text-gray-300 text-sm">
                    {item.subItems?.map((subItem, subIdx) => (
                      <Link
                        key={subIdx}
                        to={subItem.path}
                        className={`block p-2 rounded hover:bg-gray-700 ${
                          location.pathname === subItem.path ? "bg-gray-800 font-semibold" : ""
                        }`}
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
