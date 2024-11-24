import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../../styles/todoform.css";
import ErrorBox from "./ErrorBox";
import { getTodoById, updateTodo } from "../../../api/todoApi";

const EditTodoPage = () => {
  const { todoId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "",
    category: "Work",
    deadline: "",
  });
  const [errorMessages, setErrorMessages] = useState([]);

  useEffect(() => {
    const fetchTodo = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) return;

      try {
        const { data: todo } = await getTodoById(todoId, userId);
        setFormData({
          ...todo,
          deadline: todo.deadline ? new Date(todo.deadline).toISOString().slice(0, 16) : "",
          category: todo.category || "Work",
          priority: todo.priority || "",
        });
      } catch {
        setErrorMessages(["Failed to load the todo for editing."]);
      }
    };

    fetchTodo();
  }, [todoId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    try {
      setErrorMessages([]);
      await updateTodo(todoId, userId, {
        ...formData,
        deadline: formData.deadline ? new Date(formData.deadline).toISOString() : null,
      });
      navigate("/todo-dashboard");
    } catch {
      setErrorMessages(["Failed to update the Todo. Please try again."]);
    }
  };

  return (
    <div className="todo-form-container">
      <h1>Edit Todo</h1>
      <ErrorBox errorMessages={errorMessages} />
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
          />
        </div>

        <button type="submit" className="todo-btn-primary w-full">
          Update Todo
        </button>
      </form>
    </div>
  );
};

export default EditTodoPage;
