const express = require("express")
const app = express()
const PORT = process.env.PORT || 5000
const routes = require("./src/router/router");
const cors = require("cors")
const cookieParser = require("cookie-parser")
const configDB = require("./src/config/db")

app.use(cors({
    origin : "http://localhost:5173",
    credentials : true
}));
app.use(cookieParser());

configDB();


app.use(express.json())


app.use("/api", routes);


app.listen(PORT, () => {
    try{
    console.log(`server running in this ${PORT}`);
    }catch(err){
        console.log(err.message)
    }
})