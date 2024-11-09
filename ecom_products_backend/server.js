import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import productRoute from "./routes/products_route.js"

const app = express()
const PORT = process.env.PORT || 3000

dotenv.config({ path: './.env' })

mongoose.connect(process.env.CONN_STR)

const db = mongoose.connection

db.on('error', () => console.log(error))
db.once('open', () => console.log('Started database connection'))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/', productRoute)

app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`)
})