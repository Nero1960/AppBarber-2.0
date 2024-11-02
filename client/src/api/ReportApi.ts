import api from "@/config/axios";
import { isAxiosError } from "axios";
import {
    peakHoursSchemaArray,
    recentUsersSchemaArray,
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
        console.log(data);
        console.log(response)
        if (response.success) {
            return response.data;
        }

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}