const express = require('express');
const app = express();
const path = require('path');
const axios = require('axios');
const mongoose = require('mongoose');

const Manga = require('./models/manga')

app.use(express.json());
app.use(express.urlencoded({extended:false}));


app.use(express.json());
app.use(express.static('public'));
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


const mongoURI = 'mongodb://localhost/mangabar'

// connecting to mongodb from your application
mongoose.connect(mongoURI, { useNewUrlParser: true }, (err) => {
   if(err) return console.log(`${err}`)
   console.log("connected to mongodb")
 })

app.get('/manga', (req, res, next) => {
  // const ghibli = axios.get("https://ghibliapi.herokuapp.com/films");
  
    let myLib = []
   

  const manga = axios.get('https://api.jikan.moe/v3/genre/manga/1/');
  // ghibli
  manga
  .then((response) => {
    return response
  })
  .then((data) => {
    Manga.find({})
    .then( allManga => {
      res.render('index', {
        data: data.data.manga,
        lib: allManga
      })
    })
    .catch( err => res.json(err))
    
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
        data: data.data,
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


app.post('/manga/:id', (req, res) => {
  const { id } = req.params
  console.log(id)
  detailsOfObject = []
  const singleManga = axios.get(`https://api.jikan.moe/v3/manga/${id}`)
  singleManga
    .then((response) => {
      // console.log(response)
      return response
    })
    .then((data) => {
      // detailsOfObject.push(data)
      // console.log(data)
      // console.log(detailsOfObject)
      const { title, synopsis, image_url, volumes, genres } = data.data

      Manga.create({ title, synopsis, image_url, volumes, genres })
      .then( newManga => {
        // res.json(newPoke)
        console.log('Manga created')
        console.log(newManga)
        res.redirect('/manga')
      })
      .catch( err => res.json(err))
    })
     
})




app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
})