package com.appbarber.tests.ui.auth;

import com.appbarber.api.clients.auth.AuthApiClient;
import com.appbarber.factories.UserDataFactory;
import com.appbarber.models.auth.RegisterRequestDto;
import com.appbarber.pages.auth.admin.UserAdminPage;
import com.appbarber.pages.auth.app.UserAppPage;
import com.appbarber.utils.ConfigManager;
import io.qameta.allure.*;
import org.testng.Assert;
import org.testng.annotations.Test;

@Epic("Gestión de Autenticación y Seguridad")
@Feature("Autenticación de Usuarios UI")
public class LoginTests extends AuthUiBaseTest {

    @Test(description = "Inicio de sesión exitoso como usuario de la aplicación")
    @Story("Inicio de Sesión")
    @Severity(SeverityLevel.BLOCKER)
    @Description("Verifica que un usuario con credenciales válidas acceda al panel de usuario.")
    @Owner("Andy Mena")
    public void loginToAppSuccessful() {
        // Arrange
        String email = ConfigManager.getPropertyOrEnv("users.app.email");
        String password = ConfigManager.getPropertyOrEnv("users.app.password");

        // Act
        loginPage.login(email, password);

        // Assert
        UserAppPage appPage = new UserAppPage(page);
        appPage.waitForPageReady(urlBase);
        Assert.assertEquals(appPage.getCurrentUrl(), urlBase + "/app",
                "El usuario no fue dirigido al panel del usuario");
    }

    @Test(description = "Inicio de sesión exitoso como administrador")
    @Story("Inicio de Sesión")
    @Severity(SeverityLevel.BLOCKER)
    @Description("Verifica que un administrador con credenciales válidas acceda al panel administrativo.")
    @Owner("Andy Mena")
    public void loginToDashboardSuccessful() {
        // Arrange
        String email = ConfigManager.getPropertyOrEnv("users.admin.email");
        String password = ConfigManager.getPropertyOrEnv("users.admin.password");

        // Act
        loginPage.login(email, password);

        // Assert
        UserAdminPage adminPage = new UserAdminPage(page);
        adminPage.waitForPageReady(urlBase);
        Assert.assertEquals(adminPage.getCurrentUrl(), urlBase + "/admin",
                "El usuario no fue dirigido al panel administrativo");
    }

    @Test(description = "Inicio de sesión con contraseña incorrecta")
    @Story("Inicio de Sesión")
    @Severity(SeverityLevel.CRITICAL)
    @Description("Verifica que se muestre el mensaje de error al usar una contraseña incorrecta.")
    @Owner("Andy Mena")
    public void loginWithPasswordIncorrect() {
        // Arrange
        String email = ConfigManager.getPropertyOrEnv("users.app.email");

        // Act
        loginPage.login(email, "wrongPassword");

        // Assert
        Assert.assertTrue(loginPage.isPasswordIncorrectMessageShown(),
                "El usuario no debe iniciar sesión con una contraseña incorrecta");
    }

    @Test(description = "Inicio de sesión con cuenta no confirmada")
    @Story("Inicio de Sesión")
    @Severity(SeverityLevel.CRITICAL)
    @Description("Verifica que un usuario recién registrado sin confirmar no pueda iniciar sesión y se muestre el aviso correspondiente.")
    @Owner("Andy Mena")
    public void loginWithUserNotAuthenticated() {
        // Arrange
        RegisterRequestDto unconfirmedUser = UserDataFactory.randomRegisterRequest();
        new AuthApiClient().createAccount(unconfirmedUser);

        // Act
        loginPage.login(unconfirmedUser.getEmail(), unconfirmedUser.getPassword());

        // Assert
        Assert.assertTrue(loginPage.isAccountNotConfirmedMessageShown(),
                "Debe mostrarse el aviso de cuenta pendiente de confirmación");
    }
}
