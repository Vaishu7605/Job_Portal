import swaggerUi from 'swagger-ui-express';
import swaggerDoc from 'swagger-jsdoc';

import express from "express";
import "express-async-errors";
import dotenv from 'dotenv';
import colors from 'colors';
import cors from 'cors';
import morgan from 'morgan';

import helmet from 'helmet';
import xss from 'xss-clean';
import mongoSanitize from 'express-mongo-sanitize';
import connectDB from './config/db.js';

import testRoutes from './routes/testRoutes.js';
import authRoutes from './routes/authRoutes.js';
import errorMiddleware from "./middlewares/error.Middleware.js";
import userRoutes from './routes/userRoutes.js';
import jobsRoutes from './routes/jobsRoutes.js';

//Dot ENV config
dotenv.config();

//mongodb connection
connectDB();

//api config
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'JobPortal Application',
            description: 'Node Expressjs Job Portal Application'
        },
        servers: [
            {
                url: "http://localhost:3000"
            }
        ]
    },
    apis: ['./routes/*.js'],
};

const spec = swaggerDoc(options)

//rest object
const app = express();

//middlewares
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.use('/api/v1/test', testRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/job', jobsRoutes);
app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(spec));
// middleware
app.use(errorMiddleware);



const PORT = process.env.PORT || 8080;
app.listen(8080, () => {
    console.log(`Node Server Running In ${process.env.DEV_MODE} Mode on ${PORT}`.bgCyan.white
    );
});