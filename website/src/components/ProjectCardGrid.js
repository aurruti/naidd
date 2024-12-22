import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import placeholderImage from '../assets/placeholder_horizontal_1.jpg';

export const ProjectCard = ({ title, image = placeholderImage, link, description="lorem ipsum"}) => {
  const [isHovered, setIsHovered] = useState(false);

  return( 
    <motion.div
      whileTap={{ scale: 0.95 }}
      className="card"
      style={{
        ...styles.card,
        backgroundImage: `url(${image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
      }}
      onClick={() => window.location.href = link}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <motion.div style={{
        position: 'absolute',
        width: '0.75rem',
        right: '10%',
        backgroundColor: 'rgba(31, 31, 31, 1)',
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
          paddingRight: '1rem',
          paddingLeft: '1rem',
          right: '10%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end'
        }}
        initial = {{
          top: '1rem',
          paddingTop: 0,
          backgroundColor: 'rgba(31, 31, 31, 0.1)',
          height: '3rem',
          width: 'max-content',
        }}
        animate = {{
          top: isHovered ? 0 : '1rem',
          paddingTop: isHovered ? '1rem' : 0,
          backgroundColor: isHovered ? 'rgba(31, 31, 31, 0.5)' : 'rgba(31, 31, 31, 0.1)',
          height: isHovered ? '100%' : '3rem',
          width: isHovered ? '90%' : 'max-content',
        }}
        transition = {{
          width: { duration: 0.3, delay: isHovered ? 0.3 : 0 },
          backgroundColor: { duration: 0.3, delay: isHovered ? 0.3 : 0 },
          height: { duration: 0.3, delay: isHovered ? 0 : 0.3 },
          top: { duration: 0.3, delay: isHovered ? 0 : 0.3 },
          paddingTop: { duration: 0.3, delay: isHovered ? 0 : 0.3 },
          transition: 'ease'
        }}
      >
        <motion.h3 style={styles.cardTitle}
        >{title}</motion.h3>
        <motion.p style={styles.cardDescription}
          animate = {{
            opacity: isHovered ? 1 : 0,
          }}
          transition = {{
            transition: 'opacity 0.3s ease',
            delay: isHovered ? 0.5 : 0
          }}
        >{description}</motion.p>
      </motion.div>
    </motion.div>
)};

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
        {cards.map((card, index) => (
          <motion.div key={index} variants={{
            hidden: { opacity: 0.1},
            visible: { opacity: 1 },
          }}
            transition={{ duration: 1 }}
          >
            <ProjectCard
              title={card.title}
              description={card.description}
              image={card.image}
              link={card.link}
            />
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
    backgroundColor: '#000',
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