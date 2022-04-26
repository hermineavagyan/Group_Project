const Cart = require("../models/cart.model")
const User = require("../models/user.model")
const jwt = require('jsonwebtoken');

module.exports = {

    productCreate: (req, res) => {

        const newProductObject = new Cart(req.body);
        const decodedJWT = jwt.decode(req.cookies. usertoken,{
            complete: true
        })
        newProductObject.user = decodedJWT.payload.id
        newProductObject
            .save()
            .then((newProduct) => {
            res.json(newProduct);
        })
        .catch((err) => {
            console.log('Something went wrong in productCreate');
            res.status(400).json(err);
        });
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

    findAllCartItemsByUser: (req, res)=>{
        if(req.jwtpayload.id !== req.params.id){
            console.log("Not the user")
    
            User.findOne({id: req.params.id})
            .then((userNotLoggedIn)=>{
                Cart.find({user: userNotLoggedIn._id})
                    .populate("user", "id")
                    .then((allItemsFromUser)=>{
                    console.log(allItemsFromUser)
                    res.json(allItemsFromUser)
                    })
            })
            .catch((err)=>{
                console.log(err)
                res.status(400).json(err)
            })
        } else {
            console.log("current user")
            console.log("req.jwtpayload.id:", req.jwtpayload.id)
            Cart.find({user: req.jwtpayload.id})
            .populate("user", "id")
            .then((allItemsFromLoggedInUser)=>{
                console.log(allItemsFromLoggedInUser)
                res.json(allItemsFromLoggedInUser)
            })
            .catch((err)=>{
                console.log(err)
                res.status(400).json(err)
            })
        }
    },
}