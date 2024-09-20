import React from 'react';

const CategoryPage = () => {
    return (
        <div>
            <nav className="navbar">
                <a href="#fruits">Fruits</a>
                <a href="#vegetables">Vegetables</a>
                <a href="#dairy">Dairy</a>
                <a href="#bakery">Bakery</a>
            </nav>

            <div id="fruits" className="container">
                <div className="category-card">
                    <img src="fruits.jpg" alt="Fruits" />
                    <h3>Fruits</h3>
                    <p>Explore a variety of fresh fruits.</p>
                </div>
            </div>

            <div id="vegetables" className="container">
                <div className="category-card">
                    <img src="vegetables.jpg" alt="Vegetables" />
                    <h3>Vegetables</h3>
                    <p>Discover a wide range of vegetables.</p>
                </div>
            </div>

            <div id="dairy" className="container">
                <div className="category-card">
                    <img src="dairy.jpg" alt="Dairy" />
                    <h3>Dairy</h3>
                    <p>Find the best dairy products.</p>
                </div>
            </div>

            <div id="bakery" className="container">
                <div className="category-card">
                    <img src="bakery.jpg" alt="Bakery" />
                    <h3>Bakery</h3>
                    <p>Enjoy our delicious bakery items.</p>
                </div>
            </div>
        </div>
    );
};

export default CategoryPage;
