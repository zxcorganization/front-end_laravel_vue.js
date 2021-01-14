import axios from 'axios';

export default class UserService {

    login(loginForm) {

        return new Promise((resolve, reject) => {
            axios.post(
                process.env.VUE_APP_HEROES_URL + '/auth/login',
                {
                    email: loginForm.email,
                    password: loginForm.password
                }
            )
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });

        })
    }

    logout() {
        return axios.post(process.env.VUE_APP_HEROES_URL + '/auth/logout')
    }
}