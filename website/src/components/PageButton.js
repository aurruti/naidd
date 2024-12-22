import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import TypeText from './TypeText';

export default function PageButton({ text, link, onClick = () => {}, type="normal", 
    buttonStyle = {}
}) {
    const [hover, setHover] = useState(false);
    const styling = { ...styles.button, ...buttonStyle };

    if (type === 'backSmall') {
        return (
            <Link
                style={{ ...styling, textDecoration: 'none', 
                    backgroundColor: hover ? '#1F1F1F' : '#fff',
                    color: hover? '#fff' : '#1F1F1F',
                    border: hover ? '1px solid  #1F1F1F' : '1px solid #ccc',
                    
                }}
                onClick={onClick}
                to={link}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
            >{text}</Link>
        )
    }

    if (type === 'typeText') {
        return (
            <Link
                style={{ ...styles.button, display: 'flex', 
                    justifyContent:"center", textDecoration: 'none', 
                    backgroundColor: hover ? '#1F1F1F' : '#fff',
                    color: hover? '#fff' : '#1F1F1F',
                    border: hover ? '1px solid  #1F1F1F' : '1px solid #ccc',
                    
                }}
                onClick={onClick}
                to={link}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
            >
                <TypeText text={text} />
            </Link>
        );
    }

    if (type === 'inverse') {
        return (
            <Link
                style={{ ...styles.button, textDecoration: 'none', 
                    backgroundColor: hover ? '#fff' : '#1F1F1F',
                    color: hover? '#1F1F1F' : '#fff',
                    border: hover ? '1px solid #fff' : '1px solid #1F1F1F',
                    
                }}
                onClick={onClick}
                to={link}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
            >{text}</Link>
        );
    }

    return (
        <Link
            style={{ ...styling, textDecoration: 'none', 
                backgroundColor: hover ? '#1F1F1F' : '#fff',
                color: hover? '#fff' : '#1F1F1F',
                border: hover ? '1px solid  #1F1F1F' : '1px solid #ccc',
                
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