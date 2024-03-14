import JsCookie from 'js-cookie';

export const CookieApi = JsCookie.withAttributes({ expires: 30 });
const tokenKey = 'ADMIN_TOKEN';
/** 获取 token */
export function getToken () {
  return CookieApi.get(tokenKey);
}
/** 存储 token */
export function setToken (token) {
  return CookieApi.set(tokenKey, token);
}
/** 清除 token */
export function removeToken () {
  return CookieApi.remove(tokenKey);
}