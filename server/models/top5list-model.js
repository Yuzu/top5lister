const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Top5ListSchema = new Schema(
    {
        name: { type: String, required: true },
        items: { type: [String], required: true },
        ownerEmail: {type: String, required: true},
        ownerUsername: {type:String, required: true},
        comments: {
            type: [{
                author: String,
                content: String
                }], 
            required: true},
        views: {type: Number, required: true},
        upvotes: {type: [String], required:true}, // votes are kept track of by a list of usernames.
        downvotes: {type: [String], required:true},
        publishDate: {type: Date} // If there is no publishDate, it isn't published yet. Simple as that.
    },
    { timestamps: true },
)

module.exports = mongoose.model('Top5List', Top5ListSchema)
