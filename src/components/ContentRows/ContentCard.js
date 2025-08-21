import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';

const CardContainer = styled(motion.div)`
  position: relative;
  cursor: pointer;
  flex-shrink: 0;
  border-radius: 12px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid ${props => props.theme.colors.surface};
  transition: all 0.2s ease;
  width: 280px;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateY(-4px);
  }
  
  @media (max-width: 768px) {
    width: 240px;
  }
`;

const CardImage = styled.div`
  width: 100%;
  height: ${props => props.cardType === 'skill' ? '60%' : '70%'};
  background: ${props => props.image 
    ? `url(${props.image}) center/cover no-repeat` 
    : props.theme.colors.gradient
  };
  position: relative;
  overflow: hidden;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      to bottom,
      transparent 0%,
      rgba(0, 0, 0, 0.7) 100%
    );
  }
`;

const CardContent = styled.div`
  padding: 1rem;
  height: ${props => props.cardType === 'skill' ? '40%' : '30%'};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  z-index: 2;
`;

const CardTitle = styled.h3`
  font-size: ${props => props.cardType === 'skill' ? '0.9rem' : '1.1rem'};
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  margin-bottom: 0.25rem;
  line-height: 1.3;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const CardSubtitle = styled.p`
  font-size: 0.8rem;
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: 0.5rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const CardDescription = styled.p`
  font-size: 0.75rem;
  color: ${props => props.theme.colors.textSecondary};
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const CardMeta = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 0.5rem;
`;

const CardGenre = styled.span`
  font-size: 0.7rem;
  color: ${props => props.theme.colors.primary};
  background: ${props => props.theme.colors.primary}20;
  padding: 0.2rem 0.5rem;
  border-radius: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const CardYear = styled.span`
  font-size: 0.7rem;
  color: ${props => props.theme.colors.textSecondary};
`;

const SkillLevel = styled.div`
  width: 100%;
  height: 4px;
  background: ${props => props.theme.colors.surface};
  border-radius: 2px;
  overflow: hidden;
  margin-top: 0.5rem;
`;

const SkillProgress = styled(motion.div)`
  height: 100%;
  background: ${props => props.theme.colors.gradient};
  border-radius: 2px;
`;

const HoverOverlay = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${props => props.theme.colors.modalBackground};
  backdrop-filter: blur(10px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  text-align: center;
  z-index: 10;
`;

const HoverTitle = styled.h4`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  margin-bottom: 0.5rem;
`;

const HoverDescription = styled.p`
  font-size: 0.9rem;
  color: ${props => props.theme.colors.textSecondary};
  line-height: 1.4;
  margin-bottom: 1rem;
`;

const HoverButton = styled(motion.button)`
  background: ${props => props.theme.colors.gradient};
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
`;

const ContentCard = ({ item, onClick, index }) => {
  const { theme } = useTheme();
  const [isHovered, setIsHovered] = useState(false);

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
        ease: 'easeOut'
      }
    }
  };

  const hoverVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.2 }
    }
  };

  const getCardImage = () => {
    if (item.image) return item.image;
    
    // Fallback images based on type
    switch (item.type) {
      case 'skill':
        return `/images/skills/default.jpg`;
      case 'project':
        return `/images/projects/default.jpg`;
      case 'experience':
        return `/images/companies/default.jpg`;
      case 'achievement':
        return `/images/achievements/default.jpg`;
      default:
        return null;
    }
  };

  const renderCardContent = () => {
    switch (item.type) {
      case 'skill':
        return (
          <CardContent cardType="skill">
            <div>
              <CardTitle theme={theme} cardType="skill">
                {item.name}
              </CardTitle>
              <CardSubtitle theme={theme}>
                {item.category} • {item.experience}
              </CardSubtitle>
            </div>
            <SkillLevel theme={theme}>
              <SkillProgress
                theme={theme}
                initial={{ width: 0 }}
                animate={{ width: `${item.level}%` }}
                transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
              />
            </SkillLevel>
          </CardContent>
        );
      
      case 'project':
        return (
          <CardContent cardType="project">
            <div>
              <CardTitle theme={theme} cardType="project">
                {item.title}
              </CardTitle>
              <CardSubtitle theme={theme}>
                {item.category}
              </CardSubtitle>
              <CardDescription theme={theme}>
                {item.description}
              </CardDescription>
            </div>
            <CardMeta>
              <CardGenre theme={theme}>
                {item.genre || item.category}
              </CardGenre>
              <CardYear theme={theme}>
                {item.year || new Date().getFullYear()}
              </CardYear>
            </CardMeta>
          </CardContent>
        );
      
      case 'experience':
        return (
          <CardContent cardType="experience">
            <div>
              <CardTitle theme={theme} cardType="experience">
                {item.title || item.position}
              </CardTitle>
              <CardSubtitle theme={theme}>
                {item.subtitle || item.company}
              </CardSubtitle>
              <CardDescription theme={theme}>
                {item.description}
              </CardDescription>
            </div>
            <CardMeta>
              <CardGenre theme={theme}>
                {item.genre}
              </CardGenre>
              <CardYear theme={theme}>
                {item.year || item.duration?.split(' - ')[0]}
              </CardYear>
            </CardMeta>
          </CardContent>
        );
      
      case 'achievement':
        return (
          <CardContent cardType="achievement">
            <div>
              <CardTitle theme={theme} cardType="achievement">
                {item.title}
              </CardTitle>
              <CardSubtitle theme={theme}>
                {item.subtitle || item.organization}
              </CardSubtitle>
              <CardDescription theme={theme}>
                {item.description}
              </CardDescription>
            </div>
            <CardMeta>
              <CardGenre theme={theme}>
                {item.genre || item.category}
              </CardGenre>
              <CardYear theme={theme}>
                {item.year}
              </CardYear>
            </CardMeta>
          </CardContent>
        );
      
      default:
        return (
          <CardContent>
            <CardTitle theme={theme}>
              {item.title || item.name}
            </CardTitle>
            <CardDescription theme={theme}>
              {item.description}
            </CardDescription>
          </CardContent>
        );
    }
  };

  return (
    <CardContainer
      theme={theme}
      cardType={item.type}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ 
        scale: 1.05,
        y: -10,
        transition: { duration: 0.3 }
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick}
    >
      <CardImage
        theme={theme}
        cardType={item.type}
        image={getCardImage()}
      />
      
      {renderCardContent()}
      
      {isHovered && (
        <HoverOverlay
          theme={theme}
          variants={hoverVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <HoverTitle theme={theme}>
            {item.title || item.name}
          </HoverTitle>
          <HoverDescription theme={theme}>
            Click to learn more about this {item.type}
          </HoverDescription>
          <HoverButton
            theme={theme}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            More Info
          </HoverButton>
        </HoverOverlay>
      )}
    </CardContainer>
  );
};

export default ContentCard;