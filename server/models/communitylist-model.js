const mongoose = require('mongoose')
const Schema = mongoose.Schema


const CommunityListSchema = new Schema(
    {
        name: { type: String, required: true },
        // NOTE - this can store more than 5 items! the server-side will just filter out the top 5 to return.
        items: { 
            type: [{
                name: String,
                votes: Number
            }], required: true
            },
        ownerEmail: {type: String, required: true},
        comments: {
            type: [{
                author: String,
                content: String
                }], 
            required: true},
        views: {type: Number},
        pooledListNum: {type: Number},
        upvotes: {type: [String]}, // votes are kept track of by a list of usernames.
        downvotes: {type: [String]},
        // mongodb gives us updatedAt, we can just use that.
    },
    { timestamps: true },
)

module.exports = mongoose.model('CommunityList', CommunityListSchema)