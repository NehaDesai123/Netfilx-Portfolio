import React from 'react';
import styled from 'styled-components';
import { portfolioData } from '../../data/portfolioData';
import { useNavigate } from 'react-router-dom';

const ProfileContainer = styled.div.attrs({
  className: 'profile-container'
})`
  width: 100%;
  overflow-x: hidden;
  min-height: 100vh;
  background: linear-gradient(rgb(112 183 204), rgb(158 174 105)) center top;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-position: top;
  padding: 2rem 0;
  box-sizing: border-box;
  overflow-y: auto;

  @media (max-width: 400px) {
    background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/images/cards/contact-mini.png') center/cover no-repeat;
    padding: 0rem;
    justify-content: center;
  }
`;

const ProfileCard = styled.div.attrs({
  className: 'profile-card'
})`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-width: 600px;
  width: 90%;
  color: black;
  text-shadow: 1px 1px 1px silver;
  background-image: url('/images/cards/contact.png');
  background-size: cover;
  background-position: center;
  border-radius: 8px;
  box-shadow: none;
  -webkit-mask-image: radial-gradient(circle, black 70%, transparent 100%);
  mask-image: radial-gradient(circle, black 70%, transparent 100%);

  @media (max-width: 400px) {
    width: 100%;
    height: 100%;
    margin: 0;
    background: transparent;
    box-shadow: none;
    -webkit-mask-image: none;
    mask-image: none;
    color: white;
    text-shadow: 1px 1px 2px rgba(0,0,0,0.8);
  }
`;

const ProfileRow = styled.div.attrs({
  className: 'profile-row'
})`
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
  margin-top: 6rem;
  margin-bottom: 2rem;

  @media (max-width: 400px) {
    flex-direction: column;
    margin-top: 5rem;
    margin-bottom: 1rem;
    gap: 0.5rem;
  }
`;

const ProfileInfo = styled.div.attrs({
  className: 'profile-info'
})`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  @media (max-width: 400px) {
    align-items: center;
    text-align: center;
  }
`;

const ProfileImage = styled.img.attrs({
  className: 'profile-image'
})`
  width: 100px;
  height: 100px;
  border-radius: 50%;

  @media (max-width: 400px) {
    display: none;
  }
`;

const ProfileName = styled.h1.attrs({
  className: 'profile-name'
})`
  font-size: 2rem;

  @media (max-width: 400px) {
    font-size: 1.5rem;
  }
`;

const ProfileTitle = styled.h2.attrs({
  className: 'profile-title'
})`
  margin: 0 0 0.5rem 0;
  font-size: 1.2rem;
  font-weight: normal;

  @media (max-width: 400px) {
    font-size: 1rem;
  }
`;

const ProfileBio = styled.p.attrs({
  className: 'profile-bio'
})`
  font-size: 1rem;
  max-width: 100%;
  color: black;
  line-height: 1.25;

  @media (max-width: 400px) {
    font-size: 0.9rem;
    color: white;
  }
`;
const ProfileLink = styled.a.attrs({
  className: 'profile-link'
})`
  display: inline-block;
  background: #0077b5;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  text-decoration: none;
  margin-top: 1rem;
  text-shadow: none;

  @media (max-width: 400px) {
    padding: 0.4rem 0.8rem;
    font-size: 0.9rem;
  }
`;

const ContactInfo = styled.div.attrs({
  className: 'contact-info'
})`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  align-items: center;
  justify-content: center;

  @media (max-width: 400px) {
    flex-direction: column;
    gap: 0.5rem;
  }
`;

const ContactItem = styled.div.attrs({
  className: 'contact-item'
})`
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  
  i {
    color: black;
    transition: all 0.3s ease;
  }

  @media (max-width: 400px) {
    color: white;
    i {
      color: white;
    }
  }

  &:hover {
    transform: scale(1.1);
  }
`;

const CenteredText = styled.p`
  font-family: cursive;
  text-align: center;
  font-weight: bold;
  color:#b60000;
  font-size: 1.1rem;

  @media (max-width: 400px) {
    font-size: 1rem;
    color: rgb(126 13 13);
    text-shadow: none;
  }
`;

const BackButton = styled.button`
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
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

  @media (max-width: 400px) {
    top: 10px;
    width: 36px;
    height: 36px;
    font-size: 20px;
    transform: none;
  }
`;

const ProfilePage = () => {
  const { name, title, bio, linkedin, email, phone, location } = portfolioData.personal;
  const navigate = useNavigate();

  return (
    <ProfileContainer>
      <BackButton onClick={() => navigate(-1)}>
        <i className="ri-arrow-go-back-line"></i>
      </BackButton>
      <ProfileCard>
        <ProfileRow>
          <ProfileImage src="/images/profilePic.png" alt={name} />
          <ProfileInfo>
            <ProfileName>{name}</ProfileName>
            <ProfileTitle>{title} - {location}</ProfileTitle>
            <ProfileBio>{bio}</ProfileBio>
            <ProfileLink href={linkedin} target="_blank" rel="noopener noreferrer">
              View Profile
            </ProfileLink>
          </ProfileInfo>
        </ProfileRow>
        <div>
          <CenteredText>I'm always up for a chat 💬 or a coffee ☕! Feel free to reach out.</CenteredText>
          <ContactInfo>
            <a href={`mailto:${email}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <ContactItem>
                <i className="ri-mail-fill"></i>
                <span>{email}</span>
              </ContactItem>
            </a>
            <a href={`tel:${phone}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <ContactItem>
                <i className="ri-phone-fill"></i>
                <span>{phone}</span>
              </ContactItem>
            </a>
          </ContactInfo>
        </div>
      </ProfileCard>
    </ProfileContainer>
  );
};

export default ProfilePage;