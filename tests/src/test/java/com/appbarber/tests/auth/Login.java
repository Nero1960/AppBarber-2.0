package com.appbarber.tests.auth;

import org.testng.Assert;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

import com.appbarber.pages.auth.LoginPage;
import com.appbarber.pages.auth.admin.UserAdminPage;
import com.appbarber.pages.auth.app.UserAppPage;
import com.appbarber.tests.TestBase;

public class Login extends TestBase {

        private LoginPage loginPage;

        @BeforeMethod
        public void set() {
                loginPage = new LoginPage(page);
                loginPage.navigateTo(urlBase, "/");
        }

        @Test
        public void loginToAppSuccessful() {
                loginPage.login(
                                "andy.mena@correo.com",
                                "holamundo");

                UserAppPage app = new UserAppPage(page);

                Assert.assertTrue(
                                app.isLoaded(urlBase),
                                "El usuario no fue dirigido al panel del usuario");
        }

        @Test
        public void loginToDashboardSuccessful() {
                loginPage.login(
                                "admin@correo.com",
                                "12345678");

                UserAdminPage admin = new UserAdminPage(page);

                Assert.assertTrue(
                                admin.isLoaded(urlBase),
                                "El usuario no fue dirigido al panel administrativo");
        }

        @Test
        public void loginWithPasswordIncorrect() {

                loginPage.login(
                                "andy.mena@correo.com",
                                "12345678");

                Assert.assertTrue(
                                loginPage.isLoginWithPasswordIncorrect(),
                                "El usuario no debe inciar sesion");
        }

        @Test
        public void loginWithUserNotAuth() {
                loginPage.login(
                                "carlos@correo.com",
                                "12345678");

                Assert.assertTrue(loginPage.isloginWithUserNotAuth(),
                                "El usuario no debe loguearse, su cuenta no ha sido confirmada");
        }

}