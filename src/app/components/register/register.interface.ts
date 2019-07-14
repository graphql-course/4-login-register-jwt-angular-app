export interface RegisterResult {
    status: boolean;
    message: string;
    user?: any;
}

export interface RegisterData {
    name: string;
    lastname: string;
    email: string;
    password: string;
}
