const CartController = require("../controllers/cart.controller")
const {authenticate} = require("../config/jwt.config")

module.exports = (app)=>{
    app.post("/api/addtocart", CartController.productCreate)
    app.get('/api/allcartitems', CartController.findCart)
    app.get('/api/itemsbyuser/:id', authenticate, CartController.findAllCartItemsByUser)
}