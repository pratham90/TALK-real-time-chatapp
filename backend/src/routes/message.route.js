import express from 'express'
import {protectRoute} from '../middlewares/auth.middleware.js'
import {getUsersForSidebar,getMessages,sendMessage} from '../controllers/message.controller.js'

const router = express.Router()

// Get all users for sidebar
router.get("/users", protectRoute, getUsersForSidebar)

// Get messages between two users
router.get("/messages/:id", protectRoute, getMessages)

// Send a message to a user
router.post("/messages/:id", protectRoute, sendMessage)

export default router;
