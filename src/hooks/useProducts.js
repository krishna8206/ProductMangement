import { useState, useEffect } from 'react';
import { fetchProducts, addProduct as apiAddProduct, updateProduct as apiUpdateProduct, deleteProduct as apiDeleteProduct } from '../services/api';
import { toast } from 'react-toastify';

const LOCAL_STORAGE_KEY = 'product_dashboard_data';

export const useProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        try {
            setLoading(true);
            // Check localStorage first
            const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
            if (storedData) {
                setProducts(JSON.parse(storedData));
                setLoading(false);
            } else {
                // Fallback to API if no local data
                const data = await fetchProducts();
                setProducts(data);
                localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
            }
        } catch (err) {
            setError('Failed to fetch products');
            toast.error('Failed to fetch products');
        } finally {
            setLoading(false);
        }
    };

    const saveToLocalStorage = (data) => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
    };

    const addProduct = async (productData) => {
        try {
            // API Call (Mock)
            const newProduct = await apiAddProduct(productData);

            // Local State Update
            // Use Date.now() for unique ID since API always returns same ID
            const productWithUniqueId = { ...productData, ...newProduct, id: Date.now() };

            setProducts((prev) => {
                const updated = [productWithUniqueId, ...prev];
                saveToLocalStorage(updated); // Sync
                return updated;
            });
            toast.success('Product added successfully');
            return true;
        } catch (err) {
            toast.error('Failed to add product');
            return false;
        }
    };

    const updateProduct = async (id, productData) => {
        try {
            await apiUpdateProduct(id, productData);
            setProducts((prev) => {
                const updated = prev.map((p) => (p.id === id ? { ...p, ...productData } : p));
                saveToLocalStorage(updated); // Sync
                return updated;
            });
            toast.success('Product updated successfully');
            return true;
        } catch (err) {
            toast.error('Failed to update product');
            return false;
        }
    };

    const deleteProduct = async (id) => {
        try {
            await apiDeleteProduct(id);
            setProducts((prev) => {
                const updated = prev.filter((p) => p.id !== id);
                saveToLocalStorage(updated); // Sync
                return updated;
            });
            toast.success('Product deleted successfully');
            return true;
        } catch (err) {
            toast.error('Failed to delete product');
            return false;
        }
    };

    return {
        products,
        loading,
        error,
        addProduct,
        updateProduct,
        deleteProduct,
    };
};
