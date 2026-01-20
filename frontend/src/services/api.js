const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001/api";

async function fetchApi(endpoint, options = {}) {
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers
    }
  });
  
  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }
  
  return response.json();
}

export const api = {
  getPipelines: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return fetchApi(`/pipelines${query ? `?${query}` : ""}`);
  },
  
  getPipeline: (id) => fetchApi(`/pipelines/${id}`),
  
  getServers: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return fetchApi(`/servers${query ? `?${query}` : ""}`);
  },
  
  getServer: (id) => fetchApi(`/servers/${id}`),
  
  getDeployments: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return fetchApi(`/deployments${query ? `?${query}` : ""}`);
  },
  
  getStats: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return fetchApi(`/stats${query ? `?${query}` : ""}`);
  },
  
  getActivity: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return fetchApi(`/activity${query ? `?${query}` : ""}`);
  }
};

export default api;
