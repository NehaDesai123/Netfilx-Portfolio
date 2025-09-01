export const portfolioData = {
  personal: {
    name: "Neha Desai",
    title: "UI Developer",
    tagline: "Seeking challenging opportunities that utilize technical and analytical skills for professional growth and knowledge enhancement",
    bio: "Passionate UI Developer with expertise in creating intuitive, responsive, and visually stunning web applications. Specialized in Vue.js, JavaScript, and modern web technologies with a focus on delivering exceptional user experiences.",
    location: "Bangalore, India",
    email: "neha.desai.2411@gmail.com",
    phone: "9591891517",
    linkedin: "https://linkedin.com/in/nehadesai",
    github: "https://github.com/nehadesai",
    portfolio: "https://nehadesai.dev"
  },

  content: [
    {
      title: "Today's Top Picks",
      items: {
        "Skills": {
          image: "/images/unsplash/skills.jpg",
          subtitle: "Core Technologies",
          details: {
            "Frontend": [
              { "name": "Vue JS (Framework 2 & 3)", "description": "Frontend Framework", "image": "/images/skills/vue.png" },
              { "name": "JavaScript", "description": "Scripting Language", "image": "/images/skills/javascript.png" },
              { "name": "Bootstrap / CSS", "description": "Web Markup and Styling", "image": "/images/skills/boostrap.png" },
              { "name": "HTML / HTML 5", "description": "Web Markup and Styling", "image": "/images/skills/html.png" }
            ],
            "Databases": [
              { "name": "SQL", "description": "Relational Database", "image": "/images/skills/sql.png" }
            ],
            "Other Tools & Practices": [
              { "name": "Visual Studio(Tool)", "description": "Code Editor", "image": "/images/skills/vscode.png" },
              { "name": "Postman", "description": "API Platform", "image": "/images/skills/postman.png" },
              { "name": "Radar/Quip", "description": "Collaboration Tool", "image": "/images/skills/radar.png" },
              { "name": "Git/ GitLab", "description": "Version Control", "image": "/images/skills/git.png" },
              { "name": "Rally", "description": "Agile Project Management", "image": "/images/skills/rally.png" },
              { "name": "Jira", "description": "Issue Tracking", "image": "/images/skills/jira.png" },
              { "name": "GitHub Copilot", "description": "AI Pair Programmer", "image": "/images/skills/copilot.png" },
              { "name": "IntelliJ IDEA (Tool)", "description": "Integrated Development Environment", "image": "/images/skills/intellij.png" }
            ]
          }
        },
        "Projects": {
          image: "/images/unsplash/projects.jpg",
          subtitle: "Featured Work",
          details: {
            "Cognizant": [
              {
                id: "core",
                name: "Core",
                category: "Customer Support",
                description: 'Apple Care',
                image: "/images/projects/core.png"
              },
              {
                id: "vims",
                name: "Visitor Management System",
                category: "Enterprise Application",
                description: 'Apple Internal',
                image: "/images/projects/vims.png"
              },
              {
                id: "columba",
                name: "Columba",
                category: "Media & Entertainment",
                description: 'Apple TV',
                image: "/images/projects/columba.png"
              },
              {
                id: "macys",
                name: "Macys",
                category: "E-commerce",
                date: "11/2021 - 06/2022",
                description: 'E-commerce Site',
                image: "/images/projects/macys.png"
              }
            ],
            "Capgemini": [
              {
                id: "ge-nms",
                name: "Nonconformance Management System",
                category: "Aviation",
                date: "06/2020 - 10/2021",
                description: 'GE Aviation',
                image: "/images/projects/nms.png"
              },
              {
                id: "ge-pcm",
                name: "Product Change Management",
                category: "Aviation",
                date: "01/2018 - 03/2020",
                description: 'GE Aviation',
                image: "/images/projects/PCM.png"
              },
              {
                id: "ge-ids",
                name: "Identification Documentation System",
                category: "Aviation",
                date: "01/2018 - 03/2020",
                description: 'GE Aviation',
                image: "/images/projects/IDS.png"
              }
            ]
          }
        },
        "Experience": {
          image: "/images/unsplash/experience.jpg",
          subtitle: "Professional Journey",
          details: [
            {
              id: "cognizant",
              company: "Cognizant",
              image: "/images/company/cognizant.png",
              position: "Sr Software Associate",
              duration: "11/2021 - Present",
              description: "Worked closely with the client to discuss various ideas/solutions, issues and timelines and Improvement opportunities. Participated in requirement gathering through various meetings and interactions with the client and onsite as required. Working with Apple since 2022 as a UI Developer, contributing to projects such as Columba, Apple Visit (VIMS), and the Dock Management System (DMS). In my role, I was responsible for designing and implementing user interfaces, ensuring a seamless and intuitive user experience across these projects.",
              moreDetails: true
            },
            {
              id: "capgemini",
              company: "Capgemini",
              image: "/images/company/capgemini.png",
              position: "Sr Analyst/Software Engineer",
              duration: "07/2018 - 10/2021",
              description: "Experienced on UI Development technologies and analysis and interpretation of backend services. Designing , Logic Building, enhancements, operational and production activity in AGILE practice. Encouraged the identification and implementation of innovative ideas to yield cost/eﬀort savings. Have experienced in tools & framework like VS Code, Vue JS, Github, STS, Jenkins, Rally and Oracle Sql Developer. Assisted the team in various SDLC phases as required to complete the task with good quality. Excellent communication with the third part vendors ,business analytical and interpersonal skills.",
              moreDetails: true
            }
          ]
        },
        "Qualification": {
          image: "/images/unsplash/qualification.jpg",
          subtitle: "Academic & Professional",
          details: [
            {
              id: "mca",
              title: "Master Of Computer Application",
              subtitle: "Annamalai University",
              date: "06/2019 - 12/2021",
              location: "Bangalore",
              image: "/images/education/mca.png"
            },
            {
              id: "bca",
              title: "Bachelor of Computer Application",
              subtitle: "KLE's RLSI",
              date: "07/2015 - 05/2018",
              location: "Belgaum",
              image: "/images/education/rls.png"
            },
            {
              id: "college",
              title: "Higher Secondary Education",
              subtitle: "Kendriya Vidyalaya",
              date: "07/2013 - 05/2015",
              location: "Belgaum",
              image: "/images/education/kv.png"
            },
          ]
        },
        "Recommendations": {
          image: "/images/unsplash/recommendations.jpg",
          subtitle: "What people say",
          details: []
        },
        "Music": {
          image: "/images/unsplash/music.jpg",
          subtitle: "My Playlist",
          details: [
            { id: "song1", title: "Arambh", subtitle: "Piyush Mishra", image: "/images/music/arambh.png" },
            { id: "song2", title: "Perfect", subtitle: "Ed Sheeran", image: "/images/music/perfect.png" },
            { id: "song3", title: "Chand sa Roshan Chehra", subtitle: "Mohammed Rafi", image: "/images/music/csrc.png" }
          ]
        },
        "Reading": {
          image: "/images/unsplash/reading.jpg",
          subtitle: "My Bookshelf",
          details: [
            { id: "book1", title: "The Alchemist", subtitle: "Paulo Coelho", image: "/images/books/alchemist.png" },
            { id: "book2", title: "The Harry Potter" , subtitle: "J. K. Rowling", image: "/images/books/harryPotter.png" },
            { id: "book3", title: "I Too Had a Love Story", subtitle: "Ravinder Singh", image: "/images/books/loverStory.png" },
            { id: "book4", title: "Pinocchio", subtitle: "Carlo Lorenzini", image: "/images/books/pinocchio.png" }
          ]
        },
        "Contact Me": {
          image: "/images/unsplash/contact.jpg",
          subtitle: "Get in Touch",
          details: {
            email: "neha.desai.2411@gmail.com",
            phone: "9591891517",
            linkedin: "https://linkedin.com/in/nehadesai"
          }
        }
      }
    }
  ]
};