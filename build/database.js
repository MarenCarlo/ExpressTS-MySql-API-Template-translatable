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
const promise_mysql_1 = __importDefault(require("promise-mysql"));
const keys_1 = __importDefault(require("./keys"));
const pool = promise_mysql_1.default.createPool(keys_1.default.database);
// Utiliza 'await' para esperar a que se resuelva la promesa
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const connection = yield pool.getConnection();
        console.log('DB is connected');
        // Realiza tus operaciones con la conexión aquí
    }
    catch (error) {
        console.error('Error connecting to the database:', error);
    }
    finally {
        pool.end(); // Asegúrate de liberar la conexión en caso de éxito o error
    }
}))();
exports.default = pool;
