import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import Card from "../components/Card";
import { cropStages } from "../data/mockData";
import { apiFetch } from "../api";

export default function UpdateField() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [field, setField] = useState<any>(null);
  const [stage, setStage] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    apiFetch(`/fields/${id}/`)
      .then((data) => {
        setField(data);
        setStage(data.currentStage || "");
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await apiFetch(`/fields/${id}/updates/`, {
        method: "POST",
        body: JSON.stringify({
          stage,
          notes,
        }),
      });
      navigate(`/agent/fields/${id}`);
    } catch (err) {
      alert("Failed to submit update");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!field) return <div className="text-center py-12"><p className="text-gray-600">Field not found</p></div>;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h2>Update Field Progress</h2>
        <p className="text-gray-600">{field.name} - {field.cropType}</p>
      </div>

      <Card>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm text-gray-700 mb-2">Growth Stage</label>
            <select
              value={stage}
              onChange={(e) => setStage(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500"
              required
            >
              <option value="">Select stage...</option>
              {cropStages.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            <p className="text-xs text-gray-500 mt-1">Current stage: {field.currentStage}</p>
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-2">Observations & Notes</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={6}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500"
              placeholder="Enter your observations..."
              required
            />
          </div>

          <div className="flex space-x-3">
            <button type="submit" disabled={submitting} className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
              {submitting ? "Submitting..." : "Submit Update"}
            </button>
            <button type="button" onClick={() => navigate(`/agent/fields/${id}`)} className="px-6 py-2 bg-white border border-gray-300 rounded-md">
              Cancel
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
}
