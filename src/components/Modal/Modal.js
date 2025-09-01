import { useEffect } from 'react';
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
  backdrop-filter: blur(10px);
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
  background: rgb(20, 20, 20);
  border: none;
  color: ${props => props.theme.colors.text};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  z-index: 10;
  
  &:focus,
  &:hover {
    color: white;
    background: ${props => props.theme.colors.surface};
    outline: none;
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

const Modal = ({ data, onClose, isOpen }) => {
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

    return (
      <>
        <ModalHeader theme={theme}>
          <ModalTitle theme={theme}>{data.position || data.title || data.name}</ModalTitle>
          {data.company && data.duration && (
            <ModalSubtitle theme={theme}>
              {data.company} • {data.duration}
            </ModalSubtitle>
          )}
        </ModalHeader>
        <ModalBody>
          <ModalDescription theme={theme}>
            {data.description}
          </ModalDescription>
        </ModalBody>
      </>
    );
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