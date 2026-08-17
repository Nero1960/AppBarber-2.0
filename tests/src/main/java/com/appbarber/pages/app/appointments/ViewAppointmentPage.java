package com.appbarber.pages.app.appointments;

import com.microsoft.playwright.Locator;
import com.microsoft.playwright.Page;

public class ViewAppointmentPage extends AppointmentBasePage {

    private final Locator appointmentCard;

    public ViewAppointmentPage(Page page) {
        super(page);
        this.appointmentCard = page.locator(".chakra-card__body");
    }

    public void openFirstAppointmentDetails() {
        appointmentCard.first().click();
    }

    public int getAppointmentCount() {
        return appointmentCard.count();
    }
}
