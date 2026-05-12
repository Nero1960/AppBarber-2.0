import { test, expect } from "@playwright/test"
import { LoginPage } from "../../pages/auth/LoginPage";
import { ToastComponent } from "../../components/ToastComponent";
import { generateLoginData } from "../../fixtures/test-data";

test.describe("Login", () => {
    let loginPage : LoginPage
    let toast: ToastComponent

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page)
        toast = new ToastComponent(page)
        loginPage.goto();
    })

    test("TC-0001 - should login successfully with valid credentials and redirect to app", async ({ page }) => {
        await loginPage.Login("andy.mena@corre.com", "12345678");
        await expect(page).toHaveURL(/\/app/);
    })

    test("TC-0002 - should login successfully with valid credentials and redirect to admin", async ({ page }) => {
        await loginPage.Login("admin@correo.com", "12345678");
        await expect(page).toHaveURL(/\/admin/);
    })

    test("TC-003 - should show error message with login with user not authenticated", async ({ page }) => {
        await loginPage.Login("carlos@correo.com", "12345678");
        expect(await toast.getTitle()).toContain("Tu cuenta no ha sido confirmada, hemos reenviado un email de confirmación")
    })

    test("TC-004 - should show error message with login with user no registered", async ({ page }) => {
        const userData = generateLoginData();
        await loginPage.Login(userData.email, userData.password);
        expect(await toast.getTitle()).toContain("Este usuario no esta registrado")

    })
})