const request = require('request')

async function get (url, token) {
  return new Promise((resolve, reject) => {
    request({ url, method: 'GET' }, (error, response, body) => {
      if (error) return reject(error)

      return resolve({ body, response })
    })
  })
}

module.exports = {
  get
}
