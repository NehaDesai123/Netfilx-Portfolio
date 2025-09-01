import { Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { useTheme } from './contexts/ThemeContext';
import { ThemedGlobalStyle } from './styles/GlobalStyles';
import MainLayout from './components/MainLayout/MainLayout';
import Portfolio from './components/Portfolio/Portfolio';
import DetailPage from './components/DetailPage/DetailPage';
import ProfilePage from './components/ProfilePage/ProfilePage';
import LandingPage from './components/LandingPage/LandingPage';

function App() {
  const { theme } = useTheme();

  return (
    <StyledThemeProvider theme={theme}>
      <ThemedGlobalStyle />
      <Routes>
        <Route path="/" element={<Navigate to="/netflix" />} />
        <Route path="/netflix" element={<Portfolio />} />
        <Route path="/netflix/portfolio" element={<MainLayout />}>
          <Route index element={<LandingPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path=":type" element={<DetailPage />} />
        </Route>
      </Routes>
    </StyledThemeProvider>
  );
}

export default App;