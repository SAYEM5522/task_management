
import express from "express"
import { createTaskList, getAllTasks, updateTaskList } from "../controllers/taskController.js"

const taskRouter=express.Router()

taskRouter.post("/createTask",createTaskList)
taskRouter.get("/gettasks",getAllTasks)
taskRouter.post("/updateTask",updateTaskList)



export {taskRouter}