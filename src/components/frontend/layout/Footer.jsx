import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-dark text-white py-4">
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <h5>About Us</h5>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus imperdiet, nulla sit amet volutpat.</p>
                    </div>
                    <div className="col-md-4">
                        <h5>Links</h5>
                        <ul className="list-unstyled">
                            <li><a href="#" className="text-white">Home</a></li>
                            <li><a href="#" className="text-white">Features</a></li>
                            <li><a href="#" className="text-white">Pricing</a></li>
                        </ul>
                    </div>
                    <div className="col-md-4">
                        <h5>Contact</h5>
                        <p>Email: example@example.com</p>
                        <p>Phone: (123) 456-7890</p>
                    </div>
                </div>
            </div>
            <div className="text-center py-3">
                &copy; 2024 Your Company
            </div>
        </footer>
    );
}

export default Footer;
