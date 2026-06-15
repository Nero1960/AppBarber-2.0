package com.appbarber.helpers;

import java.time.LocalDate;

public class DateHelper {

    public static String getFutureDayLabel(int daysInFuture){
        LocalDate date = LocalDate.now().plusDays(daysInFuture);
        
        String[] meses = 
        {"Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"};

        return String.format("%02d %s %d", 
            date.getDayOfMonth(), 
            meses[date.getMonthValue() - 1], 
            date.getYear()
        );
    }

    public static String getRandomWorkHour(){
        String[] hours = {"9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"};
        int randomIndex = (int) (Math.random() * hours.length);
        return hours[randomIndex];
    }

    public static String getRandomBarber(){
        String[] barbers = {"John", "Ralph", "Carl"};
        int randomIndex = (int) (Math.random() * barbers.length);
        return barbers[randomIndex];
    }

    public static String getRandomService() {
        String[] services = {
            "Corte Fade", "Corte Razor", "Corte Blower", 
            "Corte Barba", "Delineado de Cejas", "Mascarilla Facial"
        };
        int randomIndex = (int) (Math.random() * services.length);
        return services[randomIndex];
    }
    
}
