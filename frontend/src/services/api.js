import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default {
    getAllWaste() {
        return apiClient.get('/waste');
    },
    addWaste(waste) {
        return apiClient.post('/waste', waste);
    },
};
