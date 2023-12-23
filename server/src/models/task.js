import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  list: [
    {
      name: {
        type: String,
      },
      deadline: {
        type: Date, 
      },
    },
  ],
});

export const Task = mongoose.model("Task", TaskSchema);
