import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Github, Linkedin, ArrowUpRight, Mail, Phone } from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';
import { useTheme } from '../../contexts/ThemeContext';

// Enhanced Profile Card
const GlassmorphismProfileCard = ({
  avatarUrl,
  name,
  title,
  bio,
  socialLinks = [],
  actionButton,
}) => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [isCardHovered, setIsCardHovered] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);
  const { theme } = useTheme();

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="profile-card-container relative w-full max-w-sm mx-auto sm:max-w-md md:max-w-lg lg:max-w-xl">
      <div
        className="profile-card relative flex flex-col items-center p-6 sm:p-6 md:p-6 rounded-2xl sm:rounded-3xl border transition-all duration-500 ease-out backdrop-blur-xl"
        style={{
          background: window.innerWidth >= 480 ? `linear-gradient(135deg, ${theme.colors.cardBackground}, ${theme.colors.surface}30)` : 'transparent',
          border: 'none',
          boxShadow: isCardHovered 
            ? `0 20px 40px ${theme.colors.primary}15, 0 0 0 1px ${theme.colors.primary}20`
            : `0 8px 32px ${theme.colors.background}80`,
        }}
        onMouseEnter={() => setIsCardHovered(true)}
        onMouseLeave={() => setIsCardHovered(false)}
      >
        {/* Enhanced Avatar */}
        <div className="relative mb-4 sm:mb-6">
          <div
            className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full p-1"
          >
            <img
              src={avatarUrl}
              alt={`${name}'s Avatar`}
              className="profile-avatar w-full h-full rounded-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = `https://placehold.co/96x96/6366f1/white?text=${name.charAt(0)}`;
              }}
            />
          </div>
        </div>

        {/* Name and Title */}
        <h2
          className="profile-name text-xl sm:text-2xl md:text-3xl font-bold transition-all duration-300 text-center"
          style={{
            color: theme.colors.text,
            textShadow: isCardHovered ? `0 0 20px ${theme.colors.primary}40` : 'none',
          }}
        >
          {name}
        </h2>
        <p className="profile-title mt-1 sm:mt-2 text-xs sm:text-sm md:text-base font-medium text-center px-2"  style={{ color: '#c5c5c5' }}>
          {title}
        </p>
        
        {/* Bio */}
        <p className="profile-bio mt-3 sm:mt-4 text-center text-xs sm:text-sm md:text-base leading-relaxed px-2 sm:px-4" style={{ color: theme.colors.textSecondary }}>
          {bio}
        </p>

        {/* Animated Divider */}
        <div className="divider-container relative w-1/2 h-px my-4 sm:my-6">
          <div
            className="divider h-full rounded-full transition-all duration-500"
            style={{
              background: isCardHovered
                ? `linear-gradient(90deg, transparent, ${theme.colors.primary}, transparent)`
                : `${theme.colors.primary}40`,
            }}
          />
        </div>

        {/* Social Links */}
        <div className="social-links-container flex items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-6 flex-wrap">
          {socialLinks.map((item) => (
            <SocialButton
              key={item.id}
              item={item}
              setHoveredItem={setHoveredItem}
              hoveredItem={hoveredItem}
            />
          ))}
        </div>

        {/* Action Button */}
        <ActionButton action={actionButton} />
      </div>

      {/* Glow Effect - Hidden only on mobile phones */}
      <div
        className="glow-effect absolute inset-0 rounded-2xl sm:rounded-3xl -z-10 transition-all duration-500 ease-out blur-2xl"
        style={{
          background: isCardHovered
            ? `linear-gradient(135deg, ${theme.colors.primary}30, ${theme.colors.accent || theme.colors.primary}30)`
            : `linear-gradient(135deg, ${theme.colors.primary}20, ${theme.colors.primary}10)`,
          opacity: windowWidth >= 480 ? (isCardHovered ? 0.6 : 0.3) : 0,
        }}
      />
    </div>
  );
};

// Enhanced Social Button
const SocialButton = ({ item, setHoveredItem, hoveredItem }) => {
  const { theme } = useTheme();

  return (
    <div className="social-button-container relative">
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className="social-button relative flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full transition-all duration-300 ease-out group overflow-hidden"
        style={{
          backgroundColor: hoveredItem === item.id ? `${theme.colors.primary}20` : `${theme.colors.surface}60`,
          border: `none`,
          transform: hoveredItem === item.id ? 'scale(1.1)' : 'scale(1)',
          boxShadow: hoveredItem === item.id ? `0 0 15px ${theme.colors.primary}10` : 'none',
        }}
        onMouseEnter={() => setHoveredItem(item.id)}
        onMouseLeave={() => setHoveredItem(null)}
        aria-label={item.label}
      >
        <div className="social-icon-wrapper relative z-10 flex items-center justify-center">
          <item.icon
            size={16}
            className="social-icon transition-all duration-200 ease-out sm:w-5 sm:h-5"
            style={{
              color: hoveredItem === item.id ? theme.colors.primary : theme.colors.textSecondary,
            }}
          />
        </div>
      </a>
    </div>
  );
};

// Enhanced Action Button
const ActionButton = ({ action }) => {
  const { theme } = useTheme();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href={action.href}
      target="_blank"
      rel="noopener noreferrer"
      className="action-button flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 rounded-full font-semibold text-sm sm:text-base backdrop-blur-sm transition-all duration-300 ease-out group relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.accent || theme.colors.primary})`,
        color: theme.colors.background,
        boxShadow: isHovered
          ? `0 8px 25px ${theme.colors.primary}40`
          : `0 4px 15px ${theme.colors.primary}30`,
        transform: isHovered ? 'translateY(-2px) scale(1.02)' : 'translateY(0) scale(1)',
        border: 'none'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className="action-text">{action.text}</span>
      <ArrowUpRight
        size={14}
        className="action-arrow transition-transform duration-300 group-hover:rotate-45 sm:w-4 sm:h-4"
      />
    </a>
  );
};

// Enhanced Back Button
const BackButton = ({ onClick }) => {
  const { theme } = useTheme();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      className="back-button absolute top-2 left-2 sm:top-4 sm:left-4 border-none w-10 h-10 sm:w-12 sm:h-12 rounded-full cursor-pointer z-10 flex items-center justify-center text-lg sm:text-2xl transition-all duration-300"
      style={{
        backgroundColor: `${theme.colors.surface}80`,
        color: theme.colors.textSecondary,
        backdropFilter: 'blur(10px)',
        transform: isHovered ? 'scale(1.1)' : 'scale(1)',
        boxShadow: isHovered ? `0 4px 15px ${theme.colors.surface}40` : 'none',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <i className="back-icon ri-arrow-go-back-line"></i>
    </button>
  );
};

//================================================================================
// PROFILE PAGE DEMO COMPONENT
//================================================================================

const ProfileCardDemo = () => {
  const { name, title, bio, linkedin, email, phone, location, github } = portfolioData.personal;

  const cardProps = {
    avatarUrl: process.env.PUBLIC_URL + "/images/profilePic.png",
    name: name,
    title: `${title} - ${location}`,
    bio: bio,
    socialLinks: [
      { id: 'linkedin', icon: Linkedin, label: 'LinkedIn', href: linkedin },
      { id: 'github', icon: Github, label: 'GitHub', href: github || '#' },
      { id: 'email', icon: Mail, label: 'Email', href: `mailto:${email}` },
      { id: 'phone', icon: Phone, label: 'Phone', href: `tel:${phone}` },
    ],
    actionButton: {
      text: 'Contact Me',
      href: `mailto:${email}?subject=Hello%20Neha%20-%20Let's%20Connect&body=Hi%20Neha,%0A%0AI%20came%20across%20your%20portfolio%20and%20I'm%20impressed%20with%20your%20work%20as%20a%20UI%20Developer.%20I%20would%20love%20to%20discuss%20potential%20opportunities%20or%20collaborations.%0A%0ABest%20regards`,
    },
  };

  return <GlassmorphismProfileCard {...cardProps} />;
};

// Main Profile Page Component
const ProfilePage = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();

  return (
    <div
      className="profile-page relative flex items-center justify-center min-h-screen p-2 sm:p-4 md:p-6 lg:p-8 font-sans transition-colors duration-500 w-full overflow-hidden"
      style={{
        background: `radial-gradient(ellipse at center, ${theme.colors.surface}15, ${theme.colors.background})`,
      }}
    >
      <BackButton onClick={() => navigate(-1)} />
      <div className="profile-content w-full max-w-7xl mx-auto flex items-center justify-center">
        <ProfileCardDemo />
      </div>
    </div>
  );
};

export default ProfilePage;
