import {Locator, Page} from "@playwright/test"


export class AuthBase {
    protected page: Page

    //Elementos en común de las páginas de autenticación
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly confirmPasswordInput: Locator;
    readonly submitButton: Locator;
    readonly nameInput: Locator;
    readonly lastnameInput: Locator;
    readonly phoneInput: Locator;

    constructor(page: Page) {
        this.page = page
        this.emailInput = page.locator('input[id="email"]')
        this.passwordInput = page.locator('input[id="password"]')
        this.confirmPasswordInput = page.locator('input[id="password_confirmation"]')
        this.nameInput = page.locator('input[id="name"]');
        this.lastnameInput = page.locator('input[id="lastname"]')
        this.phoneInput = page.locator('input[type="phone"]')
        this.submitButton = page.locator('input[type="submit"]')
    }

    async fillName(name: string){
        await this.nameInput.clear();
        await this.nameInput.fill(name)
    }

     async fillLastname(lastname: string){
        await this.lastnameInput.clear();
        await this.lastnameInput.fill(lastname)
    }

     async fillPhone(phone: string){
        await this.phoneInput.clear();
        await this.phoneInput.fill(phone)
    }

    async fillEmail(email : string){
        await this.emailInput.clear();
        await this.emailInput.fill(email);
    }

    async fillPassword(password : string){
        await this.passwordInput.clear();
        await this.passwordInput.fill(password);
    }

    async fillConfirmationPassword(confirmPassword: string) {
        await this.confirmPasswordInput.clear();
        await this.confirmPasswordInput.fill(confirmPassword);
    }

    async submitForm(){
        await this.submitButton.click();
    }

    async waitForRedirect(urlPattern : string){
        await this.page.waitForURL(urlPattern)
    }

}