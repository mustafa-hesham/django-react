import Cookie from 'cookie-universal';

export const cookies = new Cookie();

export function setCookie(name, value) {
  cookies.set(name, value);
}

export function getCookie(name) {
  return cookies.get(name);
}

export function removeCookie(name) {
  cookies.remove(name);
}
