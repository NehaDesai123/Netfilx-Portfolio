import styled from 'styled-components';
import { useTheme } from '../../contexts/ThemeContext';
import { useNavigate } from 'react-router-dom';

const UserProfileContainer = styled.div.attrs({
  className: 'user-profile'
})`
  position: fixed;
  top: 1rem;
  right: 0.5rem;
  display: flex;
  align-items: center;
  cursor: pointer;
  border-radius: 4px;
  transition: background 0.2s ease;
  z-index: 101;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    top: 0.1rem;
  right: 0.2rem;
  }
`;

const UserAvatar = styled.img.attrs({
  className: 'user-avatar'
})`
  width: 80px;
  height: 100%;
  border-radius: 50%;
  padding: 4px 8px;
  flex-shrink: 0;

  @media (max-width: 768px) {
  padding: 1px 2px;
  width: 40px;
  }
`;

const UserProfile = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/netflix/portfolio/profile');
  };

  return (
    <UserProfileContainer
      theme={theme}
      onClick={handleClick}
    >
      <UserAvatar
        src={process.env.PUBLIC_URL + "/images/profilePic.png"}
        theme={theme}
        alt="User"
        className="user-avatar-img"
      />
    </UserProfileContainer>
  );
};

export default UserProfile;