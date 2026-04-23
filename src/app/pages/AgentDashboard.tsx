import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Activity, AlertTriangle, CheckCircle, Sprout } from "lucide-react";
import Card from "../components/Card";
import StatusBadge from "../components/StatusBadge";
import { apiFetch } from "../api";

export default function AgentDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const data = await apiFetch("/dashboard/");
        setStats(data);
      } catch (err) {
        console.error("Failed to load agent dashboard stats", err);
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
        <h2>Agent Dashboard</h2>
        <p className="text-gray-600">Overview of your assigned fields</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">My Fields</p>
              <p className="text-3xl text-gray-900 mt-1">{stats?.totalFields}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <Sprout className="w-6 h-6 text-green-700" />
            </div>
          </div>
        </Card>
      </div>

      <Card title="Recent Updates on My Fields">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs text-gray-700 uppercase tracking-wider">Date</th>
                <th className="px-4 py-3 text-left text-xs text-gray-700 uppercase tracking-wider">Field</th>
                <th className="px-4 py-3 text-left text-xs text-gray-700 uppercase tracking-wider">Stage</th>
                <th className="px-4 py-3 text-left text-xs text-gray-700 uppercase tracking-wider">Notes</th>
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
                  <td className="px-4 py-4 text-sm text-gray-600 max-w-xs">{update.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
