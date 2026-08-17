package com.appbarber.api.endpoints.auth;

public class AuthEndpoints {
    private static final String AUTH_PATH = "/auth";
    public static final String CREATE_ACCOUNT = AUTH_PATH + "/register";
    public static final String LOGIN = AUTH_PATH + "/login";
    public static final String REQUEST_FORGOT_PASSWORD = AUTH_PATH + "/forgot-password";
    public static final String RESET_PASSWORD = AUTH_PATH + "/reset-password/{token}";
    public static final String CONFIRM_ACCOUNT = AUTH_PATH + "/confirm-account";
 }
