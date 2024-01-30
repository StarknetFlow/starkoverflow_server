import User from "../models/user.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import shortid from "shortid"

const saltRound = 10

const { sign, verify } = jwt


export const createUser = async (req, res) => {

    let data = req.body
    data = {
        // display_name: string,
        // email: string,
        // password: string,
        ...data,
        "creation_date": new Date(),
        "user_type": "registered",
        "user_id": shortid.generate(),
        "profile_image": "",
    }

    bcrypt.hash(data.password, saltRound, (err, hash) => {
        const newUser = new User({
            ...data,
            password: hash,
        })
        // res.status(201).json({ test: true })

        newUser.save().then(() => {
            res.status(201).json(newUser)
        }).catch((err) => {
            res.status(409).json({
                message: err.message
            })
        })

    })
}


export const login = async (req, res) => {

    const { email, password } = req.body

    User.findOne({ email: email }).then((user) => { //authentication

        bcrypt.compare(password, user.password, (err, result) => {
            if (result) {   //creating token

                const accessToken = sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET)
                res.status(200).json({ accessToken: accessToken, user: user })

            } else {
                res.status(401).json({ message: "Password did not match" })
            }
        })

    }).catch((err) => {
        res.status(404).json({ message: "No such user" })

    })
}
