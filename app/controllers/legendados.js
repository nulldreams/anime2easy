const cheerio = require('cheerio')
const API = require('../api')
const _ = require('lodash')

async function video (animeID, numEP) {
  numEP = Math.ceil(Math.log10(numEP + 1)) === 1 ? `0${numEP}` : numEP

  const $ = cheerio.load(await API.legendados(animeID))

  // $('.boxAnimeSobreLinha').each(function (i, elem) {
  //   console.log($(this).text().trim())
  // })

  let ep = {}

  $('.grid').find('li').toArray().forEach(function (value, i) {
    if (value.children[1].children[0].data.indexOf(`Episódio ${numEP}`) > -1 || value.children[1].children[0].data.indexOf(`Episódio – ${numEP}`) > -1) {
      ep.nome = value.children[1].children[0].data
      ep.numEP = value.children[1].children[0].parent.attribs.href.match(/\d+/)[0]
    }
  })

  let epObject = await episodio(ep)

  return new Promise((resolve, reject) => {
    return resolve(epObject)
  })
}

async function episodio ({ nome, numEP }) {
  const $ = cheerio.load(await API.episodios(numEP))
  return new Promise((resolve, reject) => {
    $('#abas').find('a').each(function (i, element) {
      if ($(this).text().toUpperCase() === 'DOWNLOAD') {
        return resolve({ episodio: nome, video: $(this).attr('href') })
      }
    })
  })
}

exports.episodio = {
  video,
  length: async function (animeID) {
    const $ = cheerio.load(await API.legendados(animeID))
    return new Promise((resolve, reject) => {
      return resolve($('.grid').find('li').length)
    })
  }
}
