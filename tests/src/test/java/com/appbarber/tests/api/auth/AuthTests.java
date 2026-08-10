package com.appbarber.tests.api.auth;

import com.appbarber.models.auth.LoginRequestDto;
import com.appbarber.models.auth.RegisterRequestDto;
import com.appbarber.models.auth.ResetPasswordRequestDto;
import com.appbarber.utils.ConfigManager;
import io.qameta.allure.*;
import io.restassured.response.Response;
import org.testng.Assert;
import org.testng.annotations.Test;

@Epic("Gestión de Autenticación y Seguridad")
@Feature("Autenticación y Cuentas de Usuario API")
public class AuthTests extends AuthBaseTest {

    @Test(description = "Inicio de sesión exitoso con credenciales válidas")
    @Story("Inicio de Sesión")
    @Severity(SeverityLevel.BLOCKER)
    @Description("Verifica que un usuario registrado pueda autenticarse correctamente y recibir un token JWT válido.")
    @Owner("Andy Mena")

    public void loginSuccessfulWithValidCredentials() {
        // Arrange
        LoginRequestDto loginDto = new LoginRequestDto("luis@correo.com", "holamundo");

        // Act
        Response loginResponse = authApiClient.login(loginDto);

        // Asserts
        Assert.assertEquals(loginResponse.getStatusCode(),
                200,
                "Debe generar un código de estado 200 OK");

        Assert.assertFalse(
                loginResponse.getBody().asString().isBlank(),
                "El token devuelto no debe estar vacío");
    }

    @Test(description = "Registro exitoso de una nueva cuenta de usuario")
    @Story("Registro de Usuarios")
    @Severity(SeverityLevel.CRITICAL)
    @Description("Verifica que el endpoint de registro cree la cuenta correctamente al enviar datos válidos.")
    @Owner("Andy Mena")
    public void createAccountSuccessfulWithValidData() {
        // Arrange
        RegisterRequestDto registerDto = generateRandomUser();

        // Act
        Response registerResponse = authApiClient.createAccount(registerDto);
        // Assert
        int statusCode = registerResponse.getStatusCode();
        Assert.assertTrue(
                statusCode == 200 || statusCode == 201,
                "Se esperaba 200 o 201 pero devolvió " + statusCode + " - Body: " + registerResponse.asString());
    }

    @Test(description = "Solicitar token de recuperación de contraseña")
    @Story("Recuperación de Contraseña")
    @Severity(SeverityLevel.NORMAL)
    @Description("Solicita la emisión de un token de seguridad para iniciar el flujo de restablecimiento de contraseña.")
    @Owner("Andy Mena")
    public void requestTokenSuccessfulToResetPassword() {
        // Arrange
        String email = "dylan@correo.com";

        // Act
        Response responseForgotPassword = authApiClient.requestForgotPassword(email);
        if (responseForgotPassword.getStatusCode() == 500) {
            System.out.println("=== CUERPO DEL ERROR 500 EN EL SERVIDOR ===");
            responseForgotPassword.prettyPrint();
        }

        // Assert
        Assert.assertEquals(
                responseForgotPassword.getStatusCode(),
                200,
                "El código HTTP debe ser 200 OK");
        Assert.assertFalse(
                responseForgotPassword.getBody().asString().isBlank(),
                "La respuesta no debe estar vacía");
    }

    @Test(description = "Restablecer contraseña con un token válido")
    @Story("Recuperación de Contraseña")
    @Severity(SeverityLevel.CRITICAL)
    @Description("Aplica el cambio de contraseña utilizando un token válido previo y la nueva contraseña confirmada.")
    @Owner("Andy Mena")
    public void resetPasswordSuccessfulWithValidTokenAndPassword() {
        // Arrange
        String email = "carlos@correo.com";
        String token = generateAndFetchPasswordResetToken(email);
        ResetPasswordRequestDto newPasswordDto = generateNewPasswordAndPasswordConfirmation();

        // Act
        Response responseResetPassword = authApiClient.resetPasswordWithToken(token, newPasswordDto);

        // Assert
        Assert.assertEquals(
                responseResetPassword.getStatusCode(),
                200,
                "El código HTTP debe ser 200 OK");
        Assert.assertFalse(
                responseResetPassword.getBody().asString().isBlank(),
                "La respuesta no debe estar vacía");

        // Restaura la contraseña original para no corromper al usuario compartido
        // con las pruebas UI (users.app.email / users.app.password).
        String originalPassword = ConfigManager.getPropertyOrEnv("users.app.password");
        String restoreToken = generateAndFetchPasswordResetToken(email);
        ResetPasswordRequestDto restorePasswordDto = ResetPasswordRequestDto.builder()
                .password(originalPassword)
                .passwordConfirmation(originalPassword)
                .build();

        Response restoreResponse = authApiClient.resetPasswordWithToken(restoreToken, restorePasswordDto);
        Assert.assertEquals(
                restoreResponse.getStatusCode(),
                200,
                "No se pudo restaurar la contraseña original del usuario " + email);
    }

    @Test(description = "Confirmación de cuenta de usuario con token de activación")
    @Story("Registro de Usuarios")
    @Severity(SeverityLevel.CRITICAL)
    @Description("Verifica la activación exitosa de una cuenta recién creada utilizando el token enviado por correo.")
    @Owner("Andy Mena")
    public void confirmAccountSuccessWithValidToken() {
        // Arrange
        RegisterRequestDto newUser = generateRandomUser();
        String token = registerUserAndFetchAccountConfirmation(newUser);

        // Act
        Response responseConfirmationAccount = authApiClient.confirmAccount(token);

        // Assert
        Assert.assertEquals(responseConfirmationAccount.getStatusCode(),
                200, "Petición fallida: El código de retorno debe ser 200 OK");
        Assert.assertFalse(responseConfirmationAccount.getBody().asString().isBlank(),
                "Petición fallida: Debe retornar un mensaje de ejecución exitosa");
    }

    @Test(description = "Inicio de sesión con credenciales nulas")
    @Story("Inicio de Sesión")
    @Severity(SeverityLevel.CRITICAL)
    @Description("Verifica que el inicio de sesión falle cuando se envían credenciales nulas.")
    @Owner("Andy Mena")

    public void loginFailedWithNullCredentials() {
        // Arrange
        LoginRequestDto loginDto = new LoginRequestDto(null, null);

        // Act
        Response loginResponse = authApiClient.login(loginDto);

        // Asserts
        Assert.assertEquals(
                loginResponse.getStatusCode(),
                400,
                "Debe generar un código de estado 400 Bad Request");
        String responseBody = loginResponse.getBody().asString();
        Assert.assertTrue(responseBody.contains(
                "\"type\":\"field\",\"value\":null,\"msg\":\"Email no válido\""),
                "La respuesta debe contener el error 'Email no válido'");
        Assert.assertTrue(responseBody.contains(
                "\"type\":\"field\",\"value\":null,\"msg\":\"El password es requerido\""),
                "La respuesta debe contener el error 'El password es requerido'");
    }

    @Test(description = "Inicio de sesión con credenciales incorrectas")
    @Story("Inicio de Sesión")
    @Severity(SeverityLevel.CRITICAL)
    @Description("Verifica que el inicio de sesión falle cuando se envían credenciales incorrectas.")
    @Owner("Andy Mena")

    public void loginFailedWithInvalidCredentials() {
        // Arrange
        LoginRequestDto loginDto = new LoginRequestDto("dylan@correo.com", "contraseñaIncorrecta");

        // Act
        Response loginResponse = authApiClient.login(loginDto);

        // Asserts
        Assert.assertEquals(
                loginResponse.getStatusCode(),
                400,
                "Debe generar un código de estado 401 Unauthorized");

        String responseBody = loginResponse.jsonPath().getString("error");

        Assert.assertEquals(
                responseBody,
                "Contraseña incorrecta"
                ,"La respuesta debe contener el error 'Credenciales no válidas'");
    }


    @Test(description = "Solicitar token de recuperación con correo inexistente")
    @Story("Recuperación de Contraseña")
    @Severity(SeverityLevel.NORMAL)
    @Description("Verifica que la solicitud de un token de recuperación falle cuando se envía un correo inexistente.")
    @Owner("Andy Mena")

    public void requestTokenFailedWithNonExistentEmail() {
        // Arrange
        String email = "inexistente@correo.com";
        // Act
        Response responseForgotPassword = authApiClient.requestForgotPassword(email);
        // Asserts
        Assert.assertEquals(
                responseForgotPassword.getStatusCode(),
                400,
                "Debe generar un código de estado 404 Not Found");
    }


    @Test(description = "Confirmación de cuenta con token inválido")
    @Story("Registro de Usuarios")
    @Severity(SeverityLevel.CRITICAL)
    @Description("Verifica que la confirmación de cuenta falle cuando se usa un token inválido.")
    @Owner("Andy Mena")

    public void confirmAccountFailedWithInvalidToken() {
        // Arrange
        String invalidToken = "tokenInválido";
        // Act
        Response responseConfirmationAccount = authApiClient.confirmAccount(invalidToken);
        // Asserts
        Assert.assertEquals(
                responseConfirmationAccount.getStatusCode(),
                400,
                "Debe generar un código de estado 401 Unauthorized");

    }

    @Test(description = "Inicio de sesión con usuario no autenticado")
    @Story("Inicio de Sesión")
    @Severity(SeverityLevel.CRITICAL)
    @Description("Verifica que el inicio de sesión falle cuando se intenta iniciar sesión con un usuario que aún no ha sido autenticado.")
    @Owner("Andy Mena")

    public void loginInvalidWithUserNotAuthenticated() {
        // Arrange
        RegisterRequestDto newUser = generateRandomUser();
        String email = newUser.getEmail();
        String password = newUser.getPassword();

        // Act
        Response registerResponse = authApiClient.createAccount(newUser);

        // Asserts
        int statusCode = registerResponse.getStatusCode();
        Assert.assertTrue(statusCode == 200 || statusCode == 201,
                "Se esperaba 200 o 201 pero devolvió " + statusCode + " - Body: " + registerResponse.asString());

        // Act (Login)
        LoginRequestDto loginDto = new LoginRequestDto(email, password);
        Response loginResponse = authApiClient.login(loginDto);

        // Asserts
        Assert.assertEquals(
                loginResponse.getStatusCode(),
                400,
                "Debe generar un código de estado 400 Unauthorized");

        Assert.assertFalse(
                loginResponse.getBody().asString().isBlank(),
                "El token devuelto no debe estar vacío");
    }

}