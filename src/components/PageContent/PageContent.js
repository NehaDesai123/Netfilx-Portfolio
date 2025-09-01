import { useMemo, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useTheme } from "../../contexts/ThemeContext";
import ContentRow from "../ContentRows/ContentRow";
import { portfolioData } from "../../data/portfolioData";
import Modal from "../Modal/Modal";

const PageContent = ({
  searchQuery = "",
  children,
}) => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const { watchedItems, setWatchedItems } = useOutletContext();
  const [modalData, setModalData] = useState(null);

  const handleMoreClick = (data) => {
    console.log("More clicked:", data);
    setModalData({ type: 'experience', data });
  };

  const handleCardClick = (type, data) => {
    if (type === 'profile' || type === 'contact me') {
      navigate('/netflix/portfolio/profile');
    } else {
      setWatchedItems(prevWatchedItems => {
        const newWatchedItems = prevWatchedItems.filter(item => item.id !== data.id);
        return [data, ...newWatchedItems];
      });
      navigate(`/netflix/portfolio/${type}`);
    }
  };

  // Search filtering logic
  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) {
      return portfolioData.content.map(section => ({
        ...section,
        items: Object.entries(section.items).map(([key, value]) => ({
          id: key,
          title: key,
          ...value,
          type: key.toLowerCase(),
        })),
      }));
    }

    const query = searchQuery.toLowerCase();
    return portfolioData.content.map(section => {
      const filteredItems = Object.entries(section.items)
        .map(([key, value]) => ({
          id: key,
          title: key,
          ...value,
          type: key.toLowerCase(),
        }))
        .filter(item => item.title.toLowerCase().includes(query));

      return {
        ...section,
        items: filteredItems,
      };
    });
  }, [searchQuery]);

  return (
    <>
      {children}
      {filteredData.map((section, index) => (
        <ContentRow
          key={index}
          id={section.title.toLowerCase().replace(/ /g, "-")}
          title={section.title}
          items={section.items}
          onItemClick={handleCardClick}
          onMoreClick={handleMoreClick}
        />
      ))}
      {watchedItems.length > 0 && (
        <ContentRow
          id="continue-watching"
          title="Continue Watching..."
          items={watchedItems.slice(0, 3)}
          onItemClick={handleCardClick}
          onMoreClick={handleMoreClick}
        />
      )}
      <Modal
        isOpen={!!modalData}
        onClose={() => setModalData(null)}
        type={modalData?.type}
        data={modalData?.data}
      />
    </>
  );
};

export default PageContent;