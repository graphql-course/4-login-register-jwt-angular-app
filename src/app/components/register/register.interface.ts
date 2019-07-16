<<<<<<< HEAD
export interface RegisterResult {
    status: boolean;
    message: string;
    user?: any;
=======
import { User } from '../users/user.interface';

export interface RegisterResult {
    status: boolean;
    message: string;
    user?: User;
>>>>>>> origin/master
}

export interface RegisterData {
    name: string;
    lastname: string;
    email: string;
    password: string;
}
