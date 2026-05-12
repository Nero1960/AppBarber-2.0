import { Locator, Page } from "@playwright/test"
import { selectBarberTest, selectServices } from "../../utils/appointments"

export class BasePageAppointment {

    protected page: Page

    readonly buttonMakeAppointment: Locator
    readonly servicesContainer: Locator
    readonly buttonNextPage: Locator
    readonly barberSelect: Locator
    readonly calendarSelect: Locator
    readonly hourSelect: Locator
    readonly buttonSubmit: Locator

    constructor(page: Page) {
        this.page = page
        this.buttonMakeAppointment = this.page.getByRole('link', { name: 'Haz tu cita' })
        this.servicesContainer = this.page.locator('.grid.lg\\:grid-cols-3')
        this.buttonNextPage = this.page.getByRole('button', { name: 'Siguiente' })
        this.barberSelect = this.page.getByRole('combobox')
        this.calendarSelect = this.page.getByTestId('calendar')
        this.hourSelect = this.page.locator('.grid.grid-cols-2.gap-x-2')
        this.buttonSubmit = this.page.getByRole("button", { name: "Reservar la cita" })
    }

    async goToMakeAppointment() {
        await this.buttonMakeAppointment.click()
    }

    async selectServices(quantity: number) {
        await selectServices(quantity, this.servicesContainer)
    }

    async nextPage() {
        await this.buttonNextPage.click();
    }

    async selectBarbers() {
        await this.barberSelect.waitFor({ state: 'attached', timeout: 10000 });

        // 2. Seleccionamos por el valor o por el índice. 
        // Como el índice 0 es "Selecciona un barbero", elegimos el índice 1 (John).
        await this.barberSelect.selectOption({ index: 1 });
    }

    async selectDay(day: number) {
        const daySelector = this.calendarSelect
            .locator('.rs-calendar-table-cell-day')
            .filter({ hasText: new RegExp(`^${day}$`) })
            .first();

        await daySelector.click();
    }

    async selectHour() {
        await this.hourSelect.getByText('10:00 AM', { exact: true }).click()
    }

    async submitAppointment() {
        await this.buttonSubmit.click();
    }

    async waitForServices() {
        await this.servicesContainer.locator('div').first().waitFor({ state: 'visible', timeout: 15000 });
    }

}