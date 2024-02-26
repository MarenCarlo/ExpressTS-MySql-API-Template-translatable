"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testController = void 0;
class TestController {
    index(req, res) {
        res.status(200).json({
            error: false,
            message: 'API running'
        });
    }
}
exports.testController = new TestController();
