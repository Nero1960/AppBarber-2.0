import test, {expect, Page} from "@playwright/test"
import { AppointmentPage } from "../../pages/appointment/AppointmentPage"
import { ToastComponent } from "../../components/ToastComponent"

test.describe("appointments", () => {
    let appointmentPage: AppointmentPage
    let toast: ToastComponent

    test.beforeEach(async ({page}) => {
        appointmentPage = new AppointmentPage(page)
        toast = new ToastComponent(page)
        await page.goto('/app', {waitUntil: 'networkidle'})
    })

    test("should make appointment successfully", async ({ page }) => {
        await appointmentPage.bookAppointment()
        expect(await toast.getTitle()).toContain("Cita creada con éxito")

    })

})