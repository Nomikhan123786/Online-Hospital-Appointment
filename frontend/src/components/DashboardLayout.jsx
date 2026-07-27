import { Link, useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const NAV_ITEMS = {
  admin: [
    { to: "/admin/dashboard", label: "Overview", icon: "📊" },
    { to: "/admin/doctors", label: "Manage Doctors", icon: "🩺" },
    { to: "/admin/patients", label: "Manage Patients", icon: "🧑‍🤝‍🧑" },
    { to: "/admin/reports", label: "Reports", icon: "📈" },
  ],
  doctor: [
    { to: "/doctor/dashboard", label: "Overview", icon: "📊" },
    { to: "/doctor/schedule", label: "My Schedule", icon: "🗓️" },
  ],
  patient: [
    { to: "/dashboard", label: "Overview", icon: "📊" },
    { to: "/doctors", label: "Find Doctors", icon: "🩺" },
    { to: "/appointments", label: "My Appointments", icon: "🗓️" },
  ],
};

const ROLE_LABEL = {
  admin: "Administrator",
  doctor: "Doctor",
  patient: "Patient",
};

const DashboardLayout = ({ children, title, subtitle }) => {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const role = user?.role || "patient";
  const navItems = NAV_ITEMS[role] || [];
  const initials = (user?.name || "U")
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const SidebarContent = () => (
    <>
      <div className="flex items-center gap-2 px-6 py-5 border-b border-white/10">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center font-display font-bold text-white bg-brand-500">
          +
        </div>
        <span className="font-display font-bold text-white text-lg">
          Online Hospital Appointment<span className="text-brand-300">+</span>
        </span>
      </div>

      <nav className="flex-1 px-3 py-6 space-y-1">
        {navItems.map((item) => {
          const active = location.pathname === item.to;
          return (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                active
                  ? "bg-white/10 text-white"
                  : "text-ink-400 hover:text-white hover:bg-white/5"
              }`}
              style={
                active
                  ? { boxShadow: "inset 2px 0 0 var(--color-brand-400)" }
                  : undefined
              }
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="px-3 py-5 border-t border-white/10">
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-ink-400 hover:text-white hover:bg-white/5 transition-colors"
        >
          <span className="text-base">🚪</span>
          Logout
        </button>
      </div>
    </>
  );

  return (
    <div
      className="min-h-screen flex"
      style={{ background: "var(--color-ink-50)" }}
    >
      {/* Desktop sidebar */}
      <aside
        className="hidden lg:flex lg:flex-col w-64 shrink-0"
        style={{ background: "var(--color-ink-900)" }}
      >
        <SidebarContent />
      </aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-40 flex">
          <div
            className="fixed inset-0 bg-black/40"
            onClick={() => setSidebarOpen(false)}
          />
          <aside
            className="relative flex flex-col w-64 z-50 animate-fade-in"
            style={{ background: "var(--color-ink-900)" }}
          >
            <SidebarContent />
          </aside>
        </div>
      )}

      <div className="flex-1 min-w-0 flex flex-col">
        {/* Topbar */}
        <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-ink-100 px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <button
              className="lg:hidden shrink-0 w-9 h-9 flex flex-col justify-center items-center gap-1.5"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open menu"
            >
              <span className="block h-0.5 w-5 bg-ink-800" />
              <span className="block h-0.5 w-5 bg-ink-800" />
              <span className="block h-0.5 w-5 bg-ink-800" />
            </button>
            <div className="min-w-0">
              <h1 className="text-lg sm:text-xl font-display font-bold text-ink-900 truncate">
                {title}
              </h1>
              {subtitle && (
                <p className="text-xs sm:text-sm text-ink-400 truncate">
                  {subtitle}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <span className="hidden sm:inline-block text-xs font-medium text-brand-700 bg-brand-50 px-3 py-1.5 rounded-full">
              {ROLE_LABEL[role] || role}
            </span>
            <div className="w-9 h-9 rounded-full flex items-center justify-center font-display font-semibold text-sm text-white bg-brand-600">
              {initials}
            </div>
          </div>
        </header>

        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6 sm:py-8 animate-fade-in">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
