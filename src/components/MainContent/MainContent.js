import { useMemo } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import Modal from '../Modal/Modal';

const MainContainer = styled.div.attrs({
  className: 'main-container'
})`
  flex: 1;
  height: 100vh;
  overflow-y: auto;
  background: ${props => props.theme.colors.background};
  
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3);
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.5);
  }
`;

const HeroSection = styled.div.attrs({
  className: 'hero-section'
})`
  position: relative;
  height: 480px;
  margin: 24px 32px;
  border-radius: 16px;
  overflow: hidden;
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
`;

const VideoBackground = styled.div.attrs({
  className: 'video-background'
})`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  
  iframe {
    width: 100%;
    height: 100%;
    border: none;
    object-fit: cover;
    opacity: 0.8;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      135deg,
      rgba(0, 0, 0, 0.6) 0%,
      rgba(0, 0, 0, 0.3) 50%,
      rgba(0, 0, 0, 0.7) 100%
    );
    z-index: 2;
  }
`;

const HeroContent = styled.div.attrs({
  className: 'hero-content'
})`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 48px;
  background: linear-gradient(transparent, rgba(0,0,0,0.9));
  z-index: 3;
`;

const HeroTitle = styled.h1.attrs({
  className: 'hero-title'
})`
  font-size: 48px;
  font-weight: 700;
  color: ${props => props.theme.colors.text};
  margin: 0 0 16px 0;
`;

const HeroSubtitle = styled.div.attrs({
  className: 'hero-subtitle'
})`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
  color: ${props => props.theme.colors.textSecondary};
  font-size: 16px;
`;

const HeroActions = styled.div.attrs({
  className: 'hero-actions'
})`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const WatchButton = styled(motion.button).attrs({
  className: 'watch-button'
})`
  background: ${props => props.theme.colors.primary};
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  color: white;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  
  &:hover {
    background: ${props => props.theme.colors.hover};
  }
`;

const AddButton = styled(motion.button).attrs({
  className: 'add-button'
})`
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  color: ${props => props.theme.colors.text};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;

const ContentSection = styled.div.attrs({
  className: 'content-section'
})`
  padding: 32px;
`;

const SectionHeader = styled.div.attrs({
  className: 'section-header'
})`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
`;

const SectionTitle = styled.h2.attrs({
  className: 'section-title'
})`
  font-size: 24px;
  font-weight: 700;
  color: ${props => props.theme.colors.text};
  margin: 0;
`;

const PartiesGrid = styled.div.attrs({
  className: 'grid-standard skills-grid'
})`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  margin-bottom: 48px;
`;

const PartyCard = styled(motion.div).attrs({
  className: 'card-standard skill-card'
})`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateY(-4px);
  }
`;

const PartyIcon = styled.div.attrs({
  className: 'skill-icon'
})`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: ${props => props.color || props.theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  font-size: 24px;
`;

const PartyTitle = styled.h3.attrs({
  className: 'skill-title'
})`
  font-size: 18px;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  margin: 0 0 8px 0;
`;

const PartySubtitle = styled.p.attrs({
  className: 'skill-subtitle'
})`
  font-size: 14px;
  color: ${props => props.theme.colors.textSecondary};
  margin: 0;
`;


const ContinueWatchingGrid = styled.div.attrs({
  className: 'grid-standard projects-grid'
})`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
`;

const ShowCard = styled(motion.div).attrs({
  className: 'project-card'
})`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateY(-4px);
  }
`;

const ShowImage = styled.div.attrs({
  className: 'project-image'
})`
  height: 160px;
  background: ${props => props.image ? `url(${props.image}) center/cover` : 'linear-gradient(135deg, #333 0%, #555 100%)'};
  position: relative;
`;

const ShowMeta = styled.div.attrs({
  className: 'project-meta'
})`
  position: absolute;
  top: 12px;
  left: 12px;
  background: rgba(0,0,0,0.8);
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  color: white;
  font-weight: 600;
`;

const ShowContent = styled.div.attrs({
  className: 'project-content'
})`
  padding: 16px;
`;

const ShowTitle = styled.h4.attrs({
  className: 'project-title'
})`
  font-size: 16px;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  margin: 0 0 8px 0;
`;

const ExperienceGrid = styled.div.attrs({
  className: 'grid-standard projects-grid experience-grid'
})`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  margin-top: 32px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const NetflixCard = styled(motion.div).attrs({
  className: 'netflix-card'
})`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateY(-4px);
  }
`;

const CardImage = styled.div.attrs({
  className: 'card-image'
})`
  height: 160px;
  background: ${props => props.image ? `url(${props.image}) center/cover` : 'linear-gradient(135deg, #333 0%, #555 100%)'};
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 60px;
    background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%);
  }
`;

const CardContent = styled.div.attrs({
  className: 'card-content'
})`
  padding: 16px;
`;

const CardTitle = styled.h3.attrs({
  className: 'card-title'
})`
  font-size: 16px;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  margin: 0 0 8px 0;
  line-height: 1.2;
`;

const CardSubtitle = styled.h4.attrs({
  className: 'card-subtitle'
})`
  font-size: 14px;
  font-weight: 600;
  color: ${props => props.theme.colors.primary};
  margin: 0 0 6px 0;
`;

const CardMeta = styled.p.attrs({
  className: 'card-meta'
})`
  font-size: 12px;
  color: ${props => props.theme.colors.textSecondary};
  margin: 0 0 8px 0;
  font-weight: 500;
`;

const CardDescription = styled.p.attrs({
  className: 'card-description'
})`
  font-size: 12px;
  color: ${props => props.theme.colors.textSecondary};
  margin: 0;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const PlayButton = styled(motion.div).attrs({
  className: 'play-button'
})`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60px;
  height: 60px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: all 0.3s ease;
  
  &::after {
    content: '▶';
    color: #000;
    font-size: 20px;
    margin-left: 4px;
  }
  
  ${NetflixCard}:hover & {
    opacity: 1;
  }
`;

const EducationGrid = styled.div.attrs({
  className: 'grid-standard projects-grid education-grid'
})`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  margin-top: 32px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const MainContent = ({
  searchQuery = '',
  modalData = null,
  modalType = '',
  isModalOpen = false,
  onModalClose = () => {},
  onModalOpen = () => {}
}) => {
  const { theme } = useTheme();

  const parties = useMemo(() => [
    {
      id: 1,
      title: 'Vue.js Expert',
      subtitle: 'Framework 2 & 3 specialist',
      color: '#4FC08D'
    },
    {
      id: 2,
      title: 'UI/UX Designer',
      subtitle: 'Responsive & accessible design',
      color: '#FF6B6B'
    },
    {
      id: 3,
      title: 'Apple Projects',
      subtitle: 'VIMS, Columba, DMS contributor',
      color: '#007AFF'
    },
    {
      id: 4,
      title: 'Full Stack',
      subtitle: 'Frontend + Backend integration',
      color: '#FFA500'
    }
  ], []);

  const continueWatching = useMemo(() => [
    {
      id: 1,
      title: 'VIMS (Apple Internal)',
      image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop',
      meta: 'Vue.js'
    },
    {
      id: 2,
      title: 'Columba Application',
      image: 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=400&h=300&fit=crop',
      meta: 'Apple TV'
    },
    {
      id: 3,
      title: 'Macys E-commerce',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop',
      meta: 'Frontend'
    },
    {
      id: 4,
      title: 'GE Aviation DTE',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop',
      meta: 'Enterprise'
    }
  ], []);

  const experienceData = useMemo(() => [
    {
      id: 1,
      position: 'Sr Software Associate',
      company: 'Cognizant',
      duration: '11/2021 - Present',
      location: 'Bangalore',
      type: 'Full-time',
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop',
      description: '5+ years of experience in IT Industry. Working with Apple since 2022 as a UI Developer, contributing to projects such as Columba, Apple Visit (VIMS), and the Dock Management System (DMS).',
      technologies: ['Vue.js', 'JavaScript', 'HTML5', 'CSS3', 'Apple Internal Tools', 'UI/UX Design'],
      achievements: [
        '5+ years of experience in IT Industry',
        'Worked closely with the client to discuss various ideas/solutions, issues and timelines and Improvement opportunities',
        'Participated in requirement gathering through various meetings and interactions with the client and onsite as required',
        'Working with Apple since 2022 as a UI Developer, contributing to projects such as Columba, Apple Visit (VIMS), and the Dock Management System (DMS)',
        'Responsible for designing and implementing user interfaces, ensuring a seamless and intuitive user experience across these projects'
      ],
      projects: ['Columba Application', 'Apple Visit (VIMS)', 'Dock Management System (DMS)']
    },
    {
      id: 2,
      position: 'Sr Analyst/Software Engineer',
      company: 'Capgemini',
      duration: '07/2018 - 10/2021',
      location: 'Bangalore',
      type: 'Full-time',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop',
      description: 'Experienced on UI Development technologies and analysis and interpretation of backend services. Designing, Logic Building, enhancements, operational and production activity in AGILE practice.',
      technologies: ['Vue.js', 'JavaScript', 'VS Code', 'GitHub', 'STS', 'Jenkins', 'Rally', 'Oracle SQL Developer'],
      achievements: [
        'Experienced on UI Development technologies and analysis and interpretation of backend services',
        'Designing, Logic Building, enhancements, operational and production activity in AGILE practice',
        'Encouraged the identification and implementation of innovative ideas to yield cost/effort savings',
        'Have experienced in tools & framework like VS Code, Vue JS, Github, STS, Jenkins, Rally and Oracle Sql Developer',
        'Assisted the team in various SDLC phases as required to complete the task with good quality',
        'Excellent communication with the third part vendors, business analytical and interpersonal skills'
      ],
      projects: ['E-commerce Platform', 'Enterprise Web Applications', 'Client Portal Systems']
    },
    {
      id: 3,
      position: 'Sr Software Associate',
      company: 'Cognizant',
      duration: '11/2021 - Present',
      location: 'Bangalore',
      type: 'Full-time',
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop',
      description: '5+ years of experience in IT Industry. Working with Apple since 2022 as a UI Developer, contributing to projects such as Columba, Apple Visit (VIMS), and the Dock Management System (DMS).',
      technologies: ['Vue.js', 'JavaScript', 'HTML5', 'CSS3', 'Apple Internal Tools', 'UI/UX Design'],
      achievements: [
        '5+ years of experience in IT Industry',
        'Worked closely with the client to discuss various ideas/solutions, issues and timelines and Improvement opportunities',
        'Participated in requirement gathering through various meetings and interactions with the client and onsite as required',
        'Working with Apple since 2022 as a UI Developer, contributing to projects such as Columba, Apple Visit (VIMS), and the Dock Management System (DMS)',
        'Responsible for designing and implementing user interfaces, ensuring a seamless and intuitive user experience across these projects'
      ],
      projects: ['Columba Application', 'Apple Visit (VIMS)', 'Dock Management System (DMS)']
    }
  ], []);

  const educationData = useMemo(() => [
    {
      id: 1,
      degree: 'Master Of Computer Application',
      institution: 'Annamalai University',
      duration: '06/2019 - 12/2021',
      location: 'Bangalore',
      type: 'Full-time',
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9d1?w=400&h=300&fit=crop',
      description: 'Comprehensive program covering advanced computer science concepts, software engineering principles, and modern development practices. Focused on practical application of theoretical knowledge through various projects and internships.',
      subjects: ['Advanced Programming', 'Database Management', 'Software Engineering', 'Web Technologies', 'Data Structures', 'Computer Networks'],
      achievements: ['Completed with distinction', 'Led multiple group projects', 'Participated in coding competitions']
    },
    {
      id: 2,
      degree: 'Bachelor of Computer Application',
      institution: "KLE's RLSI",
      duration: '07/2015 - 05/2018',
      location: 'Belgaum',
      type: 'Full-time',
      image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&h=300&fit=crop',
      description: 'Foundation program in computer applications covering programming fundamentals, mathematics, and basic software development concepts. Built strong analytical and problem-solving skills.',
      subjects: ['Programming Fundamentals', 'Mathematics', 'Computer Fundamentals', 'Basic Web Development', 'Database Concepts', 'System Analysis'],
      achievements: ['Strong academic performance', 'Active participation in technical events', 'Developed first web applications']
    }
  ], []);

  const handleCardClick = (type, data) => {
    onModalOpen(type, data);
  };


  // Search filtering logic
  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) {
      return {
        experience: experienceData,
        education: educationData,
        projects: continueWatching,
        skills: parties
      };
    }

    const query = searchQuery.toLowerCase();
    
    const filterByQuery = (items, searchFields) => {
      return items.filter(item => {
        return searchFields.some(field => {
          const value = field.split('.').reduce((obj, key) => obj?.[key], item);
          if (Array.isArray(value)) {
            return value.some(v => v.toString().toLowerCase().includes(query));
          }
          return value?.toString().toLowerCase().includes(query);
        });
      });
    };

    return {
      experience: filterByQuery(experienceData, ['position', 'company', 'description', 'technologies', 'achievements']),
      education: filterByQuery(educationData, ['degree', 'institution', 'description']),
      projects: filterByQuery(continueWatching, ['title', 'meta']),
      skills: filterByQuery(parties, ['title', 'subtitle'])
    };
  }, [searchQuery, experienceData, educationData, continueWatching, parties]);

  const handleResumeDownload = async () => {
    try {
      // Fetch the existing PDF file from the public folder
      const response = await fetch('/images/neha_desai.pdf');
      if (!response.ok) {
        throw new Error('Failed to fetch PDF file');
      }
      
      // Get the PDF as a blob
      const blob = await response.blob();
      
      // Create a URL for the blob
      const url = URL.createObjectURL(blob);
      
      // Create a link element to download the PDF
      const link = document.createElement('a');
      link.href = url;
      link.download = 'neha_desai.pdf';
      link.style.display = 'none';
      
      // Append to body, click, and remove
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Clean up the URL
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Resume download failed:', error);
      alert('Failed to download resume. Please try again.');
    }
  };

  return (
    <MainContainer theme={theme}>
      <HeroSection id="hero-section">
        <VideoBackground>
          <iframe
            src="https://player.vimeo.com/video/274860274?background=1&autoplay=1&loop=1&byline=0&title=0&muted=1"
            title="Developer Portfolio Background Video"
            allow="autoplay; fullscreen"
            allowFullScreen
          ></iframe>
        </VideoBackground>
        <HeroContent>
          <HeroTitle theme={theme}>Neha Desai</HeroTitle>
          
          <HeroSubtitle theme={theme}>
            <span>5+ Years Experience UI Developer, Bangalore</span>
          </HeroSubtitle>
          
          <HeroActions>
            <WatchButton
              theme={theme}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleResumeDownload}
            >
              <i className="ri-download-line"></i>
              Resume
            </WatchButton>
            <AddButton
              theme={theme}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <i className="ri-mail-line"></i>
            </AddButton>
          </HeroActions>
        </HeroContent>
      </HeroSection>

      <ContentSection>
        <div id="skills-section">
          <SectionHeader>
            <SectionTitle theme={theme}>Core Skills</SectionTitle>
          </SectionHeader>
        </div>

        <PartiesGrid>
          {filteredData.skills.map((party) => (
            <PartyCard
              key={party.id}
              theme={theme}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <PartyIcon color={party.color} theme={theme}>
                🎬
              </PartyIcon>
              <PartyTitle theme={theme}>{party.title}</PartyTitle>
              <PartySubtitle theme={theme}>{party.subtitle}</PartySubtitle>
            </PartyCard>
          ))}
        </PartiesGrid>

        <div id="projects-section">
          <SectionTitle theme={theme}>Featured Projects</SectionTitle>
        </div>
        <ContinueWatchingGrid>
          {filteredData.projects.map((show) => (
            <ShowCard
              key={show.id}
              theme={theme}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <ShowImage image={show.image}>
                <ShowMeta>{show.meta}</ShowMeta>
              </ShowImage>
              <ShowContent>
                <ShowTitle theme={theme}>{show.title}</ShowTitle>
              </ShowContent>
            </ShowCard>
          ))}
        </ContinueWatchingGrid>

        {/* Experience Section */}
        <div id="experience-section" style={{ paddingTop: '60px' }}>
          <SectionTitle theme={theme}>Professional Experience</SectionTitle>
          
          <ExperienceGrid>
            {filteredData.experience.map((experience, index) => (
              <NetflixCard
                key={experience.id}
                theme={theme}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ scale: 1.02 }}
                onClick={() => handleCardClick('experience', experience)}
              >
                <CardImage image={experience.image}>
                  <PlayButton
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  />
                </CardImage>
                <CardContent>
                  <CardTitle theme={theme}>{experience.position}</CardTitle>
                  <CardSubtitle theme={theme}>{experience.company}</CardSubtitle>
                  <CardMeta theme={theme}>{experience.duration} • {experience.location}</CardMeta>
                  <CardDescription theme={theme}>{experience.description}</CardDescription>
                </CardContent>
              </NetflixCard>
            ))}
          </ExperienceGrid>
        </div>

        {/* Education Section */}
        <div id="education-section" style={{ paddingTop: '60px' }}>
          <SectionTitle theme={theme}>Education</SectionTitle>
          
          <EducationGrid>
            {filteredData.education.map((education, index) => (
              <NetflixCard
                key={education.id}
                theme={theme}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ scale: 1.02 }}
                onClick={() => handleCardClick('education', education)}
              >
                <CardImage image={education.image}>
                  <PlayButton
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  />
                </CardImage>
                <CardContent>
                  <CardTitle theme={theme}>{education.degree}</CardTitle>
                  <CardSubtitle theme={theme}>{education.institution}</CardSubtitle>
                  <CardMeta theme={theme}>{education.duration} • {education.location}</CardMeta>
                  <CardDescription theme={theme}>{education.description}</CardDescription>
                </CardContent>
              </NetflixCard>
            ))}
          </EducationGrid>
        </div>
      </ContentSection>

      <Modal
        type={modalType}
        data={modalData}
        isOpen={isModalOpen}
        onClose={onModalClose}
      />
    </MainContainer>
  );
};

export default MainContent;