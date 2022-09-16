const mongoose = require('mongoose')

const connectDB = () => {
mongoose.connect(process.env.DB_URL).then((res)=>{
    console.log(`mongodb is connected`)
}).catch((e)=>{
    console.log('mongodb error')
})
}

module.exports = connectDB