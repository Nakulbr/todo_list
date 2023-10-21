const express = require("express");
const jwt = require("jsonwebtoken");
const Todo = require("../models/Todo");
const router = express.Router();

// Middleware for verifying JWT token
function verifyToken(req, res, next) {
  const token = req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }
    req.userId = decoded.userId;
    next();
  });
}

router.post("/create", verifyToken, async (req, res) => {
  try {
    const { title, description } = req.body;
    const user = req.userId;

    const todo = new Todo({ title, description, user });

    await todo.save();

    res.status(201).json({ message: "To-do item created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to create to-do item" });
  }
});

router.get("/user", verifyToken, async (req, res) => {
  try {
    const userId = req.userId;

    const todos = await Todo.find({ user: userId });

    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch to-do items" });
  }
});

router.put("/update/:todoId", verifyToken, async (req, res) => {
  try {
    const todoId = req.params.todoId;
    const { title, description, completed } = req.body;
    const userId = req.userId;

    const updatedTodo = await Todo.findOneAndUpdate(
      { _id: todoId, user: userId },
      { title, description, completed },
      { new: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({ error: "To-do item not found" });
    }

    res.status(200).json(updatedTodo);
  } catch (error) {
    res.status(500).json({ error: "Failed to update to-do item" });
  }
});

router.delete("/delete/:todoId", verifyToken, async (req, res) => {
  try {
    const todoId = req.params.todoId;
    const userId = req.userId;

    const deletedTodo = await Todo.findOneAndRemove({
      _id: todoId,
      user: userId,
    });
    if (!deletedTodo) {
      return res.status(404).json({ error: "To-do item not found" });
    }
    res.status(200).json({ message: "To-do Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete to-do item" });
  }
});

module.exports = router;
