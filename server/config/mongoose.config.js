const mongoose = require('mongoose')


const connectDB = async () => {
    try{
        await mongoose.connect(`mongodb://localhost/${process.env.DB_NAME}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log(`Connected to: ${process.env.DB_NAME}`)
    } catch(err) {
        console.log(`Error trying to connect to ${process.env.DB_NAME}`, err)
    }
    
}

connectDB()
