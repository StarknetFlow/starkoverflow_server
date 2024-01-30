import { Router } from "express"
import jwt from "jsonwebtoken"
import { createQuestion, getAllQuestions, getQuestionDetails, getQuestionsInDb } from "../controllers/questions.js"

const { sign, verify } = jwt

const questionRoutes = Router()

questionRoutes.get("/", getAllQuestions)

questionRoutes.post("/create-question", authenticateToken, createQuestion)

questionRoutes.get("/questions", getQuestionsInDb)

questionRoutes.get("/:id", getQuestionDetails)


export { questionRoutes }

function authenticateToken(req, res, next) {

    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token === undefined || token === null) return res.status(401).json({ message: "There is no token" })
    verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: "Token is not valid" })

        req.user = user
        next()
    })
}

