<template>
</template>
<script>
    import axios from 'axios'

    export default {
        data() {
            return {
                list: [],
                newHero: ''

            }
        },
    methods: {
            addHero: function () {
                axios.post('http://dummy.restapiexample.com/api/v1/create', {
                    name: this.newHero
                }, {
                    headers: {
                        'Content-Type': null
                    }
                })
                    .then((response) => {
                        const data = response.data.data;
                        this.list.push(data);
                        this.newUser = '';
                    })
            }
        }
    }
</script>
<style>

</style>