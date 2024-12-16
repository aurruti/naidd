import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function PageButton({ text, link, onClick = () => {}, type="normal" }) {
    const [hover, setHover] = useState(false);

    return (
        <Link
            style={{ ...styles.button, textDecoration: 'none', 
                backgroundColor: hover ? '#1F1F1F' : '#fff',
                color: hover? '#fff' : '#1F1F1F',
                border: hover ? '0px ' : '1px solid #ccc',
                
            }}
            onClick={onClick}
            to={link}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >{text}</Link>
    );
}

const styles = {
    button: {
        width: '150px',
        padding: '10px',
        margin: '10px',
        border: '1px solid #ccc',
        borderRadius: '2px',
        cursor: 'pointer',
        fontFamily: 'Helvetica, sans-serif',
        textDecoration: 'none',
        transition: 'background-color 0.3s ease, color 0.3s ease, border 0.3s ease',
    },
};