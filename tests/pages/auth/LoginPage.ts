import { Page} from "@playwright/test";
import {AuthBase} from "./BasePage";
import { LoginData } from "../../fixtures/interfaces/authInterface";


export class LoginPage extends AuthBase {
    constructor(page: Page) {
        super(page);
    }

    async goto() {
        await this.page.goto("/")
        await this.page.waitForLoadState("networkidle")
    }

    async Login(email : LoginData['email'], password : LoginData['password']) {
        await this.fillEmail(email);
        await this.fillPassword(password)
        await this.submitForm();
    }
}