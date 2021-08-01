const mongoDb = require('mongodb');
const uri = "mongodb+srv://kostjaog:qwertyt123e5@cluster0.dp8zu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

module.exports = {update: async function(u_id, data){
    const client = new mongoDb.MongoClient(uri);
    
    try {
        await client.connect();
        const users = client.db('boxOfficeUsers').collection('users');
        const filter = {_id: new mongoDb.ObjectId(u_id)};

        const updateDoc = {
            $set: {
                `starred.${data.show.name}`: data.show            }
        }
    }
}}