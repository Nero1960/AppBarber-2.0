package com.appbarber.tests.ui.auth;

import com.appbarber.pages.auth.LoginPage;
import com.appbarber.pages.auth.RegisterPage;
import com.appbarber.tests.ui.TestBase;
import org.testng.annotations.BeforeMethod;

public class AuthUiBaseTest extends TestBase {

    protected LoginPage loginPage;
    protected RegisterPage registerPage;

    @BeforeMethod(alwaysRun = true)
    public void openAuthModule() {
        loginPage = new LoginPage(page);
        registerPage = new RegisterPage(page);
        loginPage.navigateTo(urlBase, "/");
    }
}
