import react from 'react'

const Featurecard = ({ icon, title, description }) => {
    return (
        <div className="feature-card">
            <div className="icon"></div>
            <h3>{title}</h3>
            <p>{description}</p>
        </div>
    );
};