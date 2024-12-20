import React from 'react';
import { motion } from 'framer-motion';
// import './ProjectCard.css';
import placeholderImage from '../assets/placeholder_horizontal_1.jpg';

const ProjectCard = ({ title, image = placeholderImage, link }) => (
    <motion.div
        // whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="card"
        style={{ ...styles.card,
            backgroundImage: `url(${image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        }}
        onClick={() => window.location.href = link}
    >
        <h3>{title}</h3>
    </motion.div>
);


const styles = {
    card: {
        cursor: 'pointer',
        width: '100%',
        aspectRatio: '16 / 9',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        // borderRadius: '8px',
        overflow: 'hidden',
        color: 'white',
        backgroundColor: '#000',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    cardTitle: {
        margin: 0,
        padding: '1rem',
        background: 'rgba(0, 0, 0, 0.5)',
        width: '100%',
        textAlign: 'center',
    },
};


export default ProjectCard;