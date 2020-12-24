import axios from 'axios';

export default class PersonService {
    addPerson(form) {
        return axios.post(process.env.VUE_APP_HEROES_URL,
            {
                name: form.name ,
                age: form.age ,
                phone: form.phone,
                email: form.email
            });
    }

    getPersons() {
        return new Promise((resolve, reject) => {
            axios.get(process.env.VUE_APP_HEROES_URL)
                .then(response => {
                    resolve(response.data.data);
                })
                .catch(error => {
                    reject(error);
                });
        })

    }

    getPerson(id) {
        return new Promise((resolve, reject) => {
            axios.get(process.env.VUE_APP_HEROES_URL + '/' + id)
                .then(response => {
                    resolve(response.data.data);
                })
                .catch(error => {
                    reject(error);
                });
        })

    }

    deletePerson(id) {
        return new Promise((resolve, reject) => {
            axios.delete(process.env.VUE_APP_HEROES_URL + '/' + id)
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });
        })

    }

    updatePerson(id, name) {
        return new Promise((resolve, reject) => {
            axios.put(process.env.VUE_APP_HEROES_URL + '/' + id, {name: name})
                .then(response => {
                    resolve(response.data.data);
                })
                .catch(error => {
                    reject(error);
                });
        })
    }
}