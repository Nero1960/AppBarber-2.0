package com.appbarber.tests.app;

import java.util.Random;

import org.testng.Assert;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

import com.appbarber.pages.app.appointments.CreateAppointmentPage;
import com.appbarber.tests.AppBase;
import com.appbarber.helpers.DateHelper;

public class Appointment extends AppBase {
    private CreateAppointmentPage createAppointmentPage;

    @BeforeMethod(alwaysRun = true)    
    public void set() {
        createAppointmentPage = new CreateAppointmentPage(page);
    }

    @Test (priority = 1)
    public void createAppointment() {
        int daysOnFuture = new Random().nextInt(5) + 2;
        String date = DateHelper.getFutureDayLabel(daysOnFuture);
        createAppointmentPage.navigateToCreateAppointment(urlBase);
        createAppointmentPage.selectServices(DateHelper.getRandomService());
        createAppointmentPage.nextStep();
        createAppointmentPage.selectBarber(DateHelper.getRandomBarber());
        createAppointmentPage.selectDate(date);
        createAppointmentPage.selectHour(DateHelper.getRandomWorkHour());
        createAppointmentPage.nextStep();
        createAppointmentPage.createAppointment();
        Assert.assertTrue(createAppointmentPage.isAppointmentCreated(), "La cita no fue creada correctamente");
    }

}
