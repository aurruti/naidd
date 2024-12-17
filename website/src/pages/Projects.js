import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import PageButton from '../components/PageButton';

export default function ProjectsPage() {
    const { i18n } = useTranslation();
    const t = i18n.t;
    
    useEffect(() => {
        const savedLanguage = localStorage.getItem('i18nextLng');
        if (savedLanguage) {
            i18n.changeLanguage(savedLanguage);
        }
    }, [i18n]);

    useEffect(() => {
        document.title = t('projects.title');
    });

    return (
        <div style={styles.app} className="App">
            <h1 style={styles.h1}>{t('projects.title')}</h1>
            <p style={styles.p}>{t('projects.subtitle')}</p>
            <div style={{ height: '60px' }} />
            <div style={{ ...styles.app, display: 'flex', flexDirection: 'row' }}>
                <PageButton text={t('construction.home')} link="/" />
            </div>
            <div style={{ height: '100vh' }} />
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
        color: 'white',
        fontSize: '3rem',
    },
    p: {
        color: '#C2C2C2',
        fontSize: '1.5rem',
    },
};




