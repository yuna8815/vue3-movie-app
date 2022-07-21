exports.handler = async function (event, context) {
  return {
    statusCode: 200,
    // body: 'Hello world!'
    body: JSON.stringify({
      name: 'name',
      age: 85,
      email: 'email@email.com'
    })
  }
}