const express = require("express");
const { GetAllTodos, GetOneTodo, CreateTodo, UpdateTodo, DeleteTodo } = require("../controllers/todoController")

const router = express.Router();

router
    .route('/')
    .get(GetAllTodos)                       // Get all todos
    .post(CreateTodo)                       // Create new todo
// .post(someFoo, CreateTodo)               // Some middleware before CreateTodo starting

router
    .route(`/:id`)
    .get(GetOneTodo)                        // Get one tour
    .patch(UpdateTodo)                      // Update one tour
    .delete(DeleteTodo)                     // Delete one tour

module.exports = router;