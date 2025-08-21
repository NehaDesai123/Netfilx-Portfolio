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

  skills: {
    frontend: [
      { name: "Vue JS (Framework 2 & 3)", level: 95, category: "Framework", experience: "4+ years" },
      { name: "JavaScript", level: 90, category: "Language", experience: "6+ years" },
      { name: "Bootstrap/CSS", level: 90, category: "Styling", experience: "6+ years" },
      { name: "HTML/HTML5", level: 95, category: "Markup", experience: "6+ years" },
      { name: "SQL", level: 85, category: "Database", experience: "5+ years" }
    ],
    tools: [
      { name: "Visual Studio", level: 90, category: "IDE", experience: "5+ years" },
      { name: "Postman", level: 85, category: "API Testing", experience: "4+ years" },
      { name: "Radar/Quip", level: 80, category: "Collaboration", experience: "3+ years" },
      { name: "Git/GitLab", level: 85, category: "Version Control", experience: "5+ years" },
      { name: "Rally", level: 75, category: "Project Management", experience: "3+ years" },
      { name: "Jira", level: 80, category: "Issue Tracking", experience: "4+ years" },
      { name: "GitHub Copilot", level: 85, category: "AI Assistant", experience: "2+ years" },
      { name: "IntelliJ IDEA", level: 80, category: "IDE", experience: "3+ years" }
    ]
  },

  experience: [
    {
      id: "cognizant",
      company: "Cognizant Technology Solutions",
      position: "Software Associate",
      duration: "11/2021 - Present",
      location: "Bangalore, India",
      type: "Full-time",
      description: "Leading frontend development initiatives for Apple internal applications, implementing modern UI/UX best practices and delivering high-quality solutions for enterprise-level systems.",
      achievements: [
        "Developed and maintained VIMS (Apple Internal) application with Vue.js and modern web technologies",
        "Successfully delivered Columba Application for Apple TV platform with enhanced user experience",
        "Implemented responsive design patterns and reusable component libraries",
        "Collaborated with cross-functional teams to deliver projects on time and within scope",
        "Optimized application performance and improved code quality through best practices"
      ],
      technologies: ["Vue.js", "JavaScript", "HTML5", "CSS3", "Bootstrap", "Git", "Jira"],
      projects: ["VIMS (Apple Internal)", "Columba Application (Apple TV)", "Macys E-commerce Site"]
    },
    {
      id: "capgemini",
      company: "Capgemini",
      position: "Sr Analyst/Software Engineer",
      duration: "07/2018 - 10/2021",
      location: "Bangalore, India",
      type: "Full-time",
      description: "Developed and maintained multiple client-facing web applications for GE Aviation with focus on user experience, performance optimization, and cross-browser compatibility.",
      achievements: [
        "Successfully delivered GE Aviation DTE NMS and PCM applications",
        "Implemented complex data visualization and real-time monitoring systems",
        "Reduced application load times by 40% through performance optimization",
        "Collaborated with international teams and stakeholders",
        "Mentored junior developers and conducted code reviews"
      ],
      technologies: ["JavaScript", "HTML5", "CSS3", "SQL", "Visual Studio", "Git"],
      projects: ["GE Aviation DTE NMS", "GE Aviation DTE PCM"]
    }
  ],

  projects: [
    {
      id: "vims",
      title: "VIMS (Apple Internal)",
      category: "Enterprise Application",
      type: "Internal System",
      duration: "10/2023 - Present",
      status: "Active",
      description: "Comprehensive vendor information management system for Apple's internal operations, streamlining vendor onboarding, compliance tracking, and performance monitoring.",
      longDescription: "VIMS is a sophisticated internal application developed for Apple that revolutionizes vendor management processes. The system provides a centralized platform for vendor registration, document management, compliance tracking, and performance analytics. Built with Vue.js and modern web technologies, it offers real-time dashboards, automated workflows, and comprehensive reporting capabilities tailored for Apple's enterprise needs.",
      features: [
        "Vendor registration and onboarding workflow",
        "Document management with version control",
        "Compliance tracking and automated alerts",
        "Performance analytics dashboard",
        "Real-time notification system",
        "Role-based access control and security"
      ],
      technologies: ["Vue.js", "JavaScript", "HTML5", "CSS3", "Bootstrap", "SQL"],
      challenges: [
        "Complex enterprise-level security requirements",
        "Integration with existing Apple internal systems",
        "Scalable architecture for large vendor databases"
      ],
      solutions: [
        "Implemented robust security protocols and authentication",
        "Developed seamless API integrations with legacy systems",
        "Built scalable component architecture with Vue.js"
      ],
      impact: "Streamlined vendor management processes and improved operational efficiency for Apple's internal teams",
      images: ["vims-dashboard.jpg", "vims-vendor-profile.jpg", "vims-analytics.jpg"],
      liveUrl: "Internal System",
      githubUrl: "Private Repository"
    },
    {
      id: "columba",
      title: "Columba Application (Apple TV)",
      category: "Media & Entertainment",
      type: "TV Application",
      duration: "07/2022 - 09/2023",
      status: "Completed",
      description: "Advanced Apple TV application providing enhanced user experience for media consumption with intuitive navigation and modern interface design.",
      longDescription: "Columba is a sophisticated Apple TV application that delivers an exceptional media consumption experience. The application features intuitive navigation, responsive design optimized for TV interfaces, and seamless integration with Apple's ecosystem. Built with modern web technologies and optimized for performance on Apple TV hardware.",
      features: [
        "Intuitive TV-optimized user interface",
        "Seamless media browsing and playback",
        "Advanced search and filtering capabilities",
        "Personalized content recommendations",
        "Multi-user profile support",
        "Integration with Apple services"
      ],
      technologies: ["Vue.js", "JavaScript", "HTML5", "CSS3", "Apple TV APIs"],
      challenges: [
        "TV interface design and navigation optimization",
        "Performance optimization for Apple TV hardware",
        "Integration with Apple's media ecosystem"
      ],
      solutions: [
        "Developed TV-specific UI components and navigation patterns",
        "Implemented efficient rendering and memory management",
        "Created seamless API integrations with Apple services"
      ],
      impact: "Enhanced user experience for Apple TV users with improved interface and functionality",
      images: ["columba-home.jpg", "columba-player.jpg", "columba-search.jpg"],
      liveUrl: "Apple TV App Store",
      githubUrl: "Private Repository"
    },
    {
      id: "macys",
      title: "Macys E-commerce Site",
      category: "E-commerce",
      type: "Web Application",
      duration: "11/2021 - 06/2022",
      status: "Completed",
      description: "Enhanced user experience for Macy's e-commerce platform with improved product discovery, checkout flow, and mobile responsiveness.",
      longDescription: "This project involved comprehensive frontend improvements to Macy's e-commerce platform, focusing on user experience optimization and conversion rate improvement. The enhancements included redesigned product pages, streamlined checkout process, improved search functionality, and mobile-first responsive design implementation.",
      features: [
        "Redesigned product detail pages",
        "Optimized checkout flow and payment processing",
        "Enhanced search and filtering capabilities",
        "Mobile-responsive design implementation",
        "Performance optimization and loading improvements",
        "A/B testing for conversion optimization"
      ],
      technologies: ["Vue.js", "JavaScript", "HTML5", "CSS3", "Bootstrap"],
      challenges: [
        "Legacy system integration and migration",
        "Performance optimization for large product catalogs",
        "Cross-browser compatibility and responsive design"
      ],
      solutions: [
        "Implemented gradual migration strategy with Vue.js components",
        "Optimized loading with lazy loading and code splitting",
        "Comprehensive testing across multiple browsers and devices"
      ],
      impact: "Improved user experience and conversion rates for Macy's e-commerce platform",
      images: ["macys-homepage.jpg", "macys-product.jpg", "macys-checkout.jpg"],
      liveUrl: "https://macys.com",
      githubUrl: "Private Repository"
    },
    {
      id: "ge-aviation-nms",
      title: "GE Aviation DTE NMS",
      category: "Aerospace Technology",
      type: "Enterprise Dashboard",
      duration: "06/2020 - 10/2021",
      status: "Completed",
      description: "Network Management System for GE Aviation's Digital Technology Environment providing real-time monitoring, analytics, and control interfaces for aviation network systems.",
      longDescription: "Developed a comprehensive Network Management System for GE Aviation that provides real-time monitoring and control capabilities for aviation network infrastructure. The application features advanced data visualization, alert management, network diagnostics, and reporting tools essential for aviation network operations and maintenance.",
      features: [
        "Real-time network monitoring and status tracking",
        "Advanced data visualization and analytics",
        "Alert and notification management system",
        "Network diagnostic tools and reports",
        "Multi-level user access control",
        "Integration with aviation network databases"
      ],
      technologies: ["JavaScript", "HTML5", "CSS3", "SQL", "Visual Studio"],
      challenges: [
        "Real-time data processing and network monitoring",
        "High-availability system requirements for aviation",
        "Complex security and compliance requirements"
      ],
      solutions: [
        "Implemented efficient real-time data processing systems",
        "Built redundant monitoring with automatic failover",
        "Comprehensive security implementation for aviation standards"
      ],
      impact: "Improved network monitoring efficiency and reduced system downtime for GE Aviation operations",
      images: ["ge-nms-dashboard.jpg", "ge-nms-monitoring.jpg", "ge-nms-analytics.jpg"],
      liveUrl: "Internal System",
      githubUrl: "Private Repository"
    },
    {
      id: "ge-aviation-pcm",
      title: "GE Aviation DTE PCM",
      category: "Aerospace Technology",
      type: "Process Control Management",
      duration: "01/2018 - 03/2020",
      status: "Completed",
      description: "Process Control Management system for GE Aviation's Digital Technology Environment providing comprehensive process monitoring, control, and optimization capabilities.",
      longDescription: "Developed a sophisticated Process Control Management system for GE Aviation that provides comprehensive monitoring and control capabilities for various aviation processes. The application features process visualization, control interfaces, performance analytics, and optimization tools essential for aviation process management and efficiency.",
      features: [
        "Process monitoring and control interfaces",
        "Real-time process visualization",
        "Performance analytics and reporting",
        "Process optimization tools",
        "Alert and exception management",
        "Integration with aviation process databases"
      ],
      technologies: ["JavaScript", "HTML5", "CSS3", "SQL", "Visual Studio"],
      challenges: [
        "Complex process control requirements",
        "Real-time process monitoring and visualization",
        "Integration with existing aviation systems"
      ],
      solutions: [
        "Developed comprehensive process control interfaces",
        "Implemented real-time visualization with efficient rendering",
        "Created seamless integration with legacy aviation systems"
      ],
      impact: "Enhanced process control efficiency and optimization for GE Aviation operations",
      images: ["ge-pcm-dashboard.jpg", "ge-pcm-control.jpg", "ge-pcm-analytics.jpg"],
      liveUrl: "Internal System",
      githubUrl: "Private Repository"
    }
  ],

  education: [
    {
      id: "mca",
      degree: "Master of Computer Application",
      field: "Computer Science",
      institution: "Annamalai University",
      duration: "06/2019 - 12/2021",
      grade: "First Class",
      description: "Advanced computer science education with focus on software development, web technologies, database management, and modern programming practices.",
      coursework: [
        "Advanced Software Engineering",
        "Web Technologies and Frameworks",
        "Database Management and Design",
        "Data Structures and Algorithms",
        "Object-Oriented Programming",
        "Software Project Management"
      ],
      projects: [
        "Master's Project: E-commerce Web Application",
        "Database Project: Inventory Management System",
        "Web Development Project: Online Learning Platform"
      ]
    },
    {
      id: "bca",
      degree: "Bachelor of Computer Application",
      field: "Computer Science",
      institution: "KLE's RLSI",
      duration: "07/2015 - 05/2018",
      grade: "First Class",
      description: "Comprehensive computer science foundation with focus on programming fundamentals, web development, and software engineering principles.",
      coursework: [
        "Programming Fundamentals",
        "Web Development Technologies",
        "Database Systems",
        "Software Engineering",
        "Computer Networks",
        "System Analysis and Design"
      ],
      projects: [
        "Final Year Project: Student Management System",
        "Web Project: Online Shopping Portal",
        "Database Project: Library Management System"
      ]
    }
  ],

  achievements: [
    {
      id: "ievolve-certificate",
      title: "Ievolve Certificate",
      organization: "Cognizant Technology Solutions",
      year: "2023",
      description: "Recognized for developing reusable modal components that improved development efficiency and code reusability across multiple projects",
      category: "Professional"
    },
    {
      id: "star-award",
      title: "Star Award",
      organization: "Cognizant Technology Solutions",
      year: "2022",
      description: "Awarded for outstanding performance and exceptional contribution to project delivery and team collaboration",
      category: "Professional"
    },
    {
      id: "project-excellence",
      title: "Project Excellence Award",
      organization: "Capgemini",
      year: "2021",
      description: "Recognized for successful delivery of GE Aviation projects with exceptional quality and client satisfaction",
      category: "Professional"
    },
    {
      id: "innovation-award",
      title: "Innovation in Development",
      organization: "Capgemini",
      year: "2020",
      description: "Awarded for implementing innovative solutions that improved application performance and user experience",
      category: "Professional"
    }
  ],

  testimonials: [
    {
      id: "manager-cognizant",
      name: "Rajesh Kumar",
      position: "Technical Manager",
      company: "Cognizant",
      text: "Neha is an exceptional developer with a keen eye for detail and user experience. Her technical skills in Vue.js and modern web technologies combined with leadership qualities make her invaluable to any team.",
      rating: 5
    },
    {
      id: "colleague-capgemini",
      name: "Priya Sharma",
      position: "Senior Developer",
      company: "Capgemini",
      text: "Working with Neha on GE Aviation projects was a great experience. She brings innovative solutions to complex problems and always delivers high-quality code on time.",
      rating: 5
    },
    {
      id: "team-lead",
      name: "Amit Patel",
      position: "Team Lead",
      company: "Cognizant",
      text: "Neha's expertise in Vue.js and her ability to create reusable components has significantly improved our development process. She's a reliable team member who consistently exceeds expectations.",
      rating: 5
    }
  ]
};