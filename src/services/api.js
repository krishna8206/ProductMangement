import axios from 'axios';

const api = axios.create({
    baseURL: 'https://fakestoreapi.com',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const fetchProducts = async () => {
    const response = await api.get('/products');
    return response.data;
};

export const addProduct = async (product) => {
    const response = await api.post('/products', product);
    return response.data;
};

export const updateProduct = async (id, product) => {
    const response = await api.put(`/products/${id}`, product);
    return response.data;
};

export const deleteProduct = async (id) => {
    const response = await api.delete(`/products/${id}`);
    return response.data;
};

export const fetchCategories = async () => {
    const response = await api.get('/products/categories');
    return response.data;
};

export default api;
