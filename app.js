const express = require('express')
const app = express()
const port = 3000

const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index', {restaurant: restaurantList.results})
})
app.get('/restaurants/:id', (req, res) => {
  const restaurant = restaurantList.results.find(restaurant => restaurant.id === Number(req.params.id))
  res.render('show', {restaurant: restaurant})
})
app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const restaurant = restaurantList.results.filter(restaurant => {
    return restaurant.name.toLowerCase().includes(keyword.toLowerCase())  
  })

  res.render('index', { restaurant: restaurant, keyword: keyword })
})
app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})