import { useState } from "react";
import { useNavigate } from "react-router";
import { Lock } from "lucide-react";
import { apiFetch } from "../api";

export default function ChangePassword() {
  const navigate = useNavigate();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await apiFetch("/accounts/change-password/", {
        method: "PUT",
        body: JSON.stringify({ old_password: oldPassword, new_password: newPassword }),
      });
      setSuccess(true);
      setTimeout(() => navigate("/agent"), 2000);
    } catch (err: any) {
      setError(err.message || "Failed to update password");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <Lock className="w-8 h-8 text-green-700" />
            </div>
            <h1 className="text-2xl text-gray-900 mb-2">Change Password</h1>
            <p className="text-gray-600">Please finish setting up your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && <div className="bg-red-50 text-red-700 px-4 py-3 rounded-md text-sm">{error}</div>}
            {success && <div className="bg-green-50 text-green-700 px-4 py-3 rounded-md text-sm">Password updated successfully. Redirecting...</div>}

            <div>
              <label className="block text-sm text-gray-700 mb-2">Old Password</label>
              <input
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500"
                placeholder="Enter old (default) password"
                required
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-2">New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500"
                placeholder="Enter new password"
                required
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-2">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500"
                placeholder="Confirm new password"
                required
              />
            </div>
            <button type="submit" className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors">
              Update Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
