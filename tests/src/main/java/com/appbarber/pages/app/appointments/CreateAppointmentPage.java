package com.appbarber.pages.app.appointments;

import com.microsoft.playwright.Locator;
import com.microsoft.playwright.Page;
import com.microsoft.playwright.options.LoadState;
import com.microsoft.playwright.options.SelectOption;
import io.qameta.allure.Allure;

public class CreateAppointmentPage extends AppointmentBasePage {

    private final String path = "/appointment";
    private final Locator serviceCards;
    private final Locator dropDownSelectBarber;
    private final Locator timeButton;
    private final Locator buttonCreateAppointment;

    public CreateAppointmentPage(Page page) {
        super(page);
        this.dropDownSelectBarber = page.locator("select#barber");
        this.serviceCards = page.locator(".grid div.cursor-pointer");
        this.timeButton = page.locator("div.cursor-pointer");
        this.buttonCreateAppointment = page.locator("button[type='submit']");
    }

    public void navigateToCreateAppointment(String urlBase) {
        navigateTo(urlBase, "");
        page.waitForLoadState(LoadState.NETWORKIDLE);
        page.waitForTimeout(1000);
        navigateTo(urlBase, path);

    }

    /**
     * @param serviceName El nombre exacto del servicio (ej: "Corte Fade", "Corte
     *                    Barba")
     */
    public void selectServices(String serviceName) {
        Allure.step("Seleccionando el servicio -> " + serviceName, () ->
                serviceCards.filter(new Locator.FilterOptions().setHasText(serviceName)).click());
    }

    /**
     * @param barberName El nombre exacto del barbero (ej: "Juan Pérez", "Carlos
     *                   García")
     */
    public void selectBarber(String barberName) {
        Allure.step("Seleccionando el barbero -> " + barberName, () ->
                dropDownSelectBarber.selectOption(new SelectOption().setLabel(barberName)));
    }

    /**
     * Selecciona una fecha válida en el calendario interactivo usando su formato de
     * etiqueta.
     * 
     * @param labelDate Ejemplo exacto: "02 Jun 2026", "15 Jun 2026"
     */
    public void selectDate(String labelDate) {
        Allure.step("Seleccionando la fecha de la cita -> " + labelDate, () -> {
            Locator cellDate = page.getByRole(
                    com.microsoft.playwright.options.AriaRole.GRIDCELL,
                    new Page.GetByRoleOptions().setName(labelDate));
            cellDate.click();
        });
    }

    /**
     * Selecciona una hora específica para la cita haciendo clic en su botón
     * correspondiente.
     * 
     * @param hourText Ejemplo exacto: "9:00 AM", "12:00 PM", "4:00 PM"
     */
    public void selectHour(String hourText) {
        Allure.step("Seleccionando la hora de la cita -> " + hourText, () ->
                timeButton.filter(new Locator.FilterOptions().setHasText(hourText)).click());
    }

    public void createAppointment() {
        buttonCreateAppointment.click();
    }

    public boolean isAppointmentCreated() {
        page.waitForURL("**/app/my-appointment");
        return page.url().contains("/app/my-appointment");
    }

}
