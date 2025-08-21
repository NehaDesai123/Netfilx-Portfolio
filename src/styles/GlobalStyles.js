import { createGlobalStyle } from 'styled-components';
import { useTheme } from '../contexts/ThemeContext';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
    scroll-padding-top: 100px; /* Account for fixed header and spacing */
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
    background-color: ${props => props.theme?.colors?.background || '#141414'};
    color: ${props => props.theme?.colors?.text || '#FFFFFF'};
    overflow-x: hidden;
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  #root {
    min-height: 100vh;
  }

  /* Scrollbar Styling */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${props => props.theme?.colors?.surface || '#2F2F2F'};
  }

  ::-webkit-scrollbar-thumb {
    background: ${props => props.theme?.colors?.primary || '#E50914'};
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${props => props.theme?.colors?.hover || '#F40612'};
  }

  /* Selection Styling */
  ::selection {
    background: ${props => props.theme?.colors?.primary || '#E50914'};
    color: white;
  }

  ::-moz-selection {
    background: ${props => props.theme?.colors?.primary || '#E50914'};
    color: white;
  }

  /* Focus Styles for Accessibility */
  button:focus,
  a:focus,
  input:focus,
  textarea:focus,
  select:focus {
    outline: 2px solid ${props => props.theme?.colors?.primary || '#E50914'};
    outline-offset: 2px;
  }

  /* Remove loading spinner once React loads */
  .loading-spinner {
    display: none;
  }

  /* Smooth transitions for theme changes */
  * {
    transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
  }

  /* Responsive Typography */
  h1 {
    font-size: clamp(2rem, 5vw, 4rem);
    font-weight: 700;
    line-height: 1.2;
  }

  h2 {
    font-size: clamp(1.5rem, 4vw, 2.5rem);
    font-weight: 600;
    line-height: 1.3;
  }

  h3 {
    font-size: clamp(1.25rem, 3vw, 1.75rem);
    font-weight: 600;
    line-height: 1.4;
  }

  h4 {
    font-size: clamp(1rem, 2.5vw, 1.25rem);
    font-weight: 500;
    line-height: 1.4;
  }

  p {
    font-size: clamp(0.875rem, 2vw, 1rem);
    line-height: 1.6;
  }

  /* Utility Classes */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  .container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 1rem;
  }

  @media (min-width: 768px) {
    .container {
      padding: 0 2rem;
    }
  }

  @media (min-width: 1024px) {
    .container {
      padding: 0 3rem;
    }
  }

  /* Animation Classes */
  .fade-in {
    animation: fadeIn 0.6s ease-out;
  }

  .slide-up {
    animation: slideUp 0.8s ease-out;
  }

  .scale-in {
    animation: scaleIn 0.5s ease-out;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes scaleIn {
    from {
      opacity: 0;
      transform: scale(0.9);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  /* Smooth scrolling enhancements */
  .main-container {
    scroll-behavior: smooth;
    scroll-padding-top: 100px;
  }

  /* Section scroll snap for better UX */
  .content-section > div[id] {
    scroll-margin-top: 100px;
  }

  /* Navigation active state animations */
  .menu-item {
    position: relative;
    overflow: hidden;
  }

  .menu-item::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(229, 9, 20, 0.1), transparent);
    transition: left 0.6s ease;
  }

  .menu-item:hover::before {
    left: 100%;
  }
    
  /* Enhanced focus states for navigation */
  .menu-item:focus-visible {
    outline: 2px solid ${props => props.theme?.colors?.primary || '#E50914'};
    outline-offset: -2px;
    background: rgba(229, 9, 20, 0.1);
  }

  /* Reduced Motion Support */
  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
    
    .scroll-indicator::after {
      animation: none !important;
    }
    
    .menu-item::before {
      display: none !important;
    }
  }

  /* Standardized Card Dimensions - Same Width, Flexible Height */
  .card-standard {
    width: 280px;
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.05);
    transition: all 0.2s ease;
    
    &:hover {
      background: rgba(255, 255, 255, 0.1);
      transform: translateY(-4px);
    }
  }

  /* Grid Systems - All use same width */
  .grid-standard {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 24px;
  }

  @media (max-width: 768px) {
    .card-standard {
      width: 240px;
    }
    
    .grid-standard {
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 20px;
    }
  }
`;

// Styled component wrapper to pass theme
export const ThemedGlobalStyle = () => {
  const { theme } = useTheme();
  return <GlobalStyle theme={theme} />;
};