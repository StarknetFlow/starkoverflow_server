import { Router } from "express"
import jwt from "jsonwebtoken"
import { createUser, getUserById, getUsersQuestions, login } from "../controllers/users.js"

const { sign, verify } = jwt

const userRoutes = Router()

userRoutes.get("/:userId", getUserById)

userRoutes.get("/:userId/questions", getUsersQuestions)


function authenticateToken(req, res, next) {

    // const authHeader = req.headers['authorization']
    // const token = authHeader && authHeader.split(' ')[1]

    // if (token === undefined || token === null) return res.status(401).json({ message: "There is no token" })

    // verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    //     if (err) return res.status(403).json({ message: "Token is not valid" })

    //     req.user = user
    //     next()
    // })
}

export { userRoutes }