import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';

const HeaderContainer = styled(motion.header)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: ${props => props.scrolled
    ? `${props.theme.colors.background}95`
    : 'transparent'
  };
  backdrop-filter: ${props => props.scrolled ? 'blur(10px)' : 'none'};
  transition: all 0.3s ease;
  padding: 1rem 0;
`;

const HeaderContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  bottom: 1.5rem;
  
  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`;

const Logo = styled(motion.div)`
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const LogoImage = styled.img`
  height: 50px;
  width: auto;
  object-fit: contain;
  
  @media (max-width: 768px) {
    height: 32px;
  }
  
  @media (max-width: 480px) {
    height: 28px;
  }
`;

const LogoText = styled(motion.h1)`
  font-size: 28px;
  font-weight: 700;
  color: ${props => props.theme.colors.primary};
  margin: 0;
  letter-spacing: -1px;
  
  @media (max-width: 768px) {
    font-size: 24px;
  }
  
  @media (max-width: 480px) {
    display: none;
  }
`;

const Navigation = styled.nav`
  display: flex;
  align-items: center;
  gap: 2rem;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(motion.a)`
  color: ${props => props.theme.colors.text};
  text-decoration: none;
  font-weight: 500;
  position: relative;
  cursor: pointer;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 0;
    height: 2px;
    background: ${props => props.theme.colors.primary};
    transition: width 0.3s ease;
  }
  
  &:hover::after {
    width: 100%;
  }
`;

const NotificationButton = styled(motion.button)`
  background: none;
  border: none;
  color: ${props => props.theme.colors.text};
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  
  &:hover {
    background: ${props => props.theme.colors.surface};
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 8px;
    right: 8px;
    width: 8px;
    height: 8px;
    background: ${props => props.theme.colors.primary};
    border-radius: 50%;
    opacity: 0.8;
  }
`;

const UserProfile = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  transition: background 0.2s ease;
  
  &:hover {
    background: ${props => props.theme.colors.surface};
  }
`;

const UserAvatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 4px;
  object-fit: cover;
`;

const UserName = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: ${props => props.theme.colors.text};
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const SearchInput = styled(motion.input)`
  background: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.surface};
  border-radius: 4px;
  padding: 0.5rem 1rem;
  color: ${props => props.theme.colors.text};
  font-size: 0.9rem;
  width: ${props => props.expanded ? '250px' : '0'};
  opacity: ${props => props.expanded ? '1' : '0'};
  transition: all 0.3s ease;
  
  &::placeholder {
    color: ${props => props.theme.colors.textSecondary};
  }
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
  
  @media (max-width: 768px) {
    width: ${props => props.expanded ? '200px' : '0'};
  }
`;
const MobileMenuButton = styled(motion.button)`
  display: none;
  background: none;
  border: none;
  color: ${props => props.theme.colors.text};
  cursor: pointer;
  padding: 0.5rem;
  flex-direction: column;
  gap: 4px;
  
  @media (max-width: 768px) {
    display: flex;
  }
`;

const MenuLine = styled(motion.div)`
  width: 24px;
  height: 2px;
  background: ${props => props.theme.colors.text};
  border-radius: 1px;
`;

const MobileMenu = styled(motion.div)`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: ${props => props.theme.colors.background}95;
  backdrop-filter: blur(10px);
  padding: 1rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  
  @media (min-width: 769px) {
    display: none;
  }
`;

const MobileNavLink = styled(motion.a)`
  color: ${props => props.theme.colors.text};
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 0;
  border-bottom: 1px solid ${props => props.theme.colors.surface};
  cursor: pointer;
  
  &:last-child {
    border-bottom: none;
  }
`;

const Header = ({ onSearch }) => {
  const { theme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [searchExpanded, setSearchExpanded] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery);
    }
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const navItems = [
    { label: 'Home', id: 'hero-section' },
    { label: 'Skills', id: 'skills-section' },
    { label: 'Projects', id: 'projects-section' },
    { label: 'Experience', id: 'experience-section' },
    { label: 'Education', id: 'education-section' }
  ];

  return (
    <HeaderContainer
      theme={theme}
      scrolled={scrolled}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <HeaderContent>
        <Logo
          theme={theme}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <LogoImage
            src="/images/netflix.png"
            alt="Netflix"
          />
          <LogoText theme={theme}>NETFLIX</LogoText>
        </Logo>

        <Navigation>
          {navItems.map((item) => (
            <NavLink
              key={item.id}
              theme={theme}
              onClick={() => scrollToSection(item.id)}
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
            >
              {item.label}
            </NavLink>
          ))}
        </Navigation>

        <MobileMenuButton
          theme={theme}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          whileTap={{ scale: 0.9 }}
        >
          <MenuLine
            theme={theme}
            animate={{
              rotate: mobileMenuOpen ? 45 : 0,
              y: mobileMenuOpen ? 6 : 0
            }}
          />
          <MenuLine
            theme={theme}
            animate={{
              opacity: mobileMenuOpen ? 0 : 1
            }}
          />
          <MenuLine
            theme={theme}
            animate={{
              rotate: mobileMenuOpen ? -45 : 0,
              y: mobileMenuOpen ? -6 : 0
            }}
          />
        </MobileMenuButton>
      </HeaderContent>

      <AnimatePresence>
        {mobileMenuOpen && (
          <MobileMenu
            theme={theme}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {navItems.map((item, index) => (
              <MobileNavLink
                key={item.id}
                theme={theme}
                onClick={() => scrollToSection(item.id)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {item.label}
              </MobileNavLink>
            ))}
          </MobileMenu>
        )}
      </AnimatePresence>
    </HeaderContainer>
  );
};

export default Header;