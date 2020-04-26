export interface ICourse {
  id?: number;
  title: string;
  schedules: [];
  participants: [];
}
export class ICourse implements ICourse {
  id?: number;
  title: string;
  schedules: [];
  participants: [];
}
