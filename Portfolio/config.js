/* ==========================================================================
   NEHA BISWAL PORTFOLIO - CENTRAL CONFIGURATION (config.js)
   --------------------------------------------------------------------------
   This file stores all content and settings for the portfolio.
   Every card (education, project, skill, learning milestone, certification,
   achievement, goal) has a unique 'id' and 'details' fields.
   Clicking any card in the portfolio will dynamically open a premium modal
   with these details.
   ========================================================================== */

const PORTFOLIO_CONFIG = {
    // ----------------------------------------------------------------------
    // 1. PROFILE & SOCIAL LINKS
    // ----------------------------------------------------------------------
    profile: {
        name: "Neha Biswal",
        logoName: "Neha Biswal",
        roles: [
            "B.Tech CSE Student",
            "Full Stack & AI Learner",
            "ISIH Winner",
            "UI/UX Coordinator"
        ],
        // Exact student tagline requested
        tagline: "Motivated B.Tech CSE student (CGPA 9.27) and double ISIH hackathon winner. Passionate about full-stack development, AI integrations, and building optimized applications.",
        location: "Odisha, India",
        resumeUrl: "https://drive.google.com/file/d/17hPLGkBwrAqaR18kGehnrNkONvm8Cuh_/view?usp=sharing",
        profileImg: "assets/images/profile.jpg",
        availableForWork: true,

        email: "biswalsubhadarshini943@gmail.com",
        phone: "+91 8984198035",

        socials: {
            linkedin: "https://linkedin.com/in/neha-biswal-62618a328",
            github: "https://github.com/Nehabiswal-07"
        }
    },

    // ----------------------------------------------------------------------
    // 2. ABOUT ME
    // ----------------------------------------------------------------------
    about: {
        title: "B.Tech Computer Science student building functional web and AI-driven applications.",
        intro: "I am a sophomore studying Computer Science and Engineering at Amity University Chhattisgarh. I focus on full-stack web development and AI API integrations, translating ideas into working software.",
        readMoreParagraphs: [
            "I enjoy working with React.js, Node.js, and MongoDB, bridging frontend design with solid backend logic. My academic work has given me a strong foundation in core computer science subjects like Data Structures, OOP, and DBMS.",
            "As the UI/UX Coordinator for the Devity Club, I've spent time understanding how users interact with screens, focusing on usability and clean, functional interfaces.",
            "Collaborating in hackathons like the Internal Smart India Hackathon (ISIH) has taught me how to coordinate under pressure, solve problems as a team, and write clean, maintainable code."
        ]
    },

    // ----------------------------------------------------------------------
    // 3. EDUCATION JOURNEY
    // ----------------------------------------------------------------------
    education: [
        {
            id: "btech",
            degree: "B.Tech in Computer Science & Engineering",
            institution: "Amity University Chhattisgarh",
            duration: "2024 – 2028",
            grade: "CGPA: 9.27/10",
            highlight: true,
            details: "Currently pursuing B.Tech in Computer Science & Engineering with focus on full-stack development, AI integrations, databases, and modern software engineering concepts while maintaining strong academic performance.",
            modalDetails: {
                title: "B.Tech in Computer Science & Engineering",
                institution: "Amity University Chhattisgarh",
                duration: "2024 – 2028",
                gradeText: "Current Cumulative CGPA: 9.27 / 10.0",
                syllabus: [
                    "Data Structures and Algorithms (Java / C++)",
                    "Object-Oriented Programming (OOP)",
                    "Database Management Systems (DBMS)",
                    "Operating Systems (OS) & Computer Architecture",
                    "Discrete Mathematics & Logic"
                ],
                extracurriculars: [
                    "UI/UX Coordinator at Devity Club, AUC",
                    "Winner of Internal Smart India Hackathons in 2024 and 2025",
                    "Active member in coding activities and peer-led study groups"
                ]
            }
        },
        {
            id: "class12",
            degree: "Class XII (CHSE)",
            institution: "Council of Higher Secondary Education, Odisha",
            duration: "2021 – 2023",
            grade: "Percentage: 91.16%",
            highlight: false,
            details: "Completed higher secondary education with strong academic focus on science, analytical thinking, mathematics, and problem-solving fundamentals.",
            modalDetails: {
                title: "Class XII (CHSE)",
                institution: "Council of Higher Secondary Education, Odisha",
                duration: "2021 – 2023",
                gradeText: "Final Score: 91.16%",
                syllabus: [
                    "Physics",
                    "Chemistry",
                    "Mathematics",
                    "Biology",
                    "English",
                    "Odia"
                ],
                extracurriculars: [
                    "First Position in High School Science Exhibition (Web Project)",
                    "Member of the Student Coding Club"
                ]
            }
        },
        {
            id: "class10",
            degree: "Class X (CHSE)",
            institution: "Board of Secondary Education, Odisha",
            duration: "2021",
            grade: "Percentage: 91.33%",
            highlight: false,
            details: "Built strong academic foundation in mathematics, science, languages, and logical reasoning during secondary education.",
            modalDetails: {
                title: "Class X (CHSE)",
                institution: "Board of Secondary Education, Odisha",
                duration: "2021",
                gradeText: "Final Score: 91.33%",
                syllabus: [
                    "Mathematics",
                    "General Science",
                    "Social Science",
                    "Odia",
                    "English",
                    "Sanskrit"
                ],
                extracurriculars: [
                    "School Merit List Placement",
                    "Participated in Inter-School Debates"
                ]
            }
        }
    ],

    // ----------------------------------------------------------------------
    // 4. TECHNICAL SKILLS
    // ----------------------------------------------------------------------
    skills: {
        categories: [
            {
                id: "skills-programming",
                title: "Programming Languages",
                icon: "code",
                skillsList: [
                    { name: "Java", percentage: 88 },
                    { name: "JavaScript (ES6+)", percentage: 90 },
                    { name: "C++", percentage: 80 },
                    { name: "C", percentage: 75 }
                ],
                modalDetails: {
                    title: "Programming Languages",
                    description: "Strengthening core coding logic, syntax behaviors, object-oriented concepts, and algorithmic implementations in multiple languages.",
                    topics: [
                        "Java core programming, OOP encapsulation, inheritance, exceptions",
                        "C++ basics, memory allocation, STL containers",
                        "C syntax, loops, functions, basic pointer controls",
                        "Modern ES6+ JavaScript, Event Handling, asynchronous functions"
                    ]
                }
            },
            {
                id: "skills-web",
                title: "Web Technologies",
                icon: "layout",
                skillsList: [
                    { name: "HTML5 / CSS3", percentage: 95 },
                    { name: "React.js", percentage: 88 },
                    { name: "Node.js / Express.js", percentage: 85 }
                ],
                modalDetails: {
                    title: "Web Technologies",
                    description: "Building responsive, modern user interfaces and connecting them with functional server rendering models and routes.",
                    topics: [
                        "Semantic Markup, HTML5 DOM structures, SEO meta configuration",
                        "CSS Grid, Flexbox layouts, Custom variables, CSS animations",
                        "React components, state hooks, virtual DOM, context states",
                        "Node.js server setups, Express routing, REST API integrations"
                    ]
                }
            },
            {
                id: "skills-database",
                title: "Databases",
                icon: "database",
                skillsList: [
                    { name: "MongoDB", percentage: 82 },
                    { name: "MySQL", percentage: 80 }
                ],
                modalDetails: {
                    title: "Database Management Systems",
                    description: "Designing database structures, writing clean queries, and modeling data connections for applications.",
                    topics: [
                        "MongoDB collections, document structure, queries, Mongoose connections",
                        "Relational database design, table structures, keys, constraints",
                        "SQL queries, joins, filters, grouping updates",
                        "Database Management Systems (DBMS), ER diagrams, normalization"
                    ]
                }
            },
            {
                id: "skills-tools",
                title: "Developer Tools",
                icon: "settings",
                skillsList: [
                    { name: "Git", percentage: 85 },
                    { name: "GitHub", percentage: 87 }
                ],
                modalDetails: {
                    title: "Developer Tools",
                    description: "Acquiring version control habits and collaborative file tracking routines to coordinate code repositories safely.",
                    topics: [
                        "Git commands (commit, push, pull, branch controls)",
                        "GitHub repository configuration, markdown documentation files",
                        "VS Code editor environments, terminal utilities",
                        "Remote hosting configuration and deployment routines"
                    ]
                }
            },
            {
                id: "skills-fundamentals",
                title: "CS Fundamentals",
                icon: "book-open",
                skillsList: [
                    { name: "Data Structures", percentage: 85 },
                    { name: "Object Oriented Programming", percentage: 88 },
                    { name: "DBMS", percentage: 85 },
                    { name: "Operating Systems", percentage: 80 }
                ],
                modalDetails: {
                    title: "Computer Science Fundamentals",
                    description: "Studying core CS theories and computing models to build optimized and secure software.",
                    topics: [
                        "Arrays, Linked Lists, Stacks, Queues operations",
                        "OOP encapsulation, inheritance, polymorphism, and abstraction",
                        "Database transactions, ACID guidelines, query indexes",
                        "Operating Systems (OS) basics, threads, scheduling algorithms"
                    ]
                }
            },
            {
                id: "skills-soft",
                title: "Soft Skills",
                icon: "users",
                skillsList: [
                    { name: "Problem Solving" },
                    { name: "Teamwork" },
                    { name: "Leadership" },
                    { name: "Time Management" },
                    { name: "Decision Making" }
                ],
                modalDetails: {
                    title: "Soft Skills",
                    description: "Developing communication and teamwork habits through university clubs, hackathon collaborations, and academic group tasks.",
                    topics: [
                        "Coordinating interface designs in Devity Club",
                        "Collaborating in 6-member student teams during hackathons",
                        "Managing time between B.Tech classes and personal coding projects",
                        "Approaching coding errors with structured logical debugging"
                    ]
                }
            },
            {
                id: "skills-languages",
                title: "Languages",
                icon: "languages",
                skillsList: [
                    { name: "English" },
                    { name: "Hindi" },
                    { name: "Odia" },
                    { name: "French (Moderate)" }
                ],
                modalDetails: {
                    title: "Languages",
                    description: "Multilingual capability for teamwork, client communications, and global collaboration.",
                    topics: [
                        "English - Fluent/Professional working proficiency",
                        "Hindi - Native/Bilingual proficiency",
                        "Odia - Native/Bilingual proficiency",
                        "French - Basic/Moderate proficiency"
                    ]
                }
            }
        ],
        pills: [
            "HTML", "CSS", "JavaScript", "React.js", "Node.js", "MongoDB", "Express.js",
            "Java", "C++", "C", "MySQL", "Git", "GitHub", "DBMS", "Operating Systems",
            "Data Structures", "OOP", "Problem Solving", "Teamwork", "Leadership", "Time Management", "Decision Making"
        ]
    },

    // ----------------------------------------------------------------------
    // 5. PROJECTS PORTFOLIO
    // ----------------------------------------------------------------------
    projects: [
        {
            id: "aspireplan",
            title: "ASPIRE_PLAN",
            tagline: "Personalized budget and financial planning dashboard",
            shortDesc: "A budgeting platform enabling users to track goals and estimate monthly expenses.",
            longDesc: "ASPIRE_PLAN is a budget and financial planning dashboard designed to help users track personal budgets, log saving milestones, and estimate monthly expenses. Built with a MERN stack, it helps users structure their savings goals and track budget outcomes.",
            img: "assets/images/aspireplan.png",
            techs: ["React.js", "Node.js", "MongoDB", "Express.js"],
            modalTechs: ["React.js", "Node.js", "Express.js", "MongoDB", "Mongoose", "JavaScript", "NoSQL"],
            filterCategories: ["ai", "fullstack"],
            github: "https://github.com/Nehabiswal-07/ASPIRE_PLAN",
            demo: "http://aspireplann.netlify.app/",
            role: "Full Stack Contributor",
            duration: "SIH Internal Selection 2025",
            category: "Financial Planning",
            features: [
                "<strong>Budget Tracking</strong>: Monitor daily expenditures and view visual progress charts.",
                "<strong>Saving Milestones</strong>: Log specific financial targets and calculate time-to-achievement estimates.",
                "<strong>Mongoose Data Modeling</strong>: Structured schema designs to manage records and user accounts securely.",
                "<strong>Express Server Routes</strong>: Robust API endpoints to retrieve user lists and process payloads."
            ]
        },
        {
            id: "demandmed",
            title: "DemandMed",
            tagline: "Drug inventory & logistics dashboard",
            shortDesc: "A drug inventory dashboard with real-time stock indicators and local tracking.",
            longDesc: "DemandMed is a web application designed to manage drug inventories and track orders between local clinics. It provides simple stock status indicators, warning alerts when inventory levels fall low, and query filters to trace clinic demand patterns.",
            img: "assets/images/demandmed.png",
            techs: ["React.js", "Node.js", "MySQL", "JavaScript"],
            modalTechs: ["HTML", "CSS", "JavaScript", "React.js", "Node.js", "Express.js", "MySQL"],
            filterCategories: ["web", "fullstack"],
            github: "https://github.com/Nehabiswal-07/demandmed",
            demo: "https://demandmed.netlify.app/",
            role: "Frontend Developer",
            duration: "SIH Internal Selection 2024",
            category: "Inventory Management",
            features: [
                "<strong>Stock Level Indicators</strong>: Shows visual cues and status warnings when drugs run below threshold numbers.",
                "<strong>Relational Database</strong>: Uses MySQL schemas to map clinic requirements to supply tables.",
                "<strong>Order Filters</strong>: Dynamic query structures to filter inventory by batch numbers and expiry dates.",
                "<strong>Responsive Interface</strong>: Adapts to tablet screens to help local coordinators view tables on the go."
            ]
        },
        {
            id: "tasktide",
            title: "TaskTide",
            tagline: "Smart study workspace & task organizer",
            shortDesc: "A study workspace integrating task boards, focus timers, and browser speech APIs.",
            longDesc: "TaskTide is a frontend productivity platform designed to help students organize study sessions and track assignments. It integrates browser Web Speech APIs for speech-to-text task logging, custom Pomodoro focus timers, and local storage state persistence.",
            img: "assets/images/tasktide.png",
            techs: ["React.js", "TypeScript", "CSS", "Web Speech API"],
            modalTechs: ["React.js", "TypeScript", "HTML5", "CSS3", "Web Speech API", "Local Storage"],
            filterCategories: ["ai", "fullstack", "uiux"],
            github: "https://github.com/Nehabiswal-07/tasktide",
            demo: "https://tasktideee.netlify.app/",
            role: "Frontend Developer",
            duration: "Personal Project (2025)",
            category: "Productivity Tools",
            features: [
                "<strong>Speech-to-Text Input</strong>: Integrates browser Web Speech APIs to parse spoken words into task list entries.",
                "<strong>Pomodoro Study Timer</strong>: Standard focus sessions timer with breaks management logic.",
                "<strong>TypeScript Structuring</strong>: Strongly typed interfaces to prevent runtime crashes during state changes.",
                "<strong>Local Storage Persistence</strong>: Saves student logs directly to client browser cache to ensure data persists across sessions."
            ]
        }
    ],

    // ----------------------------------------------------------------------
    // 6. LEARNING & GROWTH JOURNEY
    // ----------------------------------------------------------------------
    journey: [
        {
            id: "journey-foundations",
            title: "Foundations of Computer Science (2024)",
            subtitle: "B.Tech CSE & Core Logic",
            desc: "Began my engineering studies at Amity University Chhattisgarh. Focused on learning C, C++, and core coding logic.",
            icon: "code",
            modalDetails: {
                title: "Foundations of Computer Science (2024)",
                phase: "Year 1 - B.Tech CSE",
                achieved: [
                    "Understood object-oriented concepts and structural patterns.",
                    "Learned data structures like arrays, strings, and linked lists.",
                    "Practiced writing algorithmic solutions for basic problem statements."
                ]
            }
        },
        {
            id: "journey-frontend",
            title: "Frontend & User Interaction (Late 2024)",
            subtitle: "Building Responsive Layouts",
            desc: "Learned semantic HTML5, CSS layout systems (Grid/Flexbox), and ES6+ JavaScript to design and code static web pages.",
            icon: "palette",
            modalDetails: {
                title: "Frontend & User Interaction (Late 2024)",
                phase: "Year 1 - Self Learning",
                achieved: [
                    "Learned layouts, typography, and responsive styles.",
                    "Practiced DOM manipulations and dynamic event handlers in JavaScript.",
                    "Completed a virtual Web Development internship with CodSoft, building simple student tasks."
                ]
            }
        },
        {
            id: "journey-fullstack",
            title: "Full Stack Web Development (2025)",
            subtitle: "Databases & Server Logic",
            desc: "Transitioned to full-stack engineering, studying Node.js, Express routers, and MongoDB.",
            icon: "server",
            modalDetails: {
                title: "Full Stack Web Development (2025)",
                phase: "Year 2 - B.Tech CSE",
                achieved: [
                    "Created RESTful APIs to handle requests and manage JSON payloads.",
                    "Learned NoSQL database schemas with MongoDB and Mongoose.",
                    "Participated in the university SIH selection round with a drug inventory logistics tracker project."
                ]
            }
        },
        {
            id: "journey-uiux-club",
            title: "UI/UX & Club Coordination (09/2025 – 02/2026)",
            subtitle: "UI/UX Coordinator at Devity Club, AUC",
            desc: "Served as the UI/UX Coordinator for AUC's Devity Club, cooperating on layouts and activities for student projects.",
            icon: "users",
            modalDetails: {
                title: "UI/UX & Club Coordination (09/2025 – 02/2026)",
                phase: "Devity Club Leadership",
                achieved: [
                    "Organized layouts and interfaces for student coding projects.",
                    "Conducted user feedback tests, improving interface usability.",
                    "Cooperated with student designers and developers to ship consistent interfaces."
                ]
            }
        },
        {
            id: "journey-backend-dsa",
            title: "Current Focus: Backend & Data Structures (2026)",
            subtitle: "Database Basics & DSA Practice",
            desc: "Focusing on learning database management, practice solving data structures problems in Java, and building solid backend APIs.",
            icon: "brain",
            modalDetails: {
                title: "Current Focus: Backend & Data Structures (2026)",
                phase: "Year 2 - B.Tech CSE",
                achieved: [
                    "Practicing solving arrays and string problems in Java.",
                    "Building basic REST APIs using Node.js and Express.",
                    "Learning SQL queries, table normalization, and relational databases."
                ]
            }
        }
    ],

    // ----------------------------------------------------------------------
    // 7. CURRENTLY LEARNING
    // ----------------------------------------------------------------------
    currentlyLearning: [
        {
            id: "learn-dsa",
            title: "DSA Practice",
            icon: "code",
            desc: "Practicing basic data structures like arrays, arraylists, and strings in Java on LeetCode.",
            modalDetails: {
                title: "Currently Learning: DSA Practice",
                topics: [
                    "Arrays and Strings problem solving",
                    "Understanding Time and Space Complexity",
                    "ArrayLists and basic sorting algorithms"
                ]
            }
        },
        {
            id: "learn-react",
            title: "React Basics",
            icon: "layout",
            desc: "Building modular interfaces using React components, props, state, and standard hooks.",
            modalDetails: {
                title: "Currently Learning: React Basics",
                topics: [
                    "Component Lifecycle and rendering",
                    "State management with useState hook",
                    "Event handling and dynamic lists rendering"
                ]
            }
        },
        {
            id: "learn-apis",
            title: "REST APIs",
            icon: "git-branch",
            desc: "Designing simple server-side endpoints to return JSON payloads using Express routers.",
            modalDetails: {
                title: "Currently Learning: REST APIs",
                topics: [
                    "HTTP request methods (GET, POST, etc.)",
                    "Request parameters and body processing",
                    "Testing route responses using client tools"
                ]
            }
        },
        {
            id: "learn-backend",
            title: "Backend Fundamentals",
            icon: "server",
            desc: "Learning about Node.js servers, express middleware, and handling network requests.",
            modalDetails: {
                title: "Currently Learning: Backend Fundamentals",
                topics: [
                    "Node.js runtime environment",
                    "Custom and built-in middleware handlers",
                    "Handling connection errors and server statuses"
                ]
            }
        },
        {
            id: "learn-git",
            title: "Git & GitHub",
            icon: "git-merge",
            desc: "Tracking file histories using commits, branches, and sharing repositories on GitHub.",
            modalDetails: {
                title: "Currently Learning: Git & GitHub",
                topics: [
                    "Git commit, pull, push workflows",
                    "Creating and merging code branches",
                    "Documenting repositories with Markdown readme files"
                ]
            }
        },
        {
            id: "learn-responsive",
            title: "Responsive Web Design",
            icon: "smartphone",
            desc: "Creating CSS Flexbox and Grid layouts that adapt automatically to different screen widths.",
            modalDetails: {
                title: "Currently Learning: Responsive Web Design",
                topics: [
                    "CSS Media Queries and viewports",
                    "Flexbox and Grid layout systems",
                    "Responsive typography and image scaling"
                ]
            }
        },
        {
            id: "learn-database",
            title: "Database Basics",
            icon: "database",
            desc: "Understanding database tables, relationships, and writing simple SQL queries.",
            modalDetails: {
                title: "Currently Learning: Database Basics",
                topics: [
                    "Relational vs NoSQL database concepts",
                    "SQL query filtering (SELECT, WHERE, ORDER BY)",
                    "Table keys and basic relationships design"
                ]
            }
        },
        {
            id: "learn-java",
            title: "Java Problem Solving",
            icon: "terminal",
            desc: "Strengthening core programming logic, conditionals, and loops in standard Java.",
            modalDetails: {
                title: "Currently Learning: Java Problem Solving",
                topics: [
                    "Java basic syntax, classes, and objects",
                    "Control flow statements and loops practice",
                    "Debugging logical errors in standard code blocks"
                ]
            }
        }
    ],

    // ----------------------------------------------------------------------
    // 8. STUDENT ACHIEVEMENTS
    // ----------------------------------------------------------------------
    achievements: [
        {
            id: "ach-isih2024",
            year: "2024",
            title: "Winner, Internal Smart India Hackathon 2024",
            subtitle: "Project: DemandMed",
            desc: "Recognized as part of the winning team in the university-level Internal Smart India Hackathon (ISIH) 2024 for contributing to DemandMed, a smart healthcare inventory and drug logistics solution. Worked collaboratively on problem-solving, interface structuring, and practical implementation ideas while building an impactful real-world project in a competitive innovation environment.",
            icon: "award",
            iconColor: "text-purple",
            modalDetails: {
                title: "Winner, Internal Smart India Hackathon 2024",
                role: "Contributor & UI Designer",
                accomplished: [
                    "Assisted in designing user flow grids and inventory tables",
                    "Contributed to frontend card layouts using React and CSS",
                    "Helped present the interface to university selectors"
                ]
            }
        },
        {
            id: "ach-isih2025",
            year: "2025",
            title: "Winner, Internal Smart India Hackathon 2025",
            subtitle: "Project: ASPIRE_PLAN",
            desc: "Selected as a winning team in the university-level Internal Smart India Hackathon (ISIH) 2025 for developing ASPIRE_PLAN, an AI-powered financial planning platform. Contributed to UI planning, feature organization, and overall project presentation while collaborating on a scalable and user-focused solution.",
            icon: "trophy",
            iconColor: "text-yellow",
            modalDetails: {
                title: "Winner, Internal Smart India Hackathon 2025",
                role: "Backend Contributor",
                accomplished: [
                    "Helped model MongoDB document collections and Express routes",
                    "Cooperated in a student team of 6 to structure RAG endpoints",
                    "Helped document backend APIs and test scenario queries"
                ]
            }
        },
        {
            id: "ach-devity",
            year: "2025 – 2026",
            title: "UI/UX Coordinator",
            subtitle: "Devity Club, Amity University",
            desc: "Served as the UI/UX Coordinator at Devity Club, collaborating with student teams on interface layouts, visual organization, and creative technical activities. Helped improve user experience concepts while strengthening teamwork, communication, and leadership skills through active club coordination.",
            icon: "palette",
            iconColor: "text-blue",
            modalDetails: {
                title: "UI/UX Coordinator (Devity Club, AUC)",
                role: "UX Helper & Event Organizer",
                accomplished: [
                    "Coordinated with student developers to align layout themes",
                    "Created wireframes and asset templates using Figma grids",
                    "Helped compile user feedback reviews on club websites"
                ]
            }
        }
    ],

    // ----------------------------------------------------------------------
    // 10. FUTURE GOALS
    // ----------------------------------------------------------------------
    futureGoals: [
        {
            id: "goal-dsa",
            title: "Improve DSA consistency",
            icon: "code",
            desc: "Aiming to maintain a daily problem-solving streak on LeetCode to strengthen visual logic.",
            modalDetails: {
                title: "Improve DSA consistency",
                actionSteps: [
                    "Resolve to solve one coding problem daily",
                    "Review optimal space/time complexity solutions",
                    "Document resolved algorithms in repository files"
                ]
            }
        },
        {
            id: "goal-projects",
            title: "Build full-stack projects",
            icon: "layers",
            desc: "Planning to construct practical web applications integrating database models and server routers.",
            modalDetails: {
                title: "Build full-stack projects",
                actionSteps: [
                    "Define clean database schema definitions",
                    "Write secure express server endpoints",
                    "Connect React interfaces with backend controllers"
                ]
            }
        },
        {
            id: "goal-opensource",
            title: "Contribute to open source",
            icon: "git-merge",
            desc: "Intending to contribute styling updates and simple code improvements to open repositories on GitHub.",
            modalDetails: {
                title: "Contribute to open source",
                actionSteps: [
                    "Search issues tagged 'good first issue' or 'documentation'",
                    "Follow repo development setups and code style rules",
                    "Submit simple layout improvements for developer review"
                ]
            }
        },
        {
            id: "goal-backend",
            title: "Learn scalable backend systems",
            icon: "server",
            desc: "Interested in studying how to handle heavier network traffic, caching, and server load options.",
            modalDetails: {
                title: "Learn scalable backend systems",
                actionSteps: [
                    "Explore basic database indexing optimization",
                    "Study server-side session controls and data caching",
                    "Practice deploying simple servers to remote hosts"
                ]
            }
        },
        {
            id: "goal-uiux",
            title: "Improve UI/UX design skills",
            icon: "palette",
            desc: "Aiming to refine mobile layout grids, user flow charts, and clean contrast standards.",
            modalDetails: {
                title: "Improve UI/UX design skills",
                actionSteps: [
                    "Design functional mobile app layouts in Figma",
                    "Examine font pairings, HSL color patterns, and contrast rules",
                    "Build custom micro-interaction animations in css"
                ]
            }
        },
        {
            id: "goal-internship",
            title: "Gain internship experience",
            icon: "briefcase",
            desc: "Seeking winter/summer software development internships to gain practical coding teamwork routines.",
            modalDetails: {
                title: "Gain internship experience",
                actionSteps: [
                    "Create student developer resume and portfolio pages",
                    "Practice core algorithms and CS theories questions",
                    "Participate in mock technical interview trials"
                ]
            }
        }
    ]
};
