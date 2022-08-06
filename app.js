import express from "express";
import morgan from "morgan";
import cors from "cors";
import dbConnection from "./config/database.js";
import { PORT } from "./config/constants.js";

// Routes
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import productRoutes from "./routes/product.js";

const App = () => {
  // App
  const app = express();

  // Middlewares
  app.use(morgan("dev"));
  app.use(cors());
  app.use(express.json());

  // Add routes
  app.use("/api", authRoutes);
  app.use("/api", userRoutes);
  app.use("/api", productRoutes);

  app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
    dbConnection();
  });
};

export default App;
