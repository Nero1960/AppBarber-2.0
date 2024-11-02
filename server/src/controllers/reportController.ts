//Controlador para los reportes de la sección administrativa
import type { Request, Response } from 'express'
import User from '../models/User';
import Appointment from '../models/Appointment';
import { col, fn, literal } from 'sequelize';
import Barber from '../models/Barber';
import Service from '../models/Service';

class ReportController {

    public static getLastUsers = async (request: Request, response: Response) => {

        try {

            const lastUsers = await User.findAll({
                order: [
                    ['userId', 'DESC']
                ],
                attributes: ['userId', 'name', 'lastname', 'email', 'image'],
                limit: 3
            })

            response.status(200).json(lastUsers);

        } catch (error) {
            console.log(error)
            const err = new Error('Oops! Something went wrong');
            return response.status(500).json({ error: err.message });
        }

    }

    public static getPeakHour = async (request: Request, response: Response) => {
        try {

            const peakHours = await Appointment.findAll({
                attributes: [
                    [fn('HOUR', col('time')), 'hour'],
                    [fn('COUNT', col('appointmentId')), 'appointment_count']
                ],
                group: ['time'],
                order: [[literal('appointment_count'), 'DESC']],
            })

            response.status(200).json(peakHours);

        } catch (error) {
            console.log(error)
            response.status(500).json(error)

        }

    }

    public static getTopBarbers = async (request: Request, response: Response) => {
        try {

            const topBarber = await Barber.findAll({
                attributes: [
                    'barberId',
                    'name',
                    'lastname',
                    'image',
                    [
                        literal(`COUNT(DISTINCT CASE WHEN DATE(appointment.date) = CURDATE() AND appointment.time >= CURTIME() THEN appointment.appointmentId END)`),
                        'dailyClients',
                    ],
                    [
                        literal(`COUNT(DISTINCT CASE WHEN YEAR(appointment.date) = YEAR(CURRENT_DATE()) AND WEEK(appointment.date, 1) = WEEK(CURRENT_DATE(), 1) THEN appointment.appointmentId END)`),
                        'weeklyClients',
                    ],
                    [
                        literal(`COUNT(DISTINCT CASE WHEN YEAR(appointment.date) = YEAR(CURRENT_DATE()) AND MONTH(appointment.date) = MONTH(CURRENT_DATE()) THEN appointment.appointmentId END)`),
                        'monthlyClients',
                    ],
                    [
                        literal(`SUM(CASE WHEN DATE(appointment.date) = CURDATE() AND appointment.time >= CURTIME() THEN current_price END)`),
                        'dailyRevenue',
                    ],
                    [
                        literal(`SUM(CASE WHEN YEAR(appointment.date) = YEAR(CURRENT_DATE()) AND WEEK(appointment.date, 1) = WEEK(CURRENT_DATE(), 1) THEN current_price END)`),
                        'weeklyRevenue',
                    ],
                    [
                        literal(`SUM(CASE WHEN YEAR(appointment.date) = YEAR(CURRENT_DATE()) AND MONTH(appointment.date) = MONTH(CURRENT_DATE()) THEN current_price END)`),
                        'monthRevenue',
                    ],
                ], //end attributes

                include: [
                    {
                        model: Appointment,
                        attributes: [],
                        include: [
                            {
                                model: Service,
                                attributes: [],
                                through: {
                                    attributes:[],
                                }
                            },
                        ]
                    },
                ],
                group: ['Barber.barberId'],
                order: [[literal('dailyClients'), 'DESC']],
            })

            response.status(200).json(topBarber);


        } catch (error) {
            console.log(error);
            const err = new Error('Oops! Something went wrong');
            return response.status(500).json({ error: err.message });
        }

    }

    public static getTopUsers = async (request: Request, response: Response) => {
        try {

            const topUsers = await Appointment.findAll({
                attributes: [
                    'userId',
                    [fn('COUNT', col('appointmentId')), 'totalAppointments'],
                    [fn('MAX',col('date')), 'lastAppointment']
                ],
                include: [
                    {
                        model: User,
                        attributes: ['name', 'email', 'lastname', 'image', 'phone']
                    }
                ],
                group: ['userId'],
                order: [[literal('totalAppointments'), 'DESC']],
                limit: 3,
            })

            response.status(200).json(topUsers);
            
        } catch (error) {
            console.log(error);
            const err = new Error('Oops! Something went wrong');
            return response.status(500).json({ error: err.message });
        }

    }

}

export default ReportController;