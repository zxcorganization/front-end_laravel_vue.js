<template>
  <div>
    <div v-if="loading"><b-spinner class="spinner"  label="Spinning"></b-spinner></div>
<div v-if="page"><b-alert :show="showAlert" variant="success">Success Alert</b-alert>
  <b-form @submit.stop.prevent="onSubmit">
    <b-form-group id="name-group" label="name" label-for="name">
      <b-form-input
          id="name"
          name="name"
          v-model="$v.form.name.$model"
          :state="validateState('name')"
          aria-describedby="name-live-feedback"
      ></b-form-input>

      <b-form-invalid-feedback
          id="name-live-feedback"
      >This is a required field and must be at least 3 characters.
      </b-form-invalid-feedback>
    </b-form-group>

    <b-form-group id="phone-group" label="phone" label-for="phone">
      <b-form-input
          id="phone"
          name="phone"
          v-model="$v.form.phone.$model"
          :state="validateState('phone')"
          aria-describedby="name-live-feedback"
      ></b-form-input>

      <b-form-invalid-feedback
          id="phone-live-feedback"
      >This is a required field and must be at least 5 characters.
      </b-form-invalid-feedback>
    </b-form-group>


    <b-form-group id="email-group" label="email" label-for="email">
      <b-form-input
          id="email"
          name="email"
          v-model="$v.form.email.$model"
          :state="validateState('email')"
          aria-describedby="email-live-feedback"
      ></b-form-input>

      <b-form-invalid-feedback
          id="email-live-feedback"
      >This is a required field and must be at least 8 characters.
      </b-form-invalid-feedback>
    </b-form-group>

    <b-form-group id="age-group" label="age" label-for="age">
      <b-form-input
          id="age"
          name="age"
          v-model="$v.form.age.$model"
          :state="validateState('age')"
          aria-describedby="age-live-feedback"
      ></b-form-input>

      <b-form-invalid-feedback
          id="name-live-feedback"
      >This is a required field and must be at least 1 characters.
      </b-form-invalid-feedback>
    </b-form-group>

    <b-alert :show="showAlert" variant="success">Success Alert</b-alert>
    <b-button type="submit" variant="primary">Submit</b-button>
    <b-button class="ml-2" @click="resetForm()">Reset</b-button>

  </b-form></div>

  </div>
</template>
<script>
import PersonService from '../../../services/person'
import {validationMixin} from "vuelidate";
import {required, minLength, maxLength, maxValue} from "vuelidate/lib/validators";
import router from "../../../router";


export default {
  mixins: [validationMixin],
  data() {
    return {
      loading: false,
      page :true,
      personService: new PersonService(),
      form: {
        name: null,
        phone: null,
        email: null,
        age: null
      },
      showAlert: 1
    }
  },
  validations: {
    form: {
      name: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(50)
      },
      phone: {
        required,
        minLength: minLength(5),
        maxLength: maxLength(15)
      },
      email: {
        required,
        minLength: minLength(8),
        maxLength: maxLength(50)
      },
      age: {
        required,
        minLength: minLength(1),
        maxValue: maxValue(100)
      }
    }
  },
  methods: {
    validateState(name, phone, email, age) {
      const {$dirty, $error} = this.$v.form[name] || this.$v.form[email] || this.$v.form[phone] || this.$v.form[age];

      return $dirty ? !$error : null;
    },
    resetForm() {
      this.form = {
        name: null,
        phone: null,
        email: null,
        age: null
      };

      this.$nextTick(() => {
        this.$v.$reset();
      });
    },
    onSubmit() {
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      this.showAlert = 1;

      this.addPerson(this.form);
    },

    addPerson() {
      this.page = false;
      this.loading = true;

      this.personService.addPerson(this.form).finally(() => {
        this.loading = false;
        this.page = true;
      }).catch(() => {

      }).then(() => {
        router.push({name: 'persons'});

      });
    }
  },

  mounted() {
    this.showAlert = null;
  }

}

</script>
<style lang="scss">

@import "./src/assets/scss/spinner";
</style>