<template>
    <div v-if="person" >

        <p>{{person.name}}<b>  details!</b></p>
        <div class="flex">
            <div>
                id: {{person.id}}
            </div>
            <div>

            </div>
        </div>
        <div class="flex">
            <div>
               new name:
            </div>
            <div>
                <input  type="text" v-model="name" @keyup.enter="updatePerson" />
            </div>
        </div>
        <div class="flex">
            <div>
                <button>save</button>
            </div>
            <div>
                <router-link tag="button" to="/" exact>
                    back
                </router-link>
            </div>
        </div>
    </div>
</template>
<script>
    import PersonService from '../../services/person'

    export default {
        data() {
            return {
                person: null,
                personService: new PersonService(),
                id: parseInt(this.$route.params.id),
                name: ''


            }
        },
        methods: {

            getPersons() {
                this.personService.getPerson(this.id).then((persons) => {
                    console.log(persons);
                    this.person = persons;
                })
            },

            updatePerson() {
                this.personService.updatePerson(this.id , this.name).then((persons) => {
                    console.log(persons);
                })
            }
        },

        mounted() {
            this.getPersons();


        }
    }
</script>
<style>
    .flex {
        display: flex;
    }
</style>