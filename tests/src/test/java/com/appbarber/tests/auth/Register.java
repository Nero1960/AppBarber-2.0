package com.appbarber.tests.auth;

import org.testng.Assert;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.DataProvider;
import org.testng.annotations.Test;

import com.appbarber.models.RegisterData;
import com.appbarber.pages.auth.RegisterPage;
import com.appbarber.tests.TestBase;

public class Register extends TestBase {

    private RegisterPage registerPage;

    @BeforeMethod
    public void set() {
        registerPage = new RegisterPage(page);
        registerPage.navigateToRegister(urlBase);
    }

    @DataProvider(name = "dataFailedRegister")
    public Object[][] getFailedRegister() {
        return new Object[][] {
                {
                        new RegisterData("TestNG",
                                "TestNG",
                                "78445425",
                                "testng@correo.com",
                                "12345678",
                                "12345678"),
                        "Usuario ya registrado"
                }
        };
    }

    @Test(dataProvider = "dataFailedRegister")
    public void registerFailedWithEmailRegistered(RegisterData registerModel, String expectedMessage) {
        registerPage.registerUser(registerModel);
        Assert.assertTrue(
                registerPage.isUserAlreadyRegistered(),
                "El usuario no deberia registrarse");
    }

    @Test
    public void registerSuccessFul() {
        RegisterData usuario = new RegisterData(
                "newUser",
                "newUser",
                "75422115",
                "newuser2@correo.com",
                "12345678",
                "12345678");

        registerPage.registerUser(usuario);

        Assert.assertTrue(
                registerPage.isUserRegisteredSuccessFuly(),
                "El usuario deberia registrarse correctamente");
    }

}
