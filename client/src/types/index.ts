import { z } from 'zod'

//Auth Schemas
//Model Auth
export const authSchema = z.object({
    userId: z.number(),
    name: z.string(),
    lastname: z.string(),
    phone: z.string(),
    email: z.string().email(),
    password: z.string().min(8),
    password_confirmation: z.string(),
});

//Types Authentication
export type Auth = z.infer<typeof authSchema>;
export type AuthLogin = Pick<Auth, 'email' | 'password'>
export type AuthForgotPassword = Pick<Auth, 'email'>
export type AuthResetPassword = Pick<Auth, 'password' | 'password_confirmation'>
export type AuthRequestToken = Pick<Auth, 'email'>
export type AuthRegister = Pick<Auth, 'name' | 'lastname' | 'phone' | 'email' | 'password' | 'password_confirmation'>


//Token Schemas
export const tokenSchema = z.object({
    tokenId: z.string(),
    createdAt: z.date(),
    expiredAt: z.date(),
    token: z.string(),
    userId: z.number(),
});

//Types Tokens
export type Token = z.infer<typeof tokenSchema>;
export type TokenForm = Pick<Token, 'token' | 'userId'>
export type ConfirmToken = Pick<Token, 'token'>;


//User Schema
//Model User
export const userSchema = authSchema.pick({
    userId: true,
    name: true,
    lastname: true,
    phone: true,
    email: true,
}).extend({
    admin: z.number(),
    address: z.string().or(z.null()),
    image: z.string()
})

//Model for update user
export const userSchemaUpdate = userSchema.pick({
    name: true,
    lastname: true,
    phone: true,
    image: true,
    email: true,
    address: true
})

//Types Users
export type User = z.infer<typeof userSchema>;
export type UserUpdate = z.infer<typeof userSchemaUpdate>;


//Services Schemas
//Model Service
export const serviceSchema = z.object({
    serviceId: z.number(),
    name: z.string(),
    price: z.number()
})
//Model Array Service
export const serviceSchemaArray = z.array(serviceSchema);

//Types Services
export type Service = z.infer<typeof serviceSchema>;
export type Services = z.infer<typeof serviceSchemaArray>;


//Barbers Schema
//Model Barber
export const barberSchema = userSchema.pick({
    name: true,
    lastname: true,
    phone: true,
    email: true,
    image: true,
}).extend({
    specialty: z.string(),
    barberId: z.number()
})
//Model Barber Array
export const barberSchemaArray = z.array(barberSchema);

//Types Barbers
export type Barbers = z.infer<typeof barberSchemaArray>;
export type Barber = z.infer<typeof barberSchema>;
export type BarberId = Pick<Barber, 'barberId'>

//Appointments schemas

export const appointmentStatusSchema = z.enum(["pending", "canceled", "completed"]);
export type AppointmentStatus = z.infer<typeof appointmentStatusSchema>

//Model Appointment
export const appointmentSchema = z.object({
    appointmentId: z.number(),
    userId: z.number(),
    barberId: z.number(),
    date: z.string(),
    time: z.string(),
    status: appointmentStatusSchema
})

//Model Appointment Form (For front-end)
export const appointmentSchemaForm = appointmentSchema.pick({
    userId: true,
    barberId: true,
    date: true,
    time: true,
}).extend({
    services: z.array(z.number())
});

//Types Appointments
export type Appointments = z.infer<typeof appointmentSchema>
export type AppointmentsForm = z.infer<typeof appointmentSchemaForm>

//AppointmentsServices 

//Model appointment_services
export const appointmentServiceSchema = z.object({
    id: z.number(),
    appointmentId: z.number(),
    serviceId: z.number(),
    current_price: z.number(),
})

//Services model with current price
export const serviceWithCurrentPrice = serviceSchema.pick({
    name: true,
    serviceId: true,
}).extend({
    AppointmentService: appointmentServiceSchema.pick({
        current_price: true
    })
})

//Appointment Service Model Return all appointment
export const appointmentCompleteSchema = appointmentSchema.pick({
    date: true,
    time: true,
    appointmentId: true,
    status: true
}).extend({
    barbero: barberSchema.pick({ name: true, lastname: true, image: true, barberId: true }),
    services: z.array(serviceWithCurrentPrice)
})

//Appointment Service Model Array
export const appointmentCompleteSchemaArray = z.array(appointmentCompleteSchema);

//Types Appointment Services
export type AppointmentServices = z.infer<typeof appointmentCompleteSchemaArray>;
export type AppointmentService = z.infer<typeof appointmentCompleteSchema>

//Model AppointmentCancellation
export const appointmentCancellationReason = z.enum(['Personal', 'Salud', 'Inconveniente', 'Otro'])

export const appointmentCancellation = z.object({
    appointmentCancellationId: z.number(),
    cancellation_reason: appointmentCancellationReason,
    additional_comments: z.string(),
    cancellation_date: z.date(),
    appointmentId: z.number(),
    userId: z.number(),
});

export type AppointmentCancellation = z.infer<typeof appointmentCancellation>
export type AppointmentCancellationForm = Pick<AppointmentCancellation, 'cancellation_reason' | 'additional_comments' | 'appointmentId' | 'userId'>


//Testimonial Model

export const testimonialSchemaStatus = z.enum(['Pendiente', 'Rechazado', 'Aprobado'])

export const testimonialSchema = z.object({
    testimonialId: z.number(),
    userId: z.number(),
    title: z.string(),
    message: z.string(),
    date: z.string(),
    status: testimonialSchemaStatus
})

export const testimonialSchemaUser = testimonialSchema.extend({
    user: userSchema.pick({ name: true, lastname: true, image: true })
})

export const testimonialSchemaArray = z.array(testimonialSchema);
export const testimonialSchemaUserArray = z.array(testimonialSchemaUser);

export type Testimonial = z.infer<typeof testimonialSchema>
export type Testimonials = z.infer<typeof testimonialSchemaUserArray>
export type TestimonialForm = Pick<Testimonial, 'title' | 'message'>;

//Product Model
export const productSchema = z.object({
    productId: z.number(),
    name: z.string(),
    price: z.number(),
    description: z.string(),
    image: z.string(),
})

export const productSchemaQuantity = productSchema.extend({
    inventory: z.object({
        quantity: z.number(),
    })
})
export const productSchemaQuantityArray = z.array(productSchemaQuantity);

export type Product = z.infer<typeof productSchemaQuantity>
export type Products = z.infer<typeof productSchemaQuantityArray>



//Carts
export const cartSchema = z.object({
    cartId: z.number(),
    userId: z.number(),
    date: z.string()
})

export const cartDetailsSchema = z.object({
    cart_detailsId: z.number(),
    quantity: z.number(),
    discount: z.number(),
    subtotal: z.number(),
    unit_price: z.number(),
    productId: z.number(),
    cartId: z.number()
})

export const cartProductDetailsSchema = cartSchema.extend({
    product: z.array(productSchema.extend({
        CartDetails: cartDetailsSchema
    }))
})

export const cartProductDetailsSchemaArray = z.array(cartProductDetailsSchema)
export type CartDetails = z.infer<typeof cartProductDetailsSchema>
export type CartDetailsArray = z.infer<typeof cartProductDetailsSchemaArray>


//Ingresos por mes citas
export const monthlyRevenueAppointmentSchema = z.object({
    day: z.number(),
    revenue: z.number()
})
export const monthlyRevenueAppointmentSchemaArray = z.array(monthlyRevenueAppointmentSchema);
export type MonthlyRevenueAppointment = z.infer<typeof monthlyRevenueAppointmentSchemaArray>;

//Servicios mas solicitados
export const topServiceSchema = z.object({
    count: z.number(),
    name: z.string()
})
export const topServiceSchemaArray = z.array(topServiceSchema);
export type TopServices = z.infer<typeof topServiceSchemaArray>;


//Reportes en la sección de administrador
//últimos usuarios registrados
export const recentUsersSchema = userSchema.pick({
    userId: true,
    name: true,
    lastname: true,
    email: true,
    image: true
})
export const recentUsersSchemaArray = z.array(recentUsersSchema);

export type RecentUsers = z.infer<typeof recentUsersSchemaArray>;


//Horas mas solicitadas para los servicios
export const peakHoursSchema = z.object({
    hour: z.number(),
    appointment_count: z.number()
})
export const peakHoursSchemaArray = z.array(peakHoursSchema);

export type PeakHours = z.infer<typeof peakHoursSchemaArray>;

//Barberos mas solicitados
export const topBarbersSchema = barberSchema.pick({
    barberId: true,
    name: true,
    lastname: true,
    image: true
}).extend({
    dailyClients: z.number().or(z.null()),
    weeklyClients: z.number().or(z.null()),
    monthlyClients: z.number().or(z.null()),
    dailyRevenue: z.number().or(z.null()),
    weeklyRevenue: z.number().or(z.null()),
    monthRevenue: z.number().or(z.null()),
})
export const topBarbersSchemaArray = z.array(topBarbersSchema);

export type TopBarbers = z.infer<typeof topBarbersSchemaArray>;

//Obtener a los clientes mas frecuentes
export const topCustomersSchema = z.object({
    userId: z.number(),
    totalAppointments: z.number(),
    lastAppointment: z.string(),
    user: userSchema.pick({
        name: true,
        lastname: true,
        image: true,
        email: true,
        phone: true
    })
})

export const topCustomersSchemaArray = z.array(topCustomersSchema);
export type TopCustomers = z.infer<typeof topCustomersSchemaArray>