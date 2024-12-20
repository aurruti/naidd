import React, { useState, useEffect } from 'react';
import ProjectCard from './ProjectCard';
import styled from 'styled-components';


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
    <ProjectCardGridContainer columns={columns}>
      {cards.map((card, index) => (
        <ProjectCard
          key={index}
          title={card.title}
          image={card.image}
          link={card.link}
        />
      ))}
    </ProjectCardGridContainer>
  );
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