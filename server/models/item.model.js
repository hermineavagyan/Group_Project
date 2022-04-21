const mongoose = require('mongoose')


const ItemSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, 'A item name is required']
    },

    price: {
        type: Number,
        required: [true, 'You must provide the price of the item']
    },

    paymentType: {
        type: String,
        enum: [
            'One time',
            'Subscription'
        ]
    },

    description: {
        type: String,
        required: [true, 'Please provide a description of the item'],
        maxlength: [280, 'Cannot exceed 280 characters']
    },

    image: {
        type: String,
        required: [true, 'A picture must be provided']
    }


}, {timestamps:true})

const Item = mongoose.model('Item', ItemSchema)

module.exports = Item