import test, { expect } from "@playwright/test"
import { RegisterPage } from "../../pages/auth/RegisterPage"
import { generateRegisterData } from "../../fixtures/test-data"
import { ToastComponent } from "../../components/ToastComponent"


test.describe("Register", () => {

    let registerPage: RegisterPage
    let toast: ToastComponent

    test.beforeEach(async ({page}) => {
        registerPage = new RegisterPage(page);
        toast = new ToastComponent(page);
        await registerPage.goto();
    })

    test("should create an account successfully", async () => {
        const registerData = generateRegisterData();
        await registerPage.createAccount(registerData);
        await toast.waitForToast()
        expect(await toast.getTitle()).toContain("Hemos enviado instrucciones a tu correo para confirmar tu cuenta")
    })

    test("", async () => {
        
    })
})