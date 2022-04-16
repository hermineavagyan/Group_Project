const Item = require('../models/item.model')



    module.exports.findAllItems =  async (req, res, next) => {
        try {
        const allItems = await Item.find()
            console.log(allItems)
            res.json(allItems)
        }catch(err){
            next(err)
        }
    }

    module.exports.createNewItem = async (req, res ,next) => {
        try {
            const newItem = await Item.create(req.body)
            console.log(newItem)
            res.json(newItem)
        }catch(err){
            next(err)
        }
    }




