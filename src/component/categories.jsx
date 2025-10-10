import react from 'react'

const Categories = ({ image, title }) => {
    return (
        <div className="categories-card"
        style={{ backgroundImage: `url(${image})` }}
        >
            <h3>{title}</h3>
        </div>
    );
};

export default Categories;