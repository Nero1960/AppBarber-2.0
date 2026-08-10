package com.appbarber.api.clients.auth;

import com.appbarber.models.auth.LoginRequestDto;
import com.appbarber.models.auth.RegisterRequestDto;
import com.appbarber.models.auth.ResetPasswordRequestDto;
import com.appbarber.utils.ConfigManager;
import static com.appbarber.api.endpoints.auth.AuthEndpoints.*;
import io.restassured.builder.RequestSpecBuilder;
import io.qameta.allure.restassured.AllureRestAssured;
import io.restassured.http.ContentType;

import io.restassured.response.Response;
import io.restassured.specification.RequestSpecification;

import java.util.Map;

import static io.restassured.RestAssured.given;

public class AuthApiClient {

    private final RequestSpecification requestSpec;

    public AuthApiClient(){
        this.requestSpec = new RequestSpecBuilder()
                .setBaseUri(ConfigManager.getApiBaseUrl())
                .setContentType(ContentType.JSON)
                .addFilter(new AllureRestAssured())
                .build();
    }

    public Response login(LoginRequestDto loginDto){
        return given()
                .spec(requestSpec)
                .body(loginDto)
                .when()
                .post(LOGIN);
    }

    public Response createAccount(RegisterRequestDto registerDto){
        return given()
                .spec(requestSpec)
                .body(registerDto)
                .when()
                .post(CREATE_ACCOUNT);
    }

    public Response requestForgotPassword(String email){
        return given()
                .spec(requestSpec)
                .body(Map.of("email", email))
                .when()
                .post(REQUEST_FORGOT_PASSWORD);
    }

    public Response resetPasswordWithToken(String token, ResetPasswordRequestDto payload){
        return given()
                .spec(requestSpec)
                .pathParam("token", token)
                .body(payload)
                .when()
                .post(RESET_PASSWORD);
    }

    public Response confirmAccount(String token){
        return given()
                .spec(requestSpec)
                .body(Map.of("token", token))
                .when()
                .post(CONFIRM_ACCOUNT);
    }

}