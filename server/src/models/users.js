const database = require('@models/database.js');

const requests = {
    async getAll() {
        const dbo = await database.getDbo();
        return await dbo.collection('requests').find().toArray();
    },

    async getById(id) {
        const dbo = await database.getDbo();
        return await dbo.collection('requests').findOne({ _id: new ObjectId(id) });
    },

    async upvote(id) {
        const dbo = await database.getDbo();
        await dbo.collection('requests').updateOne({ _id: new ObjectId(id) }, { $inc: { likes: 1 } });
    },

    async downvote(id) {
        const dbo = await database.getDbo();
        await dbo.collection('requests').updateOne({ _id: new ObjectId(id) }, { $inc: { likes: -1 } });
    },

    async create(request) {
        const dbo = await database.getDbo();
        delete request._id; // Ensure _id is not provided
        return (await dbo.collection('requests').insertOne(request)).ops[0];
    },

    async update(request) {
        const dbo = await database.getDbo();
        const { _id, ...updatedFields } = request;
        const { contentTitle, ...restFields } = updatedFields;
        return await dbo.collection('requests').findOneAndUpdate(
            { _id: new ObjectId(_id) },
            { $set: { contentTitle, ...restFields } },
            { returnNewDocument: true }
        );
    },

    async delete(id) {
        const dbo = await database.getDbo();
        await dbo.collection('requests').deleteOne({ _id: new ObjectId(id) });
    }
};

const comments = {
    async getAllForRequest(requestId) {
        const dbo = await database.getDbo();
        return await dbo.collection('comments').find({ requestId: new ObjectId(requestId) }).toArray();
    },

    async createForRequest(requestId, comment) {
        const dbo = await database.getDbo();
        return (await dbo.collection('comments').insertOne({ requestId: new ObjectId(requestId), ...comment })).ops[0];
    },

    async update(commentId, updatedFields) {
        const dbo = await database.getDbo();
        return await dbo.collection('comments').findOneAndUpdate(
            { _id: new ObjectId(commentId) },
            { $set: updatedFields },
            { returnNewDocument: true }
        );
    },

    async delete(commentId) {
        const dbo = await database.getDbo();
        await dbo.collection('comments').deleteOne({ _id: new ObjectId(commentId) });
    }
};

module.exports = { requests, comments };
