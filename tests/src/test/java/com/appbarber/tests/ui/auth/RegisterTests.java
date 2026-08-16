package com.appbarber.tests.ui.auth;

import com.appbarber.factories.UserDataFactory;
import com.appbarber.models.RegisterData;
import io.qameta.allure.*;
import org.testng.Assert;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

@Epic("Gestión de Autenticación y Seguridad")
@Feature("Registro de Usuarios UI")
public class RegisterTests extends AuthUiBaseTest {

    @BeforeMethod(alwaysRun = true)
    public void openRegisterPage() {
        registerPage.navigateToRegister(urlBase);
    }

    @Test(description = "Registro de usuario con correo ya registrado")
    @Story("Registro de Usuarios")
    @Severity(SeverityLevel.CRITICAL)
    @Description("Verifica que no se permita registrar una cuenta con un correo que ya existe.")
    @Owner("Andy Mena")
    public void registerFailedWithEmailRegistered() {
        // Arrange
        RegisterData registeredUser = UserDataFactory.registeredUser();

        // Act
        registerPage.registerUser(registeredUser);

        // Assert
        Assert.assertTrue(registerPage.isUserAlreadyRegistered(),
                "El usuario no debería registrarse con un correo existente");
    }

    @Test(description = "Registro exitoso de una nueva cuenta")
    @Story("Registro de Usuarios")
    @Severity(SeverityLevel.BLOCKER)
    @Description("Verifica que un usuario pueda registrarse correctamente enviando datos válidos.")
    @Owner("Andy Mena")
    public void registerSuccessFul() {
        // Arrange
        RegisterData newUser = UserDataFactory.randomUser();

        // Act
        registerPage.registerUser(newUser);

        // Assert
        Assert.assertTrue(registerPage.isUserRegisteredSuccessfully(),
                "El usuario debería registrarse correctamente");
    }
}
