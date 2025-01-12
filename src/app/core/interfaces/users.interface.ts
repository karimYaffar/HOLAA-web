export interface User {
    username: string,
    email: string,
    password: string,
}

export interface UserVerification {
    otp: string
}

export type UserWithoutEmail = Omit<User, "email">
export type UserWithoutCredentials = Omit<User, "username" | "password">
export type UserWithoutUsername = Omit<User, "username">