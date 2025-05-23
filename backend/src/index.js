import express from 'express';
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors' 
import path from 'path'

import {ConnectDB} from './lib/database.js'
import authRoutes from './routes/auth.route.js'
import messageRoutes from './routes/message.route.js'
import {app, server} from './lib/socket.js'

dotenv.config()

const PORT = process.env.PORT || 3000
const __dirname = path.resolve()

// Middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser())

// CORS configuration
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}))

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoutes)

// Serve static files in production
if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")))
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "../frontend", "dist", "index.html"))
    })
}

// Start server
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    ConnectDB()
})