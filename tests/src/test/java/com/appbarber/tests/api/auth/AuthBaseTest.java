package com.appbarber.tests.api.auth;

import com.appbarber.api.clients.auth.AuthApiClient;
import com.appbarber.factories.UserDataFactory;
import com.appbarber.models.auth.RegisterRequestDto;
import com.appbarber.models.auth.ResetPasswordRequestDto;
import com.appbarber.utils.DatabaseManager;
import io.restassured.response.Response;
import org.testng.Assert;
import org.testng.annotations.BeforeClass;

public class AuthBaseTest {
    protected AuthApiClient authApiClient;

    @BeforeClass()
    public void globalSetUp(){
        authApiClient = new AuthApiClient();
    }

    protected RegisterRequestDto generateRandomUser(){
        return UserDataFactory.randomRegisterRequest();
    }

    protected ResetPasswordRequestDto generateNewPasswordAndPasswordConfirmation(){
        return UserDataFactory.newPasswordAndConfirmation();
    }

    protected String generateAndFetchPasswordResetToken(String email){
        Response response = authApiClient.requestForgotPassword(email);
        String token = DatabaseManager.getPasswordResetToken(email);
        Assert.assertNotNull(token, "Pre-condición fallida: El token generado no fue encontrado en MySQL para " + email);
        return token;
    }

    protected String registerUserAndFetchAccountConfirmation(RegisterRequestDto user){
        Response response = authApiClient.createAccount(user);
        Assert.assertEquals(response.getStatusCode(), 200,
                "Pre-condición fallida: No se pudo registrar el usuario " + user.getEmail());
        String token = DatabaseManager.getAccountConfirmationToken(user.getEmail());
        Assert.assertNotNull(token,
                "Pre-condición fallida: No se encontró el token de confirmación en MySQL para: " + user.getEmail());
        return token;

    }

}
