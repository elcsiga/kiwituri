
export interface User {
    email: string;
    fullName: string;
}

export interface ChangePasswordData {
    oldPassword: string,
    newPassword: string,
    newPasswordAgain: string
}
