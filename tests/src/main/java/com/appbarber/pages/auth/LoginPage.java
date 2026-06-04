package com.appbarber.pages.auth;

import com.microsoft.playwright.Page;

public class LoginPage extends AuthBasePage{

    public LoginPage(Page page){
        super(page);
    }

    public void login(String email, String password){
        fillEmailInput(email);
        fillPasswordInput(password);
        clickInputSubmit();
    }

    public boolean isLoginWithPasswordIncorrect(){
        return getAuthMessage().equals("Contraseña incorrecta");
    }

    public boolean isloginWithUserNotAuth(){
        return getAuthMessage().equals("Tu cuenta no ha sido confirmada, hemos reenviado un email de confirmación");
    }
    
}
