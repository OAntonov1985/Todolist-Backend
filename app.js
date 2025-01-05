const express = require('express');
const todoRouter = require("./routes/todoRouter");
const createError = require("./controllers/errorController");
const AppError = require("./utils/appError");
const cors = require('cors');

const app = express();
const allowedOrigins = ['https://todolist-backend-plt.vercel.app', 'http://localhost:3000'];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}));

app.use(express.json());

app.use('/api/todos', todoRouter);

app.all("*", (req, res, next) => {
    next(AppError(`Cant find url ${req.originalUrl}`, 404));
});

app.use(createError);      // Handeling all errors in the App
module.exports = app;


