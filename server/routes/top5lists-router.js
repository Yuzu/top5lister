const auth = require('../auth')
const express = require('express')
const Top5ListController = require('../controllers/top5list-controller')
const UserController = require('../controllers/user-controller')
const CommunityListController = require("../controllers/communitylist-controller")
const router = express.Router()

router.post('/top5list', auth.verify, Top5ListController.createTop5List)
router.put('/top5list/:id', auth.verify, Top5ListController.updateTop5List)
router.delete('/top5list/:id', auth.verify, Top5ListController.deleteTop5List)
router.get('/top5list/:id', auth.verify, Top5ListController.getTop5ListById)
router.get('/top5lists', auth.verify, Top5ListController.getTop5Lists)
router.get('/top5listpairs', auth.verify, Top5ListController.getTop5ListPairs)

router.put("/top5list/interact/normal/:id", auth.verify, Top5ListController.interactWithList)
router.put("/top5list/increment/normal/:id", Top5ListController.incrementView)

route.get("/communitylistpairs/", CommunityListController.getCommunityListPairs)
router.put("/top5list/interact/community/:id", auth.verify, CommunityListController.interactWithList)
router.put("/top5list/increment/community/:id", CommunityListController.incrementView)
router.put("/top5list/community/:id", auth.verify, CommunityListController.updateList)

router.post('/register', UserController.registerUser)
router.get('/loggedIn', UserController.getLoggedIn)
router.post("/login", UserController.loginUser)
router.get("/logout", UserController.logoutUser)
module.exports = router