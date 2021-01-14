<template>
  <div>
    <div v-if="loading"><b-spinner class="spinner"  label="Spinning"></b-spinner></div>
    <div v-if="page"> <div v-if="show">
      <div class="topHeroesBoard">
        <a class="topHeroBlock"><p>{{ persons[0].name }}</p></a>
        <a class="topHeroBlock"><p>{{ persons[1].name }}</p></a>
        <a class="topHeroBlock"><p>{{ persons[2].name }}</p></a>
        <a class="topHeroBlock"><p>{{ persons[3].name }}</p></a>
      </div>
      <div class="topHeroesBoard">
        <div>
          <ul>
            <li v-for="(person , index) in persons" :key="index">
              <router-link :to="{name:'persons/edit' , params:{id:person.id}}" exact>
                <a href="#">
                  {{ person.name }}
                  {{ person.id }}
                </a>
              </router-link>

            </li>
          </ul>
        </div>
        <div style="margin-left:350px;">
          <pie-chart :data="chartdata" :options="options"></pie-chart>
        </div>
      </div>
    </div></div>

  </div>
</template>

<script>
import pieChart from '../../common/pie-chart.vue';
import PersonService from '../../../services/person'


export default {
  data() {
    return {
      loading: false,
      page :true,
      persons: [],
      show: false,
      personService: new PersonService(),

      chartdata: {
        labels: [],
        datasets: [
          {
            label: 'Data One',
            backgroundColor: [],
            data: []
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    }
  },

  methods: {
    getPersons() {
      this.page = false;
      this.loading = true;
      this.personService.getPersons().finally(() => {
        this.loading = false;
        this.page = true;
      }).catch(() => {

      }).then((persons) => {
        const uniqueAges = [];
        const agesCounter = [];
        const colorArray = [];
        let colorNumber = 1;

        this.persons.map((person) => {
          const age = person.age;
          if (uniqueAges.includes(age)) {
            const ageCounterIndex = uniqueAges.findIndex((uniqueAge) => uniqueAge === age);
            agesCounter[ageCounterIndex] += 1;
          } else {
            uniqueAges.push(age)
            agesCounter.push(1);
          }
        });

        for (let i = 0; i < this.persons.length; i++) {
          let min = Math.ceil(100);
          let max = Math.floor(10000);
          colorNumber = Math.floor(Math.random() * (max - min)) + min;

          let colorNumberInString = colorNumber.toString();
          colorArray.push("#" + colorNumberInString);
          colorNumber = 0;
        }

        this.chartdata.labels = uniqueAges;
        this.chartdata.datasets[0].data = agesCounter;
        this.chartdata.datasets[0].backgroundColor = colorArray;

        this.persons = persons;
        this.show = true;

      });
    }
  },
  mounted() {
    this.getPersons();
  },

  components: {
    pieChart
  }

}
</script>
<style lang="scss">
.topHeroesBoard {
  display: flex;
}

.topHeroBlock {
  background-color: #5a90cb;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24%;
  margin-left: 11px;
  color: white;

  &:hover {
    background-color: rgb(238, 238, 238);
    cursor: pointer;
    text-decoration: none;
  }

  p {
    font-size: 1.5em;
  }
}

</style>
