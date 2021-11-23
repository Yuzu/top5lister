const mongoose = require('mongoose')
const Schema = mongoose.Schema


const CommunityListSchema = new Schema(
    {
        name: { type: String, required: true },
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
        lastUpdated: {type: Date}
    },
    { timestamps: true },
)

module.exports = mongoose.model('CommunityList', CommunityListSchema)