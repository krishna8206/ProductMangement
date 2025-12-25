import React from 'react';
import { FaPlus, FaSearch } from 'react-icons/fa';

const Header = ({ searchTerm, onSearchChange, onAddClick, categories, selectedCategory, onCategoryChange }) => {
    return (
        <header className="header">
            <h1>Products</h1>
            <div className="search-filter-container">
                <div className="search-bar">
                    <FaSearch className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={(e) => onSearchChange(e.target.value)}
                    />
                </div>
                <select
                    className="category-filter"
                    value={selectedCategory}
                    onChange={(e) => onCategoryChange(e.target.value)}
                >
                    <option value="">All Categories</option>
                    {categories?.map((cat) => (
                        <option key={cat} value={cat}>
                            {cat.charAt(0).toUpperCase() + cat.slice(1)}
                        </option>
                    ))}
                </select>
            </div>
            <button className="btn-primary" onClick={onAddClick}>
                <FaPlus style={{ marginRight: '8px' }} /> Add Product
            </button>
        </header>
    );
};

export default Header;
