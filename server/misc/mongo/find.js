const mongoDb = require('mongodb');
const uri = "mongodb+srv://kostjaog:qwertyt123e5@cluster0.dp8zu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
module.exports = {find: async function(u_id){
    const client = new mongoDb.MongoClient(uri);
    try {
        await client.connect();
        const db = client.db('boxOfficeUsers');
        const users = db.collection('users');
        const filter = {_id: new mongoDb.ObjectId(u_id)};

        const user = await users.findOne(filter);

        return user;
    } finally {
        await client.close();
        console.log('Client closed');
    }
}}