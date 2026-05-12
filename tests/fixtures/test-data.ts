import { fa, faker } from "@faker-js/faker"
import { LoginData, RegisterData } from "./interfaces/authInterface";

let password = faker.internet.password({ length: 8, memorable: true });


export function generateLoginData() : LoginData {

    return {
        email: faker.internet.email(),
        password: password
    }
   
}

export function generateRegisterData () : RegisterData {
    return {
        name: faker.person.firstName(),
        lastname: faker.person.lastName(),
        phone: faker.string.numeric(8),
        email: faker.internet.email(),
        password: password,
        confirmPassword: password
    }

}

export const testData = {

    invalidEmail: [
        'sn-arroba',
        '@sin-nombre.com',
        'dominio@invalido.com',
        'espacios en blanco@test.com',
        'caracteres-especiales@#$.com',
    ],

    weakPasswords: [
        '123',
        'pass',
        '    ',
        'a'
    ],

    existingUser: [
        'andy.mena@corre.com',
        'dylan@correo.com'
    ]
}