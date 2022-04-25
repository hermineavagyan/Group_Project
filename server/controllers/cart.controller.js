const Cart = require("../models/cart.model")

module.exports = {
    
    productCreate: async (req, res) => {
        try {
            const cart = new Cart(req.body)
           const newCart = await cart.save()
            res.json(cart)
        } catch (error) {
            console.log("Something went wrong in productCreate")
            res.status(400).json({message: "Something went wrong in productCreate", error: error})
        }
    },

    findCart: async (req, res) => {
        try{
            const allCartProducts = await Cart.find()
            res.json(allCartProducts);
                }
            catch(err){
                console.log("Find All Cart Products failed");
                res.json({ message: "Something went wrong in findAllCartProducts", error: err })
            }
    },
}