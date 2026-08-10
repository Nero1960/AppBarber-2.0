package com.appbarber.factories;

import java.util.Random;

/**
 * Datos de dominio para el flujo de citas (servicios, barberos, horas).
 * Reemplaza los arreglos hardcodeados que vivían en DateHelper.
 */
public class AppointmentDataFactory {

    private static final String[] SERVICES = {
            "Corte Fade", "Corte Razor", "Corte Blower",
            "Corte Barba", "Delineado de Cejas", "Mascarilla Facial"
    };

    private static final String[] BARBERS = {"John", "Ralph", "Carl"};

    private static final String[] WORK_HOURS = {
            "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
            "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"
    };

    private static final Random random = new Random();

    private AppointmentDataFactory() {
    }

    public static String randomService() {
        return SERVICES[random.nextInt(SERVICES.length)];
    }

    public static String randomBarber() {
        return BARBERS[random.nextInt(BARBERS.length)];
    }

    public static String randomWorkHour() {
        return WORK_HOURS[random.nextInt(WORK_HOURS.length)];
    }

    public static int randomDaysInFuture() {
        return random.nextInt(5) + 2;
    }
}
