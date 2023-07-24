export interface LoginFormData {
  username: string;
  password: string;
}

export interface RegisterFormData {
  username?: string;
  email?: string;
  password?: string;
  first_name?: string;
  last_name?: string;
  profile?: {
    birth_date: string;
    phone?: string;
    voice?: string;
    role?: string;
    church?: {
      current_minister_name?: string;
      church_name?: string;
      city?: string;
      state?: string;
      country?: string;
    };
  };
}

export interface RefreshTokens {
  authToken: string | undefined;
  refreshToken: string | undefined;
}
