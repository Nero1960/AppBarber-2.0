import type { Request, Response } from "express"
import User from "../models/User";
import Appointment from "../models/Appointment";
import { col, fn, literal, Op } from "sequelize";
import AppointmentService from "../models/AppointmentService";

export class CustomerController {

    public static getCustomers = async (request: Request, response: Response) => {
        try {

            const customers = await Appointment.findAll({
                where: {
                    status: 'completed'
                },
                attributes: [
                    'userId',
                    [fn('MAX', col('date')), 'lastVisit']
                ],
                include: [
                    {
                        model: User,
                        attributes: ['name', 'lastname', 'image', 'phone']
                    }
                ],
                group: ['userId'],
                order: [[literal('lastVisit'), 'DESC']],

            });

            response.status(200).json(customers)

        } catch (error) {
            const err = new Error("Oops! Error del servidor");
            response.status(500).json({ error: err.message })
        }

    }

    public static getMonthlyVisit = async (request: Request, response: Response) => {
        try {

            const data = await Appointment.findAll({
                where: {
                    status: 'completed'
                },
                attributes: [
                    [fn('MONTHNAME', col('date')), 'month'],
                    [fn('COUNT', literal('*')), 'totalAppointments']
                ],
                group: [fn('MONTH', col('date')), fn('MONTHNAME', col('date'))],     // Agrupa por mes
                order: [[literal('month'), 'ASC']],
            })

            response.status(200).json(data)

        } catch (error) {
            const err = new Error("Oops! Error del servidor");
            response.status(500).json({ error: err.message })
        }

    }

    public static getLastMonthCustomer = async (request: Request, response: Response) => {
        try {

            const customerCount = await User.count({
                where: {
                    createdAt: {
                        [Op.gte]: new Date(new Date().setMonth(new Date().getMonth() - 1))
                    }
                },
            })

            response.status(200).json(customerCount)

        } catch (error) {
            const err = new Error("Oops! Error del servidor");
            response.status(500).json({ error: err.message })
        }
    }

    public static totalAppointmentsMonth = async (request: Request, response: Response) => {
        try {
            const totalAppointmentsThisMonth = await Appointment.count({
                where: {
                    date: {
                        [Op.and]: [
                            { [Op.gte]: new Date(new Date().getFullYear(), new Date().getMonth(), 1) }, // Primer día del mes
                            { [Op.lt]: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1) } // Primer día del siguiente mes
                        ]
                    },
                    status: 'completed'
                }
            });

            response.status(200).json(totalAppointmentsThisMonth)

        } catch (error) {
            const err = new Error("Oops! Error del servidor");
            response.status(500).json({ error: err.message })
        }
    }

    public static totalServiceMonth = async (request: Request, response: Response) => {
        try {
            const totalServices = await AppointmentService.count({
                include: [
                    {
                        model: Appointment,
                        where: {
                            date: {
                                [Op.gte]: new Date(new Date().getFullYear(), new Date().getMonth(), 1), // Primer día del mes
                                [Op.lt]: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1)
                            },
                            status: 'completed'
                        }
                    }
                ]
            })

            response.status(200).json(totalServices)

        } catch (error) {
            const err = new Error("Oops! Error del servidor");
            response.status(500).json({ error: err.message })
        }

    }
}