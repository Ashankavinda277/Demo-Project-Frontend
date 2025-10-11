import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const offerService = {
    getAllOffers: async () => {
        const response = await axios.get(`${API_URL}/offers`);
        return response.data;
    },

    addOffer: async (offerData) => {
        const response = await axios.post(`${API_URL}/offers`, offerData);
        return response.data;
    },

    updateOffer: async (id, offerData) => {
        const response = await axios.put(`${API_URL}/offers/${id}`, offerData);
        return response.data;
    },

    deleteOffer: async (id) => {
        await axios.delete(`${API_URL}/offers/${id}`);
    }
};

export default offerService;