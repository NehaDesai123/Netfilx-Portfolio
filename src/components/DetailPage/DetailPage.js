import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import { portfolioData } from "../../data/portfolioData";
import { contentContainerStyles } from "../../styles/GlobalStyles";
import ContentRow from "../ContentRows/ContentRow";
import Modal from "../Modal/Modal";

const Description = styled.p`
  ${contentContainerStyles}
  text-align: center;
`;

const DetailSection = styled.div.attrs({
  className: "detail-section",
})`
  position: relative;
  height: 500px;
  width: 100%;
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    height: auto;
    aspect-ratio: 16 / 9;
  }
`;

const BackgroundImage = styled.img.attrs({
  className: 'detail-background-image'
})`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: fill;
  z-index: 1;

  @media (max-width: 768px) {
    object-fit: contain;
  }
`;

const BackButton = styled(motion.button).attrs({
  className: 'detail-back-button'
})`
  top: 24px;
  left: 24px;
  background: rgb(87 25 25 / 18%);
  border: none;
  color: rgb(173 161 161);
  width: 48px;
  height: 48px;
  border-radius: 50%;
  cursor: pointer;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  padding: 0;

  &:hover {
    outline: none;
  }
  @media (max-width: 768px) {
    width: 24px;
    height: 24px;
  }
`;


const DetailPage = () => {
  const navigate = useNavigate();
  const { type } = useParams();
  const [modalData, setModalData] = useState(null);

  const item = portfolioData.content[0].items[type.charAt(0).toUpperCase() + type.slice(1)];

  const handleMoreClick = (data) => {
    setModalData({ type: "experience", data });
  };

  if (!item) {
    return <div>In transition 🌱 | Actively learning, upskilling 📚, and ready to contribute to upcoming projects 🚀</div>;
  }

  return (
    <>
      <DetailSection>
        <BackgroundImage src={process.env.PUBLIC_URL + `/images/cards/${type}.png`} alt={item.title} />
        <BackButton
          onClick={() => navigate(-1)}
          whileHover={{ scale: 1.1, transition: { duration: 0.5 } }}
          whileTap={{ scale: 0.9 }}
        >
          <i className="ri-arrow-go-back-line"></i>
        </BackButton>
      </DetailSection>
      {type === "skills" || type === "projects" ? (
        Object.entries(item.details).map(([category, items]) => (
          <ContentRow
            key={category}
            title={category}
            items={items}
            onMoreClick={handleMoreClick}
          />
        ))
      ) : Array.isArray(item.details) ? (
        item.details.length > 0 ? (
          <ContentRow
            title={item.title}
            items={item.details}
            onMoreClick={handleMoreClick}
          />
        ) : (
          <Description>
            In transition 🌱 | Actively learning, upskilling 📚, and ready to
            contribute to upcoming projects 🚀
          </Description>
        )
      ) : (
        <Description>{item.description || "No details available."}</Description>
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

export default DetailPage;