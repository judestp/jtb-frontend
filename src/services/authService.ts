import mockDb from '@/data/mockdb.json';

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

interface IPasswordResetResponse {
  success: boolean;
  message: string;
}

interface ISession {
  id: string;
  userId: string;
  token: string;
  expiresAt: string;
}

/**
 * Creates a delay for simulating network requests
 */
const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Authenticate user with username and password
 */
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
        error: 'invalidCredentials',
      };
    }

    if (user.password !== password) {
      return {
        success: false,
        error: 'invalidCredentials',
      };
    }

    const session: ISession = {
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
      error: 'serverError',
    };
  }
};

/**
 * Request password reset for a user
 */
export const requestPasswordReset = async (
  usernameOrEmail: string,
): Promise<IPasswordResetResponse> => {
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

/**
 * Check if user is authenticated based on token presence
 */
export const checkAuthStatus = (): boolean => {
  const token = localStorage.getItem('auth_token');

  if (token === null) {
    return false;
  }

  return true;
};

/**
 * Remove user authentication data
 */
export const logoutUser = (): void => {
  localStorage.removeItem('auth_token');
  localStorage.removeItem('user');
};
