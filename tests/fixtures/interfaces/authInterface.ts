interface BaseAuth {
    email: string;
}

export interface LoginData extends BaseAuth{
    password: string;
}

export interface RegisterData extends BaseAuth {
    password: string,
    confirmPassword: string,
    name: string,
    lastname: string,
    phone: string,
}