import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

import PageButton from '../components/PageButton';
import DrawText from '../components/DrawText';
import ProjectCardGrid from '../components/ProjectCardGrid';

import PlaceholderHorizontal1 from '../assets/placeholder_horizontal_1.jpg';
import PlaceholderHorizontal2 from '../assets/placeholder_horizontal_2.jpg';

export default function ProjectsPage() {
    const { i18n } = useTranslation();
    const t = i18n.t;

    const cards = [
        { title: 'Naidd Webserver', image: PlaceholderHorizontal1, link: '/', description: 'A domestic server project.'},
        { title: 'Test 2', image: PlaceholderHorizontal2, link: '/page2' },
        { title: 'Test 3', image: PlaceholderHorizontal1, link: '/page3' },
        { title: 'Test 1', image: PlaceholderHorizontal1, link: '/page1' },
        { title: 'Test 2', image: PlaceholderHorizontal2, link: '/page2' },
        { title: 'Test 3', image: PlaceholderHorizontal1, link: '/page3' },
        { title: 'Test 1', image: PlaceholderHorizontal1, link: '/page1' },
        { title: 'Test 2', image: PlaceholderHorizontal2, link: '/page2' },
        { title: 'Test 3', image: PlaceholderHorizontal1, link: '/page3' },
        { title: 'Test 1', image: PlaceholderHorizontal1, link: '/page1' },
        { title: 'Test 2', image: PlaceholderHorizontal2, link: '/page2' },
        { title: 'Test 3', image: PlaceholderHorizontal1, link: '/page3' },
        { title: 'Test 1', image: PlaceholderHorizontal1, link: '/page1' },
        { title: 'Test 2', image: PlaceholderHorizontal2, link: '/page2' },
        { title: 'Test 3', image: PlaceholderHorizontal1, link: '/page3' }
    ];

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
            <motion.div style={{ overflow: 'hidden', width: '100%', height: '100%', zIndex: 10 }}>
                <ProjectCardGrid cards={cards} />
            </motion.div>
            <div style={{ position: 'fixed', bottom: "15%", width: '100%', zIndex: 50 }}>
                <motion.div style={styles.centerstripe}
                    whileHover={{opacity: 0.2}}
                >
                <div style={styles.centeringContainer}>
                    <div style={styles.scaleContainer}>
                        <DrawText text={t('projects.title').toUpperCase()}
                            strokeWidth = {10}
                            scale = {1.5}
                            letterSpacing={30}
                            xOffset={-10}
                            yOffset={-100}
                        />
                    </div>
                </div>
                </motion.div>
                <div style={{justifyContent:"center", display: 'flex', flexDirection: 'row' }}>
                    <PageButton text={t('construction.home')} link="/" type='backSmall' /> 
                </div>
            </div>
            
        </div>
    );
}

const styles = {
    centerstripe: {
        width: '100%',
        maxWidth: '100vw',
        overflow: 'hidden',
        backgroundColor: '#1C1C1C',
        opacity: 0.9,
        zIndex: 50,
        textAlign: 'center',
        paddingTop: '1%',
        paddingBottom: '1%',
    },
    scaleContainer: {
        width: 'clamp(300px, calc(100vw - 2rem), 1200px)',
        fontSize: 'clamp(1rem, calc(0.8rem + 1vw), 2rem)',
        margin: '0 auto',
        transform: 'scale(calc(min(1, 100vw / 1200px)))'
    },
    app: {
        display: 'flex',
        minHeight: '100vh',
        minWidth: '100vw',
        flexDirection: 'column',
        justifyContent: 'center',
        textAlign: 'center',
        alignItems: 'center',
        paddingTop: '0px',
        // paddingBottom: '80px',
    },
};




