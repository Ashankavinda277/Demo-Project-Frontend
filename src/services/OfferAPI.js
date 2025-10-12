import axios from 'axios';

const API_BASE_URL = '/api/offer'; 

const offerService = {

  // Add offer
  addOffer: async (offerData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/add`, offerData);
      console.log('Add offer response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error adding offer:', error);
      throw error;
    }
  },

  // Get all offers
  getAllOffers: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/get`);
      console.log('All offers response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching all offers:', error);
      throw error;
    }
  },

  // Get active offers only
  getActiveOffers: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/get/active`);
      console.log('Active offers response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching active offers:', error);
      throw error;
    }
  },

  // Get offers by type
  getOffersByType: async (type) => {
    try {
      console.log('Fetching offers for type:', type);
      const response = await axios.get(`${API_BASE_URL}/get/type/${type}`);
      console.log(`Offers for type "${type}":`, response.data);
      return response.data;
    } catch (error) {
      console.error(`Error fetching offers by type "${type}":`, error.response?.data || error.message);
      throw error;
    }
  },

  // Get offer by ID
  getOfferById: async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/get/${id}`);
      console.log('Offer by ID response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching offer by ID:', error);
      throw error;
    }
  },

  // Get offers by name (for search)
  getOffersByName: async (name) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/get/name/${name}`);
      console.log('Offers by name response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching offers by name:', error);
      throw error;
    }
  },

  // Update offer
  updateOffer: async (id, offerData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/update/${id}`, offerData);
      console.log('Update offer response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error updating offer:', error);
      throw error;
    }
  },

  // Delete offer
  deleteOffer: async (id) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/delete/${id}`);
      console.log('Delete offer response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error deleting offer:', error);
      throw error;
    }
  },

  // Get offers by date range
  getOffersByDateRange: async (startDate, endDate) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/get/daterange`, {
        params: { startDate, endDate }
      });
      console.log('Offers by date range response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching offers by date range:', error);
      throw error;
    }
  },

  // Get current/ongoing offers
  getCurrentOffers: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/get/current`);
      console.log('Current offers response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching current offers:', error);
      throw error;
    }
  },

  // Get upcoming offers
  getUpcomingOffers: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/get/upcoming`);
      console.log('Upcoming offers response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching upcoming offers:', error);
      throw error;
    }
  },

  // Get expired offers
  getExpiredOffers: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/get/expired`);
      console.log('Expired offers response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching expired offers:', error);
      throw error;
    }
  }
};

export default offerService;