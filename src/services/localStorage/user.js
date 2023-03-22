export function setLocalStorageUser(email, userId, token, expiresIn) {
    const curDate = new Date().getTime();
    const tokenExpiration = curDate + expiresIn;

    localStorage.setItem('email', email);
    localStorage.setItem('userId', userId);
    localStorage.setItem('token', token);
    localStorage.setItem('tokenExpiration', tokenExpiration);
}

export function getLocalStorageUser() {
    const email = localStorage.getItem('email');
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    const tokenExpiration = localStorage.getItem('tokenExpiration');

    return { email, userId, token, tokenExpiration };
}

export function resetLocalStorageUser() {
    localStorage.removeItem('email');
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('tokenExpiration');
}
