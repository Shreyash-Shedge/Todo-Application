const BASE_URL = "http://localhost:5081/api";

export const API_ROUTES = {
  LOGIN: `${BASE_URL}/User/login`,
  REGISTER: `${BASE_URL}/User/register`,
  TODOS: (userId) => `${BASE_URL}/Todo/User/${userId}`,
  TODO: (todoId, userId) => `${BASE_URL}/Todo/${todoId}/User/${userId}`,
};

const handleResponse = async (response) => {
  if (!response.ok) {
    const errorBody = await response.json().catch(() => null); 
    throw {
      status: response.status,
      message: response.statusText,
      body: errorBody,
    };
  }
  return response.json().catch(() => null);
};

export const getAllTodos = async (userId) => {
  try {
    const response = await fetch(API_ROUTES.TODOS(userId));
    return await handleResponse(response);
  } catch (error) {
    console.error("Error fetching todos:", error);
    throw error;
  }
};

export const addTodo = async (userId, todoData) => {
  try {
    const response = await fetch(API_ROUTES.TODOS(userId), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(todoData),
    });
    return await handleResponse(response);
  } catch (error) {
    console.error("Error adding todo:", error);
    throw error;
  }
};

export const getTodoById = async (todoId, userId) => {
  try {
    const response = await fetch(API_ROUTES.TODO(todoId, userId));
    return await handleResponse(response);
  } catch (error) {
    console.error("Error fetching todo:", error);
    throw error;
  }
};

export const updateTodo = async (todoId, userId, todoData) => {
  try {
    const response = await fetch(API_ROUTES.TODO(todoId, userId), {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(todoData),
    });
    return await handleResponse(response);
  } catch (error) {
    console.error("Error updating todo:", error);
    throw error;
  }
};

export const deleteTodo = async (todoId, userId) => {
  try {
    const response = await fetch(API_ROUTES.TODO(todoId, userId), {
      method: "DELETE",
    });
    await handleResponse(response);
  } catch (error) {
    console.error("Error deleting todo:", error);
    throw error;
  }
};
