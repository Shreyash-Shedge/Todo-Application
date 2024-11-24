const BASE_URL = "http://localhost:5081/api";

export const API_ROUTES = {
  LOGIN: `${BASE_URL}/User/login`,
  REGISTER: `${BASE_URL}/User/register`,
};

const handleResponse = async (response) => {
  const responseBody = await response.json().catch(() => null); 
  if (!response.ok) {
    throw new Error(responseBody?.message || "An error occurred");
  }
  return responseBody;
};

export const loginUser = async (username, email, password) => {
  try {
    const response = await fetch(API_ROUTES.LOGIN, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });
    return await handleResponse(response);
  } catch (error) {
    throw new Error(error.message || "An error occurred during login");
  }
};

export const registerUser = async (username, email, password) => {
  try {
    const response = await fetch(API_ROUTES.REGISTER, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });
    return await handleResponse(response);
  } catch (error) {
    throw new Error(error.message || "An error occurred during registration");
  }
};
