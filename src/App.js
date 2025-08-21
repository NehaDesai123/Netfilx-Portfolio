import { useState } from 'react';
import styled from 'styled-components';
import { useTheme } from './contexts/ThemeContext';
import { ThemedGlobalStyle } from './styles/GlobalStyles';

// Components
import Sidebar from './components/Sidebar/Sidebar';
import MainContent from './components/MainContent/MainContent';
import LoadingScreen from './components/LoadingScreen/LoadingScreen';

const AppContainer = styled.div.attrs({
  className: 'app-container'
})`
  min-height: 100vh;
  background-color: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  display: flex;
  overflow: hidden;
`;

const ContentWrapper = styled.div.attrs({
  className: 'content-wrapper'
})`
  display: flex;
  flex: 1;
  height: 100vh;
`;

function App() {
  const { theme } = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [modalData, setModalData] = useState(null);
  const [modalType, setModalType] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Loading screen will only end when user clicks ProfileImage
  const handleLogoClick = () => {
    setIsLoading(true);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  const handleModalOpen = (type, data) => {
    setModalType(type);
    setModalData(data);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setModalData(null);
    setModalType('');
  };

  if (isLoading) {
    return <LoadingScreen onSkipLoading={() => setIsLoading(false)} />;
  }

  return (
    <>
      <ThemedGlobalStyle />
      <AppContainer theme={theme}>
        <ContentWrapper>
          <Sidebar
            onLogoClick={handleLogoClick}
            onSearchChange={handleSearchChange}
            searchQuery={searchQuery}
            onModalOpen={handleModalOpen}
          />
          <MainContent
            searchQuery={searchQuery}
            modalData={modalData}
            modalType={modalType}
            isModalOpen={isModalOpen}
            onModalClose={handleModalClose}
            onModalOpen={handleModalOpen}
          />
        </ContentWrapper>
      </AppContainer>
    </>
  );
}

export default App;