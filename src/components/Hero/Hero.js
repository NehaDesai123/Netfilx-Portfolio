import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';

const HeroSection = styled.div.attrs({
  className: "hero-section",
})`
  position: relative;
  height: 500px;
  width: 100%;
  display: flex;
  flex-direction: column-reverse;

  @media (max-width: 768px) {
    height: 700px;
  }
`;

const BackgroundImage = styled.img.attrs({
  className: 'main-content-background-image'
})`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: fill;
  z-index: 1;
`;

const Overlay = styled.div.attrs({
  className: 'main-content-overlay'
})`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.3) 50%, rgba(0, 0, 0, 0.7) 100%);
  z-index: 2;
`;

const HeroContent = styled.div.attrs({
  className: "hero-content",
})`
  max-width: 1000px;
  position: absolute;
  padding: 48px;
  z-index: 3;

  @media (max-width: 768px) {
    padding: 24px;
  }
`;

const HeroTitle = styled.h1.attrs({
  className: "hero-title",
})`
  font-size: 48px;
  font-weight: 700;
  color: ${(props) => props.theme.colors.text};
  margin: 0 0 16px 0;

  @media (max-width: 768px) {
    font-size: 32px;
  }
`;

const HeroSubtitle = styled.div.attrs({
  className: "hero-subtitle",
})`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
  color: ${(props) => props.theme.colors.text};
  font-size: 16px;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const HeroActions = styled.div.attrs({
  className: "hero-actions",
})`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const WatchButton = styled(motion.button).attrs({
  className: "watch-button",
})`
  background: ${(props) => props.theme.colors.primary};
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  color: white;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;

  @media (max-width: 768px) {
    padding: 10px 20px;
    font-size: 14px;
  }

  &:hover {
    background: ${(props) => props.theme.colors.hover};
  }
`;

const AddButton = styled(motion.button).attrs({
  className: "add-button",
})`
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  color: ${(props) => props.theme.colors.text};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;

const Hero = () => {
  const { theme } = useTheme();

  const handleResumeDownload = async () => {
    try {
      const response = await fetch("/images/neha_desai.pdf");
      if (!response.ok) {
        throw new Error("Failed to fetch PDF file");
      }
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "neha_desai.pdf";
      link.style.display = "none";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Resume download failed:", error);
      alert("Failed to download resume. Please try again.");
    }
  };

  return (
    <HeroSection id="hero-section">
      <BackgroundImage src={`/images/hero.png`} alt="Hero background" />
      <Overlay />
      <HeroContent>
        <HeroTitle theme={theme}>Neha Desai</HeroTitle>
        <HeroSubtitle theme={theme}>
          <p>
            UI Developer with 5+ years of experience in building responsive
            and scalable web applications using Vue.js (2 & 3), JavaScript,
            HTML5, and CSS. Currently working on Apple’s iCare platform.
            I have also contributed to Apple projects like
            VIMS, Columba, and Dock Management System, where I implemented
            intuitive UIs and solved complex frontend challenges. Previously
            at Capgemini, I developed enterprise applications for GE Aviation
            delivering enhancements and Agile-driven solutions.
            Recognized for innovation and performance, I bring strong
            expertise in crafting high-quality, user-focused digital
            experiences.
          </p>
        </HeroSubtitle>
        <HeroActions>
          <WatchButton
            theme={theme}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleResumeDownload}
          >
            <i className="ri-download-line"></i>
            Resume
          </WatchButton>
          <AddButton
            theme={theme}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <i className="ri-mail-line"></i>
          </AddButton>
        </HeroActions>
      </HeroContent>
    </HeroSection>
  );
};

export default Hero;