//ES6 module syntax
import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import connectDB from './config/db.js'
import authRoute from './routes/authRoute.js'
import CategoryRoutes from './routes/CategoryRoutes.js'
import productRoute from './routes/productRoute.js'
import cors from 'cors'

//rest object
const app = express()

//configure env
dotenv.config();

//configure DB
connectDB()

//middleware
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())

//routes
app.use('/api/v1/auth',authRoute)
app.use('/api/v1/category',CategoryRoutes)
app.use('/api/v1/product',productRoute)

//rest api
app.get('/',(req,res)=>{
    res.send({
        message : 'Welcome to Ecommerce app'
    })
})

const PORT = process.env.PORT || 8080

//run listen
app.listen(PORT,()=>{
    console.log(`Server Running on ${process.env.DEV_MODE} mode on ${PORT}`.bgCyan.white);
})
