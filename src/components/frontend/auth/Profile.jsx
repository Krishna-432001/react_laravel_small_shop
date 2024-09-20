import React, { useState } from 'react';
// import './Profile.css'; // Import the CSS file for styling

const Profile = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        address: '',
        profileImage: 'default-profile.jpg',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setFormData({
                    ...formData,
                    profileImage: event.target.result,
                });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = () => {
        // Handle save logic (e.g., API call to save user data)
        console.log('Profile data:', formData);
    };

    return (
        <div className="profile-container">
            <h1>Welcome to Profile Page</h1>
            <div className="profile-header">
                <img src={formData.profileImage} alt="Profile" id="profileImage" />
                <div>
                    <label htmlFor="fileInput">Browse</label>
                    <input
                        type="file"
                        id="fileInput"
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                </div>
            </div>

            <div className="profile-details">
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                />

                <label htmlFor="phone">Phone Number:</label>
                <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1234567890"
                />

                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="johndoe@example.com"
                />

                <label htmlFor="address">Address:</label>
                <textarea
                    id="address"
                    name="address"
                    rows="4"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="123 Main Street, Anytown, USA"
                ></textarea>
            </div>

            <div className="profile-footer">
                <button type="button" onClick={handleSave}>Save Changes</button>
            </div>

            <div className="logout">
                <a href="/logout">Logout</a>
            </div>
        </div>
    );
};

export default Profile;
