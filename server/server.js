const express = require("express");
const cors = require("cors");

const corsOptions = {
    origin: '*',
}

const app = express();

app.use(cors(corsOptions));

const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({extended: true})); 
app.use(express.json());

app.get("/home", (req, res) => {
    res.json({
        name:"Bill",
        age: 25
    });
});

app.post('/api', (req, res) => {
    const body = req.body;
    if(body.id === 8083){
        res.send('Id is 8083')
    }else{
        res.send('Id isnt 8083')
    }
});

app.listen(PORT, () => console.log("Server is up"));