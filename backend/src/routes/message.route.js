import express from 'express'
import {protectRoute} from '../middlewares/auth.middleware.js'
import {getUsersForSidebar,getMessages,sendMessage} from '../controllers/message.controller.js'

const router = express.Router()

// Simple routes without complex parameters
router.get("/users", protectRoute, getUsersForSidebar)
router.get("/:id", protectRoute, getMessages)
router.post("/:id", protectRoute, sendMessage)

export default router;
