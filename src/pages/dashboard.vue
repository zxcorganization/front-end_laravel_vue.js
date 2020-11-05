<template>
    <div>
        <h1>My heroes</h1>
        <div class="addMenu">
            <input ref="heroName" type="text" v-model="newHero" @keyup.enter="addHero" />
            <input type="button" name="name" value="Add" />
        </div>
        asdas
        <table>
            <td>
            <tr v-for="hero in list" v-bind:key="hero.id">  {{hero.employee_name}}<button v-on:click="deleteHero(hero.id)">delete</button></tr>
            </td>
        </table>
    </div>

</template>
<script>
    import axios from 'axios'
    import heroaxios from './components/heroaxios.vue'
    export default {
        data() {
            return {
                list: [],
                newHero:''

            }
        },
        


        methods: {
              add: heroaxios.addHero,
            getHeroes() {
                axios.get('http://dummy.restapiexample.com/api/v1/employees' ).then((response) => {
                    this.list = response.data.data;
                    console.log(response.data.data);
                })
            },
            deleteHero(id) {
                this.axios.delete('http://dummy.restapiexample.com/api/v1/delete/'+id).then((response) => {
                    this.getHeroes();
                    console.log(response.data.data);
                })
            }

        },
        mounted() {
            this.getHeroes();   
        },
    }
</script>
<style>
    .addMenu{
        display:flex;
        margin-left:15px;
    }
</style>