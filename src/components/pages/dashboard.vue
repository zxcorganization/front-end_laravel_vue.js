<template>
    <div>
        <h1>My heroes</h1>
        <div class="addMenu">
            <input ref="heroName" type="text" v-model="newHeroName" @keyup.enter="addHero" />
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
    import HeroService from '../../services/hero'

    export default {
        data() {
            return {
                list: [],
                newHeroName: '',
                heroService: new HeroService()
            }
        },
       
        methods: {
            addHero() {
                this.heroService.addHero(this.newHeroName).then(() => {
                    console.log('22');

                })
            },
            getHeroes() {
                this.heroService.getHeroes().then((heroes) => {
                    console.log(heroes);
                    this.list = heroes;
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