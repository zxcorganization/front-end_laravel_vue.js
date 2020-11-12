<template>
    <div>
        <div v-if="show">
            <h1 class="tittle">Top Heroes</h1>
            <div class="topHeroesBoard">
                <a href="https://www.google.com.ua/?hl=ru" class="topHeroBlock"><p>{{list[0].employee_name}}</p></a>
                <a class="topHeroBlock"><p>{{list[1].employee_name}}</p></a>
                <a class="topHeroBlock"><p>{{list[2].employee_name}}</p></a>
                <a class="topHeroBlock"><p>{{list[3].employee_name}}</p></a>

            </div>
            <input v-model="searchHero" type="text" />

            <ul>

                <li v-for="(hero , index) in list" :key="index">
                    <router-link :to="{name:'herodata' , params:{id:hero.id}}" exact>
                        <a href="#" >
                            {{hero.employee_name}}
                        </a>
                    </router-link>
                    
                </li>


            </ul>
            <line-chart  />
        </div>
    </div>
</template>

    <script>
        import axios from 'axios'
        import { Line  } from 'vue-chartjs'

        export default {
         
            data() {
                return {
                    searchHero: '',
                    list: [],
                    extends: Line ,
                    show: false,
                    heroData: [],
                    heroId: [],
                    chartdata: {
                        labels: ['January', 'February'],
                        datasets: [
                            {
                                label: 'Data One',
                                backgroundColor: '#f87979',
                                data: [40, 20]
                            }
                        ]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false
                    }
                }
            },
            mounted() {
                axios.get('http://dummy.restapiexample.com/api/v1/employees')
                    .then((response) => {
                    this.list = response.data.data;
                    this.show = true;
                        this.renderChart(this.chartdata, this.options);
                })  
                    
            },

            
            computed: {
            
                filteredHeroes() {
                    return this.list.filter(hero => {
                        return hero.toUpperCase().indexOf(this.searchHero.toUpperCase()) !== -1
                    })
                },
                
                
            }

        }
    </script>
    <style>
        .topHeroesBoard{
            display:flex;
        }
        .topHeroBlock {
            background-color:#5a90cb ;
            height: 150px;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 24%;
            margin-left: 11px;
            color:white;
           
        }
            .topHeroBlock:hover {
                background-color: rgb(238,238,238);
                cursor:pointer;
                text-decoration:none;
            }
        .topHeroBlock p {
           font-size:1.5em;
        }
        .tittle{
            text-align:center;
            font-size:3em;
        }
    </style>
