import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../../../styles/todoform.css";
import { addTodo } from "../../../api/todoApi";

const TodoForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "",
    category: "Work",
    deadline: "",
  });

  const [errorMessages, setErrorMessages] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem("userId");
    if (!userId) return console.error("User ID not found in localStorage.");

    const todoData = {
      ...formData,
      deadline: formData.deadline
        ? new Date(formData.deadline).toISOString()
        : null,
      createdAt: new Date().toISOString(),
    };

    try {
      setErrorMessages([]);
      await addTodo(userId, todoData);
      navigate("/todo-dashboard");
    } catch (error) {
      if (error?.errors) {
        setErrorMessages(
          Object.entries(error.errors).map(
            ([field, messages]) => `${field}: ${messages.join(" ")}`
          )
        );
      } else {
        setErrorMessages(["An unexpected error occurred."]);
      }
    }
  };

  return (
    <div className="todo-form-container">
      <h1>Add New Todo</h1>

      {errorMessages.length > 0 && (
        <div className="error-box">
          {errorMessages.map((message, index) => (
            <p key={index} className="error-message">
              {message}
            </p>
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="todo-input-field"
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="todo-input-field"
            rows="3"
            required
          ></textarea>
        </div>
        <div>
          <label className="block font-medium mb-1">Priority</label>
          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="todo-input-field"
          >
            <option value="">Select Priority</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
        <div>
          <label className="block font-medium mb-1">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="todo-input-field"
          >
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
          </select>
        </div>
        <div>
          <label className="block font-medium mb-1">Deadline</label>
          <input
            type="datetime-local"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            className="todo-input-field"
            required
          />
        </div>
        <button type="submit" className="todo-btn-primary w-full">
          Add Todo
        </button>
      </form>
    </div>
  );
};

export default TodoForm;
