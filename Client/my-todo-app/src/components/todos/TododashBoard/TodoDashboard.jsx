import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllTodos } from "../../../api/todoApi.js";
import Controls from "./Controls";
import TodoTable from "./TodoTable";

const TodoDashboard = () => {
  const [todos, setTodos] = useState([]);
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const navigate = useNavigate();

  const handleFetchTodos = async () => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      try {
        const response = await getAllTodos(userId);
        if (response.success) {
          setTodos(response.data);
          setFilteredTodos(response.data);
        }
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    }
  };

  useEffect(() => {
    handleFetchTodos();
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    if (category === "All") {
      setFilteredTodos(todos);
    } else {
      setFilteredTodos(todos.filter((todo) => todo.category === category));
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    setFilteredTodos(
      todos.filter((todo) =>
        todo.title.toLowerCase().includes(term.toLowerCase())
      )
    );
  };

  const handleDeleteTodo = (todoId) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.todoId !== todoId));
    setFilteredTodos((prevFilteredTodos) =>
      prevFilteredTodos.filter((todo) => todo.todoId !== todoId)
    );
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="container">
      <div className="flex justify-between items-center mb-4">
        <h1 className="heading">Todo Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
      <Controls
        searchTerm={searchTerm}
        onSearch={handleSearch}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <TodoTable
        todos={filteredTodos}
        navigate={navigate}
        onDelete={handleDeleteTodo} 
      />
    </div>
  );
};

export default TodoDashboard;
