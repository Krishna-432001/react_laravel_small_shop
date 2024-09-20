import React, { useState } from 'react';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        gender: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        address: '',
        pincode: '',
        country: '',
        state: '',
        captcha: ''
    });

    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});

        // Example form validation (you can extend this)
        let newErrors = {};
        if (!formData.name) newErrors.name = 'Name is required';
        if (!formData.email) newErrors.email = 'Email is required';
        if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
        if (!formData.phone) newErrors.phone = 'Phone number is required';
        if (!formData.country) newErrors.country = 'Country is required';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        // Handle form submission (make API call here)
        try {
            // Replace with your actual API call
            const response = await fetch('/store', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await response.json();

            if (response.ok) {
                setSuccessMessage('You have registered successfully!');
                setFormData({
                    name: '',
                    gender: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                    phone: '',
                    address: '',
                    pincode: '',
                    country: '',
                    state: '',
                    captcha: ''
                });
            } else {
                setErrors(data.errors || {});
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="container">
            <h1>Register</h1>

            {Object.keys(errors).length > 0 && (
                <div className="alert alert-danger">
                    <ul>
                        {Object.values(errors).map((error, index) => (
                            <li key={index}>{error}</li>
                        ))}
                    </ul>
                </div>
            )}

            {successMessage && (
                <div className="alert alert-success">
                    {successMessage}
                </div>
            )}

            <form id="registrationForm" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
                    {errors.name && <div className="error">{errors.name}</div>}
                </div>
                
                <div className="form-group">
                    <label>Gender</label>
                    <label><input type="radio" name="gender" value="male" checked={formData.gender === 'male'} onChange={handleChange} /> Male</label>
                    <label><input type="radio" name="gender" value="female" checked={formData.gender === 'female'} onChange={handleChange} /> Female</label>
                    {errors.gender && <div className="error">{errors.gender}</div>}
                </div>
                
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
                    {errors.email && <div className="error">{errors.email}</div>}
                </div>
                
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} />
                    {errors.password && <div className="error">{errors.password}</div>}
                </div>
                
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
                    {errors.confirmPassword && <div className="error">{errors.confirmPassword}</div>}
                </div>
                
                <div className="form-group">
                    <label htmlFor="phone">Phone No</label>
                    <input type="text" id="phone" name="phone" value={formData.phone} onChange={handleChange} />
                    {errors.phone && <div className="error">{errors.phone}</div>}
                </div>
                
                <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} />
                    {errors.address && <div className="error">{errors.address}</div>}
                </div>
                
                <div className="form-group">
                    <label htmlFor="pincode">Pincode</label>
                    <input type="text" id="pincode" name="pincode" value={formData.pincode} onChange={handleChange} />
                    {errors.pincode && <div className="error">{errors.pincode}</div>}
                </div>
                
                <div className="form-group">
                    <label htmlFor="country">Country</label>
                    <select id="country" name="country" value={formData.country} onChange={handleChange}>
                        <option value="">Select Country</option>
                        <option value="In">India</option>
                        <option value="us">United States</option>
                        <option value="uk">United Kingdom</option>
                        <option value="ca">Canada</option>
                    </select>
                    {errors.country && <div className="error">{errors.country}</div>}
                </div>

                <div className="form-group">
                    <label htmlFor="state">State</label>
                    <select id="state" name="state" value={formData.state} onChange={handleChange}>
                        <option value="">Select State</option>
                        <option value="Tn">Tamil Nadu</option>
                        <option value="kr">Kerala</option>
                        <option value="kn">Karnataka</option>
                    </select>
                    {errors.state && <div className="error">{errors.state}</div>}
                </div>

                <div className="form-group">
                    <label htmlFor="captcha">Captcha</label>
                    <div className="captcha">
                        <input type="text" id="captcha" name="captcha" value={formData.captcha} onChange={handleChange} />
                        <img src="captcha.jpg" alt="Captcha" />
                    </div>
                    {errors.captcha && <div className="error">{errors.captcha}</div>}
                </div>
                
                <button type="submit">Register</button>
            </form>

            <a href="/login">Already have an account? Login</a>
        </div>
    );
};

export default Register;
