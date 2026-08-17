"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleInputErrors = void 0;
const express_validator_1 = require("express-validator");
const handleInputErrors = (request, response, next) => {
    let errors = (0, express_validator_1.validationResult)(request);
    if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() });
    }
    next();
};
exports.handleInputErrors = handleInputErrors;
//# sourceMappingURL=Validation.js.map