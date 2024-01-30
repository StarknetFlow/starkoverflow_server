import axios from "axios";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


const saltRound = 10

const apiUrl = 'https://api.stackexchange.com/2.3/users';
const accessToken = process.env.ACCESS_TOKEN


const { sign, verify } = jwt

export const getUserById = async (req, res) => {
    // /2.3/users/7228601?order=desc&sort=reputation&site=stackoverflow
    const params = {
        order: 'desc',
        sort: 'reputation',
        site: 'stackoverflow',
    }
    const userId = req.params.userId

    try {
        const response = await axios.get(apiUrl + "/" + userId, {
            params: params,
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
        res.json(response.data)
    } catch (error) {
        console.error('Error in getting user:', error.message ? error.message : error.response.data);
        res.status(500).send('Kullanıcı bilgilerini alma sırasında bir hata oluştu.');

    }
}

export const getUsersQuestions = async (req, res) => {

    const params = {
        order: 'desc',
        sort: 'activity',
        site: 'stackoverflow',
    }
    const userId = req.params.userId

    try {
        const response = await axios.get(apiUrl + "/" + userId + "/questions", {
            params: params,
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
        res.json(response.data)
    } catch (error) {
        console.error('Error in getting users questions:', error.message ? error.message : error.response.data);
        res.status(500).send('Kullanıcı questions ı alma sırasında bir hata oluştu.');

    }
}

export const login = (req, res) => {
    // const { eMail, password } = req.body

    // User.findOne({ eMail: eMail }).then((user) => { //authentication

    //     bcrypt.compare(password, user.password, (err, result) => {
    //         if (result) {   //creating token

    //             const accessToken = sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET)
    //             res.status(200).json({ accessToken: accessToken, user: user })

    //         } else {
    //             res.status(401).json({ message: "Password did not match" })
    //         }
    //     })

    // }).catch((err) => {
    //     res.status(404).json({ message: "No such user" })

    // })

}

export const createUser = (req, res) => {

    // let data = req.body
    // data = {
    //     ...data,
    //     profilePhoto: data.name.substr(0, 0).toUpperCase()
    // }

    // bcrypt.hash(data.password, saltRound, (err, hash) => {
    //     const newUser = new User({
    //         ...data,
    //         password: hash,
    //         userId: uuid()
    //     })

    //     newUser.save().then(() => {
    //         res.status(201).json(newUser)
    //     }).catch((err) => {
    //         res.status(409).json({
    //             message: err.message
    //         })
    //     })

    // })
}

