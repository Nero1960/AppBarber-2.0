import api from "@/config/axios";
import { isAxiosError } from "axios";
import {
    allAppointmentsSchemaArray,
    appointmentDetailsAdminSchema,
    Appointments,
    cancellationReasonSchemaArray,
    peakHoursSchemaArray,
    recentUsersSchemaArray,
    statusDataSchemaArray,
    topBarbersSchemaArray,
    topCustomersSchemaArray
} from "../types";


export const getRecentUsers = async () => {
    try {
        const url = '/report/getLastUsers';
        const { data } = await api.get(url);

        const response = recentUsersSchemaArray.safeParse(data);

        if (response.success) {
            return response.data;
        }

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export const getPeakHours = async () => {
    try {
        const url = '/report/getPeakHours';
        const { data } = await api.get(url);

        const response = peakHoursSchemaArray.safeParse(data);
        if (response.success) {
            return response.data;
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export const getTopBarbers = async () => {
    try {
        const url = '/report/getTopBarbers';
        const { data } = await api.get(url);

        const response = topBarbersSchemaArray.safeParse(data);

        if (response.success) {
            return response.data;
        }

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }

}

export const getTopCustomers = async () => {
    try {
        const url = '/report/getTopUsers';
        const { data } = await api.get(url);

        const response = topCustomersSchemaArray.safeParse(data);

        if (response.success) {
            return response.data;
        }

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export const getAllAppointments = async () => {
    try {
        const url = '/report/getAllAppointments';
        const { data } = await api.get(url);


        const response = allAppointmentsSchemaArray.safeParse(data);

        if (response.success) {
            return response.data;
        }

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export const getAppointmentAdminById = async (appointmentId: number) => {
    try {
        const url = `/report/appointment/${appointmentId}`;
        const { data } = await api.get(url);
        const response = appointmentDetailsAdminSchema.safeParse(data);

        if (response.success) {
            return response.data;
        }

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }

}

export const updateAppointmentStatus = async ({ appointmentId, status }: { appointmentId: Appointments['appointmentId'], status: Appointments['status'] }) => {
    try {
        const url = `/report/appointment/${appointmentId}/status`;
        const { data } = await api.patch<string>(url, { status });
        return data;

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }

}

export const getStatusData = async () => {
    try {
        const url = `/report/appointment/status/data`;
        const { data } = await api.get(url);

        const response = statusDataSchemaArray.safeParse(data);
        if (response.success) {
            return response.data;
        }

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }

}

export const getCancellationReasonsData = async () => {
    try {
        const url = `/report/appointment/cancellation/data`;
        const { data } = await api.get(url);


        const response = cancellationReasonSchemaArray.safeParse(data);
        if (response.success) {
            return response.data;
        }

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}