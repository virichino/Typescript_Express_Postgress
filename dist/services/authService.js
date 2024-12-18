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
exports.verifyToken = exports.loginUser = exports.registerUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("../db");
const JWT_SECRET = process.env.JWT_SECRET || 'secret';
// Registrar un usuario
const registerUser = (name, email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const hashedPassword = yield bcrypt_1.default.hash(password, 10); // Cifra la contraseña
    const { rows } = yield (0, db_1.query)('INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *', [name, email, hashedPassword]);
    return rows[0];
});
exports.registerUser = registerUser;
// Iniciar sesión
const loginUser = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const { rows } = yield (0, db_1.query)('SELECT * FROM users WHERE email = $1', [email]);
    const user = rows[0];
    if (!user) {
        throw new Error('Invalid email or password');
    }
    const isMatch = yield bcrypt_1.default.compare(password, user.password); // Compara contraseñas
    if (!isMatch) {
        throw new Error('Invalid email or password');
    }
    // Generar un token JWT
    const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
    return token;
});
exports.loginUser = loginUser;
// Validar token JWT
const verifyToken = (token) => {
    try {
        return jsonwebtoken_1.default.verify(token, JWT_SECRET);
    }
    catch (error) {
        throw new Error('Invalid or expired token');
    }
};
exports.verifyToken = verifyToken;
