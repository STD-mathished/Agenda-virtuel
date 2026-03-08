export const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000"; 

export const getHeaders = (token?: string) => ({
    "Content-Type": "application/json",
    ...(token ? { "Authorization": `Bearer ${token}` } : {}),
});