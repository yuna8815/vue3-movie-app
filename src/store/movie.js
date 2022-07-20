import axios from 'axios';
import _uniqBy from 'lodash/uniqBy'

// movie modules
export default {
  // module!
  namespaced: true,
  // data!
  state: () => ({
    movies: [],
    message: 'Search for the movie title!',
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
      // 사용자가 새로고침을 하거나 apply 버튼을 여러번 눌러 함수를 여러번 타지 않도록
      if(state.loading) return

      commit('updateState', {
        message: '',
        loading: true
      })
      try {
        // const { title, type, number, year } = payload

        const res = await _fetchMovie({...payload, page: 1})
        const { Search, totalResults } = res.data
        // context.commit('updateState', {
        commit('updateState', {
          // ID 중복 제거
          movies: _uniqBy(Search, 'imdbID'),
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
            if(page > (payload.number / 10)) break;
            
            const res = await _fetchMovie({...payload, page})
            const { Search } = res.data
            commit('updateState', {
              movies: [...state.movies, ..._uniqBy(Search, 'imdbID')]
            })
          }
        }
      } catch(message) {
        commit('updateState', {
          movies: [],
          message
        })
      } finally {
        commit('updateState', {
          loading: false
        })
      }
    }
  }
}

// 현재 파일 내부에서만 처리
function _fetchMovie(payload) {
  const { title, type, year, page } = payload
  const OMDB_API_KEY = '7035c60c';
  const url = `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type="${type}&y=${year}&page=${page}`

  return new Promise((resolve, reject) => {
    axios.get(url)
      .then(res => {
        if(res.data.Error) {
          reject(res.data.Error)
          return
        }
        resolve(res)
      })
      .catch(err => {
        reject(err.message)
      })
  })
}