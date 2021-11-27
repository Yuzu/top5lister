const CommunityList = require('../models/communitylist-model');

incrementView = async (req, res) => {
    console.log("Incrementing community list view count");
    CommunityList.findOne({ _id: req.params.id }, (err, communityList) => {
        console.log("community List found: " + JSON.stringify(communityList));
        if (err) {
            return res.status(404).json({
                err,
                message: 'Community List not found!',
            })
        }

        communityList.views += 1;
        communityList
            .save()
            .then(() => {
                console.log("SUCCESS!!!");
                return res.status(200).json({
                    success: true,
                    id: communityList._id,
                    message: 'Community List updated!',
                })
            })
            .catch(error => {
                console.log("FAILURE: " + JSON.stringify(error));
                return res.status(404).json({
                    error,
                    message: 'Community List not updated!',
                })
            })
    })
}

updateList = async (req, res) => {
    // This will only be called upon the updating or deleting of a list, of which will be indicated in the payload.
    // We will expect the list items as well as the point values such that we know what to increment/decrement.
    // No need to re-load the community lists after this update since there's no way the user can be on the community lists menu
    // while publishing/deleting a list (they must be on home for that).
    // also need the date to update.
    const body = req.body
    console.log("update community list: " + JSON.stringify(body));
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    CommunityList.findOne({ _id: req.params.id }, (err, communityList) => {
        console.log("communityList found: " + JSON.stringify(communityList));
        if (err) {
            return res.status(404).json({
                err,
                message: 'Community List not found!',
            })
        }

        communityList.name = body.name;
        communityList.items = body.items;
        communityList.comments = body.comments;
 
        communityList.pooledListNum = body.pooledListNum;
        communityList.upvotes = body.upvotes;
        communityList.downvotes = body.downvotes;
        

        communityList
            .save()
            .then(() => {
                console.log("SUCCESS!!!");
                return res.status(200).json({
                    success: true,
                    communityList: communityList,
                    message: 'Community List updated!',
                })
            })
            .catch(error => {
                console.log("FAILURE: " + JSON.stringify(error));
                return res.status(404).json({
                    error,
                    message: 'Community List not updated!',
                })
            })
    })
}

getCommunityLists = async (req, res) => {
    // Return lists similar to the top5list way but with more info.
    await CommunityList.find({}, (err, lists) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!lists) {
            return res
                .status(404)
                .json({ success: false, error: `Community Lists not found` })
        }
        return res.status(200).json({ success: true, data: lists })
    }).catch(err => console.log(err))
}

createList = async (req, res) => {
    // create community list out of 1 list.
    const body = req.body;
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a Top 5 List',
        })
    }

    const newList = new CommunityList(body);
    console.log("creating community list: " + JSON.stringify(newList));
    if (!newList) {
        return res.status(400).json({ success: false, error: err })
    }

    newList
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                communityList: newList,
                message: 'Community List Created!'
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Community List Not Created!'
            })
        })
}

module.exports = {
    incrementView,
    updateList,
    getCommunityLists,
    createList
}