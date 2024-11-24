import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './index.css';
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import AuthWrapper from "./auth/AuthWrapper.jsx";
import TodoForm from "./components/todos/TodoFunctions/TodoForm.jsx";
import EditTodoPage from "./components/todos/TodoFunctions/EditTodoPage.jsx"
import TodoDashboard from "./components/todos/TododashBoard/TodoDashboard.jsx";

function App() {
  return (
    <Router>
      <div className="App">
        <AuthWrapper>
          <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/todo-dashboard" element={<TodoDashboard />} />
            <Route path="/add-todo" element={<TodoForm />} />
            <Route path="/edit/:todoId" element={<EditTodoPage />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </AuthWrapper>

      </div>
    </Router>
  );
}

export default App;
