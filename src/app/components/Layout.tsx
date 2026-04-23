import { useState } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router";
import { Home, List, Users, LogOut, Sprout, Menu, X } from "lucide-react";

interface LayoutProps {
  userType: "admin" | "agent";
}

export default function Layout({ userType }: LayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const basePath = userType === "admin" ? "/admin" : "/agent";

  const isActive = (path: string) => {
    if (path === basePath) {
      return location.pathname === basePath;
    }
    return location.pathname.startsWith(path);
  };

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    navigate("/login");
  };

  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="flex h-screen bg-gray-50 flex-col md:flex-row">
      {/* Mobile Menu Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <div className="bg-green-100 p-2 rounded-lg">
            <Sprout className="w-6 h-6 text-green-700" />
          </div>
          <h1 className="text-lg text-green-700 font-medium">SmartSeason</h1>
        </div>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 text-gray-700">
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'flex' : 'hidden'} md:flex w-full md:w-64 bg-white border-r border-gray-200 flex-col absolute md:relative z-20 h-full md:h-auto overflow-y-auto top-[73px] md:top-0`}>
        {/* Logo (Desktop) */}
        <div className="hidden md:flex p-6 border-b border-gray-200 items-center space-x-2">
          <div className="bg-green-100 p-2 rounded-lg">
            <Sprout className="w-6 h-6 text-green-700" />
          </div>
          <div>
            <h1 className="text-lg text-green-700">SmartSeason</h1>
            <p className="text-xs text-gray-600">Field Monitoring</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          <Link
            to={basePath}
            className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
              isActive(basePath) && location.pathname === basePath
                ? "bg-green-50 text-green-700"
                : "text-gray-700 hover:bg-gray-50"
            }`}
            onClick={closeSidebar}
          >
            <Home className="w-5 h-5" />
            <span className="text-sm">Dashboard</span>
          </Link>

          <Link
            to={`${basePath}/fields`}
            className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
              isActive(`${basePath}/fields`)
                ? "bg-green-50 text-green-700"
                : "text-gray-700 hover:bg-gray-50"
            }`}
            onClick={closeSidebar}
          >
            <List className="w-5 h-5" />
            <span className="text-sm">Fields</span>
          </Link>

          {userType === "admin" && (
            <Link
              to={`${basePath}/agents`}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                isActive(`${basePath}/agents`)
                  ? "bg-green-50 text-green-700"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
              onClick={closeSidebar}
            >
              <Users className="w-5 h-5" />
              <span className="text-sm">Agents</span>
            </Link>
          )}
        </nav>

        {/* User Info & Logout */}
        <div className="p-4 border-t border-gray-200">
          <div className="mb-3 px-4">
            <p className="text-sm">{userType === "admin" ? "Admin User" : "Field Agent"}</p>
            <p className="text-xs text-gray-500">
              {userType === "admin" ? "admin" : "jsmith"}
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 px-4 py-2 w-full text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="text-sm">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto px-8 py-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
