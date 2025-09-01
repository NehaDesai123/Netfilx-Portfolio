import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Sidebar from '../Sidebar/Sidebar';
import UserProfile from '../UserProfile/UserProfile';

const AppContainer = styled.div.attrs({
  className: 'app-container'
})`
  display: grid;
  grid-template-columns: 80px 1fr;
  height: 100vh;
  @media (max-width: 768px) {
    grid-template-columns: 50px 1fr;
  }
`;

const ContentContainer = styled.main.attrs({
  className: 'main-container',
})`
  overflow-y: auto;
  position: relative;
`;

const MainLayout = () => {
  const [watchedItems, setWatchedItems] = useState([]);

  useEffect(() => {
    const storedWatchedItems = sessionStorage.getItem("watchedItems");
    if (storedWatchedItems) {
      setWatchedItems(JSON.parse(storedWatchedItems));
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem("watchedItems", JSON.stringify(watchedItems));
  }, [watchedItems]);

  return (
    <AppContainer>
      <Sidebar />
      <ContentContainer>
        <UserProfile />
        <Outlet context={{ watchedItems, setWatchedItems }} />
      </ContentContainer>
    </AppContainer>
  );
};

export default MainLayout;