<template>
  <div class="container">
    <input
      v-model="title"
      type="text"
      placeholder="Search for Movies, Series & More"
      class="form-control"
      @keyup.enter="apply"/>
    <div class="selects">
      <select
        v-for="filter in filters"
        v-model="$data[filter.name]"
        :key="filter.name"
        class="form-select">
        <option
          v-if="filter.name === 'year'"
          value="">
          All Years
        </option>
        <option
          v-for="item in filter.items"
          :key="item">
          {{ item }}
        </option>
      </select>
    </div>
    <button
      class="btn btn-primary"
      @click="apply">
      Apply
    </button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      title: '',
      type: 'movie',
      number: 10,
      year: '',
      filters: [
        {
          name: 'type',
          items: ['movie', 'series', 'episode']
        },
        {
          name: 'number',
          items: [10, 20, 30]
        },
        {
          name: 'year',
          // 즉시 실행 함수
          items: (() => {
            const years = []
            const thisYear = new Date().getFullYear()
            for(let i = thisYear; i>=1985; i-= 1) {
              years.push(i)
            }
            return years
          })()
        }
      ]
    }
  },
  methods: {
    async apply() {
      // Search movies..
      const OMDB_API_KEY = '7035c60c';
      const res = await axios.get(`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${this.title}&type="${this.type}&y=${this.year}&page=1`);
      console.log(res)
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;

  > * {
    font-size: 15px;
  }

  .selects {
    display: flex;

    select {
      width: 120px;
      margin-left: 10px;
    }
  }
  .btn {
    width: 120px;
    height: 50px;
    margin-left: 10px;
    font-weight: 700;
    flex-shrink: 0;
  }
}
</style>