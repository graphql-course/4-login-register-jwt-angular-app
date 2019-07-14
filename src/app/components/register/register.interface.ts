export interface RegisterResult {
    status: boolean;
    message: string;
    token?: string;
}

export interface RegisterData {
    name: string;
    lastname: string;
    email: string;
    password: string;
}
