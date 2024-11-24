import React from "react";
import TableRow from "./TableRow";

const TodoTable = ({ todos, navigate, onDelete }) => {
  return (
    <div className="table-container">
      <table className="todo-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Deadline</th>
            <th>Category</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <TableRow
              key={todo.todoId}
              todo={todo}
              navigate={navigate}
              onDelete={onDelete} 
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TodoTable;
