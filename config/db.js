import mongoose from 'mongoose'
import colors from 'colors'


const connectDB = async() =>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log(`Connected to MongoDB ${conn.connection.host}`.bgMagenta.white)
    }catch(e){
        console.log(`Error occured on ${e}`.bgRed.white)
    }
}
 

export default connectDB