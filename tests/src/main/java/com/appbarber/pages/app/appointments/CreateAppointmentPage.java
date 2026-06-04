package com.appbarber.pages.app.appointments;

import com.microsoft.playwright.Locator;
import com.microsoft.playwright.Page;
import com.microsoft.playwright.options.LoadState;
import com.microsoft.playwright.options.SelectOption;

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
        navigateTo(urlBase, path);
        page.waitForLoadState(LoadState.NETWORKIDLE);
    }

    /**
     * @param serviceName El nombre exacto del servicio (ej: "Corte Fade", "Corte
     *                    Barba")
     */
    public void selectServices(String ServiceName) {
        System.out.println("[POM]: Seleccionando el servicio -> " + ServiceName);
        serviceCards.filter(new Locator.FilterOptions().setHasText(ServiceName));
        serviceCards.click();
    }

    /**
     * @param barberName El nombre exacto del barbero (ej: "Juan Pérez", "Carlos
     *                   García")
     */
    public void selectBarber(String barberName) {
        System.out.println("[POM]: Seleccionando el barbero -> " + barberName);
        dropDownSelectBarber.selectOption(new SelectOption().setLabel(barberName));
    }

    /**
     * Selecciona una fecha válida en el calendario interactivo usando su formato de
     * etiqueta.
     * 
     * @param labelDate Ejemplo exacto: "02 Jun 2026", "15 Jun 2026"
     */
    public void selectDate(String labelDate) {
        System.out.println("[POM]: Seleccionando la fecha de la cita -> " + labelDate);
        // 1. Buscamos el elemento con rol 'gridcell' cuyo aria-label coincida
        // exactamente
        Locator cellDate = page.getByRole(
                com.microsoft.playwright.options.AriaRole.GRIDCELL,
                new Page.GetByRoleOptions().setName(labelDate));
        // 2. Ejecutamos el clic directo
        cellDate.click();
    }

    /**
     * Selecciona una hora específica para la cita haciendo clic en su botón
     * correspondiente.
     * 
     * @param hourText Ejemplo exacto: "9:00 AM", "12:00 PM", "4:00 PM"
     */
    public void selectHour(String hourText) {
        System.out.println("[POM]: Seleccionando la hora de la cita -> " + hourText);

        // 1. Apuntamos a los divs interactivos de la hora (clase cursor-pointer)
        // 2. Filtramos exactamente por el texto de la hora que nos interesa
        timeButton.filter(new Locator.FilterOptions().setHasText(hourText));

        // 3. Hacemos clic
        timeButton.click();
    }

    public void createAppointment() {
        buttonCreateAppointment.click();
    }

    public boolean isAppointmentCreated() {
        page.waitForURL("**/app/my-appointment");
        return page.url().contains("/app/my-appointment");
    }

}
