const CommunityList = require('../models/communitylist-model');



incrementView = async (req, res) => {
    return null;
}

updateList = async (req, res) => {
    // This will only be called upon the updating or deleting of a list, of which will be indicated in the payload.
    // We will expect the list items as well as the point values such that we know what to increment/decrement.
    // No need to re-load the community lists after this update since there's no way the user can be on the community lists menu
    // while publishing/deleting a list (they must be on home for that).
    // also need the date to update.
    return null;
}

getCommunityLists = async (req, res) => {
    // Return lists similar to the top5list way but with more info.
}

module.exports = {
    incrementView,
    updateList,
    getCommunityLists
}