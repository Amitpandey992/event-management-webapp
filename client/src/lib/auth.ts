import api from "./axios";

export const login = async (email: string, password: string) => {
  const response = await api.post("/admin/login", {
    email,
    password,
  });
  const { token } = response.data;

  localStorage.setItem("adminToken", token);
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  return response.data;
};

export const logout = () => {
  localStorage.removeItem("adminToken");
  delete api.defaults.headers.common["Authorization"];
};

export const isAuthenticated = () => {
  return !!localStorage.getItem("adminToken");
};
