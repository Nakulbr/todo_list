import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";

const HomePage = () => {
  const navigate = useNavigate();
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos()
      .then((fetchedTodos) => {
        setTodos(fetchedTodos);
      })
      .catch((err) => console.log(err));
  }, []);

  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const fetchTodos = async () => {
    try {
      if (!localStorage.getItem("token")) {
        return navigate("/login");
      }
      const response = await axios.get(
        "http://localhost:3000/todos/user",
        config
      );
      const todos = response.data;
      return todos;
    } catch (error) {
      console.log(error);
    }
  };

  const createTodo = async (newTodo) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/todos/create",
        newTodo,
        config
      );
      const createdTodo = response.data;
      setTodos([...todos, createdTodo]);
      fetchTodos()
        .then((fetchedTodos) => {
          setTodos(fetchedTodos);
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  };

  const updateTodo = async (updatedTodo) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/todos/update/${updatedTodo._id}`,
        updatedTodo,
        config
      );

      const updatedTodoResponse = response.data;
      const updatedTodos = todos.map((todo) =>
        todo._id === updatedTodoResponse._id ? updatedTodoResponse : todo
      );
      setTodos(updatedTodos);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTodo = async (todoId) => {
    try {
      await axios.delete(
        `http://localhost:3000/todos/delete/${todoId}`,
        config
      );
      const updatedTodos = todos.filter((todo) => todo._id !== todoId);
      setTodos(updatedTodos);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="py-4 px-4 bg-blue-500 text-white text-2xl text-center flex justify-between items-center">
        <span>To-Do List</span>
        <button
          className="text-white p-2 rounded bg-red-600 hover:bg-red-400"
          onClick={logout}
        >
          Logout
        </button>
      </header>
      <main className="container mx-auto p-4">
        <TodoForm addTask={createTodo} />
        <TodoList
          todos={todos}
          onUpdateTodo={updateTodo}
          onDeleteTodo={deleteTodo}
        />
      </main>
    </div>
  );
};

export default HomePage;
