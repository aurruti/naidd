import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import '../../styles/App.css';

import PageButton from '../../components/PageButton';

export default function NotFound() {
    const { i18n } = useTranslation();
    const t = i18n.t;
    
    useEffect(() => {
        const savedLanguage = localStorage.getItem('i18nextLng');
        if (savedLanguage) {
            i18n.changeLanguage(savedLanguage);
        }
    }, [i18n]);
  
    useEffect(() => {
      document.title = t('404.title');
    });

  
    return (
        <div style={styles.app} className="App">
            <h1 style={styles.h1}>{t('404.title')}</h1>
            <p style={styles.p}>{t('404.subtitle')}</p>
            <div style={{ height: '60px' }} />
            <div style={{ ...styles.app, display: 'flex', flexDirection: 'row' }}>
                <PageButton text={t('construction.home')} link="/" />
                <PageButton text={t('construction.projects')} link="/projects" />
            </div>
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