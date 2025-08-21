import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';

const SelectorContainer = styled.div`
  position: relative;
`;

const ToggleButton = styled(motion.button)`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: ${props => props.theme.colors.gradient};
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${props => props.theme.colors.surface};
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover::before {
    opacity: 0.1;
  }
`;

const ThemeMenu = styled(motion.div)`
  position: absolute;
  right: 60px;
  top: 0;
  background: ${props => props.theme.colors.modalBackground};
  backdrop-filter: blur(20px);
  border-radius: 12px;
  padding: 1rem;
  min-width: 200px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
  border: 1px solid ${props => props.theme.colors.surface};
`;

const MenuHeader = styled.div`
  font-size: 0.9rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  margin-bottom: 0.5rem;
  text-align: center;
`;

const ThemeOption = styled(motion.button)`
  width: 100%;
  padding: 0.75rem;
  border: none;
  background: ${props => props.active 
    ? props.theme.colors.primary + '20' 
    : 'transparent'
  };
  color: ${props => props.theme.colors.text};
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.theme.colors.surface};
  }
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const ColorPreview = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: ${props => props.color};
  border: 2px solid ${props => props.theme.colors.surface};
  flex-shrink: 0;
`;

const ThemeName = styled.span`
  flex: 1;
  text-align: left;
`;

const CheckIcon = styled.span`
  color: ${props => props.theme.colors.primary};
  font-weight: bold;
  opacity: ${props => props.visible ? 1 : 0};
  transition: opacity 0.3s ease;
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: transparent;
  z-index: 999;
`;

const ThemeSelector = () => {
  const { theme, currentTheme, changeTheme, availableThemes } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const handleThemeChange = (themeKey) => {
    changeTheme(themeKey);
    setIsOpen(false);
  };


  const getThemeColor = (themeKey) => {
    const themeColors = {
      netflix: '#E50914',
      dark: '#BB86FC',
      light: '#1976D2',
      cyberpunk: '#00FF9F'
    };
    return themeColors[themeKey] || '#E50914';
  };

  return (
    <SelectorContainer>neha
      <ToggleButton
        theme={theme}
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.3 }}
      >
        🎨
      </ToggleButton>

      <AnimatePresence>
        {isOpen && (
          <>
            <Overlay
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
            
            <ThemeMenu
              theme={theme}
              initial={{ opacity: 0, scale: 0.8, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.8, x: 20 }}
              transition={{ duration: 0.2 }}
            >
              <MenuHeader theme={theme}>
                Choose Theme
              </MenuHeader>
              
              {availableThemes.map((themeOption) => (
                <ThemeOption
                  key={themeOption.key}
                  theme={theme}
                  active={currentTheme === themeOption.key}
                  onClick={() => handleThemeChange(themeOption.key)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <ColorPreview 
                    color={getThemeColor(themeOption.key)}
                    theme={theme}
                  />
                  <ThemeName>{themeOption.name}</ThemeName>
                  <CheckIcon 
                    theme={theme}
                    visible={currentTheme === themeOption.key}
                  >
                    ✓
                  </CheckIcon>
                </ThemeOption>
              ))}
            </ThemeMenu>
          </>
        )}
      </AnimatePresence>
    </SelectorContainer>
  );
};

export default ThemeSelector;
