export interface IAuthData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export class AuthData implements IAuthData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}
