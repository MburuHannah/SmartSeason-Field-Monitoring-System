import { useEffect, useState } from "react";
import { Link, useParams, useLocation } from "react-router";
import { Calendar, MapPin, Ruler, User, Edit, Plus } from "lucide-react";
import Card from "../components/Card";
import StatusBadge from "../components/StatusBadge";
import { apiFetch } from "../api";

export default function FieldDetail() {
  const { id } = useParams();
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");
  const basePath = isAdmin ? "/admin" : "/agent";

  const [field, setField] = useState<any>(null);
  const [updates, setUpdates] = useState<any[]>([]);
  const [agent, setAgent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      apiFetch(`/fields/${id}/`),
      apiFetch(`/fields/${id}/updates/`),
      isAdmin ? apiFetch(`/accounts/users/`) : Promise.resolve([])
    ])
      .then(([fieldData, updatesData, agentsData]) => {
        setField(fieldData);
        setUpdates(updatesData);
        if (isAdmin && fieldData.assignedAgentId) {
          // Keep for legacy loading or edit purposes, but not strictly needed
          const assignedAgent = agentsData.find((a: any) => String(a.id) === String(fieldData.assignedAgentId));
          setAgent(assignedAgent);
        }
      })
      .finally(() => setLoading(false));
  }, [id, isAdmin]);

  if (loading) return <div>Loading...</div>;

  if (!field) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Field not found</p>
        <Link to={`${basePath}/fields`} className="text-green-600 hover:text-green-900 mt-4 inline-block">
          Back to Fields
        </Link>
      </div>
    );
  }

  const status = field.status;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2>{field.name}</h2>
          <p className="text-gray-600">{field.cropType}</p>
        </div>
        <div className="flex space-x-3">
          {!isAdmin && (
            <Link to={`${basePath}/fields/${id}/update`} className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
              <Plus className="w-4 h-4 mr-2" /> Add Update
            </Link>
          )}
          {isAdmin && (
            <Link to={`${basePath}/fields/${id}/edit`} className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              <Edit className="w-4 h-4 mr-2" /> Edit Field
            </Link>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card title="Field Information">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start space-x-3">
                <div className="bg-green-100 p-2 rounded">
                  <Calendar className="w-5 h-5 text-green-700" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Planting Date</p>
                  <p className="text-sm">{field.plantingDate}</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-green-100 p-2 rounded">
                  <MapPin className="w-5 h-5 text-green-700" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Location</p>
                  <p className="text-sm">{field.location}</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-green-100 p-2 rounded">
                  <Ruler className="w-5 h-5 text-green-700" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Area</p>
                  <p className="text-sm">{field.area}</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-green-100 p-2 rounded">
                  <User className="w-5 h-5 text-green-700" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Assigned Agent</p>
                  <p className="text-sm">{field.agentName || "Unassigned"}</p>
                </div>
              </div>
            </div>
          </Card>

          <Card title="Update History">
            <div className="space-y-4">
              {updates.length > 0 ? (
                updates.map((update: any) => (
                  <div key={update.id} className="border-b border-gray-200 pb-4 last:border-0">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="text-sm">{update.stage}</p>
                        <p className="text-xs text-gray-500">by {update.updatedBy}</p>
                      </div>
                      <span className="text-xs text-gray-500">{new Date(update.date).toLocaleDateString()}</span>
                    </div>
                    <p className="text-sm text-gray-600">{update.notes}</p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">No updates recorded yet</p>
              )}
            </div>
          </Card>
        </div>

        <div>
          <Card title="Current Status">
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Status</p>
                <StatusBadge status={status} />
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Current Stage</p>
                <p className="text-sm">{field.currentStage}</p>
              </div>
              {status === "at-risk" && (
                <div className="bg-red-50 border border-red-200 rounded-md p-3">
                  <p className="text-xs text-red-900">
                    This field requires attention. Check recent updates for details.
                  </p>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
