import { AUTH_TOKEN, REFRESH_TOKEN } from 'Component/AccountLogin/AccountLogin.config';

export function setTokens(token, refreshToken) {
  localStorage.setItem(AUTH_TOKEN, token);
  localStorage.setItem(REFRESH_TOKEN, refreshToken);
}

export function getTokens() {
  return {
    token: localStorage.getItem(AUTH_TOKEN),
    refreshToken: localStorage.getItem(REFRESH_TOKEN)
  };
}

export function setRefreshToken(refreshToken) {
  localStorage.setItem(REFRESH_TOKEN, refreshToken);
}

export function removeAuthTokens() {
  localStorage.removeItem(AUTH_TOKEN);
  localStorage.removeItem(REFRESH_TOKEN);
}
