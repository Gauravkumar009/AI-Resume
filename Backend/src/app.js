const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors")

const app = express()

const allowedOrigins = [
    "https://ai-resume-one-beta.vercel.app",
    "http://localhost:5173",
    "http://localhost:3000"
]

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: (origin, callback) => {
        // allow requests with no origin (like mobile apps, curl, or Postman)
        if (!origin || allowedOrigins.includes(origin) || origin.endsWith(".vercel.app")) {
            return callback(null, true)
        }
        return callback(new Error("Not allowed by CORS"))
    },
    credentials: true
}))

/* require all the routes here */
const authRouter = require("./routes/auth.routes")
const interviewRouter = require("./routes/interview.routes")

/* using all the routes here */
app.use("/api/auth", authRouter)
app.use("/api/interview", interviewRouter)

module.exports = app