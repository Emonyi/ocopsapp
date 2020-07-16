import axios from 'axios';

export const Auth = {
    login,
    logout,
    getAll
};

function login(email, password) {
    const requestOptions = {
        method: 'POST',
        headers: {'content-Type': 'application/json'},
        body: JSON.stringify({email, password})
    };
    axios.post('http://127.0.0.1:8000/api/login',requestOptions)
    // .then(handleResponse)
    .then(user => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
            // currentUserSubject.next(user);
            
        }
        return user;
    });
}

function logout() {
    localStorage.removeItem('currentUser');
    currentUserSubject.next(null);
}

function getAll() {
    const requestOptions = {method: 'GET', headers: authHeader()}
}
