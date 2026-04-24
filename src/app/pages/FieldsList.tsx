import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import { Search, Plus } from "lucide-react";
import Card from "../components/Card";
import StatusBadge from "../components/StatusBadge";
import { apiFetch } from "../api";

export default function FieldsList() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");
  const basePath = isAdmin ? "/admin" : "/agent";

  const [fields, setFields] = useState<any[]>([]);
  const [agents, setAgents] = useState<any[]>([]);
  const [updates, setUpdates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const loadFields = () => {
    setLoading(true);
    Promise.all([
      apiFetch("/fields/"),
      isAdmin ? apiFetch("/accounts/users/") : Promise.resolve([])
    ]).then(([fieldsData, agentsData]) => {
      setFields(fieldsData);
      setAgents(agentsData);
    }).finally(() => setLoading(false));
  };

  useEffect(() => {
    loadFields();
}, [isAdmin, location.key]);

  const handleDelete = async (fieldId: string) => {
    if (window.confirm("Are you sure you want to delete this field? This action cannot be undone.")) {
      try {
        await apiFetch(`/fields/${fieldId}/`, { method: "DELETE" });
        loadFields();
      } catch (err: any) {
        alert(`Failed to delete field: ${err.message}`);
      }
    }
  };

  const fieldsWithStatus = fields.map((field) => ({
    ...field,
    agentName: field.agentName || "Unassigned",
  }));

  const filteredFields = fieldsWithStatus.filter((field) => {
    const matchesSearch =
      field.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      field.cropType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || field.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2>Fields</h2>
          <p className="text-gray-600">Manage and monitor all fields</p>
        </div>
        {isAdmin && (
          <Link
            to="/admin/fields/new"
            className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Field
          </Link>
        )}
      </div>

      <Card>
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search fields..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="at-risk">At Risk</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs text-gray-700 uppercase tracking-wider">Field Name</th>
                <th className="px-4 py-3 text-left text-xs text-gray-700 uppercase tracking-wider">Crop Type</th>
                <th className="px-4 py-3 text-left text-xs text-gray-700 uppercase tracking-wider">Planting Date</th>
                <th className="px-4 py-3 text-left text-xs text-gray-700 uppercase tracking-wider">Current Stage</th>
                <th className="px-4 py-3 text-left text-xs text-gray-700 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs text-gray-700 uppercase tracking-wider">Assigned Agent</th>
                <th className="px-4 py-3 text-left text-xs text-gray-700 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredFields.map((field) => (
                <tr key={field.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4 whitespace-nowrap text-sm">{field.name}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">{field.cropType}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">{field.plantingDate}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">{field.currentStage}</td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <StatusBadge status={field.status} />
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">{field.agentName}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm space-x-2">
                    {isAdmin ? (
                      <>
                        <Link to={`${basePath}/fields/${field.id}`} className="inline-flex items-center px-3 py-1 border border-green-600 text-green-600 rounded-md hover:bg-green-50 transition-colors">
                          View
                        </Link>
                        <Link to={`${basePath}/fields/${field.id}/edit`} className="inline-flex items-center px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                          Edit
                        </Link>
                        <button onClick={() => handleDelete(field.id)} className="inline-flex items-center px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors">
                          Delete
                        </button>
                      </>
                    ) : (
                      <>
                        <Link to={`${basePath}/fields/${field.id}`} className="inline-flex items-center px-3 py-1 border border-green-600 text-green-600 rounded-md hover:bg-green-50 transition-colors">
                          View
                        </Link>
                        <Link to={`${basePath}/fields/${field.id}/update`} className="inline-flex items-center px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
                          Update
                        </Link>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredFields.length === 0 && (
          <div className="text-center py-8 text-gray-500">No fields found</div>
        )}
      </Card>
    </div>
  );
}
