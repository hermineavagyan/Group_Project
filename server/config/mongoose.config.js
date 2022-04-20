const mongoose = require('mongoose')


const connectDB = async () => {
    try{
        //mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.DB_NAME}`,{
        await mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.DB_NAME}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log(`Connected to: ${process.env.DB_NAME}`)
    } catch(err) {
        console.log(`Error trying to connect to ${process.env.DB_NAME}`, err)
    }
    
}

connectDB()
