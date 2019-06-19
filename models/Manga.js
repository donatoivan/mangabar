const mongoose = require('mongoose')

const mangaSchema = new mongoose.Schema({
    title: String,
    synopsis: String,
    image_url: String,
    volumes: Number,
    genres: Array
  },
  { collection: 'mangacart' }
)
// you normally don't need to pass the name of the collection;
// the reason here is because otherwise it'll create a collection called pokemons
// we do not have a pokemons collection. So we specify the name of our collection here.

module.exports = mongoose.model('mangacart', mangaSchema)