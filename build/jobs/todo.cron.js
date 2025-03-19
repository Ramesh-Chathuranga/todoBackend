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
const node_cron_1 = __importDefault(require("node-cron"));
const todo_modal_1 = __importDefault(require("../models/todo.modal"));
const logger_1 = __importDefault(require("../utils/logger"));
node_cron_1.default.schedule('0 0 * * *', () => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.default.info('Running scheduled task for recurring tasks');
    const todos = yield todo_modal_1.default.find({ recurrence: { $ne: 'none' } });
    todos.forEach((todo) => __awaiter(void 0, void 0, void 0, function* () {
        let date = new Date();
        if (todo.recurrence === 'daily')
            date.setDate(date.getDate() + 1);
        if (todo.recurrence === 'weekly')
            date.setDate(date.getDate() + 7);
        if (todo.recurrence === 'monthly')
            date.setMonth(date.getMonth() + 1);
        yield new todo_modal_1.default(Object.assign(Object.assign({}, todo.toObject()), { _id: undefined, createdAt: date })).save();
        logger_1.default.info(`Recurring task created: ${todo.title} for ${date}`);
    }));
}));
