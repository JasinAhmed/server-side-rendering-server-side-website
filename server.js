// Importeer het npm package Express (uit de door npm aangemaakte node_modules map)
// Deze package is geïnstalleerd via npm install`npm install`, en staat als 'dependency' in package.json
import express from 'express'

// Importeer de Liquid package (ook als dependency via npm geïnstalleerd)
import { Liquid } from 'liquidjs';


// Maak een nieuwe Express applicatie aan, waarin we de server configureren
const app = express()

// Zorg dat formulierdata makkelijker gelezen kan worden
app.use(express.urlencoded({ extended: true }))

// Gebruik de map 'public' voor statische bestanden
// Bijvoorbeeld CSS, afbeeldingen en JavaScript
app.use(express.static('public'))

// Stel Liquid in als view engine
const engine = new Liquid();
app.engine('liquid', engine.express());

// Stel de map met views in
app.set('views', './views')

// Zet Liquid als view engine
app.set('view engine', 'liquid')


// Maak een GET route voor de homepagina
app.get('/', async function (request, response) {

  // Haal de nieuwsdata op uit de database
  const apiResponse = await fetch('https://fdnd-agency.directus.app/items/adconnect_news')

  // Zet de opgehaalde data om naar JSON
  const apiResponseJSON = await apiResponse.json()

  // Laat de data zien in de terminal
  console.log(apiResponseJSON)

  // Pak alleen de array met nieuwsitems uit de JSON
  const news = apiResponseJSON.data

  // Render index.liquid en geef news mee
  response.render('index.liquid', { news: news })
})


// ROUTE: GENOMINEERDE STUDENTEN PAGINA
// Deze route toont een overzicht van alle genomineerde studenten
app.get('/genomineerden', async function (request, response) {

  // Haal de genomineerden op uit de database
  const apiResponse = await fetch('https://fdnd-agency.directus.app/items/adconnect_nominations')

  // Zet de opgehaalde data om naar JSON
  const apiResponseJSON = await apiResponse.json()

  // Pak alleen de array met genomineerden uit de JSON
  const nominees = apiResponseJSON.data

  // Render de pagina en geef nominees mee
  response.render('genomineerden.liquid', { nominees: nominees })
})


// ROUTE: DETAILPAGINA VAN EEN GENOMINEERDE
// Deze route toont meer informatie over één specifieke genomineerde
app.get('/genomineerden/:id', async function (request, response) {

  // Haal het id op uit de URL
  const id = request.params.id

  // Haal opnieuw alle genomineerden op uit de database
  const apiResponse = await fetch('https://fdnd-agency.directus.app/items/adconnect_nominations')

  // Zet de opgehaalde data om naar JSON
  const apiResponseJSON = await apiResponse.json()

  // Pak de array met genomineerden
  const nominees = apiResponseJSON.data

  // Zoek de juiste genomineerde op basis van het id
  const nominee = nominees.find(function (item) {
    return item.id == id
  })

  // Render de detailpagina en geef de genomineerde mee
  response.render('genomineerde-detail.liquid', { nominee: nominee })
})


// Maak een POST route voor de homepagina
app.post('/', async function (request, response) {

  // Stuur de gebruiker terug naar de homepagina
  response.redirect(303, '/')
})


// Stel het poortnummer in
app.set('port', process.env.PORT || 8000)


// Start de server
app.listen(app.get('port'), function () {

  // Laat in de terminal zien dat de server werkt
  console.log(`Application started on http://localhost:${app.get('port')}`)
})


// 404 pagina
// Als een route niet bestaat, laat dan 404.liquid zien
app.use((req, res) => {
  res.status(404).render('404.liquid')
})