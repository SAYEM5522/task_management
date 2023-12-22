import cors from 'cors';
import bodyParser from 'body-parser';
import helmet from "helmet"

export const setupMiddlewares = (app) => {
  app.use(cors());
  app.use(bodyParser.json());
  app.use(helmet())
};
