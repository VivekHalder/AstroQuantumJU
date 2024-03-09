import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { limit } from './constants.js';
import { errorHandler } from './middlewares/errorHandler.middleware.js';

const app = express();

app.use(cors({
    origin: [process.env.CORS_ORIGIN, "https://astro-and-modern-physics.vercel.app", "https://astro-quantum-ju.onrender.com"],
    credentials: true,
}));
app.use(express.json({limit: `${limit}`}));
app.use(express.urlencoded({extended: true , limit: `${limit}`}));

app.use(cookieParser());

import useRoute from './routes/user.routes.js'
app.use("/api/v1/users", useRoute);

import blogRoutes from './routes/blog.routes.js';
app.use("/api/v1/blogs", blogRoutes);

app.use(errorHandler);

export { app };