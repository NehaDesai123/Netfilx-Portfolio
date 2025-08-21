import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';

const HeroContainer = styled.section`
  min-height: calc(100vh - 80px);
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  @media (max-width: 768px) {
    min-height: calc(100vh - 70px);
  }
  
  @media (max-width: 480px) {
    min-height: calc(100vh - 60px);
  }
`;

const BackgroundVideo = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('/images/hero-bg.jpg') center/cover no-repeat;
  opacity: 0.1;
  z-index: 0;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: ${props => props.theme.colors.gradient};
    opacity: 0.3;
  }
`;

const HeroContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 2;
  width: 100%;
  
  @media (max-width: 768px) {
    padding: 0 1rem;
    text-align: center;
  }
`;

const HeroGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 2rem;
    text-align: center;
  }
`;

const TextContent = styled.div`
  max-width: 600px;
  
  @media (max-width: 1024px) {
    max-width: none;
  }
`;

const PreTitle = styled(motion.div)`
  color: ${props => props.theme.colors.primary};
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const Title = styled(motion.h1)`
  font-size: clamp(3rem, 8vw, 5rem);
  font-weight: 700;
  line-height: 1.1;
  margin-bottom: 1rem;
  background: ${props => props.theme.colors.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const Subtitle = styled(motion.h2)`
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  font-weight: 400;
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: 2rem;
  line-height: 1.3;
`;

const Description = styled(motion.p)`
  font-size: 1.2rem;
  line-height: 1.6;
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: 3rem;
  max-width: 500px;
  
  @media (max-width: 1024px) {
    max-width: none;
  }
`;

const ButtonGroup = styled(motion.div)`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  
  @media (max-width: 1024px) {
    justify-content: center;
  }
  
  @media (max-width: 480px) {
    flex-direction: column;
    align-items: center;
  }
`;

const PrimaryButton = styled(motion.button)`
  background: ${props => props.theme.colors.gradient};
  color: white;
  border: none;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 4px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: left 0.5s;
  }
  
  &:hover::before {
    left: 100%;
  }
`;

const SecondaryButton = styled(motion.button)`
  background: transparent;
  color: ${props => props.theme.colors.text};
  border: 2px solid ${props => props.theme.colors.primary};
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.theme.colors.primary};
    color: white;
  }
`;

const ProfileSection = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const ProfileImageContainer = styled(motion.div)`
  width: 400px;
  height: 400px;
  border-radius: 50%;
  background: black;
  padding: 4px;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    width: 300px;
    height: 300px;
  }
  
  @media (max-width: 480px) {
    width: 250px;
    height: 250px;
  }
`;

const ProfileImage = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  position: relative;
  overflow: hidden;
  background: transparent;
  
  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: url('/images/neha_desai.png') center/cover no-repeat;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    z-index: 1;
    transform: scale(1.2);
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    opacity: 0.05;
    transition: opacity 0.3s ease;
    z-index: 2;
  }
  
  &:hover::after {
    opacity: 0.1;
  }
`;


const StatsContainer = styled(motion.div)`
  display: flex;
  gap: 2rem;
  margin-top: 2rem;
  
  @media (max-width: 480px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatNumber = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: ${props => props.theme.colors.primary};
`;

const StatLabel = styled.div`
  font-size: 0.9rem;
  color: ${props => props.theme.colors.textSecondary};
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const Hero = ({ data, onExplore }) => {
  const { theme } = useTheme();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);


  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  };

  return (
    <HeroContainer theme={theme}>
      <BackgroundVideo theme={theme} />
      
      <HeroContent>
        <HeroGrid>
          <TextContent>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <PreTitle
                theme={theme}
                variants={itemVariants}
              >
                UI Developer
              </PreTitle>
              
              <Title
                theme={theme}
                variants={itemVariants}
              >
                {data.name}
              </Title>
              
              <Subtitle
                theme={theme}
                variants={itemVariants}
              >
                {data.tagline}
              </Subtitle>
              
              <Description
                theme={theme}
                variants={itemVariants}
              >
                {data.bio}
              </Description>
              
              <ButtonGroup variants={itemVariants}>
                <PrimaryButton
                  theme={theme}
                  onClick={onExplore}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Explore My Work
                </PrimaryButton>
                
                <SecondaryButton
                  theme={theme}
                  onClick={() => window.open(data.linkedin, '_blank')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Connect With Me
                </SecondaryButton>
              </ButtonGroup>
            </motion.div>
          </TextContent>

          <ProfileSection
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <ProfileImageContainer
              theme={theme}
              whileHover={{ scale: 1.05 }}
              animate={{
                rotateY: mousePosition.x * 0.1 - 5,
                rotateX: mousePosition.y * 0.1 - 5
              }}
              transition={{ type: 'spring', stiffness: 100, damping: 10 }}
            >
              <ProfileImage theme={theme} />
            </ProfileImageContainer>
            <StatsContainer
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              <StatItem>
                <StatNumber theme={theme}>4+</StatNumber>
                <StatLabel theme={theme}>Years Experience</StatLabel>
              </StatItem>
              <StatItem>
                <StatNumber theme={theme}>15+</StatNumber>
                <StatLabel theme={theme}>Projects Completed</StatLabel>
              </StatItem>
              <StatItem>
                <StatNumber theme={theme}>2</StatNumber>
                <StatLabel theme={theme}>Companies</StatLabel>
              </StatItem>
            </StatsContainer>
          </ProfileSection>
        </HeroGrid>
      </HeroContent>
    </HeroContainer>
  );
};

export default Hero;