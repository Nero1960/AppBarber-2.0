package com.appbarber.pages.auth;

import com.appbarber.models.RegisterData;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.Page;

public class RegisterPage extends AuthBasePage {

    private final Locator nameInput;
    private final Locator lastnameInput;
    private final Locator phoneInput;
    private final Locator confirmPasswordInput;

    public RegisterPage(Page page) {
        super(page);
        this.nameInput = page.locator("#name");
        this.lastnameInput = page.locator("#lastname");
        this.phoneInput = page.locator("#phone");
        this.confirmPasswordInput = page.locator("#password_confirmation");
    }

    public void navigateToRegister(String urlBase) {
        page.navigate(urlBase + "/register");
    }

    public void fillNameInput(String name) {
        nameInput.fill(name);
    }

    public void fillLastNameInput(String lastname) {
        lastnameInput.fill(lastname);
    }

    public void fillPhoneInput(String phone) {
        phoneInput.fill(phone);
    }

    public void fillPasswordConfirmationInput(String passwordConfirmation) {
        confirmPasswordInput.fill(passwordConfirmation);
    }

    public void registerUser(
            RegisterData register) {

        fillNameInput(register.getName());
        fillLastNameInput(register.getLastname());
        fillPhoneInput(register.getPhone());
        fillEmailInput(register.getEmail());
        fillPasswordInput(register.getPassword());
        fillPasswordConfirmationInput(register.getConfirmationPassword());
        clickInputSubmit();
    }

    public boolean isUserAlreadyRegistered() {
        return getAuthMessage().equals("Usuario ya registrado");
    }

    public boolean isUserRegisteredSuccessFuly() {
        return getAuthMessage().equals("Hemos enviado instrucciones a tu correo para confirmar tu cuenta");
    }

}
