export interface User {
  id: string;
  name: string;
  email: string;
}

export interface UserState {
  users: User[];
  user: User | null;
  loading: boolean;
  error: string | null;
}