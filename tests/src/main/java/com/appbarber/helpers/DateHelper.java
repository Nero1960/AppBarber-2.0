package com.appbarber.helpers;

import java.time.LocalDate;

public class DateHelper {

    private static final String[] SPANISH_MONTHS_ABBREVIATIONS = {
            "Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"
    };

    private DateHelper() {
    }

    /**
     * Devuelve la etiqueta de fecha futura con el formato que espera el
     * calendario de la app (ej: "02 Jun 2026").
     */
    public static String getFutureDayLabel(int daysInFuture) {
        LocalDate date = LocalDate.now().plusDays(daysInFuture);

        return String.format("%02d %s %d",
                date.getDayOfMonth(),
                SPANISH_MONTHS_ABBREVIATIONS[date.getMonthValue() - 1],
                date.getYear());
    }
}
