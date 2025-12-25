import { useState, useMemo } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Header from './components/Header';
import ProductList from './components/ProductList';
import ProductFormModal from './components/ProductFormModal';
import { useProducts } from './hooks/useProducts';

import { fetchCategories } from './services/api'; // Add import for fetchCategories

function App() {
    const { products, loading, error, addProduct, updateProduct, deleteProduct } = useProducts();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [categories, setCategories] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);

    // Fetch categories on mount
    useMemo(async () => {
        try {
            const data = await fetchCategories();
            setCategories(data);
        } catch (err) {
            console.error('Failed to load categories');
        }
    }, []);

    const filteredProducts = useMemo(() => {
        return products.filter((product) => {
            const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
            return matchesSearch && matchesCategory;
        });
    }, [products, searchTerm, selectedCategory]);

    const handleSave = async (productData) => {
        let success = false;
        if (editingProduct) {
            success = await updateProduct(editingProduct.id, productData);
        } else {
            success = await addProduct(productData);
        }

        if (success) {
            setIsModalOpen(false);
        }
    };

    const handleAddClick = () => {
        setEditingProduct(null);
        setIsModalOpen(true);
        // We need the modal to actually work, but for step 1 (Fetch & Display) this is enough framework.
        // I will implement the modal next.
    };

    const handleEditClick = (product) => {
        setEditingProduct(product);
        setIsModalOpen(true);
    };

    const handleDeleteClick = async (id) => {
        // Basic confirm for now
        if (window.confirm('Are you sure you want to delete this product?')) {
            await deleteProduct(id);
        }
    };

    return (
        <div className="container">
            <ToastContainer position="top-right" autoClose={3000} />
            <Header
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                onAddClick={handleAddClick}
            />

            {loading ? (
                <div className="loading-spinner">Loading products...</div>
            ) : error ? (
                <div className="error-message">{error}</div>
            ) : (
                <ProductList
                    products={filteredProducts}
                    onEdit={handleEditClick}
                    onDelete={handleDeleteClick}
                />
            )}

            <ProductFormModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleSave}
                product={editingProduct}
            />
        </div>
    );
}

export default App;
