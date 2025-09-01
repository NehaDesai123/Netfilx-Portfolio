import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingScreen from '../LoadingScreen/LoadingScreen';

const Portfolio = () => {
  const navigate = useNavigate();

  const handleVideoEnd = () => {
    navigate('/netflix/portfolio');
  };

  return <LoadingScreen onSkipLoading={handleVideoEnd} />;
};

export default Portfolio;