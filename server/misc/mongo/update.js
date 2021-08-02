const mongoDb = require('mongodb');
const uri = "mongodb+srv://kostjaog:qwertyt123e5@cluster0.dp8zu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

module.exports = {update: async function(u_id, data){
    const client = new mongoDb.MongoClient(uri);
    
    try {
        await client.connect();
        const users = client.db('boxOfficeUsers').collection('users');
        const filter = {_id: new mongoDb.ObjectId(u_id)};

        let newFilm = {};
        const dataObj = JSON.parse(data);
        newFilm[dataObj.show.name] = dataObj; 
        
        const updateDoc = {
            $push: {
                'starred' : newFilm            }
        }
        const result = await users.updateOne(filter, updateDoc);
        console.log('Document updated')
    }finally {
        await client.close();
        console.log('Client closed');
    }
}
}