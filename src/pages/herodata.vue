<template>
    <div v-if="hero" >
        <p>{{hero.employee_name}}<b>  details!</b></p>
        <div class="flex">
            <div>
                id: {{hero.id}}
            </div>
            <div>
                
            </div>
        </div>
        <div class="flex">
            <div>
                name:  
            </div>
            <div>
                <input type="text" v-model="hero.employee_name"/>
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

    export default {
        data() {
            return {
                hero: null,
                qwe: parseInt(this.$route.params.id),
                
            }
        },
        addHero() {
            this.axios.put('http://dummy.restapiexample.com/api/v1/update/' + this.qwe , {
                name: this.hero.employee_name
            }, {
                headers: {
                    'Content-Type': null
                }
            })
                .then(() => {
                    this.newUser = '';
                })
        },
        mounted() {
            this.axios.get('http://dummy.restapiexample.com/api/v1/employee/' + this.qwe).then((idk) => {
                this.hero = idk.data.data;
            })


        }
    }
   
</script>
<style>
    .flex {
        display: flex;
    }
</style>