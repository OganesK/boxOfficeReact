const {MongoClient} = require('mongodb');
const uri = "mongodb+srv://kostjaog:qwertyt123e5@cluster0.dp8zu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

async function find(data) {
    try {
        await ClientRect.connect();
        const db = ClientRect.db('boxOfficeUsers');
        const users = db.collection('users');

        const user = await users.findOne(data);

        return user;
        console.log(user);
    } finally {
        await client.close();
        console.log('Client closed');
    }
}