import React, { useState } from "react";

const TodoList = ({ todos, onUpdateTodo, onDeleteTodo }) => {
  const [editPopupOpen, setEditPopupOpen] = useState(false);
  const [editedTodo, setEditedTodo] = useState({});
  const [editedTitle, setEditedTitle] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [completed, setCompleted] = useState(false);

  const openEditPopup = (todo) => {
    setEditedTodo(todo);
    setEditedTitle(todo.title);
    setEditedDescription(todo.description);
    setCompleted(todo.completed);
    setEditPopupOpen(true);
  };

  const saveEditedTodo = () => {
    const updatedTodo = {
      ...editedTodo,
      title: editedTitle,
      description: editedDescription,
      completed,
    };
    onUpdateTodo(updatedTodo);
    setEditPopupOpen(false);
  };

  return (
    <div className="mb-4">
      <ul>
        {todos.map((todo) => (
          <li
            key={todo._id}
            className="border border-gray-300 rounded p-2 mb-2"
          >
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() =>
                  onUpdateTodo({ ...todo, completed: !todo.completed })
                }
                className="mr-2"
              />
              <div>
                <h3
                  className={`text-xl ${todo.completed ? "line-through" : ""}`}
                >
                  {todo.title}
                </h3>
                <p className="text-gray-600">{todo.description}</p>
              </div>
            </div>
            <button
              className="bg-blue-500 text-white p-2 rounded mt-2 mr-2"
              onClick={() => openEditPopup(todo)}
            >
              Edit
            </button>
            <button
              className="bg-red-500 text-white p-2 rounded mt-2"
              onClick={() => onDeleteTodo(todo._id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      {/* Edit Popup */}
      {editPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
          <div className="bg-white p-4 rounded">
            <h2>Edit Todo</h2>
            <input
              type="text"
              className="w-full border border-gray-300 rounded p-2 mb-2"
              placeholder="Edit Task Title"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
            />
            <textarea
              className="w-full border border-gray-300 rounded p-2"
              placeholder="Edit Task Description"
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
            />
            <label className=" justify-between flex flex-row">
              Completed:
              <input
                type="checkbox"
                checked={completed}
                onChange={() => setCompleted(!completed)}
              />
            </label>
            <button
              className="bg-blue-500 text-white p-2 rounded mt-2 mr-2"
              onClick={saveEditedTodo}
            >
              Save
            </button>
            <button
              className="bg-gray-500 text-white p-2 rounded mt-2"
              onClick={() => setEditPopupOpen(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoList;
