import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRoutes from './Routers/user.Routes.js';
import courseRoutes from './Routers/course.Routes.js';
import paymentRoutes from './Routers/payment.Routes.js';
import {config} from 'dotenv';
import errorMiddleware from './Middlewares/error.Middleware.js';
config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended : true}))
app.use(express.urlencoded({extended:true}));
app.use(cors({
    origin:[process.env.CLIENT_URL],
    credentials:true
}));

app.use(cookieParser());




app.get('/ping',(req,res)=>{
    res.send('Pong');
});


// Routes of 3 Modules
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/courses', courseRoutes);
app.use('/api/v1/payements', paymentRoutes);


app.all('*',(req,res)=>{
    res.status(404).send("Oops! 404 Page not found");
});

app.use(errorMiddleware);

export default app;