import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import '../styles/App.css';

import DrawText from '../components/DrawText';
import PageButton from '../components/PageButton';

export default function Home() {
    const { i18n } = useTranslation();
    const t = i18n.t;
    
    useEffect(() => {
        const savedLanguage = localStorage.getItem('i18nextLng');
        if (savedLanguage) {
            i18n.changeLanguage(savedLanguage);
        }
    }, [i18n]);
  
    useEffect(() => {
      document.title = t('home.title');
    });
  
    return (
        <div style={styles.app} className="App">
            <DrawText text={t('home.title')}
                strokeWidth = {5}
                scale = {1.25}
                letterSpacing={12}
                yOffset={-100}
                letterAnimationDuration={2}
                letterDelay={0.25}
            ></DrawText>
            <p style={styles.p}>{t('home.subtitle')}</p>
            <div style={{ height: '60px' }} />
            <div style={{ ...styles.app, display: 'flex', flexDirection: 'row' }}>
                <PageButton text={t('construction.home')} link="/" />
                <PageButton text={t('construction.projects')} link="/projects" type="inverse"/>
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