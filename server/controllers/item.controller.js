const Item = require('../models/item.model')



    module.exports.findAllItems =  async (req, res) => {
        try {
        const allItems = await Item.find()
            console.log(allItems)
            res.json(allItems)
        } catch(err) {
            console.log("findAllItems has failed!")
            res.json({msg: "Somthing whent wrong in findAll", error: err})
        }
    }

    module.exports.createNewItem = async (req, res) => {
        try {
            const newItem = await Item.create(req.body)
            console.log(newItem)
            res.json(newItem)
        } catch(err) {
            console.log("Something went wrong in createNewItem")
            res.status(400).json(err)
        }
    }

    module.exports.findOneItem = async (req, res) => {
        try {
            const oneItem = await Item.findOne({_id: req.params.id})
            console.log(oneItem)
            res.json(oneItem)
        } catch(err) {
            console.log("findOneItem has failed!")
            res.json({msg: "Something went wrong in fineOneMovie", error: err})
        }
    }

    module.exports.deleteOneItem = async (req, res) => {
        try {
            const deleteOne = await Item.deleteOne ({_id: req.params.id})
            console.log(deleteOne)
            res.json(deleteOne)
        } catch(err) {
            console.log("deleteOneItem has failed!")
            res.json({msg: "Something went wrong in deleteOneMovie", error: err})
        }
    }

    module.exports.updateItem = async (req, res) => {
        try {
            const updatedItem = await Item.findOneAndUpdate({_id: req.params.id},
                req.body,
                {new: true, runValidators: true}
                )
                console.log(updatedItem)
                res.json(updatedItem)
        } catch(err) {
            console.log("Something went wrong in updateItem")
            res.status(400).json(err)
        }
    }


