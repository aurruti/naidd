import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import placeholderImage from '../assets/placeholder_horizontal_1.jpg';
import { MdArrowCircleRight } from 'react-icons/md';

const FutureProjectCard = () => {
  const t = useTranslation().t;
  return (
    <div style={{ ...styles.card, cursor: 'default' }}>
      <h3 style={{ ...styles.cardTitle, fontSize: '1rem', fontWeight:"lighter", color: 'rgba(31, 31, 31, 0.9)' }}>
        {t("projects.future")}
      </h3>
    </div>
  );
}

export const ProjectCard = ({ title, image = placeholderImage, link, description="lorem ipsum", color="rgba(31, 31, 31,"}) => {
  const t = useTranslation().t;
  const [isHovered, setIsHovered] = useState(false);
  const [delayDesc, setDelayDesc] = useState(false);
  function startDelayDesc(delay, True = true) {
    setTimeout(() => {
      setDelayDesc(True);
    }, delay * 1000);
  }

  return( 
    <motion.div
      whileTap={{ scale: 0.95 }}
      className="card"
      style={{
        ...styles.card,
        position: 'relative',
      }}
      onClick={() => window.location.href = link}
      onHoverStart={() => { setIsHovered(true); startDelayDesc(0.3, true) }}
      onHoverEnd={() => { setIsHovered(false); startDelayDesc(0.1, false) }}
      aria-label={title}
      aria-description={description}
    >
      <motion.div style={{
        position: 'absolute',
        backgroundImage: `url(${image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -1,
      }} 
        initial={{
          filter: 'blur(0px)',
        }}
        animate={{
          filter: isHovered ? 'blur(2px)' : 'blur(0px)',
        }}
        transition={{
          filter: { duration: 0.3, delay: isHovered ? 0 : 0.3 },
          transition: 'ease'
        }}
      />
      <motion.div style={{
        position: 'absolute',
        width: '0.75rem',
        right: '10%',
        backgroundColor: `${color} 1)`,
        }}
        initial = {{
          height: '3rem',
          top: '1rem',
        }}
        animate = {{
          height: isHovered ? '100%' : '3rem',
          top: isHovered ? 0 : '1rem',
        }}
        transition= {{
          height: { duration: 0.3, delay: isHovered ? 0 : 0.3 },
          top: { duration: 0.3, delay: isHovered ? 0 : 0.3 },
          transition: 'ease'
        }}
      >
      </motion.div>
      <motion.div style={{
          position: 'absolute',
          paddingRight: '1.25rem',
          paddingLeft: '0.75rem',
          right: '10%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end'
        }}
        initial={{
          top: '1rem',
          paddingTop: 0,
          backgroundColor: `${color} 0.1)`,
          height: '3rem',
          width: 'max-content',
        }}
        animate={{
          top: isHovered ? 0 : '1rem',
          paddingTop: isHovered ? '1rem' : 0,
          backgroundColor: isHovered ? `${color} 0.5)` : `${color} 0.1)`,
          height: isHovered ? '100%' : '3rem',
          width: isHovered ? '90%' : 'max-content',
        }}
        transition={{
          width: { duration: isHovered ? 0.3 : 0.2, delay: isHovered ? 0.3 : 0.1 },
          backgroundColor: { duration: 0.3, delay: isHovered ? 0.3 : 0 },
          height: { duration: 0.3, delay: isHovered ? 0 : 0.3 },
          top: { duration: 0.3, delay: isHovered ? 0 : 0.3 },
          paddingTop: { duration: 0.3, delay: isHovered ? 0 : 0.3 },
          transition: 'ease'
        }}
      >
        <motion.h3 style={styles.cardTitle}>{title}</motion.h3>
        <AnimatePresence>
          { isHovered && delayDesc && (
            <motion.div
              key={"cardDescription"}
              style={styles.cardDescription}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
               opacity: { duration: isHovered ? 0.3 : 0.1, delay: isHovered ? 0.3 : 0 },
               transition: 'ease'
              }}
            >
              <motion.p>{description}</motion.p>
              <motion.div style={{marginTop:"2rem", display:"flex", flexDirection:"row", justifyContent:"right"}}>
                <motion.p style={{fontStyle:"italic"}}>{t("projects.more")}</motion.p>
                <MdArrowCircleRight style={{margin:"0.3rem"}}/>
              </motion.div>

            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );};

const ProjectCardGrid = ({ cards }) => {
  const [columns, setColumns] = useState(getColumns());

  useEffect(() => {
    const handleResize = () => {
      setColumns(getColumns());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  function getColumns() {
    if (window.innerWidth <= 800) return 1;
    if (window.innerWidth <= 1200) return 2;
    return 3;
  }

  // add extra empty cards to complete the grid
  const cardsCopy = [...cards];
  const emptyCards = new Array((2 * columns - ((cards.length+2) % (2 * columns))) % (2 * columns)).fill(null);
  if (columns === 1) emptyCards.push(null); // ensure +2 extra cards for the one column layout
  const newCards = [...cardsCopy, ...emptyCards];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            duration: 1,
            staggerChildren: 0.5,
          },
        },
      }}
    >
      <ProjectCardGridContainer columns={columns}>
        {newCards.map((card, index) => (
          <motion.div key={index} variants={{
            hidden: { opacity: 0.1 },
            visible: { opacity: 1 },
          }}
            transition={{ duration: 1 }}
          >
            {card ? (
              <ProjectCard
                title={card.title}
                description={card.description}
                image={card.image}
                link={card.link}
                color={card.color}
              />
            ) : (
              <FutureProjectCard />
            )}
          </motion.div>
        ))}
      </ProjectCardGridContainer>
    </motion.div>
  );
};

const styles = {
  card: {
    cursor: 'pointer',
    width: '100%',
    aspectRatio: '16 / 9',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    color: 'white',
    backgroundColor: 'transparent',
    boxShadow: '0 4px 8px rgba(31, 31, 31, 0.1)',
  },
  cardTitle: {
    margin: 0,
    fontSize: '2rem',
    fontFamily: 'Helvetica, sans-serif',
    opacity: 1,
    color: 'white',
    textAlign: 'right',
    width: 'max-content',
  },
  cardDescription: {
    margin: 0,
    fontSize: '1rem',
    fontFamily: 'Helvetica, sans-serif',
    opacity: 1,
    padding: '0.5rem',
    textAlign: 'right',
  },
};

const ProjectCardGridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 100%;
  grid-template-columns: ${({ columns }) => `repeat(${columns}, 1fr)`};
  width: 100%;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 800px) {
    grid-template-columns: 1fr;
  }
`;

export default ProjectCardGrid;