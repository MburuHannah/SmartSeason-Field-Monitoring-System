=
export const API_BASE = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";

export const getAuthHeaders = (): Record<string, string> => {
  const token = localStorage.getItem("accessToken");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const apiFetch = async (endpoint: string, options: RequestInit = {}) => {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...getAuthHeaders(),
    ...(options.headers as Record<string, string> || {}),
  };

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    if (response.status === 401) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("userRole");
      window.location.href = "/login";
      throw new Error("Session expired. Please log in again.");
    }
    
    let errorMsg = response.statusText;
    try {
      const errData = await response.json();
      // Extract the first error message if it's an object of arrays (DRF default)
      if (typeof errData === "object" && errData !== null) {
         const firstKey = Object.keys(errData)[0];
         if (Array.isArray(errData[firstKey])) {
             errorMsg = errData[firstKey][0];
         } else if (typeof errData[firstKey] === "string") {
             errorMsg = errData[firstKey];
         } else if (errData.detail) {
             errorMsg = errData.detail;
         } else {
             errorMsg = JSON.stringify(errData);
         }
      }
    } catch (e) {
      // Ignore JSON parse errors on error responses
    }
    throw new Error(errorMsg);
  }

  // Handle 204 No Content
  if (response.status === 204) {
    return null;
  }

  return response.json();
};
