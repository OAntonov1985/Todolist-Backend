const Todos = require("../models/todoModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const createAPIFeatures = require("../utils/APIFeatures")


const GetAllTodos = catchAsync(async (req, res, next) => {
    const features = createAPIFeatures(Todos.find(), req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate();


    const todos = await features.getQuery();
    res
        .status(200)
        .json({
            status: "success",
            datalength: todos.length,
            data: todos
        });
});




const CreateTodo = catchAsync(async (req, res, next) => {
    const todo = req.body;
    const newTodo = await Todos.create(todo);

    if (!newTodo) {
        return next(AppError(`Ooops - somthing wrong/ Call to Developers`, 404));
    };

    res.status(201).json({
        sttus: "success",
        data: newTodo
    });

});

const GetOneTodo = catchAsync(async (req, res, next) => {
    const todoId = req.params.id;
    const oneTodo = await Todos.findById(todoId);

    if (!oneTodo) {
        return next(AppError(`Bad Request. No todo with that ID - ${todoId}`, 400));
    };
    res.status(200).json({
        sttus: "success",
        data: [oneTodo]
    });
});


const UpdateTodo = catchAsync(async (req, res, next) => {
    const todoId = req.params.id;
    const updateInfo = req.body;

    const oneTodo = await Todos.findByIdAndUpdate(todoId, updateInfo, {
        new: true,
        runValidators: true  // start validation all fields in Object for type of in the base
    });

    if (!oneTodo) {
        return next(AppError(`Bad Request. No todo with that ID - ${todoId}`, 400));
    };
    res.status(200).json({
        sttus: "success",
        data: [oneTodo]
    });
});

const DeleteTodo = catchAsync(async (req, res, next) => {
    const todoId = req.params.id;
    const result = await Todos.findByIdAndDelete(todoId);

    if (!result) {
        return next(AppError(`Bad Request. No todo with that ID - ${todoId}`, 400));
    };
    res.status(204).json({
        sttus: "success"
    });
});



module.exports = { GetAllTodos, GetOneTodo, CreateTodo, UpdateTodo, DeleteTodo }