export function PageTitle(newTitle) {
  return (document.title = newTitle);
}

export function getSessionStorage(key) {
  return JSON.parse(window.sessionStorage.getItem(key));
}

export function setSessionStorage(key, value) {
  // * STORE walletData INTO SESSION
  return window.sessionStorage.setItem(key, JSON.stringify(value));
}
