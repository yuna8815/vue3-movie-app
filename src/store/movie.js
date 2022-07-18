// movie modules
export default {
  // module!
  namespaced: true,
  // data!
  state: () => ({
    movies: []
  }),
  // computed!
  getters: {
    movieIds(state) {
      return state.movies.map(m => m.imdbID)
    }
  },
  // methods!
  // 변이 (여기서만 데이터 변경 가능)
  mutations: {
    resetMovies(state) {
      state.movies = []
    }
  },
  // 비동기 (async await)
  actions: {
    // Exam
    // searchMoives({ state, getters, commit }) {
    //   context.state
    //   context.getters
    //   context.commit
    // }
  }
}