// todo UI

import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItem";

function App() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");

  useEffect(() => {
    getTodos();
  }, []);

  // Api calls

  const getTodos = async () => {
    try {
      const response = await axios.get("http://localhost:5000/todos");
      
      setTodos(response.data.data);
    } catch (error) {
      console.error("Failed to fetch todos", error);
    }
  };

  const addTodo = async (e) => {
    e.preventDefault();

    
    if (!task.trim()) return;

    try {
      const response = await axios.post("http://localhost:5000/todos", {
        task: task,
      });

      

      setTodos([...todos, response.data.data]);
      setTask("");
    } catch (error) {
      console.error("Failed to create todo", error);
    }
  };

  const toggleTodo = async (id, completed) => {
    try {
      const response = await axios.patch(`http://localhost:5000/todos/${id}`, {
        completed: !completed,
      });

      setTodos(
        todos.map((todo) =>
          todo._id === id ? response.data.data : todo
        )
      );
    } catch (error) {
      console.error("Failed to update todo: ", error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/todos/${id}`);
      
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (error) {
      console.error("Failed to delete todo", error);
    }
  };


  
  return (
    <div className="app">

      <div className="header">
        <p>Get your things done</p>
      <h1>Todo List</h1>
      </div>

      <div className="content">
        <TodoForm 
          task={task}
          setTask={setTask}
          addTodo={addTodo}
        />



      {todos.map((todo) => (
        <TodoItem
          key={todo._id}
          todo={todo}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
        />
      ))}
    </div>
  
  </div>
  )
}
export default App;