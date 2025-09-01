import React, { useRef } from 'react';
import styled from 'styled-components';
import { motion, useInView } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import { contentContainerStyles } from '../../styles/GlobalStyles';
import ContentCard from './ContentCard';

const RowContainer = styled(motion.div)`
  ${contentContainerStyles}
`;

const RowHeader = styled.div`
  margin-bottom: 1rem;
  margin-left: auto;
  margin-right: auto;
`;

const RowTitle = styled(motion.h2)`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${props => props.theme.colors.text};
`;

const CardsContainer = styled(motion.div)`
    display: flex;
    gap: 20px;
    overflow-x: auto;
    scroll-behavior: smooth;
    padding-bottom: 10px;
    padding-left: 10px;
    padding-top: 5px;
    padding-right: 1rem;
    box-sizing: content-box;
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none;  /* IE 10+ */

    &::-webkit-scrollbar {
        display: none; /* WebKit */
    }
`;

const ContentRow = ({ id, title, subtitle, items = [], onItemClick = () => {}, onMoreClick = () => {}, index, children }) => {
  const { theme } = useTheme();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

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

  return (
    <RowContainer
      ref={ref}
      id={id}
      variants={rowVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="row-container"
    >
      <RowHeader className="row-header">
        <RowTitle
          theme={theme}
          variants={headerVariants}
          className="row-title"
        >
          {title}
        </RowTitle>
      </RowHeader>

      {children ? (
        <div>{children}</div>
      ) : (
        <CardsContainer
          variants={cardsVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="cards-container"
        >
          {items.map((item, itemIndex) => (
            <ContentCard
              key={item.id || itemIndex}
              item={item}
              onClick={() => onItemClick(item.type, item)}
              onMoreClick={onMoreClick}
              index={itemIndex}
            />
          ))}
        </CardsContainer>
      )}
    </RowContainer>
  );
};

export default ContentRow;