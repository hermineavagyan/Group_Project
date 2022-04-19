const ItemController = require('../controllers/item.controller')

module.exports = (app) => {

    app.get('/api/items', ItemController.findAllItems)
    app.post('/api/items', ItemController.createNewItem)
    app.get('/api/items/:id', ItemController.findOneItem)
    app.delete('/api/items/:id', ItemController.deleteOneItem)
    app.put('/api/items/:id', ItemController.updateItem)
    
}