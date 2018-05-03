const url = 'http://www.animesonlinebr.com.br/animes-legendados.html'
const request = require('./app/utils/request')
const cheerio = require('cheerio')
const slugify = require('@sindresorhus/slugify')
const fs = require('fs')

async function getAnimes () {
  let { response, body } = await request.get(url)

  if (response.statusCode !== 200) return console.log(response.statusMessage)

  const $ = cheerio.load(body)
  let animes = []

  $('.single').find('li').each(function (i, element) {
    if ($(this).find('a').eq(0).attr('title') !== undefined) {
      let obj = {}
      obj[slugify($(this).find('a').eq(0).text()).replace(/-/g, '_')] = {
        slug: slugify($(this).find('a').eq(0).text()),
        id: $(this).find('a').attr('href').match(/\d+/)[0],
        nome: $(this).find('a').eq(0).text()
      }

      animes.push(obj)
    }
  })

  fs.writeFileSync('./schema.json', JSON.stringify(animes))
}

getAnimes()
