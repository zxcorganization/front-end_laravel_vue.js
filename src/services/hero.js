import axios from 'axios';

export default class HeroService {
    addHero(name) {
        return axios.post(process.env.VUE_APP_HEROES_URL + '/create', { name: name });
    }

    getHeroes() {
        return new Promise((resolve, reject) => {
            axios.get(process.env.VUE_APP_HEROES_URL + '/employees')
                .then(response => {
                    resolve(response.data.data);
                })
                .catch(error => {
                    reject(error);
                });
        })
       
    }


}