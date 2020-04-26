export interface IUser {
  id?: string;
  email: string;
  firstName: string;
  lastName: string;
  mobile?: string;
}
export class User implements IUser {
  id?: string;
  email: string;
  firstName: string;
  lastName: string;
  mobile?: string;
}
