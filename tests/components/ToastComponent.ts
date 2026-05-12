import { Locator, Page } from "@playwright/test";


export class ToastComponent {

    private page: Page;
    readonly toastContainer: Locator;
    readonly toastMessage: Locator;
    
    constructor(page: Page) {
        this.page = page;
        this.toastContainer = page.locator("div[data-content]");
        this.toastMessage = this.toastContainer.locator("div[data-title]");
    }

    async waitForToast () {
        await this.toastContainer.waitFor({state: "visible", timeout: 10000})
    }

    async isVisible() {
        return await this.toastContainer.isVisible();
    }

    async getTitle() : Promise<string | null> {
        return await this.toastMessage.textContent()
    }
}   