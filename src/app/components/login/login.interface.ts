export interface LoginResult {
    status: string;
    message: string;
    token?: string;
}

export interface LoginData {
    email: string;
    password: string;
}
