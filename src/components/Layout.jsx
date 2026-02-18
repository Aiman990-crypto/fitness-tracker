// src/components/Layout.jsx
import React from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar stays visible */}
      <Sidebar />

      {/* Main content */}
      <main className="flex-1 bg-gray-50 p-6 overflow-auto">
        <Outlet /> {/* Pages render here */}
      </main>
    </div>
  );
}
