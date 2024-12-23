import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import styled from 'styled-components';

import PageButton from '../components/PageButton';
import DrawText from '../components/DrawText';
import ProjectCardGrid from '../components/ProjectCardGrid';

import AaltoCcis from '../assets/thumbprojects/aaltoccis.jpg';
import DespesApp from '../assets/thumbprojects/despesapp.png';
import Heatwave from '../assets/thumbprojects/heatwave.jpg';
import Missingsensor from '../assets/thumbprojects/missingsensor.png';
import TFG from '../assets/thumbprojects/tfg1.png';
import PlaceholderHorizontal1 from '../assets/placeholder_horizontal_1.jpg';
import PlaceholderHorizontal2 from '../assets/placeholder_horizontal_2.jpg';

export default function ProjectsPage() {
    const { i18n } = useTranslation();
    const t = i18n.t;

    const cards = [
        { title: t("projects.TFM.title"), image: PlaceholderHorizontal1, link: 'projects/TFM', description: t("projects.TFM.intro") },
        { title: t("projects.naidd.title"), image: PlaceholderHorizontal2, link: 'projects/naidd', description: t("projects.naidd.intro") },
        { title: t("projects.warming-game.title"), image: Heatwave, link: 'projects/warming-game', description: t("projects.warming-game.intro"), color: "rgb(10, 138, 69," },
        { title: t("projects.despesapp.title"), image: DespesApp, link: 'projects/despesapp', description: t("projects.despesapp.intro"), color: "rgb(208, 58, 100," },
        { title: t("projects.missing-sensor.title"), image: Missingsensor, link: 'projects/missing-sensor', description: t("projects.missing-sensor.intro")},
        { title: t("projects.aalto-ccis.title"), image: AaltoCcis, link: 'projects/aalto-ccis', description: t("projects.aalto-ccis.intro"), color: "rgb(92, 13, 178,"  },
        { title: t("projects.TFG.title"), image: TFG, link: 'projects/TFG', description: t("projects.TFG.intro"), color: "rgb(0, 140, 127," },
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
            <div style={{ position: 'fixed', bottom: "10%", width: '100%', zIndex: 50, backgroundColor: 'transparent' }}>
                <div style={{backgroundColor: '#1C1C1C', height: 'auto'}}>
                <Centerstripe>
                    <DrawText text={t('projects.title').toUpperCase()}
                        strokeWidth = {10}
                        scale = {1.5}
                        letterSpacing={30}
                        xOffset={-10}
                        yOffset={-100}
                    />
                </Centerstripe>
                </div>
                <div style={{justifyContent:"center", display: 'flex', flexDirection: 'row', backgroundColor: 'transparent'}}>
                    <PageButton text={t('construction.home')} link="/" type='backSmall' /> 
                    <div style={{width: '50%'}}></div>
                </div>
            </div>
            
        </div>
    );
}

const Centerstripe = styled.div`
    width: 100%;
    max-width: 100vw;
    opacity: 1;
    z-index: 50;
    text-align: center;

    display: flex;
    justify-content: center;
    scale: 0.7;

    @media (max-width: 1200px) {
        scale: 0.5;
    }

    @media (max-width: 800px) {
        scale: 0.35;
    }
`;

const styles = {
    app: {
        display: 'flex',
        minHeight: '100vh',
        minWidth: '100vw',
        flexDirection: 'column',
        justifyContent: 'center',
        textAlign: 'center',
        alignItems: 'center',
        paddingTop: '0px',
    }
};




