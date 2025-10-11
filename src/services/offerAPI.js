import axios from 'axios';

const API_URL = '/api'  // Changed this line

const offerService = {
    getAllOffers: async () => {
        const response = await axios.get(`${API_URL}/promotion`); // Changed to match backend route
        return response.data;
    },

    addOffer: async (offerData) => {
        const response = await axios.post(`${API_URL}/promotion`, offerData);
        return response.data;
    },

    updateOffer: async (id, offerData) => {
        const response = await axios.put(`${API_URL}/promotion/${id}`, offerData);
        return response.data;
    },

    deleteOffer: async (id) => {
        await axios.delete(`${API_URL}/promotion/${id}`);
    }
};

export default offerService;