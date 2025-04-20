export interface AuthUser {
    email: string;
    token: string;
}

const AUTH_STORAGE_KEY = 'auth_user';

export const getStoredUser = (): AuthUser | null => {
    if (typeof window === 'undefined') return null;
    const stored = localStorage.getItem(AUTH_STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
};

export const setStoredUser = (user: AuthUser | null): void => {
    if (typeof window === 'undefined') return;
    if (user) {
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    } else {
        localStorage.removeItem(AUTH_STORAGE_KEY);
    }
}; 