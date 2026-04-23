import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Activity, AlertTriangle, CheckCircle, Sprout } from "lucide-react";
import Card from "../components/Card";
import StatusBadge from "../components/StatusBadge";
import { apiFetch } from "../api";
import { computeFieldStatus } from "../data/mockData";

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const data = await apiFetch("/dashboard/");
        setStats(data);
      } catch (err) {
        console.error("Failed to load dashboard stats", err);
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div>
        <h2>Coordinator Dashboard</h2>
        <p className="text-gray-600">Overview of all field operations</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Fields</p>
              <p className="text-3xl text-gray-900 mt-1">{stats?.totalFields}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <Sprout className="w-6 h-6 text-green-700" />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active</p>
              <p className="text-3xl text-gray-900 mt-1">{stats?.activeFields}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <Activity className="w-6 h-6 text-green-700" />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">At Risk</p>
              <p className="text-3xl text-gray-900 mt-1">{stats?.atRiskFields}</p>
            </div>
            <div className="bg-red-100 p-3 rounded-full">
              <AlertTriangle className="w-6 h-6 text-red-700" />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Completed</p>
              <p className="text-3xl text-gray-900 mt-1">{stats?.completedFields}</p>
            </div>
            <div className="bg-gray-100 p-3 rounded-full">
              <CheckCircle className="w-6 h-6 text-gray-700" />
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Updates Table */}
      <Card title="Recent Field Updates">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs text-gray-700 uppercase tracking-wider">Date</th>
                <th className="px-4 py-3 text-left text-xs text-gray-700 uppercase tracking-wider">Field</th>
                <th className="px-4 py-3 text-left text-xs text-gray-700 uppercase tracking-wider">Stage</th>
                <th className="px-4 py-3 text-left text-xs text-gray-700 uppercase tracking-wider">Notes</th>
                <th className="px-4 py-3 text-left text-xs text-gray-700 uppercase tracking-wider">Updated By</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {stats?.recentUpdates?.map((update: any) => (
                <tr key={update.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
                    {new Date(update.date).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">{update.fieldName}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">{update.stage}</td>
                  <td className="px-4 py-4 text-sm text-gray-600 max-w-xs truncate">{update.notes}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">{update.updatedBy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="Quick Actions">
          <div className="space-y-3">
            <Link to="/admin/fields/new" className="block px-4 py-3 bg-green-600 text-white text-center rounded-md hover:bg-green-700">
              Add New Field
            </Link>
            <Link to="/admin/agents/new" className="block px-4 py-3 bg-green-600 text-white text-center rounded-md hover:bg-green-700">
              Add New Agent
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
