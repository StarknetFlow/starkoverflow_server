import axios from "axios";
import Question from "../models/questions.js";


const apiUrl = 'https://api.stackexchange.com/2.3/questions';
const accessToken = process.env.ACCESS_TOKEN


export const getAllQuestions = async (req, res) => {

    const params = {
        page: 1,
        order: 'desc',
        sort: 'activity',
        site: 'stackoverflow'
    };

    try {
        const response = await axios.get(apiUrl, {
            params: params,
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
        res.json(response.data)
    } catch (error) {
        console.error('Hata:', error.response ? error.response.data : error.message);
        res.status(500).send('Kullanıcı bilgilerini alma sırasında bir hata oluştu.');
    }


}

export const getQuestionDetails = async (req, res) => {

    const params = {
        order: 'desc',
        sort: 'activity',
        site: 'stackoverflow'
    };

    const questionId = req.params.id

    try {
        const response = await axios.get(apiUrl + "/" + questionId, {
            params: params,
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })

        res.json(response.data)
    } catch (error) {
        console.error('Hata:', error.response ? error.response.data : error.message);
        res.status(500).send('Kullanıcı bilgilerini alma sırasında bir hata oluştu.');

    }
}

export const createQuestion = async (req, res) => {

    const { question } = req.body

    const data = {
        ...question,
        tags: [],
        ownerOfQuestion: req.user.userId,
        creation_date: new Date(),
    }

    const newQuestion = new Question(data)
    newQuestion.save().then(() => {
        res.status(201).json({ status: "OK" })
    }).catch((err) => {
        console.log(err)
        res.status(409).json({
            message: err.message
        })
    })
}

export const getQuestionsInDb = async (req, res) => {

    try {
        const questions = await Question.find()
        res.status(200).json({ questions: questions })
    } catch (error) {
        res.status(error.status).json({
            message: error.message
        })
    }
}


