const axios = require('axios')
// const OMDB_API_KEY = process.env.OMDB_API_KEY
const { OMDB_API_KEY } = process.env

exports.handler = async function(event) {
  console.log(event)
  const payload = JSON.parse(event.body)
  const { title, type, year, page, id } = payload
  // 보안상의 문제로 환경변수로 변경
  // const OMDB_API_KEY = '7035c60c';
  const url = id
    ? `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${id}`
    : `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type="${type}&y=${year}&page=${page}`

  try {
    const { data } = await axios.get(url)
    if(data.Error) {
      return {
        statusCode: 400,
        body: data.Error
      }
    }
    return {
      statusCode: 200,
      body: JSON.stringify(data)
    }
  } catch(error) {
    return {
      // https://github.com/axios/axios#handling-errors
      statusCode: error.response.status,
      body: error.message
    }
  }
}