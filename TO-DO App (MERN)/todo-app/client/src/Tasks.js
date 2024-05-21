import React, { Component } from "react";
import {
  addTask,
  getTasks,
  updateTask,
  deleteTask,
} from "./services/taskServices";

class Tasks extends Component {
  state = { tasks: [], currentTask: "" };

  async componentDidMount() {
    try {
      const { data } = await getTasks();
      this.setState({ tasks: data });
    } catch (error) {
      console.log(error);
    }
  }

  handleChange = (e) => {
    this.setState({ currentTask: e.target.value });
  };

  handleSubmit = async (values) => {
    // Accept the form values directly
    const originalTasks = this.state.tasks;
    try {
      const { data } = await addTask({ task: values.task });
      const tasks = [...originalTasks];
      tasks.push(data);
      this.setState({ tasks, currentTask: "" });
    } catch (error) {
      console.log(error);
    }
  };

  handleUpdate = async (currentTaskId) => {
    const originalTasks = this.state.tasks;
    try {
      const tasks = [...originalTasks];
      const index = tasks.findIndex((task) => task._id === currentTaskId);
      tasks[index] = { ...tasks[index] };
      tasks[index].completed = !tasks[index].completed;
      this.setState({ tasks });
      await updateTask(currentTaskId, { completed: tasks[index].completed });
    } catch (error) {
      this.setState({ tasks: originalTasks });
      console.log(error);
    }
  };

  handleDelete = async (currentTaskId) => {
    const originalTasks = this.state.tasks;
    try {
      const tasks = originalTasks.filter((task) => task._id !== currentTaskId);
      this.setState({ tasks });
      await deleteTask(currentTaskId);
    } catch (error) {
      this.setState({ tasks: originalTasks });
      console.log(error);
    }
  };
}

export default Tasks;
