import { createBrowserRouter } from "react-router";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import ChangePassword from "./pages/ChangePassword";
import AdminDashboard from "./pages/AdminDashboard";
import AgentDashboard from "./pages/AgentDashboard";
import FieldsList from "./pages/FieldsList";
import FieldDetail from "./pages/FieldDetail";
import UpdateField from "./pages/UpdateField";
import CreateEditField from "./pages/CreateEditField";
import AgentsList from "./pages/AgentsList";
import CreateEditAgent from "./pages/CreateEditAgent";
import Layout from "./components/Layout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/change-password",
    element: <ChangePassword />,
  },
  {
    path: "/admin",
    element: <Layout userType="admin" />,
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: "fields", element: <FieldsList /> },
      { path: "fields/:id", element: <FieldDetail /> },
      { path: "fields/:id/edit", element: <CreateEditField /> },
      { path: "fields/new", element: <CreateEditField /> },
      { path: "agents", element: <AgentsList /> },
      { path: "agents/new", element: <CreateEditAgent /> },
      { path: "agents/:id/edit", element: <CreateEditAgent /> },
    ],
  },
  {
    path: "/agent",
    element: <Layout userType="agent" />,
    children: [
      { index: true, element: <AgentDashboard /> },
      { path: "fields", element: <FieldsList /> },
      { path: "fields/:id", element: <FieldDetail /> },
      { path: "fields/:id/update", element: <UpdateField /> },
    ],
  },
]);
