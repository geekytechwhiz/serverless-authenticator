export interface ISendMessageParams {
  to: string;
  message: string;
}
export enum RequestAction {
  GENERATE_OTP = 'GENERATE_OTP',
}

export interface IHandlerEventBody {
  action?: RequestAction;
  countryCode?: string | number;
  contactNumber?: string | number;
  message?: string;
  emailId: string;
}

export interface IVerifyOtpParams {
  emailId: string;
  otp: string | number;
}
