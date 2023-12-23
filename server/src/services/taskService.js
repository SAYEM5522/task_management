import { Task } from "../models/task.js";
import mongoose from "mongoose";
export const createTask = async (taskData) => {
  try {
    const { list } = taskData;
    // Check if the task name already exists in the database
    const existingTask = await Task.findOne({ 'list.name': { $in: list.map(item => item.name) } });
    if (existingTask) {
      const error = new Error('Task with the same name already exists.');
      error.statusCode = 400;
      throw error;
    }

    const newTask = new Task(taskData);
    const savedTask = await newTask.save();
    return savedTask;
  } catch (error) {
    console.error('Error creating task:', error.message);
    throw error;
  }
};
export const getTasks = async () => {
  try {
    const tasks = await Task.find();
    const taskObject = {};
    const initialColumns = {
      todo: {
        id: 'todo',
        list: [],
      },
      doing: {
        id: 'doing',
        list: [],
      },
      innerView: {
        id: 'innerView',
        list: [],
      },
      done: {
        id: 'done',
        list: [],
      },
    };
    tasks.forEach(task => {
      if (!taskObject[task.id]) {
        taskObject[task.id] = {
          id: task.id,
          list: [],
        };
      }
      taskObject[task.id].list.push(...task.list);
    });

    // Define the initialColumns structure
    

    // Populate initialColumns based on the tasks
    Object.keys(taskObject).forEach(taskId => {
      const task = taskObject[taskId];
      if (initialColumns[taskId]) {
        initialColumns[taskId].list.push(...task.list);
      }
    });

    return initialColumns;
  } catch (error) {
    console.error('Error getting all tasks:', error.message);
    throw error;
  }
};



export const updateTask = async (taskId, newList) => {
  try {
    // Find the task by ID
    console.log(taskId)
    const existingTask = await Task.findOne({ 'list.name': { $in: newList[0].name } });
    // If the task is not found, handle accordingly (throw an error or return a response)
    if (!existingTask) {
      const error = new Error("Task not found.");
      error.statusCode = 404;
      throw error;
    }

    // Remove the task from its previous position in the list
    existingTask.list = existingTask.list.filter((item) => item.name !== newList[0].name);
    // Generate a new ObjectId for the updated task
    const newId = new mongoose.Types.ObjectId();

    // Add the task to its new position in the list with the new ObjectId
    existingTask.list.push({ _id: newId,name:newList[0].name });
    existingTask.id=taskId


    // Save the updated task
    const updatedTask = await existingTask.save();

    return updatedTask;
  } catch (error) {
    console.error("Error updating task:", error.message);
    throw error;
  }
};


