export const BASE_URL = 'https://auth.nomoreparties.co';

export const register = (email, password) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            password: 'somepassword',
            email: 'email@yandex.ru',
        }),
    })
        .then((response) => {
            try {
                if (response.status === 200) {
                    return response.json();
                }
            } catch (e) {
                return e;
            }
        })
        .then((res) => {
            return res;
        })
        .catch((err) => console.log(err));
};