const mongoDb = require('mongodb');
module.exports = {find: async function(u_id,client){

        const db = client.db('boxOfficeUsers');
        const users = db.collection('users');
        const filter = {_id: new mongoDb.ObjectId(u_id)};

        const user = await users.findOne(filter);

        return user;
}}