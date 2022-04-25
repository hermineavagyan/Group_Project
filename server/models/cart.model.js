const mongoose = require('mongoose')


const CartSchema = new mongoose.Schema({
    cartList: [

        {
            productName: {
                type: String,
            },
        
        
            productImage: {
                type: String,
            },
        
        
            productPrice: {
                type: String,
            }
        }   
            
        ],

        // user: [
        //     {
        //         type: mongoose.Schema.Types.ObjectId,
        //         ref: 'User'
        //     }
        // ],

        user: {
            type: String
        }

})


const Cart = mongoose.model('Cart', CartSchema)

module.exports = Cart