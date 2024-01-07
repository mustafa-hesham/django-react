import { AUTH_TOKEN, REFRESH_TOKEN } from 'Component/AccountLogin/AccountLogin.config';
import { refreshAuthToken } from 'Query/Token.query';
import { getCookie, removeCookie, setCookie } from 'Util/Cookies';

import { REFRESH_TOKENS_TIMEOUT } from './Token.config';

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

const refreshAuthTokens = async () => {
  const {
    refreshToken: currentRefreshToken
  } = getAuthTokens();

  if (!currentRefreshToken) {
    return;
  }

  const {
    refreshToken: {
      token = '',
      refreshToken = ''
    } = {}
  } = await refreshAuthToken(currentRefreshToken);

  setAuthTokens(token, refreshToken);
};

export function refreshAuthTokensTimeout() {
  setInterval(() => {
    refreshAuthTokens();
  }, REFRESH_TOKENS_TIMEOUT);
}
