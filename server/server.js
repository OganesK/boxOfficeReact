const express = require("express");
const mongoDb = require('mongodb');
const cors = require("cors");
const insert = require("./misc/mongo/insert");
const find = require("./misc/mongo/find");
const update = require("./misc/mongo/update");
const deleteFilm = require("./misc/mongo/delete")

const uri = "mongodb+srv://kostjaog:qwertyt123e5@cluster0.dp8zu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new mongoDb.MongoClient(uri);

async function connectClient(client) {
    client.connect();
}

connectClient(client).then(() => {
    const corsOptions = {
        origin: '*',
    }
    
    const app = express();
    
    app.use(cors(corsOptions));
    
    const PORT = process.env.PORT || 3001;
    
    app.use(express.urlencoded({extended: true})); 
    app.use(express.json());
    
    app.get("/api", (req, res) => {
        if(req.query.id === 'null'){
            insert.insert({starred:[]}, client)
            .then(id => res.status(200).send(JSON.stringify(id)));
        }else if(req.query.method === 'newFilm'){
            update.update(req.query.id, req.query.data, client)
            .then(answer => res.status(200).send(JSON.stringify(answer)));
        }else if(req.query.method === 'listFilms') {
            find.find(req.query.id, client)
            .then(answ => res.status(200).send(JSON.stringify(answ)));
        } else if(req.query.method === 'deleteFilm') {
            deleteFilm.delete(req.query.id, req.query.filmId, client)
            .then(answ => res.status(200).send(JSON.stringify(answ)))
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
})

