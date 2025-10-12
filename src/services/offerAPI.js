


import axios from 'axios';

const API_URL = '/api';

const offerService = {
    getAllOffers: async () => {
        try {
            const response = await axios.get(`${API_URL}/promotion/get`);
            console.log('API Response:', response.data);
            
            // Return the array of offers from the response
            return response.data.data || response.data || [];
            
        } catch (error) {
            console.error('Error fetching offers:', error);
            throw new Error('Failed to fetch offers');
        }
    }
    // ... rest of the service methods
};

export default offerService;