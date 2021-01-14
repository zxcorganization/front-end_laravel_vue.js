import axios from 'axios';

export default class PersonService {
    addPerson(form) {
        return new Promise((resolve, reject) => {
            axios.post(process.env.VUE_APP_HEROES_URL + '/persons',
                {
                    name: form.name,
                    age: form.age,
                    phone: form.phone,
                    email: form.email
                })
                .then(response => {
                    resolve(response.data.data);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    getPersons() {
        return new Promise((resolve, reject) => {
            axios.get(process.env.VUE_APP_HEROES_URL + '/persons')
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
            axios.get(process.env.VUE_APP_HEROES_URL + '/persons/' + id)
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
            axios.delete(process.env.VUE_APP_HEROES_URL + '/persons/' + id)
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });
        })

    }

    updatePerson(id, updateForm) {
        return new Promise((resolve, reject) => {
            axios.put(process.env.VUE_APP_HEROES_URL + '/persons/' + id,
                {
                    name: updateForm.name,
                    age: updateForm.age,
                    phone: updateForm.phone,
                    email: updateForm.email
                })
                .then(response => {
                    resolve(response.data.data);
                })
                .catch(error => {
                    reject(error);
                });
        })
    }
}