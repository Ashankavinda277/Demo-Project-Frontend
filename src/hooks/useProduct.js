import { useState, useEffect } from 'react';
import productService from '../services/productAPI';

const useProducts = (type = null) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
  
        let response;
        if (type) {
          response = await productService.getProductsByType(type);
        } else {
          response = await productService.getAllProducts();
        }
        
        // Handle different possible response structures
        let productsData = [];
        
        if (Array.isArray(response)) {
          productsData = response;
        } else if (response?.data && Array.isArray(response.data)) {
          productsData = response.data;
        } else if (response?.products && Array.isArray(response.products)) {
          productsData = response.products;
          productsData = response.products;
        } else if (response?.result && Array.isArray(response.result)) {
          productsData = response.result;
        } else {
          productsData = [];
        }
        
        if (productsData.length > 0) {

        }
        
        setProducts(productsData);
        
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Failed to fetch products');
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [type]);

  return { products, loading, error };
};

export default useProducts;