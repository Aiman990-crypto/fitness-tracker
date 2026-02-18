// src/components/Layout.jsx
import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi"; // Hamburger icons

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* Mobile Overlay Sidebar */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity md:hidden ${
          sidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setSidebarOpen(false)}
      ></div>

      {/* Sidebar */}
      <aside
        className={`fixed z-50 top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 md:static md:translate-x-0 md:flex ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar />
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Mobile Navbar */}
        <header className="md:hidden flex items-center justify-between bg-gray-50 p-4 shadow">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-2xl text-gray-700 focus:outline-none"
          >
            {sidebarOpen ? <HiX /> : <HiMenu />}
          </button>
          
        </header>

        {/* Page Content */}
        <main className="flex-1 bg-gray-50 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
