declare type ApiResponse<T> = {
  code: number;
  message: string;
  data: T;
};

declare type ApiError = {
  code: number;
  message: string;
};

declare type IVerifyEmailCredentials = {
  email: string;
  otp: string;
};
declare type ILoginCredentials = {
  email: string;
  password: string;
};

declare type IRegisterCredentials = {
  name: string;
  email: string;
  password: string;
};
