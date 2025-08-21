import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { motion, useInView } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import ContentCard from './ContentCard';

const RowContainer = styled(motion.div)`
  margin-bottom: 4rem;
  padding: 0 2rem;
  
  @media (max-width: 768px) {
    padding: 0 1rem;
    margin-bottom: 3rem;
  }
`;

const RowHeader = styled.div`
  margin-bottom: 2rem;
  max-width: 1400px;
  margin-left: auto;
  margin-right: auto;
`;

const RowTitle = styled(motion.h2)`
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  font-weight: 700;
  color: ${props => props.theme.colors.text};
  margin-bottom: 0.5rem;
`;

const RowSubtitle = styled(motion.p)`
  font-size: 1.1rem;
  color: ${props => props.theme.colors.textSecondary};
  max-width: 600px;
`;

const ScrollContainer = styled.div`
  position: relative;
  max-width: 1400px;
  margin: 0 auto;
`;

const CardsWrapper = styled.div`
  overflow-x: auto;
  overflow-y: hidden;
  padding: 1rem 0 2rem 0;
  
  /* Custom scrollbar */
  &::-webkit-scrollbar {
    height: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: ${props => props.theme.colors.surface};
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${props => props.theme.colors.primary};
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: ${props => props.theme.colors.hover};
  }
`;

const CardsContainer = styled(motion.div)`
  display: flex;
  gap: 1rem;
  padding: 0 1rem;
  min-width: min-content;
`;

const ScrollButton = styled(motion.button)`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: ${props => props.theme.colors.modalBackground};
  backdrop-filter: blur(10px);
  border: 1px solid ${props => props.theme.colors.surface};
  color: ${props => props.theme.colors.text};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  z-index: 10;
  opacity: 0;
  transition: opacity 0.3s ease;
  
  ${props => props.direction === 'left' ? 'left: 10px;' : 'right: 10px;'}
  
  &:hover {
    background: ${props => props.theme.colors.primary};
    color: white;
  }
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const RowWrapper = styled.div`
  position: relative;
  
  &:hover ${ScrollButton} {
    opacity: 1;
  }
`;

const ContentRow = ({ id, title, subtitle, items, onItemClick, index }) => {
  const { theme } = useTheme();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollButtons = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      const newScrollLeft = direction === 'left' 
        ? scrollRef.current.scrollLeft - scrollAmount
        : scrollRef.current.scrollLeft + scrollAmount;
      
      scrollRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
      
      setTimeout(checkScrollButtons, 300);
    }
  };

  const rowVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
        staggerChildren: 0.1
      }
    }
  };

  const headerVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  };

  const cardsVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  React.useEffect(() => {
    checkScrollButtons();
    
    const handleResize = () => checkScrollButtons();
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, [items]);

  return (
    <RowContainer
      ref={ref}
      id={id}
      variants={rowVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <RowHeader>
        <RowTitle
          theme={theme}
          variants={headerVariants}
        >
          {title}
        </RowTitle>
        <RowSubtitle
          theme={theme}
          variants={headerVariants}
        >
          {subtitle}
        </RowSubtitle>
      </RowHeader>

      <RowWrapper>
        <ScrollContainer>
          <CardsWrapper
            ref={scrollRef}
            theme={theme}
            onScroll={checkScrollButtons}
          >
            <CardsContainer
              variants={cardsVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              {items.map((item, itemIndex) => (
                <ContentCard
                  key={item.id || itemIndex}
                  item={item}
                  onClick={() => onItemClick(item.type, item)}
                  index={itemIndex}
                />
              ))}
            </CardsContainer>
          </CardsWrapper>
        </ScrollContainer>

        {canScrollLeft && (
          <ScrollButton
            theme={theme}
            direction="left"
            onClick={() => scroll('left')}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            ←
          </ScrollButton>
        )}

        {canScrollRight && (
          <ScrollButton
            theme={theme}
            direction="right"
            onClick={() => scroll('right')}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            →
          </ScrollButton>
        )}
      </RowWrapper>
    </RowContainer>
  );
};

export default ContentRow;