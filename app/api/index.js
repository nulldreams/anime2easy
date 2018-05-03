const request = require('../utils/request')

exports.legendados = async function (animeID) {
  let body = await API(`/legendados/${animeID}`)

  return new Promise((resolve, reject) => {
    return resolve(body)
  })
}

exports.episodios = async function (ep) {
  let body = await API(`/video/${ep}`)

  return new Promise((resolve, reject) => {
    return resolve(body)
  })
}

async function API (url) {
  let { response, body } = await request.get(`http://www.animesonlinebr.com.br${url}`)

  return new Promise((resolve, reject) => {
    if (response.statusCode !== 200) return console.log(response.statusMessage)

    return resolve(body)
  })
}
