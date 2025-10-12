// import axios from 'axios';

// const API_URL = '/api';

// const offerService = {
//     getAllOffers: async () => {
//         try {
//             const response = await axios.get(`${API_URL}/promotion/get`);
//             console.log('Fetched offers:', response.data);
//             return response.data.data;
//         } catch (error) {
//             console.error('Error fetching offers:', error);
//             throw error;
//         }
//     },

//     addOffer: async (offerData) => {
//         const response = await axios.post(`${API_URL}/promotion/add`, offerData);
//         return response.data;
//     },

//     updateOffer: async (id, offerData) => {
//         const response = await axios.put(`${API_URL}/promotion/update/${id}`, offerData);
//         return response.data;
//     },

//     deleteOffer: async (id) => {
//         await axios.delete(`${API_URL}/promotion//delete/${id}`);
//     }
// };

//  export default offerService;

import axios from 'axios';

const API_URL = '/api';

const offerService = {
    getAllOffers: async () => {
        try {
            const response = await axios.get(`${API_URL}/promotion/get`);
            console.log('API Response:', response.data);
            // Check if response.data exists and has data property
            if (response.data && Array.isArray(response.data)) {
                return response.data;
            } else if (response.data && Array.isArray(response.data.data)) {
                return response.data.data;
            }
            return [];
        } catch (error) {
            console.error('Error fetching offers:', error);
            throw new Error('Failed to fetch offers');
        }
    },

    addOffer: async (offerData) => {
        try {
            const response = await axios.post(`${API_URL}/promotion/add`, offerData);
            return response.data;
        } catch (error) {
            console.error('Error adding offer:', error);
            throw new Error('Failed to add offer');
        }
    },

    updateOffer: async (id, offerData) => {
        try {
            const response = await axios.patch(`${API_URL}/promotion/update/${id}`, offerData);
            return response.data;
        } catch (error) {
            console.error('Error updating offer:', error);
            throw new Error('Failed to update offer');
        }
    },

    deleteOffer: async (id) => {
        try {
            // Fixed double slash in URL
            await axios.delete(`${API_URL}/promotion/delete/${id}`);
        } catch (error) {
            console.error('Error deleting offer:', error);
            throw new Error('Failed to delete offer');
        }
    }
};

export default offerService;

