import  { Router } from "express"
import { authenticate } from "../middleware/auth";
import { isAdmin } from "../middleware/admin";
import { CustomerController } from "../controllers/customerController";

const route = Router();

route.get(
    '/customers',
    authenticate,
    isAdmin,
    CustomerController.getCustomers
)

route.get(
    '/monthly-visit',
    authenticate,
    isAdmin,
    CustomerController.getMonthlyVisit
)

route.get(
    '/last-month-customer',
    authenticate,
    isAdmin,
    CustomerController.getLastMonthCustomer
)

route.get(
    '/total-appointment-month',
    authenticate,
    isAdmin,
    CustomerController.totalAppointmentsMonth
)


route.get(
    '/total-service-month',
    authenticate,
    isAdmin,
    CustomerController.totalServiceMonth
)
export default route;