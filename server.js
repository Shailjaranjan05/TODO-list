require("dotenv").config();

const dns = require("dns");
dns.setServers(["1.1.1.1", "8.8.8.8"]);

const express = require("express");
const cors = require("cors")
const connectDB = require("./config/db");
const Todo = require("./models/Todo");

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

// GET all todos
app.get("/todos", async (req, res) => {
  try {
    const todos = await Todo.find();

    res.status(200).json({
      success: true,
      data: todos,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch todos",
    });
  }
});

// GET one todo
app.get("/todos/:id", async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: "Todo not found",
      });
    }

    res.status(200).json({
      success: true,
      data: todo,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch todo",
    });
  }
});

// CREATE todo
app.post("/todos", async (req, res) => {
  try {
    const todo = await Todo.create({
      task: req.body.task,
      completed: req.body.completed || false,
    });

    res.status(201).json({
      success: true,
      message: "Todo created successfully",
      data: todo,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create todo",
    });
  }
});

// UPDATE todo
app.patch("/todos/:id", async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(
      req.params.id,
      {
        task: req.body.task,
        completed: req.body.completed,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: "Todo not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Todo updated successfully",
      data: todo,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update todo",
    });
  }
});

// DELETE todo
app.delete("/todos/:id", async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: "Todo not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Todo deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete todo",
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});