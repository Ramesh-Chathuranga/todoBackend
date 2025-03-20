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
exports.checkTodokDependency = void 0;
const todo_modal_1 = __importDefault(require("../models/todo.modal"));
const logger_1 = __importDefault(require("../utils/logger"));
const checkTodokDependency = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todoId = req.params.id;
        const dependentTodo = yield todo_modal_1.default.findOne({ dependencies: todoId });
        if (dependentTodo) {
            logger_1.default.warn(`Attempt to delete todo ${todoId} which is a dependency`);
            res.status(400).json({ message: 'Todo is being used as a dependency and cannot be deleted.' });
        }
        else {
            next();
        }
    }
    catch (error) {
        logger_1.default.error('Error checking todo dependency:', error);
        res.status(500).json({ error: error.message });
    }
});
exports.checkTodokDependency = checkTodokDependency;
