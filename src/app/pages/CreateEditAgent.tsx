import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import Card from "../components/Card";
import { apiFetch } from "../api";

export default function CreateEditAgent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [unit, setUnit] = useState("");
  const [loading, setLoading] = useState(isEdit);

  useEffect(() => {
    if (isEdit) {
      apiFetch(`/accounts/users/${id}/`)
        .then((data) => {
          setFullName(data.fullName || "");
          setUsername(data.username || "");
          setEmail(data.email || "");
          setPhone(data.phone || "");
          setUnit(data.unit || "");
        })
        .finally(() => setLoading(false));
    }
  }, [id, isEdit]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload: any = { fullName, email, phone, unit };
      if (isEdit) {
        await apiFetch(`/accounts/users/${id}/`, {
          method: "PUT",
          body: JSON.stringify(payload),
        });
      } else {
        payload.username = username;
        payload.password = "password123"; // Dummy password for creation flow
        await apiFetch(`/accounts/users/`, {
          method: "POST",
          body: JSON.stringify(payload),
        });
      }
      navigate("/admin/agents");
    } catch (err: any) {
      alert(`Error saving agent: ${err.message}`);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h2>{isEdit ? "Edit Agent" : "Create New Agent"}</h2>
        <p className="text-gray-600">
          {isEdit ? "Update agent information" : "Add a new field agent to the system"}
        </p>
      </div>

      <Card>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-gray-700 mb-2">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500"
                required
                disabled={isEdit}
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-gray-700 mb-2">Phone Number</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500"
                required
              />
            </div>
          </div>

          {!isEdit && (
            <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
              <p className="text-sm text-blue-900">
                A default password "password123" will be generated.
              </p>
            </div>
          )}

          <div className="flex space-x-3 pt-4">
            <button type="submit" className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
              {isEdit ? "Update Agent" : "Create Agent"}
            </button>
            <button type="button" onClick={() => navigate("/admin/agents")} className="px-6 py-2 bg-white border border-gray-300 rounded-md text-gray-700">
              Cancel
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
}
