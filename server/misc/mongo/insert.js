const {MongoClient} = require('mongodb');
const uri = "mongodb+srv://kostjaog:qwertyt123e5@cluster0.dp8zu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";


module.exports = { insert: async function(data) {
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const db = client.db("boxOfficeUsers");
        const users = db.collection("users");

        const result = await users.insertOne(data);

        console.log(`MongoDB: ${result.insertedId} document was inserted`);
        return result.insertedId;
    } finally {
        await client.close();
        console.log("Client closed");
    }
}
}