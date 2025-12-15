import { RegisterForm } from './register';

export type AuthContextType = {
  isAuthenticated: boolean;
  user: RegisterForm | null;
  setAuthenticated: (value: boolean) => void;
  setUser: (user: RegisterForm | null) => void;
};