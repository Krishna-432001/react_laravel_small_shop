import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Cart = () => {
    const [carts, setCarts] = useState([]); // Initialize carts as an empty array
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        // Fetch cart items from the API
        axios.get('/api/cart')
            .then(response => {
                // Ensure response data is an array
                setCarts(Array.isArray(response.data) ? response.data : []);
            })
            .catch(error => setError(error.message));
    }, []);

    const handleIncrease = async (cartId) => {
        try {
            await axios.post(`/api/cart/increase/${cartId}`);
            setSuccess("Quantity increased");
            refreshCart();
        } catch (error) {
            setError(error.message);
        }
    };

    const handleDecrease = async (cartId) => {
        try {
            await axios.post(`/api/cart/decrease/${cartId}`);
            setSuccess("Quantity decreased");
            refreshCart();
        } catch (error) {
            setError(error.message);
        }
    };

    const handleRemove = async (cartId) => {
        try {
            await axios.delete(`/api/cart/remove/${cartId}`);
            setSuccess("Item removed from cart");
            refreshCart();
        } catch (error) {
            setError(error.message);
        }
    };

    const handleClearCart = async () => {
        try {
            await axios.post('/api/cart/clear');
            setSuccess("Cart cleared");
            setCarts([]);
        } catch (error) {
            setError(error.message);
        }
    };

    const handleCheckout = async () => {
        try {
            await axios.post('/api/checkout');
            setSuccess("Proceeding to checkout");
        } catch (error) {
            setError(error.message);
        }
    };

    const refreshCart = () => {
        axios.get('/api/cart')
            .then(response => setCarts(Array.isArray(response.data) ? response.data : []))
            .catch(error => setError(error.message));
    };

    return (
        <div className="container my-5">
            <h1 className="mb-4">Your Cart</h1>

            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}

            {carts.length === 0 ? (
                <div className="alert alert-info">Your cart is empty.</div>
            ) : (
                <>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Total</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {carts.map(cart => (
                                <tr key={cart.id}>
                                    <td>{cart.product.name}</td>
                                    <td>${cart.product.price.toFixed(2)}</td>
                                    <td>
                                        <button onClick={() => handleDecrease(cart.id)} className="btn btn-danger btn-sm">-</button>
                                        {cart.qty}
                                        <button onClick={() => handleIncrease(cart.id)} className="btn btn-success btn-sm">+</button>
                                    </td>
                                    <td>${(cart.product.price * cart.qty).toFixed(2)}</td>
                                    <td>
                                        <button onClick={() => handleRemove(cart.id)} className="btn btn-danger btn-sm">Remove</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="d-flex justify-content-between mt-4">
                        <h4>Total Amount:</h4>
                        <h4>${carts.reduce((total, cart) => total + (cart.product.price * cart.qty), 0).toFixed(2)}</h4>
                    </div>

                    <button onClick={handleClearCart} className="btn btn-danger mt-4">Clear Cart</button>

                    <button onClick={handleCheckout} className="btn btn-primary mt-4">Proceed to Checkout</button>
                </>
            )}
        </div>
    );
};

export default Cart;
