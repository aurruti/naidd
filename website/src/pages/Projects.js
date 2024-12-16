import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export default function ProjectsPage() {
    const t = useTranslation().t;

    useEffect(() => {
        document.title = t('construction.title');
    });

    return (
        <div style={styles.app} className="App">
            <h1 style={styles.h1}>{t('construction.title')}</h1>
            <p style={styles.p}>{t('construction.subtitle')}</p>
        </div>
    );
}

const styles = {
    app: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        textAlign: 'center',
        alignItems: 'center',
        padding: '80px',
    },
    h1: {
        color: '#333',
        fontSize: '3rem',
    },
    p: {
        color: '#666',
        fontSize: '1.5rem',
    },
};




