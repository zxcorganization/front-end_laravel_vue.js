<template>
  <div>
    <div v-if="loading">
      <b-spinner class="spinner" label="Spinning"></b-spinner>
    </div>
    <div v-if="page">
      <table>
        <td>
          <tr v-for="person in persons" v-bind:key="person.id"> {{ person.name }}
            <button v-on:click="deletePerson(person.id)">delete</button>
          </tr>
        </td>
      </table>
    </div>


  </div>

</template>
<script>
import PersonService from '../../../services/person'
import UserService from '../../../services/user'



export default {

  data() {
    return {
      loading: false,
      page :true,
      persons: [],
      personService: new PersonService(),
      userService: new UserService(),
      email: null,
    }
  },

  methods: {
    getPersons() {
      this.loading = true;
      this.page = false;
      this.personService.getPersons().finally(() => {

        this.loading = false;
        this.page = true;

      }).catch(() => {

      }).then((person) => {
        this.persons = person;

      });
    },
    deletePerson(id) {
      this.personService.deletePerson(id).then((response) => {
        console.log(response.data.data);
        this.getPersons();
      })
    }

  },
  mounted() {
    this.getPersons();
    this.email = localStorage.email;

  }
}
</script>
<style lang="scss">
@import "./src/assets/scss/spinner";
</style>