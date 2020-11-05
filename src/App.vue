<template>
   
    <div id="app">
        <h2>Tour of Heroes</h2>
        <router-link tag="b-button" active-class="active" to="/" exact>Dashboard</router-link>
        <router-link tag="b-button" active-class="active" to="/about" exact>Heroes</router-link>
        <router-view />
       

        
    </div>

</template>

<script>
    import 'bootstrap/dist/css/bootstrap.css'
    import 'bootstrap-vue/dist/bootstrap-vue.css'
    export default {

        data() {
            return {
                
            }
        },
        components: {
            
        },
        computed: {
            
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
