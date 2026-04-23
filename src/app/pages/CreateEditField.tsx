import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import Card from "../components/Card";
import { cropStages } from "../data/mockData";
import { apiFetch } from "../api";

export default function CreateEditField() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [fieldName, setFieldName] = useState("");
  const [cropType, setCropType] = useState("");
  const [plantingDate, setPlantingDate] = useState("");
  const [assignedAgentId, setAssignedAgentId] = useState("");
  const [currentStage, setCurrentStage] = useState("Planted");
  const [location, setLocation] = useState("");
  const [area, setArea] = useState("");
  const [agents, setAgents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch("/accounts/users/").then(setAgents);

    if (isEdit) {
      apiFetch(`/fields/${id}/`)
        .then((data) => {
          setFieldName(data.name || "");
          setCropType(data.cropType || "");
          setPlantingDate(data.plantingDate || "");
          setAssignedAgentId(data.assignedAgentId || "");
          setCurrentStage(data.currentStage || "Planted");
          setLocation(data.location || "");
          setArea(data.area || "");
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [id, isEdit]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        name: fieldName,
        cropType,
        plantingDate,
        assigned_agent_id: assignedAgentId,
        location,
        area
      };

      if (isEdit) {
        await apiFetch(`/fields/${id}/`, {
          method: "PUT",
          body: JSON.stringify(payload)
        });
      } else {
        await apiFetch(`/fields/`, {
          method: "POST",
          body: JSON.stringify(payload)
        });
      }
      navigate("/admin/fields");
    } catch (err) {
      alert("Error saving field");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h2>{isEdit ? "Edit Field" : "Create New Field"}</h2>
        <p className="text-gray-600">{isEdit ? "Update field information" : "Add a new field to the system"}</p>
      </div>

      <Card>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm text-gray-700 mb-2">Field Name</label>
            <input type="text" value={fieldName} onChange={(e) => setFieldName(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500" required />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-gray-700 mb-2">Crop Type</label>
              <input type="text" value={cropType} onChange={(e) => setCropType(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500" required />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-2">Planting Date</label>
              <input type="date" value={plantingDate} onChange={(e) => setPlantingDate(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500" required />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-gray-700 mb-2">Location</label>
              <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500" required />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-2">Area</label>
              <input type="text" value={area} onChange={(e) => setArea(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500" required />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-gray-700 mb-2">Assign Agent</label>
              <select value={assignedAgentId} onChange={(e) => setAssignedAgentId(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500" required>
                <option value="">Select agent...</option>
                {agents.map((agent) => (
                  <option key={agent.id} value={agent.id}>{agent.fullName}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-2">Current Stage</label>
              <select disabled={isEdit} value={currentStage} onChange={(e) => setCurrentStage(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 bg-gray-100" required>
                <option value="">Select stage...</option>
                {cropStages.map((stage) => (
                  <option key={stage} value={stage}>{stage}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex space-x-3 pt-4">
            <button type="submit" className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
              {isEdit ? "Update Field" : "Create Field"}
            </button>
            <button type="button" onClick={() => navigate("/admin/fields")} className="px-6 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50">
              Cancel
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
}
