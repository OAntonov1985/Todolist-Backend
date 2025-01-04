const express = require('express');
const todoRouter = require("./routes/todoRouter");
const createError = require("./controllers/errorController");
const AppError = require("./utils/appError");
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());  // Middleware

app.use('/todos', todoRouter);

app.all("*", (req, res, next) => {
    next(AppError(`Cant find url ${req.originalUrl}`, 404));
});

app.use(createError);      // Handeling all errors in the App
module.exports = app;


