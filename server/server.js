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
    if(req.query.id === '8083'){
        res.send(JSON.stringify({
            name:'Bill'
        }));
    }else{
        res.send(JSON.stringify({
            name:'Bill'
        }));
    }
    
});

app.post('/api', (req, res) => {
    const body = req.body;
    if(body.id === 8083){
        res.send({answer:"Id is 8083"}.json())
    }else{
        res.send({answer:"Id is not 8083"}.json())
    }
});

app.listen(PORT, () => console.log("Server is up"));