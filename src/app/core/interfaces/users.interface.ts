export interface User {
    username: string,
    email: string,
    password: string,
}

export interface UserVerification {
    otp: string
}

export interface UserResetPassword {
    email: string;
    newPassword: string;
}

export type UserCredentials = Omit<User, "email">
export type UserEmail = Omit<User, "username" | "password">
export type UserWithoutUsername = Omit<User, "username">