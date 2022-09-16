const express = require('express')
const app = express()
const cors = require('cors')
const {config} = require('dotenv')
const paymentRoute = require('./routes/paymentRoute')

config({path:"./config/config.env"})

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', paymentRoute)


app.use('/api/getkey',(req,res)=>{
    res.status(200).json({
        key:'rzp_test_eMCYSYf4h5ZLoW'
    })
})

module.exports = app


