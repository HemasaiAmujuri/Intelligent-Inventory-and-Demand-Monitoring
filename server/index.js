const express = require("express")
const  router = express.Router
const app = express()
const PORT = process.env.port || 5000
const routes = require("./router/router");
const cors = require("cors")

app.use(cors())


app.use(express.json())


app.use("/", routes);


app.listen(PORT, () => {
    try{
    console.log(`server running in this ${PORT}`);
    }catch(err){
        console.log(err.message)
    }
})