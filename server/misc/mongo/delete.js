const mongoDb = require('mongodb');
module.exports = {delete: async function(u_id, filmId,client) {

        const db = client.db('boxOfficeUsers');
        const users = db.collection('users');
        const filter = {_id: new mongoDb.ObjectId(u_id)};

        const user = await users.findOne(filter)
        
        const starred = user.starred
        const newStarred = user.starred.filter(item => item.film.id != Number(filmId));
        const updateDoc = {
            $set: {
                'starred' : newStarred}
            }

        const res = await users.updateOne(filter, updateDoc);
        return 'Film deleted'

}
}