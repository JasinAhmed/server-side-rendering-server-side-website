// Importeer het npm package Express (uit de door npm aangemaakte node_modules map)
// Deze package is geïnstalleerd via `npm install`, en staat als 'dependency' in package.json
import express from 'express'

// Importeer de Liquid package (ook als dependency via npm geïnstalleerd)
import { Liquid } from 'liquidjs';


console.log('')
// Doe een fetch naar de data die je nodig hebt
const apiResponse = await fetch('https://fdnd-agency.directus.app/items/adconnect_news')

// Lees van de response van die fetch het JSON object in, waar we iets mee kunnen doen
const apiResponseJSON = await apiResponse.json()

// Controleer eventueel de data in je console
// (Let op: dit is _niet_ de console van je browser, maar van NodeJS, in je terminal)
console.log(apiResponseJSON)


// Maak een nieuwe Express applicatie aan, waarin we de server configureren
const app = express()

// Maak werken met data uit formulieren iets prettiger
app.use(express.urlencoded({extended: true}))

// Gebruik de map 'public' voor statische bestanden (resources zoals CSS, JavaScript, afbeeldingen en fonts)
// Bestanden in deze map kunnen dus door de browser gebruikt worden
app.use(express.static('public'))

// Stel Liquid in als 'view engine'
const engine = new Liquid();
app.engine('liquid', engine.express()); 

// Stel de map met Liquid templates in
// Let op: de browser kan deze bestanden niet rechtstreeks laden (zoals voorheen met HTML bestanden)
app.set('views', './views')

// Maak een GET route voor de index (meestal doe je dit in de root, als /)
app.get('/', async function (request, response) {
   // Render index.liquid uit de Views map
   // Geef hier eventueel data aan mee
   
   const news = [
     {
       title: "Landelijke Ad-dag",
       summary: "dit is dummy content"
     },
     {
       title: "Workshops & netwerken",
       summary: "dit is dummy content"
     },
     {
       title: "Ad Talent Award",
       summary: "dit is dummy content."
     }
   ]

   response.render('index.liquid', { news: news })
})


// ROUTE: GENOMINEERDE STUDENTEN PAGINA
// Deze route toont een pagina met genomineerde studenten
// De data hieronder is dummy data (tijdelijke testdata)

app.get('/genomineerden', async function (request, response) {

  // Maak een array met genomineerde studenten
  // Elke student heeft een naam, school en afbeelding
  const nominees = [
    {
      name: "Thijs Kiens",
      school: "Avans Academie Associate degrees",
    },
    {
      name: "Vera Driessen",
      school: "Fontys",
    },
    {
      name: "Josien te Winkel",
      school: "Grenslandcollege",
    },
    {
      name: "Rick Snijder",
      school: "Hanze",
    },
  
  ]

  // Render de Liquid view 'genomineerden.liquid'
  // en geef de dummy data (nominees) mee aan de template
  response.render('genomineerden.liquid', { nominees: nominees })
})

// Maak een POST route voor de index; hiermee kun je bijvoorbeeld formulieren afvangen
// Hier doen we nu nog niets mee, maar je kunt er mee spelen als je wilt
app.post('/', async function (request, response) {
  // Je zou hier data kunnen opslaan, of veranderen, of wat je maar wilt
  // Er is nog geen afhandeling van een POST, dus stuur de bezoeker terug naar /
  response.redirect(303, '/')
})

// Stel het poortnummer in waar Express op moet gaan luisteren
// Lokaal is dit poort 8000, als dit ergens gehost wordt, is het waarschijnlijk poort 80
app.set('port', process.env.PORT || 8000)

// Start Express op, haal daarbij het zojuist ingestelde poortnummer op
app.listen(app.get('port'), function () {
  // Toon een bericht in de console en geef het poortnummer door
  console.log(`Application started on http://localhost:${app.get('port')}`)
})

// title: "Landelijke Ad-dag",
//        summary: "Dit schooljaar vindt de landelijke Ad-dag plaats op vrijdag 17 april 2026!"
//      },
//      {
//        title: "Workshops & netwerken",
//        summary: "Ontmoet studenten, docenten en werkveldpartners tijdens inspirerende sessies."
//      },
//      {
//        title: "Ad Talent Award",
//        summary: "Jaarlijks worden twee Associate degree-talenten in het zonnetje gezet."