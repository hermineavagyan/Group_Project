const mongoose = require('mongoose')

const CartSchema = new mongoose.Schema({
    productName: {
        type: String,
    },

    productImage: {
        type: String,
    },

    productPrice: {
        type: String,
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    stripeCustomerId: {
        type: String
    }
})

const Cart = mongoose.model('Cart', CartSchema)

module.exports = Cart