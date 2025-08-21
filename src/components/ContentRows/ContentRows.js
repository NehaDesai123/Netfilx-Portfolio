import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import ContentRow from './ContentRow';

const RowsContainer = styled.section`
  padding: 4rem 0;
  background: ${props => props.theme.colors.background};
  position: relative;
`;

const ContentRows = ({ rows, onItemClick }) => {
  const { theme } = useTheme();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  return (
    <RowsContainer theme={theme}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {rows.map((row, index) => (
          <ContentRow
            key={row.id}
            id={row.id}
            title={row.title}
            subtitle={row.subtitle}
            items={row.items}
            onItemClick={onItemClick}
            index={index}
          />
        ))}
      </motion.div>
    </RowsContainer>
  );
};

export default ContentRows;