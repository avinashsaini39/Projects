const express = require("express");
const router = express.Router();
const Task = require("../models/task");

router.post("/", async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.status(201).send(task); // It's a good practice to use status codes
  } catch (error) {
    res.status(400).send(error); // Include status codes for errors as well
  }
});

router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.send(tasks);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }); // Ensure the new object is returned
    if (!task) return res.status(404).send("Task not found");
    res.send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).send("Task not found");
    res.send(task);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
