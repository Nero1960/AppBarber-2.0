"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const admin_1 = require("../middleware/admin");
const customerController_1 = require("../controllers/customerController");
const express_validator_1 = require("express-validator");
const route = (0, express_1.Router)();
route.get('/customers', auth_1.authenticate, admin_1.isAdmin, customerController_1.CustomerController.getCustomers);
route.get('/monthly-visit', auth_1.authenticate, admin_1.isAdmin, customerController_1.CustomerController.getMonthlyVisit);
route.get('/last-month-customer', auth_1.authenticate, admin_1.isAdmin, customerController_1.CustomerController.getLastMonthCustomer);
route.get('/total-appointment-month', auth_1.authenticate, admin_1.isAdmin, customerController_1.CustomerController.totalAppointmentsMonth);
route.get('/total-service-month', auth_1.authenticate, admin_1.isAdmin, customerController_1.CustomerController.totalServiceMonth);
route.delete('/:userId/delete', (0, express_validator_1.param)('userId')
    .isNumeric().withMessage('ID del usuario no valido'), auth_1.authenticate, admin_1.isAdmin, customerController_1.CustomerController.deleteCustomer);
exports.default = route;
//# sourceMappingURL=customerRoute.js.map