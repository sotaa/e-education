export interface IAuthResult {
  user: any;
  /** Access token which should be used for authorization */
  token: string;
  /** Seconds remaining for expiring the token. */
  expiresIn: number;
}
