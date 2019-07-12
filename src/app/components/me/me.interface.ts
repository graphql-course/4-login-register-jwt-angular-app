import { User } from '../users/user.interface';

export interface MeData {
    status: boolean;
    message: string;
    user?: User;
}
