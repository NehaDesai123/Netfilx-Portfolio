import React, { useState, useRef, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingContainer = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  overflow: hidden;
`;

const AnimationStage = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InitialImage = styled(motion.img)`
  cursor: pointer;
  max-width: 80vw;
  max-height: 80vh;
  object-fit: contain;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
  }
`;

const SplitContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  overflow: hidden;
`;

const SplitHalf = styled(motion.div)`
  width: 50%;
  height: 100%;
  background-image: url('/images/pic1.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const LeftHalf = styled(SplitHalf)`
  background-position: left center;
`;

const RightHalf = styled(SplitHalf)`
  background-position: right center;
`;

const TextContainer = styled(motion.div)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
  text-align: center;
`;

const typewriterAnimation = keyframes`
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
`;

const blinkCursor = keyframes`
  from, to {
    border-color: transparent;
  }
  50% {
    border-color: white;
  }
`;

const TypewriterText = styled(motion.h1)`
  font-size: clamp(3rem, 8vw, 8rem);
  font-weight: bold;
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
  white-space: nowrap;
  overflow: hidden;
  border-right: 3px solid white;
  margin: 0;
  font-family: 'Arial', sans-serif;
  letter-spacing: 0.1em;
  
  &.typing {
    animation:
      ${typewriterAnimation} 2s steps(10, end) forwards,
      ${blinkCursor} 1s infinite;
  }
  
  &.finished {
    border-right: none;
  }
`;

const FinalImageContainer = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('/images/pic3.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const LoadingScreen = ({ onSkipLoading }) => {
  const [animationPhase, setAnimationPhase] = useState('initial'); // initial, split, text, zoomOut, final
  const [showTypewriter, setShowTypewriter] = useState(false);
  const [typewriterFinished, setTypewriterFinished] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    // Preload audio
    audioRef.current = new Audio('/images/netflix-sound.mp3');
    audioRef.current.preload = 'auto';
  }, []);

  const handleImageClick = () => {
    // Play synchronized audio
    if (audioRef.current) {
      audioRef.current.play().catch(error => {
        console.log('Audio play failed:', error);
      });
    }

    // Start the animation sequence
    startAnimationSequence();
  };

  const startAnimationSequence = () => {
    // Phase 1: Show pic1 in full view (immediate)
    setAnimationPhase('fullView');

    // Phase 2: Start split transition after 800ms
    setTimeout(() => {
      setAnimationPhase('split');
    }, 800);

    // Phase 3: Show typewriter text after split completes (2300ms total)
    setTimeout(() => {
      setShowTypewriter(true);
    }, 2300);

    // Phase 4: Mark typewriter as finished (4800ms total)
    setTimeout(() => {
      setTypewriterFinished(true);
    }, 4800);

    // Phase 5: Start zoom out transition (5800ms total)
    setTimeout(() => {
      setAnimationPhase('zoomOut');
    }, 5800);

    // Phase 6: Complete sequence and callback (8800ms total)
    setTimeout(() => {
      if (onSkipLoading) {
        onSkipLoading();
      }
    }, 8800);
  };

  const splitVariants = {
    initial: { x: 0 },
    split: {
      x: (index) => index === 0 ? '-25%' : '25%',
      transition: {
        duration: 1.5,
        ease: [0.25, 0.46, 0.45, 0.94] // Professional easing curve
      }
    }
  };

  const textVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const zoomOutVariants = {
    initial: { scale: 1, opacity: 1 },
    zoomOut: {
      scale: 0.1,
      opacity: 0,
      transition: {
        duration: 3,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const finalImageVariants = {
    hidden: { scale: 3, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 3,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  return (
    <LoadingContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <AnimationStage>
        <AnimatePresence>
          {animationPhase === 'initial' && (
            <InitialImage
              key="initial-image"
              src="/images/pic1.png"
              alt="Click to start animation"
              onClick={handleImageClick}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            />
          )}

          {(animationPhase === 'fullView' || animationPhase === 'split' || animationPhase === 'zoomOut') && (
            <motion.div
              key="split-container"
              variants={zoomOutVariants}
              initial="initial"
              animate={animationPhase === 'zoomOut' ? 'zoomOut' : 'initial'}
              style={{ position: 'absolute', width: '100%', height: '100%' }}
            >
              <SplitContainer>
                <LeftHalf
                  custom={0}
                  variants={splitVariants}
                  initial="initial"
                  animate={animationPhase === 'split' || animationPhase === 'zoomOut' ? 'split' : 'initial'}
                />
                <RightHalf
                  custom={1}
                  variants={splitVariants}
                  initial="initial"
                  animate={animationPhase === 'split' || animationPhase === 'zoomOut' ? 'split' : 'initial'}
                />
              </SplitContainer>

              <AnimatePresence>
                {showTypewriter && (
                  <TextContainer
                    key="typewriter-text"
                    variants={textVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                  >
                    <TypewriterText
                      className={typewriterFinished ? 'finished' : 'typing'}
                    >
                      Neha Desai
                    </TypewriterText>
                  </TextContainer>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {animationPhase === 'zoomOut' && (
            <FinalImageContainer
              key="final-image"
              variants={finalImageVariants}
              initial="hidden"
              animate="visible"
            />
          )}
        </AnimatePresence>
      </AnimationStage>
    </LoadingContainer>
  );
};

export default LoadingScreen;