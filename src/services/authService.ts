import mockDb from '../data/mockdb.json';

export interface IUser {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  role: string;
  lastLogin: string;
}

export interface IAuthResponse {
  success: boolean;
  user?: IUser;
  token?: string;
  error?: string;
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
export const loginUser = async (
  usernameOrEmail: string,
  password: string,
): Promise<IAuthResponse> => {
  await delay(800);

  try {
    const user = mockDb.users.find(
      (u) => u.username.toLowerCase() === usernameOrEmail.toLowerCase(),
    );

    if (!user) {
      return {
        success: false,
        error: 'Your user ID or password is incorrect.',
      };
    }

    if (user.password !== password) {
      return {
        success: false,
        error: 'Your user ID or password is incorrect.',
      };
    }

    const session = {
      id: `sess_${String(Date.now())}`,
      userId: user.id,
      token: `mock_token_${String(user.id)}_${String(Date.now())}`,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    };

    const { password: _, ...userWithoutPassword } = user;

    return {
      success: true,
      user: userWithoutPassword,
      token: session.token,
    };
  } catch {
    return {
      success: false,
      error: 'An unexpected error occurred. Please try again.',
    };
  }
};

export const requestPasswordReset = async (
  usernameOrEmail: string,
): Promise<{ success: boolean; message: string }> => {
  await delay(800);

  const user = mockDb.users.find(
    (u) => u.username.toLowerCase() === usernameOrEmail.toLowerCase(),
  );

  if (!user) {
    return {
      success: false,
      message: 'User not found.',
    };
  }

  return {
    success: true,
    message: 'Password reset instructions have been sent to your email.',
  };
};

export const checkAuthStatus = (): boolean => {
  const token = localStorage.getItem('auth_token');
  /* Explicitly handle null case */
  if (token === null) {
    return false;
  }
  return true;
};

export const logoutUser = (): void => {
  localStorage.removeItem('auth_token');
  localStorage.removeItem('user');
};
