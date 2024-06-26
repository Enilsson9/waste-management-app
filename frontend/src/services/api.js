import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:3001',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default {
    getAll() {
        return apiClient.get('/waste');
    },
    get(id) {
        return apiClient.get(`/waste/${id}`);
    },
    create(data) {
        return apiClient.post('/waste', data);
    },
    update(id, data) {
        return apiClient.put(`/waste/${id}`, data);
    },
    delete(id) {
        return apiClient.delete(`/waste/${id}`);
    }
};
