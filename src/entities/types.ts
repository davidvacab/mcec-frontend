export interface LoginData {
  username: string;
  password: string;
}

export interface RegisterData {
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

export interface UidTokenData {
  uid?: string;
  token?: string;
}

export interface SetPasswordData {
  new_pasword?: string;
  current_password?: string;
}

export interface ResetPasswordData {
  uid?: string;
  token?: string;
  new_pasword?: string;
}
