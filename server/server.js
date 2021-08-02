const express = require("express");
const cors = require("cors");
const insert = require("./misc/mongo/insert");
const find = require("./misc/mongo/find");
const update = require("./misc/mongo/update");


const corsOptions = {
    origin: '*',
}

const app = express();

app.use(cors(corsOptions));

const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({extended: true})); 
app.use(express.json());

app.get("/api", (req, res) => {
    console.log(req.query.data)
    if(req.query.id === 'null'){
        insert.insert({starred:{}})
        .then(id => res.status(200).send(JSON.stringify(id)))
    }else if(req.query.method === 'newFilm'){
        update.update(req.query.id, req.query.data)
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

app.listen(PORT, () => console.log(`Server is listening on: ${PORT}`));