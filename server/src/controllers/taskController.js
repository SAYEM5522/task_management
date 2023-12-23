import { createTask, getTasks, updateTask } from '../services/taskService.js';

export const createTaskList = async (req, res) => {
  try {
    const taskData = req.body;
    const savedTask = await createTask(taskData);
    res.status(201).json(savedTask);
  } catch (error) {
    console.error('Error creating task:', error.message);
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({ error: error.message });
  }
};

export const getAllTasks = async (req, res) => {
  try {
    const allTasks = await getTasks();
    res.status(200).json(allTasks);
  } catch (error) {
    // console.error('Error getting all tasks:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const updateTaskList=async (req, res) => {
  const { id, list} = req.body;
  console.log(list)
  try {
    const updatedTask = await updateTask(id, list);
    res.json(updatedTask);
  } catch (error) {
    console.error("Error updating task:", error.message);
    res.status(error.statusCode || 500).json({ error: error.message });
  }
}
