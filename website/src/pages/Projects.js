import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
// import { motion } from 'framer-motion';

import PageButton from '../components/PageButton';
import DrawText from '../components/DrawText';

// import SvgLetterToMotionPath from '../fun/SvgLetterToMotionPath';

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
            <DrawText text={t('projects.title').toUpperCase()}
                strokeWidth = {7}
                scale = {1.5}
                letterSpacing={30}
                yOffset={-100}
            />
            <p style={styles.p}>{t('projects.subtitle')}</p>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <PageButton text={t('construction.home')} link="/" /> 
            </div>
        </div>
    );
}

const styles = {
    centerstripe: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width: '100%',
        height: '5rem',
        textAlign: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        opacity: 0.8,
        zIndex: 10,
    },
    app: {
        display: 'flex',
        minHeight: '100vh',
        flexDirection: 'column',
        justifyContent: 'center',
        textAlign: 'center',
        alignItems: 'center',
        paddingTop: '0px',
        paddingBottom: '80px',
        zIndex: 0,
    },
    centertitle: {
        color: 'black',
        fontFamily: 'Helvetica, sans-serif',
        fontSize: '3rem',
        textTransform: 'uppercase',
    },
    p: {
        color: '#C2C2C2',
        fontSize: '1.5rem',
    },
};




