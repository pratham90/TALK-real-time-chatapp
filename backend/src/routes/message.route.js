import express from 'express'
import {protectRoute} from '../middlewares/auth.middleware.js'
import {getUsersForSidebar,getMessages,sendMessage} from '../controllers/message.controller.js'

const route = express.Router()

route.get("/user",protectRoute,getUsersForSidebar)

route.get("/messages/:userId",protectRoute,getMessages)
route.post("/send/:userId",protectRoute,sendMessage)

export default route;
