"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const test_controller_1 = require("../controllers/test_controller");
class TestRoute {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', test_controller_1.testController.index);
    }
}
const testRoute = new TestRoute();
exports.default = testRoute.router;
