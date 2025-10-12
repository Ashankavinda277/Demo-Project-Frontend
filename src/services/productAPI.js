import axios from 'axios';

const API_BASE_URL = '/api/product'; 

const productService = {

  //add product
  addProduct: async (productData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/add`, productData);
      console.log('Add product response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error adding product:', error);
      throw error;
    }
  },

  // Get all products
  getAllProducts: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/get`);
      console.log('All products response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching all products:', error);
      throw error;
    }
  },

  // Get products by type (category)
  getProductsByType: async (type) => {
    try {
      console.log('Fetching products for type:', type);
      const response = await axios.get(`${API_BASE_URL}/get/type/${type}`);
      console.log(`Products for type "${type}":`, response.data);
      return response.data;
    } catch (error) {
      console.error(`Error fetching products by type "${type}":`, error.response?.data || error.message);
      throw error;
    }
  },

  // Get product by ID
  getProductById: async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/get/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching product by ID:', error);
      throw error;
    }
  },

  // Get products by name (for search)
  getProductsByName: async (name) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/get/name/${name}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching products by name:', error);
      throw error;
    }
  }
};

export default productService;