const mongoose = require('mongoose')

const ProductsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, `Please provide a name`]
  },
  price: {
    type: Number,
    required: [true, `Please provide the price`]

  },
  image: {
    type: String,
    required: [true, `Please provide an image`]

  },
})

module.exports = mongoose.model('Products', ProductsSchema)