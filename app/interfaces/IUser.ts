export interface IUsers {
  UserId: string;
  EmailId: string;
  Password: string;
  UserType: string;
  MobileNumber?: string;
  Otp?: OtpDetails;
  CreatedAt?: string;
  UpdatedAt?: string;
}

export interface OtpDetails {
  Otp?: string;
  ExpiresIn?: number;
}

export interface SignInDetails {
  EmailId: string;
  Password: string;
  CreatedAt?: string;
  Remember?: boolean;
}
