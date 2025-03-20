"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTodoById = exports.deleteTodo = exports.updateTodo = exports.getTodos = exports.createTodo = void 0;
const todo_modal_1 = __importDefault(require("../models/todo.modal"));
const logger_1 = __importDefault(require("../utils/logger"));
const createTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todo = new todo_modal_1.default(req.body);
        yield todo.save();
        logger_1.default.info(`Todocreated: ${todo._id}`);
        res.status(201).json({ data: todo, message: 'Todo created succesfully' });
    }
    catch (error) {
        logger_1.default.error('Error creating todo:', error);
        res.status(400).json({ error, message: error.message });
    }
});
exports.createTodo = createTodo;
const getTodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { status, priority, search } = req.query;
        const filter = {};
        if (status)
            filter.status = status;
        if (priority)
            filter.priority = priority;
        if (search)
            filter.title = { $regex: search, $options: 'i' };
        const todos = yield todo_modal_1.default.find(filter);
        // .populate('dependencies');
        res.json({ data: todos, message: 'Todo retrieve successfully' });
    }
    catch (error) {
        logger_1.default.error('Error fetching todos:', error);
        res.status(500).json({ error: error.message, message: 'Todo retrieve successfully' });
    }
});
exports.getTodos = getTodos;
const updateTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todo = yield todo_modal_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        logger_1.default.info(`Todo updated: ${req.params.id}`);
        res.json({ data: todo, message: 'Your task has been updated' });
    }
    catch (error) {
        logger_1.default.error('Error updating todo:', error);
        res.status(400).json({ error, message: error.message });
    }
});
exports.updateTodo = updateTodo;
const deleteTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield todo_modal_1.default.findByIdAndDelete(req.params.id);
        logger_1.default.info(`Todo deleted: ${req.params.id}`);
        res.json({ message: 'Todo deleted', data: { id: req.params.id } });
    }
    catch (error) {
        logger_1.default.error('Error deleting todo:', error);
        res.status(500).json({ error, message: error.message });
    }
});
exports.deleteTodo = deleteTodo;
const getTodoById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todo = yield todo_modal_1.default.findById(req.params.id);
        logger_1.default.info(`get todo: ${req.params.id}`);
        res.json({ data: todo, message: 'Your task has been retrieve' });
    }
    catch (error) {
        logger_1.default.error('Error geting todo by id:', error);
        res.status(500).json({ error, message: error.message });
    }
});
exports.getTodoById = getTodoById;
