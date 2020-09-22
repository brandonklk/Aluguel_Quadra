export const TOKEN_KEY = "@airbnb-Token";
export const TOKEN_USER = "@user-Token";

export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const getUser = () => localStorage.getItem(TOKEN_USER);
export const login = token => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const saveUser = token => {
  localStorage.setItem(TOKEN_USER, token);
};

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(TOKEN_USER);
};