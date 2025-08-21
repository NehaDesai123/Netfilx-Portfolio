import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';

const FooterContainer = styled.footer`
  background: ${props => props.theme.colors.surface};
  padding: 3rem 0 2rem 0;
  margin-top: 4rem;
  border-top: 1px solid ${props => props.theme.colors.surface};
`;

const FooterContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  
  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 3rem;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
    text-align: center;
  }
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const FooterTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  margin-bottom: 1rem;
`;

const FooterDescription = styled.p`
  font-size: 0.9rem;
  line-height: 1.6;
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: 1.5rem;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  
  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const SocialLink = styled(motion.a)`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.surface};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.colors.text};
  text-decoration: none;
  font-size: 1.2rem;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.theme.colors.primary};
    color: white;
    border-color: ${props => props.theme.colors.primary};
  }
`;

const FooterLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const FooterLink = styled(motion.a)`
  color: ${props => props.theme.colors.textSecondary};
  text-decoration: none;
  font-size: 0.9rem;
  cursor: pointer;
  transition: color 0.3s ease;
  
  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.9rem;
  
  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const ContactIcon = styled.span`
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.colors.primary};
`;

const FooterBottom = styled.div`
  padding-top: 2rem;
  border-top: 1px solid ${props => props.theme.colors.background};
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
`;

const Copyright = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.8rem;
`;

const FooterLogo = styled.div`
  font-size: 1.1rem;
  font-weight: 700;
  color: ${props => props.theme.colors.primary};
`;

const BackToTop = styled(motion.button)`
  background: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  
  &:hover {
    background: ${props => props.theme.colors.hover};
  }
`;

const Footer = ({ data }) => {
  const { theme } = useTheme();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const socialLinks = [
    { 
      name: 'LinkedIn', 
      url: data.linkedin, 
      icon: '💼' 
    },
    { 
      name: 'GitHub', 
      url: data.github, 
      icon: '💻' 
    },
    { 
      name: 'Email', 
      url: `mailto:${data.email}`, 
      icon: '📧' 
    },
    { 
      name: 'Portfolio', 
      url: data.portfolio, 
      icon: '🌐' 
    }
  ];

  const quickLinks = [
    { name: 'Skills', id: 'skills' },
    { name: 'Projects', id: 'projects' },
    { name: 'Experience', id: 'experience' },
    { name: 'Achievements', id: 'achievements' }
  ];

  return (
    <FooterContainer theme={theme}>
      <FooterContent>
        <FooterGrid>
          <FooterSection>
            <FooterTitle theme={theme}>
              {data.name}
            </FooterTitle>
            <FooterDescription theme={theme}>
              {data.bio}
            </FooterDescription>
            <SocialLinks>
              {socialLinks.map((social) => (
                <SocialLink
                  key={social.name}
                  theme={theme}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  title={social.name}
                >
                  {social.icon}
                </SocialLink>
              ))}
            </SocialLinks>
          </FooterSection>

          <FooterSection>
            <FooterTitle theme={theme}>
              Quick Links
            </FooterTitle>
            <FooterLinks>
              {quickLinks.map((link) => (
                <FooterLink
                  key={link.id}
                  theme={theme}
                  onClick={() => scrollToSection(link.id)}
                  whileHover={{ x: 5 }}
                >
                  {link.name}
                </FooterLink>
              ))}
            </FooterLinks>
          </FooterSection>

          <FooterSection>
            <FooterTitle theme={theme}>
              Contact Info
            </FooterTitle>
            <ContactInfo>
              <ContactItem theme={theme}>
                <ContactIcon theme={theme}>📍</ContactIcon>
                {data.location}
              </ContactItem>
              <ContactItem theme={theme}>
                <ContactIcon theme={theme}>📧</ContactIcon>
                {data.email}
              </ContactItem>
              <ContactItem theme={theme}>
                <ContactIcon theme={theme}>📱</ContactIcon>
                {data.phone}
              </ContactItem>
              <ContactItem theme={theme}>
                <ContactIcon theme={theme}>�</ContactIcon>
                {data.title}
              </ContactItem>
            </ContactInfo>
          </FooterSection>
        </FooterGrid>

        <FooterBottom theme={theme}>
          <FooterLogo theme={theme}>
            NEHA DESAI
          </FooterLogo>
          
          <Copyright theme={theme}>
            © {new Date().getFullYear()} {data.name}. All rights reserved. 
            Built with React & styled-components.
          </Copyright>
          
          <BackToTop
            theme={theme}
            onClick={scrollToTop}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
            title="Back to top"
          >
            ↑
          </BackToTop>
        </FooterBottom>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;