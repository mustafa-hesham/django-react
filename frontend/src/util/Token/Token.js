import { AUTH_TOKEN, REFRESH_TOKEN } from 'Component/AccountLogin/AccountLogin.config';
import { getCookie, removeCookie, setCookie } from 'Util/Cookies';

export function setAuthTokens(token, refreshToken) {
  setCookie(AUTH_TOKEN, token);
  setCookie(REFRESH_TOKEN, refreshToken);
}

export function getAuthTokens() {
  return {
    token: getCookie(AUTH_TOKEN),
    refreshToken: getCookie(REFRESH_TOKEN)
  };
}

export function setRefreshToken(refreshToken) {
  setCookie(REFRESH_TOKEN, refreshToken);
}

export function removeAuthTokens() {
  removeCookie(AUTH_TOKEN);
  removeCookie(REFRESH_TOKEN);
}
