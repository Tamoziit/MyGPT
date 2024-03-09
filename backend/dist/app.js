import express from 'express';
import { config } from "dotenv"; //Importing configs from .env files
import morgan from "morgan";
import appRouter from './routes/index.js';
import cookieParser from 'cookie-parser';
import cors from "cors";
config();
const app = express(); //setting up express
//Implementing Middlewares
app.use(cors({ origin: "http://localhost:5173", credentials: true })); //Whitelisting backend server from CORS Policy Error.
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET)); //Cookie for HTTP only Cookie request.
app.use(morgan("dev")); //Only for development , to be removed in production
app.use("/api/v1", appRouter); // domain/api/v1
export default app;
//# sourceMappingURL=app.js.map