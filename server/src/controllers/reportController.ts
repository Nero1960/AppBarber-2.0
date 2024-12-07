//Controlador para los reportes de la sección administrativa
import type { Request, Response } from 'express'
import User from '../models/User';
import Appointment from '../models/Appointment';
import { col, fn, literal } from 'sequelize';
import Barber from '../models/Barber';
import Service from '../models/Service';
import AppointmentCancellation from '../models/AppointmentCancellation';

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
                where: {
                    status: 'completed'
                },
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
                        where: {
                            status: 'completed'
                        },
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

    public static getAllAppointments = async (request: Request, response: Response) =>  {
        try {
            
            const appointments = await Appointment.findAll({
                attributes: ['appointmentId','status', 'date', 'time'],
                include: [
                    {
                        model: User,
                        attributes: ['name', 'lastname', 'email', 'image']
                    },

                    {
                        model: Barber,
                        attributes: ['name', 'lastname', 'image']
                    }
                ],
                order: [
                    [literal(`CASE WHEN status = 'pending' THEN 0 ELSE 1 END`), 'ASC'],
                ]
            })

            response.status(200).json(appointments);
            
        } catch (error) {
            console.log(error)
            const err = new Error('Oops! Something went wrong');
            return response.status(500).json({ error: err.message });
        }
    }

    public static getAppointmentById = async ( request: Request, response: Response) => {
        try {

            const appointmentId = +request.params.appointmentId;

            const appointment = await Appointment.findByPk(appointmentId, {

                attributes: ['appointmentId', 'date', 'time', 'status'],
                include: [
                    {
                        model: User,
                        attributes: ['name', 'lastname', 'image']
                    },
                    {
                        model: Service,
                        attributes: ['name', 'serviceId'],
                        through: {
                            attributes: ['current_price']
                        }
                    },
                ]
            });

            response.status(200).json(appointment)
        
        } catch (error) {
            console.log(error)
            const err = new Error('Oops! Something went wrong');
            return response.status(500).json({ error: err.message });
        }
    }

    public static updateAppointmentStatus = async ( request: Request, response: Response) => {
        try {
            const appointmentId = +request.params.appointmentId;
            const status = request.body.status;

            const appointment = await Appointment.findByPk(appointmentId);
            appointment.status = status;

            await appointment.save();
            
            response.status(200).send('Has cambiado el estado de la cita');

        } catch (error) {
            console.log(error)
            const err = new Error('Oops! Something went wrong');
            return response.status(500).json({ error: err.message });
        }

    }

    public static getStatusData = async (request: Request, response: Response) => {
        try {

            const statusData = await Appointment.findAll({
                attributes: [
                    ['status', 'name'],
                    [fn('COUNT', col('status')), 'value']
                ],
                group: ['status']
            })

            response.status(200).json(statusData);
            
        } catch (error) {
            const err = new Error("Oops! some error occurred");
            return response.status(500).json({ error: err.message });
        }

    }

    public static getCancellationReasonData = async (request: Request, response: Response) => {
        try {

            const cancellationReasonData = await AppointmentCancellation.findAll({
                attributes: [
                    ['cancellation_reason', 'reason'],
                    [fn('COUNT', col('cancellation_reason')), 'count']
                ],
                group: ['cancellation_reason']
            })

            response.status(200).json(cancellationReasonData);
            
        } catch (error) {
            const err = new Error('!Oops! Something went wrong');
            return response.status(500).json({ error: err.message });
        }

    }

}

export default ReportController;