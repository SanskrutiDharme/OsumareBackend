const express = require("express")
const router = express.Router()

const tasks = [];

router.post("/tasks", (req, res) => {
    const { title, description } = req.body;
    if (!title || !description) {
      return res.status(400).send("Title and Description are required");
    }
    const newTask = {
      id: tasks.length + 1,
      title,
      description,
    };
    tasks.push(newTask);
    res.status(201).send(tasks);
  });

  router.get("/tasks", (req, res) => {
    res.send(tasks);
  });

  router.get("/tasks/:id", (req, res) => {
    const taskId = parseInt(req.params.id);
    const task = tasks.find((t) => t.id === taskId);
    if (!task) {
      return res.status(404).send("Task not found");
    }
    res.send(task);
  });

  router.delete("/tasks/:id", (req, res) => {
    const taskId = parseInt(req.params.id);
    const task = tasks.filter((t) => t.id !== taskId);
    res.status(200).send("Task deleted successfully");
  });

  router.put("/tasks/:id", (req, res) => {
    const taskId = parseInt(req.params.id);
    const existTask = tasks.findIndex((t) => t.id === taskId);
    if (!existTask) {
      res.status(404).send("Task not found");
    }
    const { title, description } = req.body;
    if (!title || !description) {
      res.status(400).send("Title and Description are required");
    }
    tasks[existTask] = { ...tasks[existTask], title, description };
    res.status(200).send(tasks[existTask]);
  });

  module.exports = router