"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const colors_1 = __importDefault(require("colors"));
const database_1 = __importDefault(require("./config/database"));
const User_1 = __importDefault(require("./models/User"));
const Barber_1 = __importDefault(require("./models/Barber"));
const Service_1 = __importDefault(require("./models/Service"));
const Appointment_1 = __importDefault(require("./models/Appointment"));
const AppointmentService_1 = __importDefault(require("./models/AppointmentService"));
const Testimonials_1 = __importDefault(require("./models/Testimonials"));
const auth_1 = require("./helpers/auth");
const seed = async () => {
    try {
        await database_1.default.authenticate();
        console.log(colors_1.default.bgGreen.white('Database connection established successfully.'));
        await database_1.default.sync();
        await database_1.default.sync({ force: true });
        console.log(colors_1.default.bgGreen.white('Tables dropped and recreated.'));
        const usersData = [
            { name: 'Andy', lastname: 'Mena', email: 'andy.mena@barbershop.com', password: 'Password123', phone: '8095550101', address: 'Av. Independencia 123, Santo Domingo', admin: 1 },
            { name: 'Maria', lastname: 'Rodriguez', email: 'maria.rodriguez@barbershop.com', password: 'Password123', phone: '8095550102', address: 'Calle El Conde 45, Santo Domingo', admin: 1 },
            { name: 'Juan', lastname: 'Perez', email: 'juan.perez@example.com', password: 'Password123', phone: '8095550103', address: 'Av. 27 de Febrero 789, Santo Domingo', admin: 0 },
            { name: 'Pedro', lastname: 'Sanchez', email: 'pedro.sanchez@example.com', password: 'Password123', phone: '8095550104', address: 'Calle Duarte 12, Santiago', admin: 0 },
            { name: 'Luis', lastname: 'Fernandez', email: 'luis.fernandez@example.com', password: 'Password123', phone: '8095550105', address: 'Av. Lincoln 456, Santo Domingo', admin: 0 },
            { name: 'Carlos', lastname: 'Gomez', email: 'carlos.gomez@example.com', password: 'Password123', phone: '8095550106', address: 'Calle Hostos 88, La Vega', admin: 0 },
            { name: 'Jose', lastname: 'Martinez', email: 'jose.martinez@example.com', password: 'Password123', phone: '8095550107', address: 'Av. Las Americas 321, Santo Domingo Este', admin: 0 },
            { name: 'Rafael', lastname: 'Diaz', email: 'rafael.diaz@example.com', password: 'Password123', phone: '8095550108', address: 'Calle Sanchez 56, San Pedro de Macoris', admin: 0 },
        ];
        const users = [];
        for (const data of usersData) {
            const user = await User_1.default.create({
                ...data,
                confirmed: 1,
                password: await (0, auth_1.hashPassword)(data.password),
            });
            users.push(user);
        }
        console.log(colors_1.default.bgGreen.white(`Seeded ${users.length} users.`));
        const barbersData = [
            { name: 'Miguel', lastname: 'Santos', phone: '8095550201', email: 'miguel.santos@barbershop.com', specialty: 'Cortes clasicos y tijera', image: 'default.png' },
            { name: 'Roberto', lastname: 'Jimenez', phone: '8095550202', email: 'roberto.jimenez@barbershop.com', specialty: 'Barba y afeitado clasico', image: 'default.png' },
            { name: 'Fernando', lastname: 'Castillo', phone: '8095550203', email: 'fernando.castillo@barbershop.com', specialty: 'Degradados (fades) y corte moderno', image: 'default.png' },
            { name: 'Jorge', lastname: 'Herrera', phone: '8095550204', email: 'jorge.herrera@barbershop.com', specialty: 'Corte infantil y peinados', image: 'default.png' },
            { name: 'Alberto', lastname: 'Vargas', phone: '8095550205', email: 'alberto.vargas@barbershop.com', specialty: 'Diseno de barba y estilos creativos', image: 'default.png' },
        ];
        const barbers = await Barber_1.default.bulkCreate(barbersData);
        console.log(colors_1.default.bgGreen.white(`Seeded ${barbers.length} barbers.`));
        const servicesData = [
            { name: 'Corte de Cabello', price: 250.0, createdAt: new Date() },
            { name: 'Corte Infantil', price: 150.0, createdAt: new Date() },
            { name: 'Barba Completa', price: 150.0, createdAt: new Date() },
            { name: 'Afeitado Clasico', price: 200.0, createdAt: new Date() },
            { name: 'Corte + Barba', price: 350.0, createdAt: new Date() },
            { name: 'Degradado (Fade)', price: 300.0, createdAt: new Date() },
            { name: 'Tinte de Cabello', price: 500.0, createdAt: new Date() },
            { name: 'Tratamiento Capilar', price: 400.0, createdAt: new Date() },
        ];
        const services = await Service_1.default.bulkCreate(servicesData);
        console.log(colors_1.default.bgGreen.white(`Seeded ${services.length} services.`));
        const appointmentsData = [
            { user: users[2], barber: barbers[0], date: '2026-08-10', time: '10:00:00', status: 'completed', services: [0, 2] },
            { user: users[3], barber: barbers[1], date: '2026-08-11', time: '14:30:00', status: 'completed', services: [3] },
            { user: users[4], barber: barbers[2], date: '2026-08-12', time: '16:00:00', status: 'completed', services: [1, 5] },
            { user: users[5], barber: barbers[3], date: '2026-08-13', time: '09:30:00', status: 'completed', services: [1] },
            { user: users[6], barber: barbers[4], date: '2026-08-14', time: '11:00:00', status: 'completed', services: [0, 3] },
            { user: users[2], barber: barbers[1], date: '2026-08-12', time: '15:00:00', status: 'cancelled', services: [2, 4] },
            { user: users[7], barber: barbers[0], date: '2026-08-13', time: '17:30:00', status: 'cancelled', services: [0] },
            { user: users[3], barber: barbers[2], date: '2026-08-17', time: '10:00:00', status: 'pending', services: [5, 3] },
            { user: users[4], barber: barbers[0], date: '2026-08-17', time: '11:30:00', status: 'pending', services: [0] },
            { user: users[5], barber: barbers[4], date: '2026-08-18', time: '14:00:00', status: 'pending', services: [6] },
            { user: users[6], barber: barbers[1], date: '2026-08-18', time: '16:30:00', status: 'pending', services: [2] },
            { user: users[7], barber: barbers[3], date: '2026-08-19', time: '09:00:00', status: 'pending', services: [0, 4, 7] },
        ];
        for (const data of appointmentsData) {
            const appointment = await Appointment_1.default.create({
                userId: data.user.userId,
                barberId: data.barber.barberId,
                date: new Date(data.date),
                time: data.time,
                status: data.status,
            });
            for (const index of data.services) {
                const service = services[index];
                await AppointmentService_1.default.create({
                    appointmentId: appointment.appointmentId,
                    serviceId: service.serviceId,
                    current_price: service.price,
                });
            }
        }
        console.log(colors_1.default.bgGreen.white(`Seeded ${appointmentsData.length} appointments.`));
        const testimonialsData = [
            { user: users[2], title: 'Excelente corte', message: 'Siempre salgo satisfecho, el mejor barbero de la zona.', status: 'approved' },
            { user: users[3], title: 'Atencion de primera', message: 'El afeitado clasico fue perfecto, muy profesional.', status: 'approved' },
            { user: users[4], title: 'Muy recomendado', message: 'El degradado quedo increible, volvere sin duda.', status: 'approved' },
            { user: users[5], title: 'Servicio rapido', message: 'Me atendieron puntual y el corte infantil de mi hijo quedo genial.', status: 'approved' },
            { user: users[6], title: 'Ambiente agradable', message: 'Buena musica, buen trato y el tinte quedo perfecto.', status: 'approved' },
            { user: users[7], title: 'Calidad garantizada', message: 'El tratamiento capilar valio cada peso, excelente servicio.', status: 'approved' },
        ];
        for (const data of testimonialsData) {
            await Testimonials_1.default.create({
                userId: data.user.userId,
                title: data.title,
                message: data.message,
                status: data.status,
                date: new Date(),
            });
        }
        console.log(colors_1.default.bgGreen.white(`Seeded ${testimonialsData.length} testimonials.`));
        await database_1.default.close();
        console.log(colors_1.default.bgGreen.white('Seed completed successfully.'));
    }
    catch (error) {
        console.log(colors_1.default.bgRed.white('Seed failed:'), error);
        process.exit(1);
    }
};
seed();
//# sourceMappingURL=seed.js.map