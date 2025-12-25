import React from 'react';
import ProductCard from './ProductCard';

const ProductList = ({ products, onEdit, onDelete }) => {
    if (!products || products.length === 0) {
        return <div className="no-products">No products found.</div>;
    }

    return (
        <div className="product-grid">
            {products.map((product) => (
                <ProductCard
                    key={product.id}
                    product={product}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
};

export default ProductList;
