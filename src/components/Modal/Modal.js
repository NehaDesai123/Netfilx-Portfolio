import React, { useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';

const ModalOverlay = styled(motion.div).attrs({
  className: 'modal-overlay'
})`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${props => props.theme.colors.modalBackground};
  backdrop-filter: blur(20px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  
  @media (max-width: 768px) {
    padding: 1rem;
    align-items: flex-start;
    padding-top: 2rem;
  }
`;

const ModalContent = styled(motion.div).attrs({
  className: 'modal-content'
})`
  background: ${props => props.theme.colors.background};
  border-radius: 12px;
  max-width: 800px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  border: 1px solid ${props => props.theme.colors.surface};
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  
  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: ${props => props.theme.colors.surface};
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${props => props.theme.colors.primary};
    border-radius: 4px;
  }
`;

const CloseButton = styled(motion.button).attrs({
  className: 'modal-close-button'
})`
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${props => props.theme.colors.surface};
  border: none;
  color: ${props => props.theme.colors.text};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  z-index: 10;
  
  &:hover {
    background: ${props => props.theme.colors.primary};
    color: white;
  }
`;

const ModalHeader = styled.div.attrs({
  className: 'modal-header'
})`
  position: relative;
  padding: 2rem 2rem 1rem 2rem;
  border-radius: 12px 12px 0 0;
  border-bottom: 1px solid ${props => props.theme.colors.surface};
  
  @media (max-width: 768px) {
    padding: 1.5rem 1.5rem 1rem 1.5rem;
  }
`;

const ModalBody = styled.div.attrs({
  className: 'modal-body'
})`
  padding: 0 2rem 2rem 2rem;
  
  @media (max-width: 768px) {
    padding: 0 1.5rem 1.5rem 1.5rem;
  }
`;

const ModalTitle = styled.h2.attrs({
  className: 'modal-title'
})`
  font-size: 2rem;
  font-weight: 700;
  color: white;
  margin: 0;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const ModalSubtitle = styled.p.attrs({
  className: 'modal-subtitle'
})`
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.8);
  margin: 0.5rem 0 0 0;
`;

const ModalDescription = styled.p.attrs({
  className: 'modal-description'
})`
  font-size: 1rem;
  line-height: 1.6;
  color: ${props => props.theme.colors.text};
  margin: 2rem 0;
`;

const MetaGrid = styled.div.attrs({
  className: 'grid-standard'
})`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const MetaItem = styled.div.attrs({
  className: 'modal-meta-item'
})`
  background: ${props => props.theme.colors.surface};
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid ${props => props.theme.colors.surface};
`;

const MetaLabel = styled.div.attrs({
  className: 'modal-meta-label'
})`
  font-size: 0.8rem;
  color: ${props => props.theme.colors.textSecondary};
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 0.5rem;
`;

const MetaValue = styled.div.attrs({
  className: 'modal-meta-value'
})`
  font-size: 1rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
`;

const TagsContainer = styled.div.attrs({
  className: 'modal-tags-container'
})`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 2rem;
`;

const Tag = styled.span.attrs({
  className: 'modal-tag'
})`
  background: ${props => props.theme.colors.primary}20;
  color: ${props => props.theme.colors.primary};
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
`;

const ListSection = styled.div.attrs({
  className: 'modal-list-section'
})`
  margin-bottom: 2rem;
`;

const ListTitle = styled.h3.attrs({
  className: 'modal-list-title'
})`
  font-size: 1.2rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  margin-bottom: 1rem;
`;

const List = styled.ul.attrs({
  className: 'modal-list'
})`
  list-style: none;
  padding: 0;
`;

const ListItem = styled.li.attrs({
  className: 'modal-list-item'
})`
  padding: 0.5rem 0;
  color: ${props => props.theme.colors.textSecondary};
  border-bottom: 1px solid ${props => props.theme.colors.surface};
  
  &:last-child {
    border-bottom: none;
  }
  
  &::before {
    content: '•';
    color: ${props => props.theme.colors.primary};
    font-weight: bold;
    display: inline-block;
    width: 1em;
    margin-right: 0.5rem;
  }
`;

const ButtonGroup = styled.div.attrs({
  className: 'modal-button-group'
})`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  
  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const ActionButton = styled(motion.button).attrs({
  className: 'modal-action-button'
})`
  background: ${props => props.primary
    ? props.theme.colors.gradient
    : 'transparent'
  };
  color: ${props => props.primary
    ? 'white'
    : props.theme.colors.text
  };
  border: ${props => props.primary
    ? 'none'
    : `2px solid ${props.theme.colors.primary}`
  };
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.primary
      ? props.theme.colors.hover
      : props.theme.colors.primary
    };
    color: white;
  }
`;

const SkillProgress = styled.div.attrs({
  className: 'modal-skill-progress'
})`
  width: 100%;
  height: 8px;
  background: ${props => props.theme.colors.surface};
  border-radius: 4px;
  overflow: hidden;
  margin-top: 0.5rem;
`;

const SkillBar = styled(motion.div).attrs({
  className: 'modal-skill-bar'
})`
  height: 100%;
  background: ${props => props.theme.colors.gradient};
  border-radius: 4px;
`;

const Modal = ({ type, data, onClose, isOpen }) => {
  const { theme } = useTheme();

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const modalVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      y: 50
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 25,
        stiffness: 300
      }
    }
  };

  const renderModalContent = () => {
    if (!data) return null;

    switch (type) {
      case 'skill':
        return (
          <>
            <ModalHeader theme={theme}>
              <ModalTitle theme={theme}>{data.name}</ModalTitle>
              <ModalSubtitle theme={theme}>
                {data.category} • {data.experience}
              </ModalSubtitle>
            </ModalHeader>
            <ModalBody>
              
              <MetaGrid>
                <MetaItem theme={theme}>
                  <MetaLabel theme={theme}>Proficiency Level</MetaLabel>
                  <MetaValue theme={theme}>{data.level}%</MetaValue>
                  <SkillProgress theme={theme}>
                    <SkillBar
                      theme={theme}
                      initial={{ width: 0 }}
                      animate={{ width: `${data.level}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                    />
                  </SkillProgress>
                </MetaItem>
                <MetaItem theme={theme}>
                  <MetaLabel theme={theme}>Experience</MetaLabel>
                  <MetaValue theme={theme}>{data.experience}</MetaValue>
                </MetaItem>
                <MetaItem theme={theme}>
                  <MetaLabel theme={theme}>Category</MetaLabel>
                  <MetaValue theme={theme}>{data.category}</MetaValue>
                </MetaItem>
              </MetaGrid>
              
              <ModalDescription theme={theme}>
                {data.description || `Extensive experience working with ${data.name} in various projects and professional environments. This skill has been instrumental in delivering high-quality solutions and maintaining modern development standards.`}
              </ModalDescription>
            </ModalBody>
          </>
        );

      case 'project':
        return (
          <>
            <ModalHeader theme={theme}>
              <ModalTitle theme={theme}>{data.title}</ModalTitle>
              <ModalSubtitle theme={theme}>
                {data.category} • {data.duration}
              </ModalSubtitle>
            </ModalHeader>
            <ModalBody>
              
              <ModalDescription theme={theme}>
                {data.longDescription || data.description}
              </ModalDescription>
              
              <MetaGrid>
                <MetaItem theme={theme}>
                  <MetaLabel theme={theme}>Type</MetaLabel>
                  <MetaValue theme={theme}>{data.type}</MetaValue>
                </MetaItem>
                <MetaItem theme={theme}>
                  <MetaLabel theme={theme}>Duration</MetaLabel>
                  <MetaValue theme={theme}>{data.duration}</MetaValue>
                </MetaItem>
                <MetaItem theme={theme}>
                  <MetaLabel theme={theme}>Status</MetaLabel>
                  <MetaValue theme={theme}>{data.status}</MetaValue>
                </MetaItem>
              </MetaGrid>
              
              {data.technologies && (
                <>
                  <ListTitle theme={theme}>Technologies Used</ListTitle>
                  <TagsContainer>
                    {data.technologies.map((tech, index) => (
                      <Tag key={index} theme={theme}>{tech}</Tag>
                    ))}
                  </TagsContainer>
                </>
              )}
              
              {data.features && (
                <ListSection>
                  <ListTitle theme={theme}>Key Features</ListTitle>
                  <List>
                    {data.features.map((feature, index) => (
                      <ListItem key={index} theme={theme}>{feature}</ListItem>
                    ))}
                  </List>
                </ListSection>
              )}
              
              {data.impact && (
                <ListSection>
                  <ListTitle theme={theme}>Impact</ListTitle>
                  <ModalDescription theme={theme}>{data.impact}</ModalDescription>
                </ListSection>
              )}
              
              <ButtonGroup>
                {data.liveUrl && data.liveUrl !== 'Internal System' && (
                  <ActionButton
                    theme={theme}
                    primary
                    onClick={() => window.open(data.liveUrl, '_blank')}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    View Live Project
                  </ActionButton>
                )}
                {data.githubUrl && data.githubUrl !== 'Private Repository' && (
                  <ActionButton
                    theme={theme}
                    onClick={() => window.open(data.githubUrl, '_blank')}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    View Code
                  </ActionButton>
                )}
              </ButtonGroup>
            </ModalBody>
          </>
        );

      case 'experience':
        return (
          <>
            <ModalHeader theme={theme}>
              <ModalTitle theme={theme}>{data.position}</ModalTitle>
              <ModalSubtitle theme={theme}>
                {data.company} • {data.duration}
              </ModalSubtitle>
            </ModalHeader>
            <ModalBody>
              
              <ModalDescription theme={theme}>
                {data.description}
              </ModalDescription>
              
              <MetaGrid>
                <MetaItem theme={theme}>
                  <MetaLabel theme={theme}>Company</MetaLabel>
                  <MetaValue theme={theme}>{data.company}</MetaValue>
                </MetaItem>
                <MetaItem theme={theme}>
                  <MetaLabel theme={theme}>Duration</MetaLabel>
                  <MetaValue theme={theme}>{data.duration}</MetaValue>
                </MetaItem>
                <MetaItem theme={theme}>
                  <MetaLabel theme={theme}>Location</MetaLabel>
                  <MetaValue theme={theme}>{data.location}</MetaValue>
                </MetaItem>
                <MetaItem theme={theme}>
                  <MetaLabel theme={theme}>Type</MetaLabel>
                  <MetaValue theme={theme}>{data.type}</MetaValue>
                </MetaItem>
              </MetaGrid>
              
              {data.technologies && (
                <>
                  <ListTitle theme={theme}>Technologies</ListTitle>
                  <TagsContainer>
                    {data.technologies.map((tech, index) => (
                      <Tag key={index} theme={theme}>{tech}</Tag>
                    ))}
                  </TagsContainer>
                </>
              )}
              
              {data.achievements && (
                <ListSection>
                  <ListTitle theme={theme}>Key Achievements</ListTitle>
                  <List>
                    {data.achievements.map((achievement, index) => (
                      <ListItem key={index} theme={theme}>{achievement}</ListItem>
                    ))}
                  </List>
                </ListSection>
              )}
              
              {data.projects && (
                <ListSection>
                  <ListTitle theme={theme}>Projects</ListTitle>
                  <List>
                    {data.projects.map((project, index) => (
                      <ListItem key={index} theme={theme}>{project}</ListItem>
                    ))}
                  </List>
                </ListSection>
              )}
            </ModalBody>
          </>
        );

      case 'education':
        return (
          <>
            <ModalHeader theme={theme}>
              <ModalTitle theme={theme}>{data.degree}</ModalTitle>
              <ModalSubtitle theme={theme}>
                {data.institution} • {data.duration}
              </ModalSubtitle>
            </ModalHeader>
            <ModalBody>
              
              <ModalDescription theme={theme}>
                {data.description}
              </ModalDescription>
              
              <MetaGrid>
                <MetaItem theme={theme}>
                  <MetaLabel theme={theme}>Institution</MetaLabel>
                  <MetaValue theme={theme}>{data.institution}</MetaValue>
                </MetaItem>
                <MetaItem theme={theme}>
                  <MetaLabel theme={theme}>Duration</MetaLabel>
                  <MetaValue theme={theme}>{data.duration}</MetaValue>
                </MetaItem>
                <MetaItem theme={theme}>
                  <MetaLabel theme={theme}>Location</MetaLabel>
                  <MetaValue theme={theme}>{data.location}</MetaValue>
                </MetaItem>
                <MetaItem theme={theme}>
                  <MetaLabel theme={theme}>Type</MetaLabel>
                  <MetaValue theme={theme}>{data.type}</MetaValue>
                </MetaItem>
              </MetaGrid>
              
              {data.subjects && (
                <>
                  <ListTitle theme={theme}>Key Subjects</ListTitle>
                  <TagsContainer>
                    {data.subjects.map((subject, index) => (
                      <Tag key={index} theme={theme}>{subject}</Tag>
                    ))}
                  </TagsContainer>
                </>
              )}
              
              {data.achievements && (
                <ListSection>
                  <ListTitle theme={theme}>Achievements</ListTitle>
                  <List>
                    {data.achievements.map((achievement, index) => (
                      <ListItem key={index} theme={theme}>{achievement}</ListItem>
                    ))}
                  </List>
                </ListSection>
              )}
            </ModalBody>
          </>
        );

      case 'achievement':
        return (
          <>
            <ModalHeader theme={theme}>
              <ModalTitle theme={theme}>{data.title}</ModalTitle>
              <ModalSubtitle theme={theme}>
                {data.organization} • {data.year}
              </ModalSubtitle>
            </ModalHeader>
            <ModalBody>
              
              <ModalDescription theme={theme}>
                {data.description}
              </ModalDescription>
              
              <MetaGrid>
                <MetaItem theme={theme}>
                  <MetaLabel theme={theme}>Organization</MetaLabel>
                  <MetaValue theme={theme}>{data.organization}</MetaValue>
                </MetaItem>
                <MetaItem theme={theme}>
                  <MetaLabel theme={theme}>Year</MetaLabel>
                  <MetaValue theme={theme}>{data.year}</MetaValue>
                </MetaItem>
                <MetaItem theme={theme}>
                  <MetaLabel theme={theme}>Category</MetaLabel>
                  <MetaValue theme={theme}>{data.category}</MetaValue>
                </MetaItem>
              </MetaGrid>
            </ModalBody>
          </>
        );

      case 'profile':
        return (
          <>
            <ModalHeader theme={theme}>
              <ModalTitle theme={theme}>{data.name}</ModalTitle>
              <ModalSubtitle theme={theme}>
                {data.title} • {data.location}
              </ModalSubtitle>
            </ModalHeader>
            <ModalBody>
              
              <ModalDescription theme={theme}>
                {data.description}
              </ModalDescription>
              
              <MetaGrid>
                <MetaItem theme={theme}>
                  <MetaLabel theme={theme}>Email</MetaLabel>
                  <MetaValue theme={theme}>{data.email}</MetaValue>
                </MetaItem>
                <MetaItem theme={theme}>
                  <MetaLabel theme={theme}>Phone</MetaLabel>
                  <MetaValue theme={theme}>{data.phone}</MetaValue>
                </MetaItem>
                <MetaItem theme={theme}>
                  <MetaLabel theme={theme}>Location</MetaLabel>
                  <MetaValue theme={theme}>{data.location}</MetaValue>
                </MetaItem>
                <MetaItem theme={theme}>
                  <MetaLabel theme={theme}>LinkedIn</MetaLabel>
                  <MetaValue theme={theme}>
                    <a
                      href={`https://${data.linkedin}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: 'inherit', textDecoration: 'none' }}
                    >
                      {data.linkedin}
                    </a>
                  </MetaValue>
                </MetaItem>
              </MetaGrid>
              
              <ButtonGroup>
                <ActionButton
                  theme={theme}
                  primary
                  onClick={() => window.open(`mailto:${data.email}`, '_blank')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Send Email
                </ActionButton>
                <ActionButton
                  theme={theme}
                  onClick={() => window.open(`https://${data.linkedin}`, '_blank')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View LinkedIn
                </ActionButton>
              </ButtonGroup>
            </ModalBody>
          </>
        );

      default:
        return (
          <ModalBody>
            <ModalTitle theme={theme}>{data.title || data.name}</ModalTitle>
            <ModalDescription theme={theme}>
              {data.description}
            </ModalDescription>
          </ModalBody>
        );
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <ModalOverlay
          theme={theme}
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={onClose}
        >
          <ModalContent
            theme={theme}
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <CloseButton
              theme={theme}
              onClick={onClose}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              ×
            </CloseButton>
            
            {renderModalContent()}
          </ModalContent>
        </ModalOverlay>
      )}
    </AnimatePresence>
  );
};

export default Modal;