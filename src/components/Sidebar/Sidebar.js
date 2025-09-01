import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import { useLocation, useNavigate } from 'react-router-dom';

const SidebarContainer = styled(motion.div).attrs({
  className: 'sidebar-container'
})`
  width: ${props => (props.$isExpanded ? '200px' : '80px')};
  height: 100vh;
  background: black;
  border-right: 1px solid ${props => props.theme.colors.background};
  display: flex;
  flex-direction: column;
  padding: 24px 0 0 0;
  position: sticky;
  top: 0;
  z-index: 100;
  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  @media (max-width: 768px) {
    width: ${props => (props.$isExpanded ? '200px' : '60px')};
  }
  
  @media (max-width: 480px) {
    width: 50px;
    padding: 16px 0;
  }
`;

const Logo = styled(motion.div).attrs({
  className: 'sidebar-logo'
})`
  position: relative;
  padding: 0 24px 32px 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  
  @media (max-width: 480px) {
    padding: 0 8px 24px 8px;
    justify-content: center;
  }
`;

const LogoImage = styled(motion.img).attrs({
  className: 'sidebar-logo-image'
})`
  width: 32px;
  height: 32px;
  object-fit: contain;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  &:hover {
    transform: scale(1.1);
  }
`;

const LogoName = styled(motion.img).attrs({
  className: 'sidebar-logo-name'
})`
  height: 32px;
`;

const MenuSection = styled.div.attrs({
  className: 'menu-section'
})`
  margin-bottom: 32px;
`;

const MenuItem = styled(motion.div).attrs({
  className: 'menu-item'
})`
  display: flex;
  align-items: center;
  padding: 12px 24px;
  cursor: pointer;
  color: ${props => props.$active ? props.theme.colors.text : props.theme.colors.textSecondary};
  background: ${props => props.$active ? 'rgba(229, 9, 20, 0.15)' : 'transparent'};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  justify-content: ${props => (props.$isExpanded ? 'flex-start' : 'center')};
  
  &:hover {
    color: ${props => props.theme.colors.text};
    background: ${props => props.$active ? 'rgba(229, 9, 20, 0.2)' : 'rgba(255, 255, 255, 0.05)'};
  }
  
  i {
    font-size: 20px;
    margin-right: ${props => (props.$isExpanded ? '16px' : '0')};
    width: 20px;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    transform: ${props => props.$active ? 'scale(1.1)' : 'scale(1)'};
    color: ${props => props.$active ? props.theme.colors.primary : 'inherit'};
    flex-shrink: 0;
  }
  
  span {
    font-size: 16px;
    font-weight: ${props => props.$active ? '600' : '500'};
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    opacity: ${props => (props.$isExpanded ? 1 : 0)};
    white-space: nowrap;
    overflow: hidden;
  }
`;


const Sidebar = ({
  onSearchChange = () => {},
  searchQuery = '',
  onModalOpen = () => {}
}) => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeItem, setActiveItem] = useState('overview');
  const [isScrolling, setIsScrolling] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);


  const menuItems = [
    { id: 'overview', icon: 'ri-dashboard-line', label: 'Overview', section: 'menu', target: 'hero-section' },
    { id: 'skills', icon: 'ri-code-line', label: 'Skill', section: 'menu', target: 'skills-section' },
    { id: 'projects', icon: 'ri-folder-line', label: 'Projects', section: 'menu', target: 'projects-section' },
    { id: 'experience', icon: 'ri-briefcase-line', label: 'Experience', section: 'menu', target: 'experience-section' },
    { id: 'qualification', icon: 'ri-graduation-cap-line', label: 'Education', section: 'menu', target: 'education-section' }
  ];

  // Smooth scroll function with fallback
  const smoothScrollTo = (targetId) => {
    const targetElement = document.getElementById(targetId);
    const scrollContainer = document.querySelector('.main-container');
    
    if (!targetElement || !scrollContainer) return;

    const headerOffset = 100; // Account for top bar and spacing
    const containerRect = scrollContainer.getBoundingClientRect();
    const targetRect = targetElement.getBoundingClientRect();
    const currentScrollTop = scrollContainer.scrollTop;
    
    // Calculate the target scroll position relative to the scroll container
    const targetScrollTop = currentScrollTop + targetRect.top - containerRect.top - headerOffset;

    // Check if browser supports smooth scrolling
    if ('scrollBehavior' in document.documentElement.style) {
      scrollContainer.scrollTo({
        top: Math.max(0, targetScrollTop),
        behavior: 'smooth'
      });
    } else {
      // Fallback for browsers that don't support smooth scrolling
      const startPosition = currentScrollTop;
      const distance = targetScrollTop - startPosition;
      const duration = 800; // 800ms animation
      let start = null;

      const step = (timestamp) => {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        const progressPercentage = Math.min(progress / duration, 1);
        
        // Easing function (ease-in-out-cubic)
        const easeInOutCubic = progressPercentage < 0.5
          ? 4 * progressPercentage * progressPercentage * progressPercentage
          : 1 - Math.pow(-2 * progressPercentage + 2, 3) / 2;

        const newScrollTop = Math.max(0, startPosition + distance * easeInOutCubic);
        scrollContainer.scrollTop = newScrollTop;

        if (progress < duration) {
          requestAnimationFrame(step);
        }
      };

      requestAnimationFrame(step);
    }
  };

  // Handle navigation click
  const handleNavClick = (item) => {
    setActiveItem(item.id);
    if (item.id === 'overview') {
      navigate('/netflix/portfolio');
    } else if (item.id === 'skills') {
      navigate('/netflix/portfolio/skills');
    } else if (item.id === 'projects') {
      navigate('/netflix/portfolio/projects');
    } else if (item.id === 'experience') {
      navigate('/netflix/portfolio/experience');
    } else if (item.id === 'qualification') {
      navigate('/netflix/portfolio/qualification');
    } else if (item.target) {
      setIsScrolling(true);
      smoothScrollTo(item.target);
      
      setTimeout(() => {
        setIsScrolling(false);
      }, 1000);
    }
  };

  const handleLogoClick = () => {
    navigate('/netflix');
  };

  // Track scroll position and update active item
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const path = location.pathname.split('/').pop();
    if (path && path !== 'portfolio') {
      setActiveItem(path);
    } else {
      setActiveItem('overview');
    }
  }, [location]);

  const groupedItems = menuItems.reduce((acc, item) => {
    if (!acc[item.section]) acc[item.section] = [];
    acc[item.section].push(item);
    return acc;
  }, {});

  return (
    <SidebarContainer 
      theme={theme} 
      $isExpanded={isExpanded}
      onMouseEnter={() => !isMobile && setIsExpanded(true)}
      onMouseLeave={() => !isMobile && setIsExpanded(false)}
    >
      
      <Logo theme={theme} $isExpanded={isExpanded} onClick={handleLogoClick}>
        <AnimatePresence>
          {!isExpanded && (
            <LogoImage
              src="/images/netflix-logo.png"
              alt="Logo"
              initial={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.1 }}
            />
          )}
        </AnimatePresence>
        <AnimatePresence>
          {isExpanded && (
            <LogoName
              src="/images/neha_desai.png"
              alt="Neha Desai"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.1 }}
            />
          )}
        </AnimatePresence>
      </Logo>

      {Object.entries(groupedItems).map(([section, items]) => (
        <MenuSection key={section}>
          {items.map((item) => (
            <MenuItem
              key={item.id}
              theme={theme}
              $active={activeItem === item.id}
              $isExpanded={isExpanded}
              onClick={() => handleNavClick(item)}
            >
              <i className={item.icon}></i>
              <span>{item.label}</span>
            </MenuItem>
          ))}
        </MenuSection>
      ))}


    </SidebarContainer>
  );
};

export default Sidebar;