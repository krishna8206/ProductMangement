import React, { useState, useEffect } from 'react';
import { fetchCategories } from '../services/api';
import { FaTimes } from 'react-icons/fa';

const ProductFormModal = ({ isOpen, onClose, onSubmit, product }) => {
    const [formData, setFormData] = useState({
        title: '',
        price: '',
        description: '',
        image: '',
        category: '',
    });
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Load categories
        const loadCategories = async () => {
            try {
                const data = await fetchCategories();
                setCategories(data);
            } catch (error) {
                console.error('Failed to load categories', error);
            }
        };
        if (isOpen) {
            loadCategories();
        }
    }, [isOpen]);

    useEffect(() => {
        if (product) {
            setFormData({
                title: product.title,
                price: product.price,
                description: product.description,
                image: product.image,
                category: product.category,
            });
        } else {
            setFormData({
                title: '',
                price: '',
                description: '',
                image: 'https://i.pravatar.cc', // Default placeholder
                category: '',
            });
        }
    }, [product, isOpen]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        await onSubmit({
            ...formData,
            price: parseFloat(formData.price)
        });
        setLoading(false);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>{product ? 'Edit Product' : 'Add New Product'}</h2>
                    <button className="close-btn" onClick={onClose}>
                        <FaTimes />
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Price</label>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            step="0.01"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Category</label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Category</option>
                            {categories.map((cat) => (
                                <option key={cat} value={cat}>
                                    {cat}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="3"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Image URL</label>
                        <input
                            type="text"
                            name="image"
                            value={formData.image}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn-secondary" onClick={onClose}>
                            Cancel
                        </button>
                        <button type="submit" className="btn-primary" disabled={loading}>
                            {loading ? 'Saving...' : 'Save Product'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProductFormModal;
