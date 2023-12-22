import express from 'express';
const app = express();
import {connectToDatabase} from "../server/db.js"
import {setupMiddlewares} from "../middlewares/setup.js"
import { PORT } from '../config/server.js';
import router from '../routes/movieRoute.js';
import watchedRouter from '../routes/watchedRoute.js';
import ratingRouter from '../routes/ratingRoute.js';
import userRouter from '../routes/userRoute.js';
import BannerRouter from '../routes/bannerRoute.js';
connectToDatabase();

// Set up middlewares
setupMiddlewares(app);

// Routes
app.use("/movie",router)
app.use("/watch",watchedRouter)
app.use("/rating",ratingRouter)
app.use("/user",userRouter)
app.use("/",BannerRouter)


app.listen(PORT, () => {
  console.log(`Server Started At PORT ${PORT}`);
});
