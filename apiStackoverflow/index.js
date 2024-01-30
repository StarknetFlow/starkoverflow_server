import axios from "axios";


export const getApiAccessToken = () => {

    const clientId = 'your_client_id';
    const clientSecret = 'your_client_secret';
    const apiUrl = 'https://example.com/api/token';

    const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

    const data = {
        grant_type: 'client_credentials',
    };

    const config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic ${credentials}`
        }
    };

    axios.post(apiUrl, new URLSearchParams(data), config)
        .then(response => {
            const accessToken = response.data.access_token;
        })
        .catch(error => {
            console.error('Token alma hatası:', error.response.data);
        });
}
