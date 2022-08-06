import express from "express";
import morgan from "morgan";
import cors from "cors";
import dbConnection from "./config/database.js";
import { PORT } from "./config/constants.js";

const App = () => {
  // App
  const app = express();

  // Middlewares
  app.use(morgan("dev"));
  app.use(cors());
  app.use(express.json());

  app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
    dbConnection();
  });
};

export default App;
