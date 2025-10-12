import { ResumeData } from '@/types/resume';

export const sampleResumeData: ResumeData = {
  contact: {
    fullName: "John Doe",
    title: "Senior Frontend Developer",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    linkedin: "https://linkedin.com/in/johndoe",
    github: "https://github.com/johndoe",
    website: "https://johndoe.dev"
  },
  summary: "Frontend Developer with 7+ years of experience building user-centric and scalable web applications. Deep expertise in React, TypeScript, and modern web technologies. Experienced in Agile/Scrum methodology with a passion for code quality and performance optimization.",
  experience: [
    {
      id: "1",
      company: "Tech Solutions Inc.",
      position: "Senior Frontend Developer",
      location: "San Francisco, CA",
      startDate: "January 2021",
      endDate: "",
      current: true,
      description: [
        "Developed 5+ large-scale e-commerce projects using React and Next.js, achieving 40% performance improvement",
        "Built type-safe and maintainable codebase using TypeScript, Redux Toolkit, and React Query",
        "Designed modular and scalable application architecture using micro-frontend patterns",
        "Achieved 85%+ test coverage using Jest and React Testing Library",
        "Led a team of 5 frontend developers and managed code review processes"
      ]
    },
    {
      id: "2",
      company: "Digital Agency Ltd.",
      position: "Frontend Developer",
      location: "San Francisco, CA",
      startDate: "March 2019",
      endDate: "December 2020",
      current: false,
      description: [
        "Built 15+ responsive web applications using React and Vue.js",
        "Implemented REST API and GraphQL integrations",
        "Optimized build processes with Webpack and Vite, reducing build time by 60%",
        "Converted Figma and Adobe XD designs to pixel-perfect code",
        "Actively participated in Git flow and CI/CD processes"
      ]
    },
    {
      id: "3",
      company: "StartupCo",
      position: "Junior Frontend Developer",
      location: "New York, NY",
      startDate: "June 2017",
      endDate: "February 2019",
      current: false,
      description: [
        "Developed corporate websites using HTML5, CSS3, JavaScript, and jQuery",
        "Created responsive and modular CSS architectures with Bootstrap and Sass",
        "Conducted cross-browser compatibility testing and resolved issues",
        "Wrote code compliant with SEO optimization and web accessibility standards"
      ]
    }
  ],
  education: [
    {
      id: "1",
      school: "Stanford University",
      degree: "Bachelor of Science",
      field: "Computer Science",
      location: "Stanford, CA",
      startDate: "2013",
      endDate: "2017",
      gpa: "3.42/4.00"
    }
  ],
  projects: [
    {
      id: "1",
      name: "E-Commerce Platform",
      description: "Full-featured e-commerce platform with Next.js and Stripe integration. Includes user management, payment system, cart management, and admin panel.",
      technologies: ["Next.js", "TypeScript", "Stripe", "PostgreSQL", "Tailwind CSS"],
      link: "https://ecommerce-demo.com",
      github: "https://github.com/johndoe/ecommerce"
    },
    {
      id: "2",
      name: "Project Management Tool",
      description: "Project management and tracking system developed for Agile teams. Features Kanban board, sprint planning, and reporting.",
      technologies: ["React", "Node.js", "MongoDB", "Socket.io", "Redux"],
      github: "https://github.com/johndoe/project-manager"
    },
    {
      id: "3",
      name: "Weather Application",
      description: "Responsive web application providing real-time weather information using OpenWeather API.",
      technologies: ["React", "TypeScript", "OpenWeather API", "Chart.js"],
      link: "https://weather-app-demo.com"
    }
  ],
  skills: [
    {
      category: "Frontend Technologies",
      items: ["React", "Next.js", "TypeScript", "JavaScript (ES6+)", "HTML5", "CSS3", "Tailwind CSS", "Sass/SCSS"]
    },
    {
      category: "State Management & Data Fetching",
      items: ["Redux Toolkit", "Zustand", "React Query", "SWR", "Context API"]
    },
    {
      category: "Testing & Build Tools",
      items: ["Jest", "React Testing Library", "Cypress", "Webpack", "Vite", "ESLint", "Prettier"]
    },
    {
      category: "Backend & Database",
      items: ["Node.js", "Express", "REST API", "GraphQL", "PostgreSQL", "MongoDB"]
    },
    {
      category: "Tools & Methodology",
      items: ["Git", "Docker", "CI/CD", "Agile/Scrum", "Jira", "Figma", "Azure DevOps"]
    },
    {
      category: "Languages",
      items: ["English (Native)", "Spanish (Intermediate)"]
    }
  ]
};

