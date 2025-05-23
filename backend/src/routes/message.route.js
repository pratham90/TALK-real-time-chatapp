import express from 'express'
import {protectRoute} from '../middlewares/auth.middleware.js'
import {getUsersForSidebar,getMessages,sendMessage} from '../controllers/message.controller.js'

const route = express.Router()

route.get("/user",protectRoute,getUsersForSidebar)

route.get("/getmessage/:receiverId",protectRoute,getMessages)
route.post("/sendmessage/:receiverId",protectRoute,sendMessage)

export default route;
