// use localStorage to store the authority info, which might be sent from server in actual project.
export function getAuthority() {
  return localStorage.getItem('token');
}

export function setAuthority(authority) {
  return localStorage.setItem('token', authority);
}

export function clearAuthority() {
  return localStorage.removeItem('token');
}
