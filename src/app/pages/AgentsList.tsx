import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Plus, Edit, Trash2 } from "lucide-react";
import Card from "../components/Card";
import { apiFetch } from "../api";

export default function AgentsList() {
  const [agents, setAgents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadAgents = async () => {
    try {
      const data = await apiFetch("/accounts/users/");
      setAgents(data);
    } catch (err: any) {
      setError("Failed to load agents");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAgents();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this agent?")) {
      try {
        await apiFetch(`/accounts/users/${id}/`, { method: "DELETE" });
        loadAgents();
      } catch (err: any) {
        alert("Failed to delete agent");
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2>Field Agents</h2>
          <p className="text-gray-600">Manage field agents and assignments</p>
        </div>
        <Link
          to="/admin/agents/new"
          className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Agent
        </Link>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs text-gray-700 uppercase tracking-wider">Full Name</th>
                <th className="px-4 py-3 text-left text-xs text-gray-700 uppercase tracking-wider">Username</th>
                <th className="px-4 py-3 text-left text-xs text-gray-700 uppercase tracking-wider">Email</th>
                <th className="px-4 py-3 text-left text-xs text-gray-700 uppercase tracking-wider">Phone</th>
                <th className="px-4 py-3 text-left text-xs text-gray-700 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs text-gray-700 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {agents?.map((agent) => (
                <tr key={agent.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4 whitespace-nowrap text-sm">{agent.fullName}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">{agent.username}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">{agent.email}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">{agent.phone}</td>

                  <td className="px-4 py-4 whitespace-nowrap">
                    {!agent.hasAssignedField ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs bg-yellow-100 text-yellow-800">
                        Pending
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs bg-green-100 text-green-800">
                        Active
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm space-x-2">
                    <Link
                      to={`/admin/agents/${agent.id}/edit`}
                      className="inline-flex items-center text-blue-600 hover:text-blue-900"
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(agent.id)}
                      className="inline-flex items-center text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
