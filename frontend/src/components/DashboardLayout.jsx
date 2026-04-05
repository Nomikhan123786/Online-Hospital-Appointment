import { Link } from "react-router-dom";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-dark text-white p-6 space-y-6">
        <h2 className="text-2xl font-bold">Dashboard</h2>

        <Link to="/dashboard" className="block hover:text-gray-300">
          Overview
        </Link>
        <Link to="/appointments" className="block hover:text-gray-300">
          Appointments
        </Link>
      </aside>

      <main className="flex-1 p-10 bg-gray-100">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;