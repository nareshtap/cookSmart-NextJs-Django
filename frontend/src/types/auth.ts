export interface AuthState {
  isLoading: boolean;
  error: string | null;
  formData: {
    email: string;
    password: string;
  };
  registerData: {
    username: string;
    email: string;
    password: string;
    phone_number: string;
  };
  isLoggedIn: boolean;
  isOverlayVisible: boolean;
  user: {
    username: string;
    email: string;
    phone_number: string;
  } | null;
  formVisible: boolean;
  loggedIn: boolean;
  isMenuOpen: boolean;
}

export interface LoginFormData {
    email: string;
    password: string;
  }
  
export interface RegisterFormData {
    username: string;
    email: string;
    password: string;
    phone_number: string;
  }