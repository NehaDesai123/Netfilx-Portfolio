import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';

const SidebarContainer = styled(motion.div).attrs({
  className: 'sidebar-container'
})`
  width: ${props => props.$collapsed ? '80px' : '240px'};
  height: 100vh;
  background: ${props => props.theme.colors.background};
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  padding: 24px 0 0 0;
  position: relative;
  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  
  @media (max-width: 768px) {
    width: ${props => props.$collapsed ? '60px' : '200px'};
  }
  
  @media (max-width: 480px) {
    width: 60px;
    padding: 16px 0;
  }
`;

const Logo = styled(motion.div).attrs({
  className: 'sidebar-logo'
})`
  padding: 0 24px 32px 24px;
  display: flex;
  align-items: center;
  justify-content: ${props => props.$collapsed ? 'center' : 'flex-start'};
  cursor: pointer;
  
  @media (max-width: 480px) {
    padding: 0 8px 24px 8px;
    justify-content: center;
  }
`;

const LogoImage = styled.img.attrs({
  className: 'sidebar-logo-image'
})`
  width: ${props => props.$collapsed ? '32px' : '40px'};
  height: ${props => props.$collapsed ? '32px' : '40px'};
  object-fit: contain;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  &:hover {
    transform: scale(1.1);
  }
  
  @media (max-width: 480px) {
    width: 32px;
    height: 32px;
  }
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
  padding: ${props => props.$collapsed ? '12px' : '12px 24px'};
  cursor: pointer;
  color: ${props => props.$active ? props.theme.colors.text : props.theme.colors.textSecondary};
  background: ${props => props.$active ? 'rgba(229, 9, 20, 0.15)' : 'transparent'};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  justify-content: ${props => props.$collapsed ? 'center' : 'flex-start'};
  
  &:hover {
    color: ${props => props.theme.colors.text};
    background: ${props => props.$active ? 'rgba(229, 9, 20, 0.2)' : 'rgba(255, 255, 255, 0.05)'};
    transform: ${props => props.$collapsed ? 'scale(1.1)' : 'translateX(2px)'};
  }
  
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: ${props => props.$active ? '3px' : '0'};
    transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  i {
    font-size: 20px;
    margin-right: ${props => props.$collapsed ? '0' : '16px'};
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
    opacity: ${props => props.$active ? '1' : '0.8'};
    white-space: nowrap;
    overflow: hidden;
  }
  
  @media (max-width: 480px) {
    padding: 16px 8px;
    justify-content: center;
    
    i {
      margin-right: 0;
      font-size: 24px;
    }
    
    span {
      display: none;
    }
  }
`;

const Tooltip = styled(motion.div).attrs({
  className: 'sidebar-tooltip'
})`
  position: absolute;
  left: calc(100% + 15px);
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.9);
  color: #ffffff;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
  z-index: 9999;
  pointer-events: none;
  backdrop-filter: blur(10px);
  
  &::before {
    content: '';
    position: absolute;
    right: 100%;
    top: 50%;
    transform: translateY(-50%);
    border: 6px solid transparent;
    border-right-color: rgba(0, 0, 0, 0.9);
  }
`;

const UserSection = styled.div.attrs({
  className: 'user-section'
})`
  margin-top: auto;
`;

const UserProfile = styled.div.attrs({
  className: 'user-profile'
})`
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  padding: 20px;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }
`;

const UserAvatar = styled.div.attrs({
  className: 'user-avatar'
})`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: url('/images/netflix.png') center/cover;
  border: 2px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
  flex-shrink: 0;
  
  &:hover {
    border-color: ${props => props.theme.colors.primary};
    transform: scale(1.1);
  }
`;


const Sidebar = ({
  onLogoClick = () => {},
  onSearchChange = () => {},
  searchQuery = '',
  onModalOpen = () => {}
}) => {
  const { theme } = useTheme();
  const [activeItem, setActiveItem] = useState('overview');
  const [isScrolling, setIsScrolling] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);

  const profileData = {
    name: 'Neha Desai',
    title: 'UI Developer',
    location: 'Bangalore, India',
    email: 'neha.desai.2411@gmail.com',
    phone: '9591891517',
    linkedin: 'linkedin.com/in/neha-d-763481101',
    image: '/images/netflix.png',
    description: 'Experienced UI Developer with 5+ years in the IT industry. Currently working with Apple as a UI Developer, contributing to projects such as Columba, Apple Visit (VIMS), and the Dock Management System (DMS). Passionate about creating seamless and intuitive user experiences.'
  };

  const handleProfileClick = () => {
    onModalOpen('profile', profileData);
  };

  const menuItems = [
    { id: 'overview', icon: 'ri-dashboard-line', label: 'Overview', section: 'menu', target: 'hero-section' },
    { id: 'skills', icon: 'ri-code-line', label: 'Skills', section: 'menu', target: 'skills-section' },
    { id: 'projects', icon: 'ri-folder-line', label: 'Projects', section: 'menu', target: 'projects-section' },
    { id: 'experience', icon: 'ri-briefcase-line', label: 'Experience', section: 'menu', target: 'experience-section' },
    { id: 'education', icon: 'ri-graduation-cap-line', label: 'Education', section: 'menu', target: 'education-section' }
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
    setIsScrolling(true);
    
    if (item.target) {
      smoothScrollTo(item.target);
      
      // Reset scrolling state after animation
      setTimeout(() => {
        setIsScrolling(false);
      }, 1000);
    }
  };

  // Track scroll position and update active item
  useEffect(() => {
    const scrollContainer = document.querySelector('.main-container');
    if (!scrollContainer) return;

    const handleScroll = () => {
      const scrollTop = scrollContainer.scrollTop;
      const scrollPosition = scrollTop + 150; // Offset for better detection
      const containerRect = scrollContainer.getBoundingClientRect();
      
      // Define section positions (these should match the actual sections)
      const sections = [
        { id: 'overview', element: document.getElementById('hero-section') },
        { id: 'skills', element: document.getElementById('skills-section') },
        { id: 'projects', element: document.getElementById('projects-section') },
        { id: 'experience', element: document.getElementById('experience-section') },
        { id: 'education', element: document.getElementById('education-section') }
      ];

      // Find the current section (only update if not currently scrolling via navigation)
      if (!isScrolling) {
        let currentSection = 'overview';
        
        for (let i = sections.length - 1; i >= 0; i--) {
          const section = sections[i];
          if (section.element) {
            const sectionRect = section.element.getBoundingClientRect();
            const sectionTop = scrollTop + sectionRect.top - containerRect.top;
            
            if (scrollPosition >= sectionTop) {
              currentSection = section.id;
              break;
            }
          }
        }

        setActiveItem(currentSection);
      }
    };

    // Throttle scroll events for better performance
    let ticking = false;
    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    scrollContainer.addEventListener('scroll', throttledHandleScroll);
    
    // Initial check
    handleScroll();

    return () => {
      scrollContainer.removeEventListener('scroll', throttledHandleScroll);
    };
  }, [isScrolling]);

  const groupedItems = menuItems.reduce((acc, item) => {
    if (!acc[item.section]) acc[item.section] = [];
    acc[item.section].push(item);
    return acc;
  }, {});

  return (
    <SidebarContainer theme={theme} $collapsed={true}>
      
      <Logo theme={theme} $collapsed={true} onClick={onLogoClick}>
        <LogoImage
          src="/images/netflix.png"
          alt="Netflix"
          theme={theme}
          $collapsed={true}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
        />
      </Logo>

      {Object.entries(groupedItems).map(([section, items]) => (
        <MenuSection key={section}>
          {items.map((item) => (
            <MenuItem
              key={item.id}
              theme={theme}
              $active={activeItem === item.id}
              $collapsed={true}
              onClick={() => handleNavClick(item)}
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
              whileHover={{ x: 0, scale: 1.1 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.3,
                delay: items.indexOf(item) * 0.1,
                ease: "easeOut"
              }}
            >
              <i className={item.icon}></i>
              
              {/* Tooltip - always show on hover */}
              <AnimatePresence>
                {hoveredItem === item.id && (
                  <Tooltip
                    theme={theme}
                    initial={{ opacity: 0, scale: 0.8, x: -10 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.8, x: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {item.label}
                  </Tooltip>
                )}
              </AnimatePresence>
            </MenuItem>
          ))}
        </MenuSection>
      ))}

      {/* User Section at Bottom */}
      <UserSection>
        <UserProfile
          onClick={handleProfileClick}
          onMouseEnter={() => setHoveredItem('profile')}
          onMouseLeave={() => setHoveredItem(null)}
          style={{ position: 'relative' }}
        >
          <UserAvatar theme={theme} />
          
          {/* Tooltip for user profile */}
          <AnimatePresence>
            {hoveredItem === 'profile' && (
              <Tooltip
                theme={theme}
                initial={{ opacity: 0, scale: 0.8, x: -10 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.8, x: -10 }}
                transition={{ duration: 0.2 }}
              >
                {profileData.name}
              </Tooltip>
            )}
          </AnimatePresence>
        </UserProfile>
      </UserSection>

    </SidebarContainer>
  );
};

export default Sidebar;