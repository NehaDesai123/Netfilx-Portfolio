import { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
const LoadingContainer = styled(motion.div)`
  background: #000;
  z-index: 10000;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const PlayButton = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 80px;
  color: white;
  cursor: pointer;
  z-index: 1;
  display: ${props => (props.isPlaying ? 'none' : 'block')};
  opacity: 0.2;
  transition: all 0.3s ease-in-out;

  &:hover {
    opacity: 0.5;
    transform: translate(-50%, -50%) scale(1.1);
  }

  @media (max-width: 768px) {
    font-size: 60px;
  }

  @media (max-width: 480px) {
    font-size: 40px;
  }
`;

const VideoBackground = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;

  @media (max-width: 480px) {
    object-fit: contain;
  }

  @media (max-width: 768px) {
    object-fit: contain;
  }
`;

const LoadingScreen = ({ onSkipLoading }) => {
  const videoRef = useRef(null);
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const handleVideoEnd = () => {
        onSkipLoading();
      };
      video.addEventListener('ended', handleVideoEnd);
      return () => {
        video.removeEventListener('ended', handleVideoEnd);
      };
    }
  }, [onSkipLoading]);

  const handlePlay = () => {
    const video = videoRef.current;
    const audio = audioRef.current;
    if (video && audio) {
      video.play();
      audio.play();
      setIsPlaying(true);
    }
  };

  return (
    <LoadingContainer
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="loading-container"
      onClick={handlePlay}
    >
      <PlayButton isPlaying={isPlaying}>
        <i className="ri-play-mini-fill"></i>
      </PlayButton>
      <VideoBackground
        ref={videoRef}
        muted
        playsInline
      >
        <source src={process.env.PUBLIC_URL + `/images/portfolio-cover.mp4`} type="video/mp4" />
      </VideoBackground>
      <audio ref={audioRef} src={process.env.PUBLIC_URL + "/images/netflix-sound.mp3"} />
    </LoadingContainer>
  );
};

export default LoadingScreen;