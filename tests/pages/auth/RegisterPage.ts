import {Page } from "@playwright/test"
import { RegisterData } from "../../fixtures/interfaces/authInterface";
import { AuthBase } from "./BasePage";

export class RegisterPage extends AuthBase {


    constructor (page: Page) {
        super(page)
    }

    async goto(){
        await this.page.goto("/register")
        await this.page.waitForLoadState("networkidle")
    }

    async createAccount(userData: RegisterData){
        await this.fillName(userData.name)
        await this.fillLastname(userData.lastname)
        await this.fillPhone(userData.phone)
        await this.fillEmail(userData.email)
        await this.fillPassword(userData.password)
        await this.fillConfirmationPassword(userData.confirmPassword)
        await this.submitForm()
    }
}