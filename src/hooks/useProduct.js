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
        
        console.log('🔍 useProducts - Fetching products for type:', type);
        console.log('🔍 Type of type parameter:', typeof type);
        
        let response;
        if (type) {
          console.log('🔍 Calling getProductsByType with:', type);
          response = await productService.getProductsByType(type);
        } else {
          console.log('🔍 Calling getAllProducts');
          response = await productService.getAllProducts();
        }
        
        console.log('🔍 Full API Response:', response);
        console.log('🔍 Response type:', typeof response);
        console.log('🔍 Response keys:', response ? Object.keys(response) : 'null');
        
        // Handle different possible response structures
        let productsData = [];
        
        if (Array.isArray(response)) {
          console.log('✅ Response is direct array');
          productsData = response;
        } else if (response?.data && Array.isArray(response.data)) {
          console.log('✅ Response has data property with array');
          productsData = response.data;
        } else if (response?.products && Array.isArray(response.products)) {
          console.log('✅ Response has products property with array');
          productsData = response.products;
        } else if (response?.result && Array.isArray(response.result)) {
          console.log('✅ Response has result property with array');
          productsData = response.result;
        } else {
          console.warn('❌ Unexpected response structure:', response);
          productsData = [];
        }
        
        console.log('🔍 Processed products data:', productsData);
        console.log('🔍 Products count:', productsData.length);
        
        if (productsData.length > 0) {
          console.log('🔍 First product sample:', productsData[0]);
        }
        
        setProducts(productsData);
        
      } catch (err) {
        console.error('❌ Error fetching products:', err);
        console.error('❌ Error response:', err.response);
        console.error('❌ Error data:', err.response?.data);
        
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