import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const ProductDetail = () => {
    const { id } = useParams(); // Get product ID from URL
    const [product, setProduct] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const API_URL = import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`${API_URL}/products/${id}`);
                if (response.data) {
                    setProduct(response.data);
                } else {
                    setError('Product not found.');
                }
            } catch (error) {
                setError('Error fetching product details.');
                console.error('Error fetching product:', error);
            }
        };

        fetchProduct();
    }, [id]);

    const handleAddToCart = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/cart/add', { product_id: product.id, qty: 1 });
            alert('Product added to cart!');
        } catch (error) {
            console.error('Error adding to cart:', error);
        }
    };

    if (error) {
        return <div className="alert alert-danger">{error}</div>;
    }

    if (!product) {
        return <p>Loading...</p>;
    }

    return (
        <div className="container my-5">
            <div className="row">
                {/* Product Image */}
                <div className="col-md-6">
                    <img src={product.image_path || '/path/to/default/image.jpg'} alt={product.name} className="img-fluid" />
                </div>

                {/* Product Details */}
                <div className="col-md-6">
                    <h1 className="mb-3">{product.name}</h1>
                    <p className="lead">{product.description}</p>
                    <h4 className="text-success mb-3">${product.price.toFixed(2)}</h4>

                    {/* Add to Cart Form */}
                    <form onSubmit={handleAddToCart}>
                        <div className="d-flex align-items-center mb-3">
                            <input type="number" name="qty" className="form-control w-25" defaultValue="1" min="1" />
                            <button type="submit" className="btn btn-primary ms-3">Add to Cart</button>
                        </div>
                    </form>

                    <p><strong>Category:</strong> {product.category?.name}</p>
                    <p><strong>Brand:</strong> {product.brand?.name}</p>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
