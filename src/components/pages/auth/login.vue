<template>
  <div>
    <H2>login</H2>
    <b-form @submit.stop.prevent="onSubmit">
      <b-form-group id="email-group" label="email" label-for="email">
        <b-form-input
            id="email"
            name="email"
            v-model="$v.loginForm.email.$model"
            :state="validateState('email')"
            aria-describedby="email-live-feedback"
        ></b-form-input>

        <b-form-invalid-feedback
            id="email-live-feedback"
        >This is a required field and must be at least 3 characters.
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group id="password-group" label="password" label-for="password">
        <b-form-input
            id="password"
            name="password"
            v-model="$v.loginForm.password.$model"
            :state="validateState('password')"
            aria-describedby="password-live-feedback"
        ></b-form-input>

        <b-form-invalid-feedback
            id="password-live-feedback"
        >This is a required field and must be at least 5 characters.
        </b-form-invalid-feedback>
        <div v-if="err"><h2>Wrong password or email</h2></div>

      </b-form-group>


      <b-button type="submit" variant="primary">Submit</b-button>


      <b-button class="ml-2" @click="resetForm()">Reset</b-button>
    </b-form>
  </div>
</template>

<script>
import {validationMixin} from "vuelidate";
import UserService from '../../../services/user'
import {maxLength, minLength, required} from "vuelidate/lib/validators";
import router from "../../../router";


export default {
  mixins: [validationMixin],
  data() {
    return {
      err: null,
      loginForm: {
        email: null,
        password: null
      },
      token: null,
      userService: new UserService()
    }
  },
  validations: {
    loginForm: {
      email: {
        required,
        maxLength: maxLength(50)
      },
      password: {
        required,
        minLength: minLength(6),
        maxLength: maxLength(50)
      }
    }
  },

  methods: {

    loginUser() {
      this.userService.login(this.loginForm).then((token) => {
        localStorage.token = token.data.access_token;
        localStorage.email = this.loginForm.email;


        router.push({name: 'home'});
        this.$root.$emit('tokenStored');
        this.err = null;
      }).catch(error => {

        if (error){
          this.err = this.err + 1;
        }

      });
    },
    validateState(email, password) {
      const {$dirty, $error} = this.$v.loginForm[email] || this.$v.loginForm[password];

      return $dirty ? !$error : null;
    },
    resetForm() {
      this.loginForm = {
        email: null,
        password: null
      };

      this.$nextTick(() => {
        this.$v.$reset();
      });
    },
    onSubmit() {
      this.$v.loginForm.$touch();
      if (this.$v.loginForm.$anyError) {
        return;
      }

      this.loginUser(this.loginForm);


    }
  }
}



</script>

<style scoped>

</style>