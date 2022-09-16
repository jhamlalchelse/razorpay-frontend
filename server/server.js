const app = require("./app")
const connectDB = require("./config/database")



connectDB()

app.listen((process.env.PORT),()=>{
    console.log(`Server is running on port http://localhost:${process.env.PORT}`)
})



