import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors"
import dotenv from "dotenv";
import axios from "axios";
import querystring from "querystring"
import { questionRoutes } from "./routes/questionRoutes.js";
import { userRoutes } from "./routes/userRoutes.js";
import fs from "fs"
import { authRoutes } from "./routes/authRoutes.js";

dotenv.config();

const app = express();

const clientId = process.env.CLIENT_ID
const clientSecret = process.env.CLIENT_SECRET;
const redirectUri = 'http://localhost:8080/callback';
const scope = 'read_inbox,no_expiry';

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors()),



    app.get("/", (req, res) => {
        res.json({
            author: "Arda",
            message: "Server calisiyor"
        });
    });


// Adım 1: Kullanıcıyı yetkilendirme sayfasına yönlendir
app.get('/authorize', (req, res) => {
    const authUrl = 'https://stackoverflow.com/oauth?' +
        querystring.stringify({
            client_id: clientId,
            scope: scope,
            redirect_uri: redirectUri,
            state: 'optional_state'
        });

    res.redirect(authUrl);
});

// Adım 2: Kullanıcı onayladıktan sonra bu URL'ye yönlendirilecek
app.get('/callback', async (req, res) => {
    const { code, state } = req.query;

    // Adım 3: Access token almak için POST isteği
    const apiEndpoint = 'https://stackoverflow.com/oauth/access_token';

    const tokenData = {
        client_id: clientId,
        client_secret: clientSecret,
        code: code,
        redirect_uri: redirectUri,
    };

    try {
        const response = await axios.post(apiEndpoint, querystring.stringify(tokenData), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        const accessToken = response.data.split('=')[1];
        process.env.ACCESS_TOKEN = accessToken
        // const expiresIn = response.data.expires;

        console.log(process.env.ACCESS_TOKEN)

    } catch (error) {
        console.error('Hata:', error.response ? error.response.data : error.message);
        res.status(500).send('Token alımında bir hata oluştu.');
    }
});

// app.get("/getMe", async (req, res) => {
//     try {
//         const accessToken = process.env.ACCESS_TOKEN
//         const response = await axios.get("https://stackoverflow.getMe", {
//             headers: {
//                 'Authorization': `Bearer ${accessToken}`
//             }
//         })
//         res.json(response.data)
//     } catch (error) {
//         console.error('Hata:', error.response ? error.response.data : error.message);
//         res.status(500).send('Kullanıcı bilgilerini alma sırasında bir hata oluştu.');
//     }
// })


app.use("/questions", questionRoutes)
app.use("/user", userRoutes)
app.use("/auth", authRoutes)


const PORT = process.env.PORT || 8080;

const CONNECTION_URL = process.env.CONNECTION_URL;


mongoose.set("strictQuery", false);
mongoose.connect(CONNECTION_URL).then(() => {
    app.listen(PORT, () => {
        console.log("server started on port 8080");
    })
}).catch((err) => {
    console.log(err);
});

