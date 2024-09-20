import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const HomePage = () => {
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('All');
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const API_URL = import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
        // Fetch categories (assuming categories have a similar structure)
        axios.get(`${API_URL}/categories`)
            .then(response => {
                const data = response.data;
                if (Array.isArray(data.data)) {
                    setCategories(data.data);
                } else {
                    console.error('Unexpected data format:', data);
                }
            })
            .catch(error => console.error('Error fetching categories:', error));
    }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get(`${API_URL}/products`, {
                    params: { search, category }
                });
                const data = response.data;
                if (Array.isArray(data.data)) {
                    setProducts(data.data);
                } else {
                    console.error('Unexpected data format:', data);
                }
            } catch (error) {
                setError('Error fetching products.');
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [search, category]);

    const handleSearchChange = (e) => setSearch(e.target.value);

    const handleCategoryChange = (e) => setCategory(e.target.value);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Trigger fetch in useEffect
    };

    return (
        <div className="container mt-4">
            {/* Search and Filter Form */}
            <form onSubmit={handleSubmit} className="mb-4">
                <div className="row mb-3">
                    <div className="col-md-4">
                        <input
                            type="text"
                            name="search"
                            className="form-control"
                            placeholder="Search products..."
                            value={search}
                            onChange={handleSearchChange}
                        />
                    </div>
                    <div className="col-md-4">
                        <select
                            name="category"
                            className="form-select"
                            value={category}
                            onChange={handleCategoryChange}
                        >
                            <option value="All">All Categories</option>
                            {Array.isArray(categories) && categories.map(cat => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md-4">
                        <button type="submit" className="btn btn-primary">Search</button>
                    </div>
                </div>
            </form>

            {loading && <p>Loading...</p>}
            {error && <p className="text-danger">{error}</p>}

            <div className="row">
                {products.map(item => (
                    <div className="col-md-4 mb-4" key={item.id}>
                        <Link to={`/products/${item.id}`}>
                            <div className="card">
                                <img src={item.image_path || '/path/to/default/image.jpg'} className="card-img-top" alt={item.name} />
                                <div className="card-body">
                                    <h5 className="card-title">{item.name}</h5>
                                    <p className="card-text">{item.description}</p>
                                    <p className="card-text"><strong>${item.price}</strong></p>
                                    <Link to="/cart" className="btn btn-primary">Add to Cart</Link>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomePage;
