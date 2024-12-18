"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const authService_1 = require("../services/authService");
const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        res.status(401).json({ error: 'Authorization header missing' });
        return;
    }
    const token = authHeader.split(' ')[1]; // Formato esperado: "Bearer <token>"
    try {
        const user = (0, authService_1.verifyToken)(token);
        req.user = user; // Adjuntar usuario a la solicitud
        next();
    }
    catch (error) {
        res.status(401).json({ error: 'Invalid or expired token' });
        return;
    }
};
exports.authenticate = authenticate;
