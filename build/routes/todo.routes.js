"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const todod_controller_1 = require("../controllers/todod.controller");
const todo_middleware_1 = require("../middlewares/todo.middleware");
const router = express_1.default.Router();
router.get('/todo/:id', todod_controller_1.getTodoById);
router.post('/todo', todod_controller_1.createTodo);
router.get('/todo', todod_controller_1.getTodos);
router.put('/todo/:id', todod_controller_1.updateTodo);
router.delete('/todo/:id', todo_middleware_1.checkTodokDependency, todod_controller_1.deleteTodo);
exports.default = router;
