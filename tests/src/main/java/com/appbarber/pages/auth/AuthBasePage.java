package com.appbarber.pages.auth;

import com.microsoft.playwright.Locator;
import com.microsoft.playwright.Page;

public class AuthBasePage {

    protected final Page page;
    protected final Locator emailInput;
    protected final Locator passwordInput;
    protected final Locator inputSubmit;
    protected final Locator toastMessage;

    protected AuthBasePage(Page page) {
        this.page = page;
        this.emailInput = page.locator("input[type='email']");
        this.passwordInput = page.locator("#password");
        this.inputSubmit = page.locator("input[type='submit']");
        this.toastMessage = page.locator("[data-sonner-toast] [data-title]");
    }

    public void navigateTo(String urlBase, String path) {
        String cleanPath = path.startsWith("/") ? path.substring(1) : path;
        page.navigate(urlBase + "/" + cleanPath);
    }

    protected void fillEmailInput(String email) {
        emailInput.clear();
        emailInput.fill(email);
    }

    protected void fillPasswordInput(String password) {
        passwordInput.clear();
        passwordInput.fill(password);
    }

    protected void clickInputSubmit() {
        inputSubmit.click();
    }

    public String getAuthMessage() {
        toastMessage.waitFor();
        return toastMessage.innerText().trim();
    }

}
