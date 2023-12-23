import express from 'express';
const app = express();
import {connectToDatabase} from "../server/db.js"
import {setupMiddlewares} from "../middlewares/setup.js"
import { PORT } from '../config/server.js';
import { taskRouter } from '../routes/taskRoutes.js';
import { cardRouter } from '../routes/cardRoute.js';
connectToDatabase();

// Set up middlewares
setupMiddlewares(app);

// Routes
app.use("/task",taskRouter)
app.use("/card",cardRouter)




app.listen(PORT, () => {
  console.log(`Server Started At PORT ${PORT}`);
});
