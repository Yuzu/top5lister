const CommunityList = require('../models/communitylist-model');

interactWithList = async (req, res) => {
    // We need the list, the comment/vote, the user info, and a timestamp.
    // We will check whether the list is valid + published, and whether the user has already voted or not. If they have voted,
    // we need to undo their previous vote to add the new one.
    return null;
}

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

getCommunityListPairs = async (req, res) => {
    // Return lists similar to the top5list way but with more info.
}

module.exports = {
    interactWithList,
    incrementView,
    updateList
}