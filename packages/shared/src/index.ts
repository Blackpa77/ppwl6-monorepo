export interface User {
  id: number;
  name: string | null;
  email: string;
}

export interface HealthCheck {
  status: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
}