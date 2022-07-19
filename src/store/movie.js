import axios from 'axios';

// movie modules
export default {
  // module!
  namespaced: true,
  // data!
  state: () => ({
    movies: [],
    message: '',
    loading: false
  }),
  // computed!
  getters: {
    // Exam
    // movieIds(state) {
    //   return state.movies.map(m => m.imdbID)
    // }
  },
  // methods!
  // 변이 (여기서만 데이터 변경 가능)
  mutations: {
    updateState(state, payload) {
      // ['movies', 'message', 'loading']
      Object.keys(payload).forEach(key => {
        state[key] = payload[key]
        // state['movies'] = payload['movies']
        // state.message = payload.messaage
      })
    },
    resetMovies(state) {
      state.movies = []
    }
  },
  // 비동기 (async await)
  actions: {
    // Exam
    // async searchMovies(context, payload) {
    async searchMovies({ state, commit }, payload) {
      const { title, type, number, year } = payload
      const OMDB_API_KEY = '7035c60c';

      const res = await axios.get(`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type="${type}&y=${year}&page=1`);
      const { Search, totalResults } = res.data
      // context.commit('updateState', {
      commit('updateState', {
        movies: Search,
        // messaage: 'Hello world!',
        // loading: true
      })
      // console.log(totalResults, typeof totalResults)

      const total = parseInt(totalResults, 10)
      const pageLength = Math.ceil(total / 10)

      // 추가 요청
      if(pageLength > 1) {
        for(let page = 2; page <= pageLength; page++) {
          // number
          if(page > (number / 10)) break;
          
          const res = await axios.get(`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type="${type}&y=${year}&page=${page}`);
          const { Search } = res.data
          commit('updateState', {
            movies: [...state.movies, ...Search]
          })
        }
      }
    }
  }
}