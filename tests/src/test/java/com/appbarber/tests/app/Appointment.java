package com.appbarber.tests.app;

import org.testng.Assert;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

import com.appbarber.pages.app.appointments.CreateAppointmentPage;
import com.appbarber.tests.AppBase;

public class Appointment extends AppBase {
    private CreateAppointmentPage createAppointmentPage;

    @BeforeMethod(alwaysRun = true)    
    public void set() {
        createAppointmentPage = new CreateAppointmentPage(page);
    }

    @Test(groups = "app")
    public void createAppointment() {
        createAppointmentPage.navigateToCreateAppointment(urlBase);
        createAppointmentPage.selectServices("Corte Fade");
        createAppointmentPage.nextStep();
        createAppointmentPage.selectBarber("John");
        createAppointmentPage.selectDate("15 Jun 2026");
        createAppointmentPage.selectHour("10:00 AM");
        createAppointmentPage.nextStep();
        createAppointmentPage.createAppointment();
        Assert.assertTrue(createAppointmentPage.isAppointmentCreated(), "La cita no fue creada correctamente");
    }

}
