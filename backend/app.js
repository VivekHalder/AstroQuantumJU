import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { limit } from './constants.js';

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}));
app.use(express.json({limit: `${limit}`}));
app.use(express.urlencoded({extended: true , limit: `${limit}`}));

app.use(cookieParser());

import useRoute from './routes/user.routes.js'
app.use("/api/v1/users", useRoute);

import blogRoutes from './routes/blog.routes.js';
app.use("/api/v1/blogs", blogRoutes);

export { app };