package com.appbarber.models;

public class RegisterData {
    private String name;
    private String lastname;
    private String phone;
    private String email;
    private String password;
    private String confirmationPassword;

    public RegisterData(String name, String lastname, String phone, String email, String password,
            String confirmationPassword) {
        this.name = name;
        this.lastname = lastname;
        this.phone = phone;
        this.email = email;
        this.password = password;
        this.confirmationPassword = confirmationPassword;
    }

    public String getName() {
        return name;
    }

    public String getLastname() {
        return lastname;
    }

    public String getPhone() {
        return phone;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public String getConfirmationPassword() {
        return confirmationPassword;
    }

}
