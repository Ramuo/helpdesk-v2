import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';

import {notFound, errorHandler} from './middleware/errorMiddleware.js';

import userRoute from './routes/userRoute.js';

const port = process.env.PORT || 5000;



connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(cookieParser());

app.use('/api/users', userRoute);

app.get('/', (req, res) => {
    res.send('API is running...')
});


app.use(notFound);
app.use(errorHandler)

app.listen(port, () => console.log(`Server is running on ${port}`));