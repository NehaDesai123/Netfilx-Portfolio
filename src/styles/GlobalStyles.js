import { createGlobalStyle, css } from 'styled-components';
import { useTheme } from '../contexts/ThemeContext';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html,
  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
    background-color: black;
    color: ${props => props.theme?.colors?.text || '#FFFFFF'};
    overflow-x: hidden;
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    transition: background-color 0.3s ease, color 0.3s ease;
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

export const contentContainerStyles = css`
  margin-top: 2rem;
  margin-left: 1rem;
  margin-right: 5rem;

  @media (max-width: 768px) {
    padding: 0 1rem;
    margin-bottom: 2rem;
    margin-right: 0;
    margin-left: 0;
  }
`;