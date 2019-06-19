const express = require('express');
const app = express();
const path = require('path');
const axios = require('axios')

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.json());
// app.use(express.static(path.join(__dirname, '../public/views')));
app.use(express.static('public'))

const port = 3000;

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.get('/manga', (req, res, next) => {
  // const ghibli = axios.get("https://ghibliapi.herokuapp.com/films");
  const manga = axios.get('https://api.jikan.moe/v3/genre/manga/1/');

  // ghibli
  manga
    .then((response) => {
      return response
    })
    .then((data) => {
      res.render('index', {
        data: data.data.manga
      })
    })
})

app.get('/manga/:id', (req, res) => {
  const { id } = req.params
  const singleManga = axios.get(`https://api.jikan.moe/v3/manga/${id}`)
  singleManga
    .then((response) => {
      return response
    })
    .then((data) => {
      res.render('show', {
        data: data.data
      })
    })
})

app.post('/search', (req, res) => {
  const userSearchTerm = encodeURI(req.body.mangaSearch)
  console.log(req.body.mangaSearch)
  console.log(userSearchTerm)
  const searchManga = axios.get(`https://api.jikan.moe/v3/search/manga?q=${userSearchTerm}&page=1`)
  searchManga
    .then((response) => {
      return response
    })
    .then((data) => {
      res.render('search', {
        data: data.data.results
      })
    })
})

app.get('/manga/genres/:id', (req, res) => {
  const { id } = req.params
  const singleManga = axios.get(`https://api.jikan.moe/v3/genre/manga/${id}`)
  singleManga
    .then((response) => {
      return response
    })
    .then((data) => {
      res.render('index', {
        data: data.data.manga
      })
    })
})

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
})