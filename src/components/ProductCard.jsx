import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

const ProductCard = ({ product, onEdit, onDelete }) => {
    return (
        <div className="product-card">
            <div className="product-image-container">
                <img src={product.image} alt={product.title} className="product-image" />
                <div className="product-category">{product.category}</div>
            </div>
            <div className="product-details">
                <h3 className="product-title" title={product.title}>
                    {product.title}
                </h3>
                <p className="product-price">${product.price.toFixed(2)}</p>
                <div className="product-actions">
                    <button
                        className="btn-icon edit"
                        onClick={() => onEdit(product)}
                        aria-label="Edit Product"
                    >
                        <FaEdit />
                    </button>
                    <button
                        className="btn-icon delete"
                        onClick={() => onDelete(product.id)}
                        aria-label="Delete Product"
                    >
                        <FaTrash />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
