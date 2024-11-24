import React from "react";
import { deleteTodo } from "../../../api/todoApi";

const TableRow = ({ todo, navigate, onDelete }) => {
  const handleDelete = async () => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      console.error("No user ID found in localStorage.");
      return;
    }

    try {
      await deleteTodo(todo.todoId, userId);
      console.log("Todo deleted successfully");

      onDelete(todo.todoId);
    } catch (error) {
      console.error("Failed to delete todo:", error);
    }
  };

  return (
    <tr className="todo-row">
      <td>{todo.title}</td>
      <td>{todo.description}</td>
      <td>{todo.deadline}</td>
      <td>{todo.category}</td>
      <td>
        <button
          onClick={() => navigate(`/edit/${todo.todoId}`)}
          className="action-button edit-button"
        >
          Edit
        </button>
      </td>
      <td>
        <button
          onClick={handleDelete}
          className="action-button delete-button"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default TableRow;
