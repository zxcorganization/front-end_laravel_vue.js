<template>

  <div id="app">
    <div v-if="token">

      <div class="Tour"><h2>Tour of Heroes</h2></div>

      <div class="email">
        {{email}}
        <b-button v-on:click="logout">logout</b-button>
      </div>

      <router-link tag="b-button" active-class="active" :to="{ name: 'dashboard' }" exact>Dashboard</router-link>
      <router-link tag="b-button" active-class="active" :to="{ name: 'persons'}" exact>Persons</router-link>
      <router-link tag="b-button" active-class="active" :to="{ name: 'persons/create' }" exact>createPerson</router-link>
    </div>
    <router-view ></router-view>
  </div>

</template>

<script>

import UserService from "./services/user";

export default {
  data() {
    return {
      userService: new UserService(),
      email:null,
      token:null
    }
  },
  created() {
    this.$root.$on('tokenStored', this.refreshUserData);
    this.refreshUserData();
  },
  methods: {
    refreshUserData() {
      if (localStorage.token){
        this.email=localStorage.email;
        this.token=localStorage.token;
      }
    },
    logout() {
      this.userService.logout().then(() => {
        localStorage.removeItem('token');
        this.token=null;
        this.$router.push('login');
      })
    }
  }
}
</script>

<style>
body{
  background-color:#ffffff;
}
button{
  margin-left: 2px;
  background-color:#4cff00;
}



</style>
