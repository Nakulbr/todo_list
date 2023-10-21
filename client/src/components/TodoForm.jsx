import React, { useState } from "react";

const TodoForm = ({ addTask }) => {
  const [todo, settodo] = useState({
    title: "",
    description: "",
  });

  const handleAddTask = () => {
    addTask(todo);
    settodo({
      title: "",
      description: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    settodo({
      ...todo,
      [name]: value,
    });
  };

  return (
    <div className="mb-4">
      <input
        type="text"
        className="w-full border border-gray-300 rounded p-2 mb-2"
        placeholder="Task Title"
        value={todo.title}
        name="title"
        onChange={handleChange}
      />
      <textarea
        className="w-full border border-gray-300 rounded p-2"
        placeholder="Task Description"
        value={todo.description}
        name="description"
        onChange={handleChange}
      />
      <button
        className="bg-blue-500 text-white p-2 rounded mt-2"
        onClick={handleAddTask}
      >
        Add Task
      </button>
    </div>
  );
};

export default TodoForm;
