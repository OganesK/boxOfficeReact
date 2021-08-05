const {MongoClient} = require('mongodb');


module.exports = { insert: async function(data, client) {

        const db = client.db("boxOfficeUsers");
        const users = db.collection("users");

        const result = await users.insertOne(data);

        console.log(`MongoDB: ${result.insertedId} document was inserted`);
        return result.insertedId;

}
}