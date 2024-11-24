import React from "react";
import { useNavigate } from "react-router-dom";

const Controls = ({ searchTerm, onSearch, selectedCategory, onCategoryChange }) => {
  const navigate = useNavigate();

  return (
    <div className="controls-container">
      <input
        type="text"
        placeholder="Search Todos..."
        value={searchTerm}
        onChange={(e) => onSearch(e.target.value)}
        className="search-input"
      />
      <button
        onClick={() => navigate("/add-todo")}
        className="bg-blue-500 text-white p-2 rounded-md"
      >
        Add Todo
      </button>
      <div className="category-buttons">
        <button
          className={`category-button ${selectedCategory === "All" ? "active" : ""
            }`}
          onClick={() => onCategoryChange("All")}
        >
          All
        </button>
        <button
          className={`category-button ${selectedCategory === "Work" ? "active" : ""
            }`}
          onClick={() => onCategoryChange("Work")}
        >
          View Work
        </button>
        <button
          className={`category-button ${selectedCategory === "Personal" ? "active" : ""
            }`}
          onClick={() => onCategoryChange("Personal")}
        >
          View Personal
        </button>
      </div>
    </div>
  );
};

export default Controls;
