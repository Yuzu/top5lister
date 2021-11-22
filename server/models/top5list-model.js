const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Top5ListSchema = new Schema(
    {
        name: { type: String, required: true },
        items: { type: [String], required: true },
        ownerEmail: {type: String, required: true},
        comments: {
            type: [{
                author: String,
                content: String
                }], 
            required: true},
        views: {type: Number}, // TODO - add route for incrementing views
        upvotes: {type: Number},
        downvotes: {type: Number},
    },
    { timestamps: true },
)

module.exports = mongoose.model('Top5List', Top5ListSchema)
