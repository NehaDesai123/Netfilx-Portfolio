import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';

const CardContainer = styled(motion.div)`
  flex-shrink: 0;
  width: clamp(220px, 25vw, 280px);
  cursor: pointer;
  background: transparent;
  
  @media (max-width: 768px) {
    width: 220px;
  }
`;

const MoreIcon = styled.i`
  position: absolute;
  top: 0.5rem;
  left: 0.5rem;
  font-size: 1.5rem;
  color: white;
  z-index: 2;
`;

const CardImage = styled.div`
  width: 100%;
  padding-top: 56.25%; /* 16:9 aspect ratio */
  background: ${props => props.image
    ? `url(${props.image}) center/cover no-repeat`
    : props.theme.colors.gradient
  };
  border-radius: 0.5rem;
  margin-bottom: 0.75rem;
  position: relative;
  overflow: hidden;

  &:hover {
    filter: brightness(0.9);
    box-shadow: 0 2px 15px #564d4d;
  }

`;

const CardContent = styled.div`
  padding: 0;
`;

const CardTitle = styled.h3`
  font-size: 1rem;
  font-weight: 500;
  color: ${props => props.theme.colors.text};
  margin: 0 0 0.25rem 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const CardSubtitle = styled.p`
  font-size: 0.875rem;
  color: ${props => props.theme.colors.textSecondary};
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ContentCard = ({ item, onClick, onMoreClick, index }) => {
  const { theme } = useTheme();

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        delay: index * 0.05,
        ease: 'easeOut'
      }
    }
  };

  return (
    <CardContainer
      theme={theme}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
      onClick={onClick}
      className="card-container"
    >
      <CardImage
        theme={theme}
        image={item.image}
        className="card-image"
      >
        {item.moreDetails && <MoreIcon className="ri-more-fill" onClick={(e) => {
          e.stopPropagation();
          console.log("after More icon clicked");
          onMoreClick(item);
        }} />}
      </CardImage>
      <CardContent className="card-content">
        {item.company && item.position ? (
          <>
            <CardTitle theme={theme} className="card-title">
              {item.company}
            </CardTitle>
            <CardSubtitle theme={theme} className="card-subtitle">
              {item.position}
            </CardSubtitle>
          </>
        ) : item.name && item.description ? (
          <>
            <CardTitle theme={theme} className="card-title">
              {item.name}
            </CardTitle>
            <CardSubtitle theme={theme} className="card-subtitle">
              {item.description}
            </CardSubtitle>
          </>
        ) : (
          <>
            <CardTitle theme={theme} className="card-title">
              {item.title}
            </CardTitle>
            <CardSubtitle theme={theme} className="card-subtitle">
              {item.subtitle}
            </CardSubtitle>
          </>
        )}
      </CardContent>
    </CardContainer>
  );
};

export default ContentCard;