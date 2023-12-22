// database.js
import mongoose from 'mongoose';
import { connection_url } from '../config/server.js';

export const connectToDatabase = () => {
  mongoose.connect(connection_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  mongoose.connection.once('open', () => {
    console.log('Connected Successfully');
  });
};
