const ItemController = require('../controllers/item.controller')

module.exports = (app) => {

    app.get('/api/items', ItemController.findAllItems)
    app.post('/api/items', ItemController.createNewItem)
}