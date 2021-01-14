<template>
  <div v-if="person">
    <div v-if="loading">
      <b-spinner class="spinner" label="Spinning"></b-spinner>
    </div>
    <div v-if="page">
      <p>{{ person.name }}<b> details!</b></p>

      <b-form @submit.stop.prevent="onSubmit">
        <b-form-group id="name-group" label="name" label-for="name">
          <b-form-input
              id="name"
              name="name"

              v-model="$v.updateForm.name.$model"
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

              v-model="$v.updateForm.phone.$model"
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

              v-model="$v.updateForm.email.$model"
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

              v-model="$v.updateForm.age.$model"
              :state="validateState('age')"
              aria-describedby="age-live-feedback"
          ></b-form-input>

          <b-form-invalid-feedback
              id="name-live-feedback"
          >This is a required field and must be at least 1 characters.
          </b-form-invalid-feedback>
        </b-form-group>

        <b-button type="submit" variant="primary">Submit</b-button>
        <b-button class="ml-2" @click="resetForm()">Reset</b-button>
      </b-form>
    </div>
  </div>
</template>
<script>
import {validationMixin} from "vuelidate";
import {required, minLength, maxLength, maxValue} from "vuelidate/lib/validators";
import PersonService from '../../../services/person'
import router from "../../../router";

export default {
  mixins: [validationMixin],
  data() {
    return {
      loading: false,
      page :true,
      person: null,
      personService: new PersonService(),
      id: parseInt(this.$route.params.id),
      updateForm: {
        name: null,
        phone: null,
        email: null,
        age: null
      }
    }
  },
  methods: {
    getPersons() {
      this.page = false;
      this.loading = true;
      this.personService.getPerson(this.id).finally(() => {
        this.loading = false;
        this.page = true;
      }).catch(() => {

      }).then((persons) => {
        this.page = true;
        this.loading = false;
        this.person = persons;
        this.$v.updateForm.email.$model = this.person.email
        this.$v.updateForm.age.$model = this.person.age
        this.$v.updateForm.phone.$model = this.person.phone
        this.$v.updateForm.name.$model = this.person.name
      });
    },

    updatePerson() {
      this.page = false;
      this.loading = true;
      this.personService.updatePerson(this.id, this.updateForm).finally(() => {
        this.loading = false;
        this.page = true;
      }).catch(() => {

      }).then(() => {
        router.push({name: 'persons'});
      });
    },
    validateState(name, phone, email, age) {
      const {$dirty, $error} = this.$v.updateForm[name] || this.$v.updateForm[email]
      || this.$v.updateForm[phone] || this.$v.updateForm[age];

      return $dirty ? !$error : null;
    },
    resetForm() {
      this.updateForm = {
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
      this.$v.updateForm.$touch();
      if (this.$v.updateForm.$anyError) {
        return;
      }

      this.updatePerson(this.updateForm);
      router.push({ name: 'persons' });
    },
  },

  mounted() {
    this.getPersons();
  },
  validations: {
    updateForm: {
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
}
</script>
<style lang="scss">

@import "./src/assets/scss/spinner";
</style>