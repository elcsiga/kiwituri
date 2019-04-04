
export interface User {
    email: string;
    fullName: string;
    initial: string;
}

export interface ChangePasswordData {
    oldPassword: string,
    newPassword: string,
    newPasswordAgain: string
}
