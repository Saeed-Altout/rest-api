declare type User = {
  id: number;
  name: string;
  email: string;
};

declare interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

declare type Callback = (error: Error | null, result?: any) => void;
