// Unified data structure for categories and courses
// This is the single source of truth for the entire application

// Export categories and courses
export { unifiedCategories, unifiedCourses };

// Categories data (22 professional categories)
const unifiedCategories = [
  {
    name: 'Web Development',
    description: 'Learn HTML, CSS, JavaScript, and modern frameworks to build stunning websites and web applications.',
    icon: '💻',
    filter: 'technology'
  },
  {
    name: 'Mobile App Development',
    description: 'Build mobile applications for Android and iOS using various frameworks and technologies.',
    icon: '📱',
    filter: 'mobile-development'
  },
  {
    name: 'Data Science & Analytics',
    description: 'Master data analysis, machine learning, and visualization techniques to extract insights from data.',
    icon: '📊',
    filter: 'data-science'
  },
  {
    name: 'Artificial Intelligence & Machine Learning',
    description: 'Dive into AI algorithms, neural networks, and deep learning to create intelligent systems.',
    icon: '🤖',
    filter: 'ai'
  },
  {
    name: 'Cloud Computing & DevOps',
    description: 'Learn cloud platforms, containerization, and automation tools for modern software deployment.',
    icon: '☁️',
    filter: 'cloud'
  },
  {
    name: 'Cybersecurity & Ethical Hacking',
    description: 'Protect systems and networks from digital attacks with security best practices.',
    icon: '🔒',
    filter: 'cybersecurity'
  },
  {
    name: 'Blockchain & Web3',
    description: 'Explore decentralized technologies, cryptocurrencies, and smart contracts.',
    icon: '🔗',
    filter: 'blockchain'
  },
  {
    name: 'UI/UX Design',
    description: 'Create beautiful, user-friendly interfaces with principles of design thinking and user research.',
    icon: '🎨',
    filter: 'design'
  },
  {
    name: 'Graphic Design & Multimedia',
    description: 'Master visual design tools and techniques for digital and print media.',
    icon: '🖌️',
    filter: 'graphic-design'
  },
  {
    name: 'Business & Entrepreneurship',
    description: 'Develop leadership skills and strategic thinking to drive business growth and innovation.',
    icon: '💼',
    filter: 'business'
  },
  {
    name: 'Marketing & Digital Marketing',
    description: 'Master SEO, social media marketing, and analytics to grow brands in the digital landscape.',
    icon: '📈',
    filter: 'marketing'
  },
  {
    name: 'Finance & Accounting',
    description: 'Gain financial literacy and accounting skills to manage personal wealth or business finances.',
    icon: '💰',
    filter: 'finance'
  },
  {
    name: 'Leadership & Management',
    description: 'Develop team management and project leadership skills for professional growth.',
    icon: '👥',
    filter: 'leadership'
  },
  {
    name: 'Health & Fitness',
    description: 'Improve your physical and mental wellbeing with expert-led fitness and wellness programs.',
    icon: '💪',
    filter: 'health'
  },
  {
    name: 'Language Learning',
    description: 'Become fluent in new languages with immersive courses designed for all proficiency levels.',
    icon: '🗣️',
    filter: 'language'
  },
  {
    name: 'Music & Audio',
    description: 'Learn music theory, instruments, and audio production techniques.',
    icon: '🎵',
    filter: 'music'
  },
  {
    name: 'Photography & Video',
    description: 'Master photography and videography techniques with professional editing tools.',
    icon: '📸',
    filter: 'photography'
  },
  {
    name: 'Writing & Content Creation',
    description: 'Develop writing skills and content creation strategies for various platforms.',
    icon: '✍️',
    filter: 'writing'
  },
  {
    name: 'Career Development',
    description: 'Advance your career with resume building, interview prep, and professional skills.',
    icon: '🚀',
    filter: 'career'
  },
  {
    name: 'Education & Teaching',
    description: 'Learn effective teaching methods and educational technologies for online instruction.',
    icon: '🎓',
    filter: 'education'
  },
  {
    name: 'Science & Engineering',
    description: 'Explore fundamental principles in physics, chemistry, and various engineering disciplines.',
    icon: '🔬',
    filter: 'science'
  },
  {
    name: 'Personal Development',
    description: 'Improve time management, productivity, and mindfulness for personal growth.',
    icon: '🌱',
    filter: 'personal-development'
  }
];

// Unified courses data (4 courses per category = 88 courses total)
const unifiedCourses = [
  // Web Development Courses
  {
    "title": "Complete Web Development Bootcamp",
    "description": "Master HTML, CSS, JavaScript, React, Node.js, and MongoDB to build full-stack web applications.",
    "thumbnail": "web-dev-bootcamp.jpg",
    "instructor": {
      "name": "Angela Yu",
      "profileImage": "angela-yu.jpg"
    },
    "categoryId": "web-development",
    "duration": "40 hours · Self-paced",
    "difficulty": "Beginner",
    "price": "Paid",
    "rating": 4.8,
    "reviewsCount": 320000,
    "language": "English",
    "platform": "Udemy",
    "tags": ["HTML", "CSS", "JavaScript", "React", "Node.js", "MongoDB"],
    "syllabus": [
      "HTML Fundamentals",
      "CSS Styling and Layouts",
      "JavaScript Programming",
      "React Frontend Development",
      "Node.js Backend Development",
      "MongoDB Database Integration"
    ]
  },
  {
    "title": "Advanced React and Redux",
    "description": "Build complex, scalable web applications with React, Redux, and modern JavaScript patterns.",
    "thumbnail": "advanced-react.jpg",
    "instructor": {
      "name": "Stephen Grider",
      "profileImage": "stephen-grider.jpg"
    },
    "categoryId": "web-development",
    "duration": "25 hours · Self-paced",
    "difficulty": "Intermediate",
    "price": "Paid",
    "rating": 4.7,
    "reviewsCount": 85000,
    "language": "English",
    "platform": "Udemy",
    "tags": ["React", "Redux", "Hooks", "Context API", "State Management"],
    "syllabus": [
      "React Components and Props",
      "State Management with Redux",
      "React Hooks Deep Dive",
      "Performance Optimization",
      "Testing React Applications"
    ]
  },
  {
    "title": "Vue.js Masterclass",
    "description": "Learn Vue.js from basics to advanced concepts including Vuex, Vue Router, and composition API.",
    "thumbnail": "vue-masterclass.jpg",
    "instructor": {
      "name": "Maximilian Schwarzmüller",
      "profileImage": "maximilian-schwarzmuller.jpg"
    },
    "categoryId": "web-development",
    "duration": "30 hours · Self-paced",
    "difficulty": "Intermediate",
    "price": "Paid",
    "rating": 4.6,
    "reviewsCount": 62000,
    "language": "English",
    "platform": "Udemy",
    "tags": ["Vue.js", "Vuex", "Vue Router", "Composition API", "Frontend"],
    "syllabus": [
      "Vue.js Fundamentals",
      "Component Communication",
      "Vue Router for Navigation",
      "State Management with Vuex",
      "Advanced Vue Patterns"
    ]
  },
  {
    "title": "Progressive Web Apps Development",
    "description": "Build fast, reliable, and engaging Progressive Web Apps that work offline and on any device.",
    "thumbnail": "pwa-development.jpg",
    "instructor": {
      "name": "Maximiliano Firtman",
      "profileImage": "maximiliano-firtman.jpg"
    },
    "categoryId": "web-development",
    "duration": "20 hours · Self-paced",
    "difficulty": "Advanced",
    "price": "Paid",
    "rating": 4.5,
    "reviewsCount": 28000,
    "language": "English",
    "platform": "Pluralsight",
    "tags": ["PWA", "Service Workers", "Web App Manifest", "Offline", "Performance"],
    "syllabus": [
      "PWA Fundamentals",
      "Service Workers Implementation",
      "Web App Manifest",
      "Offline Data Strategies",
      "Performance Optimization"
    ]
  },

  // Mobile App Development Courses
  {
    "title": "iOS App Development with Swift",
    "description": "Learn to build native iOS applications using Swift programming language and Xcode.",
    "thumbnail": "ios-swift.jpg",
    "instructor": {
      "name": "Angela Yu",
      "profileImage": "angela-yu.jpg"
    },
    "categoryId": "mobile-app-development",
    "duration": "35 hours · Self-paced",
    "difficulty": "Beginner",
    "price": "Paid",
    "rating": 4.8,
    "reviewsCount": 210000,
    "language": "English",
    "platform": "Udemy",
    "tags": ["iOS", "Swift", "Xcode", "UIKit", "Mobile Development"],
    "syllabus": [
      "Swift Programming Basics",
      "Xcode Interface and Tools",
      "UIKit Fundamentals",
      "Navigation and User Interface",
      "App Store Deployment"
    ]
  },
  {
    "title": "Android Kotlin Developer Course",
    "description": "Master Android app development with Kotlin, the modern language for Android development.",
    "thumbnail": "android-kotlin.jpg",
    "instructor": {
      "name": "Tim Buchalka",
      "profileImage": "tim-buchalka.jpg"
    },
    "categoryId": "mobile-app-development",
    "duration": "30 hours · Self-paced",
    "difficulty": "Intermediate",
    "price": "Paid",
    "rating": 4.7,
    "reviewsCount": 95000,
    "language": "English",
    "platform": "Udemy",
    "tags": ["Android", "Kotlin", "Android Studio", "Mobile Development"],
    "syllabus": [
      "Kotlin Programming for Android",
      "Android Studio Setup",
      "Activities and Layouts",
      "Data Persistence",
      "Google Play Store Publishing"
    ]
  },
  {
    "title": "React Native - The Practical Guide",
    "description": "Build native mobile apps for iOS and Android using React Native and JavaScript.",
    "thumbnail": "react-native.jpg",
    "instructor": {
      "name": "Maximilian Schwarzmüller",
      "profileImage": "maximilian-schwarzmuller.jpg"
    },
    "categoryId": "mobile-app-development",
    "duration": "25 hours · Self-paced",
    "difficulty": "Intermediate",
    "price": "Paid",
    "rating": 4.6,
    "reviewsCount": 72000,
    "language": "English",
    "platform": "Udemy",
    "tags": ["React Native", "Mobile Development", "Cross-Platform", "JavaScript"],
    "syllabus": [
      "React Native Fundamentals",
      "Navigation and Routing",
      "Native Device Features",
      "State Management",
      "App Store Deployment"
    ]
  },
  {
    "title": "Flutter & Dart - The Complete Guide",
    "description": "Build native iOS and Android apps with Google's Flutter SDK and Dart programming language.",
    "thumbnail": "flutter-dart.jpg",
    "instructor": {
      "name": "Maximilian Schwarzmüller",
      "profileImage": "maximilian-schwarzmuller.jpg"
    },
    "categoryId": "mobile-app-development",
    "duration": "32 hours · Self-paced",
    "difficulty": "Intermediate",
    "price": "Paid",
    "rating": 4.8,
    "reviewsCount": 156000,
    "language": "English",
    "platform": "Udemy",
    "tags": ["Flutter", "Dart", "Mobile Development", "Cross-Platform"],
    "syllabus": [
      "Dart Programming Language",
      "Flutter Widgets and Layouts",
      "State Management Solutions",
      "Navigation and Routing",
      "App Publishing"
    ]
  },

  // Data Science & Analytics Courses
  {
    "title": "Data Science Professional Certificate",
    "description": "Launch your career in data science with Python, SQL, and machine learning fundamentals.",
    "thumbnail": "data-science-cert.jpg",
    "instructor": {
      "name": "Rav Ahuja",
      "profileImage": "rav-ahuja.jpg"
    },
    "categoryId": "data-science-analytics",
    "duration": "12 weeks · Self-paced",
    "difficulty": "Beginner",
    "price": "Paid",
    "rating": 4.7,
    "reviewsCount": 35600,
    "language": "English",
    "platform": "Coursera",
    "tags": ["Data Science", "Python", "SQL", "Machine Learning", "Statistics"],
    "syllabus": [
      "Data Science Fundamentals",
      "Python for Data Analysis",
      "SQL and Database Management",
      "Statistical Analysis and Modeling",
      "Machine Learning Algorithms"
    ]
  },
  {
    "title": "Advanced Data Analysis with R",
    "description": "Perform sophisticated statistical analysis and data visualization with R programming.",
    "thumbnail": "data-analysis-r.jpg",
    "instructor": {
      "name": "Roger Peng",
      "profileImage": "roger-peng.jpg"
    },
    "categoryId": "data-science-analytics",
    "duration": "10 weeks · Self-paced",
    "difficulty": "Intermediate",
    "price": "Paid",
    "rating": 4.6,
    "reviewsCount": 18700,
    "language": "English",
    "platform": "edX",
    "tags": ["R Programming", "Statistical Analysis", "Data Visualization", "Data Mining", "Statistics"],
    "syllabus": [
      "R Programming Fundamentals",
      "Data Wrangling and Cleaning",
      "Statistical Modeling and Inference",
      "Advanced Data Visualization",
      "Reproducible Research and Reporting"
    ]
  },
  {
    "title": "Big Data and Hadoop Ecosystem",
    "description": "Process and analyze massive datasets using Hadoop, Spark, and distributed computing frameworks.",
    "thumbnail": "big-data-hadoop.jpg",
    "instructor": {
      "name": "Frank Kane",
      "profileImage": "frank-kane.jpg"
    },
    "categoryId": "data-science-analytics",
    "duration": "14 weeks · Self-paced",
    "difficulty": "Advanced",
    "price": "Paid",
    "rating": 4.5,
    "reviewsCount": 14200,
    "language": "English",
    "platform": "Udemy",
    "tags": ["Big Data", "Hadoop", "Spark", "Distributed Computing", "Data Engineering"],
    "syllabus": [
      "Big Data Fundamentals and Challenges",
      "Hadoop Architecture and Ecosystem",
      "MapReduce Programming Model",
      "Apache Spark and Streaming",
      "Data Warehousing and Analytics"
    ]
  },
  {
    "title": "Data Visualization and Storytelling",
    "description": "Transform complex data into compelling visual narratives using Tableau and Power BI.",
    "thumbnail": "data-visualization.jpg",
    "instructor": {
      "name": "Cole Nussbaumer Knaflic",
      "profileImage": "cole-knaflic.jpg"
    },
    "categoryId": "data-science-analytics",
    "duration": "6 weeks · Self-paced",
    "difficulty": "Beginner",
    "price": "Paid",
    "rating": 4.8,
    "reviewsCount": 22400,
    "language": "English",
    "platform": "LinkedIn Learning",
    "tags": ["Data Visualization", "Tableau", "Power BI", "Storytelling", "Business Intelligence"],
    "syllabus": [
      "Principles of Data Visualization",
      "Tableau Fundamentals and Dashboard Creation",
      "Power BI for Business Analytics",
      "Interactive Visualization Design",
      "Data Storytelling and Communication"
    ]
  },

  // Artificial Intelligence & Machine Learning Courses
  {
    "title": "Deep Learning Specialization",
    "description": "Master deep learning fundamentals and build neural networks from scratch with hands-on projects.",
    "thumbnail": "deep-learning.jpg",
    "instructor": {
      "name": "Andrew Ng",
      "profileImage": "andrew-ng.jpg"
    },
    "categoryId": "artificial-intelligence-machine-learning",
    "duration": "16 weeks · Self-paced",
    "difficulty": "Intermediate",
    "price": "Paid",
    "rating": 4.9,
    "reviewsCount": 42000,
    "language": "English",
    "platform": "Coursera",
    "tags": ["Deep Learning", "Neural Networks", "TensorFlow", "Python", "AI"],
    "syllabus": [
      "Neural Networks and Deep Learning",
      "Improving Deep Neural Networks",
      "Structuring Machine Learning Projects",
      "Convolutional Neural Networks",
      "Sequence Models"
    ]
  },
  {
    "title": "Machine Learning with Python",
    "description": "Learn essential machine learning algorithms and techniques to solve real-world problems with Python.",
    "thumbnail": "ml-python.jpg",
    "instructor": {
      "name": "John Smith",
      "profileImage": "john-smith.jpg"
    },
    "categoryId": "artificial-intelligence-machine-learning",
    "duration": "12 weeks · Self-paced",
    "difficulty": "Beginner",
    "price": "Paid",
    "rating": 4.7,
    "reviewsCount": 28500,
    "language": "English",
    "platform": "Udemy",
    "tags": ["Machine Learning", "Python", "Data Science", "Algorithms", "Scikit-learn"],
    "syllabus": [
      "Introduction to Machine Learning",
      "Data Preprocessing and Visualization",
      "Supervised Learning Algorithms",
      "Unsupervised Learning Techniques",
      "Model Evaluation and Validation"
    ]
  },
  {
    "title": "Natural Language Processing",
    "description": "Build systems that understand human language using advanced NLP techniques and transformer models.",
    "thumbnail": "nlp-course.jpg",
    "instructor": {
      "name": "Sarah Johnson",
      "profileImage": "sarah-johnson.jpg"
    },
    "categoryId": "artificial-intelligence-machine-learning",
    "duration": "14 weeks · Self-paced",
    "difficulty": "Advanced",
    "price": "Paid",
    "rating": 4.8,
    "reviewsCount": 15600,
    "language": "English",
    "platform": "edX",
    "tags": ["NLP", "Transformers", "BERT", "Text Analysis", "Language Models"],
    "syllabus": [
      "Text Preprocessing and Tokenization",
      "Word Embeddings and Word2Vec",
      "Sequence Models and RNNs",
      "Attention Mechanisms and Transformers",
      "BERT and Advanced NLP Applications"
    ]
  },
  {
    "title": "Computer Vision Fundamentals",
    "description": "Learn to build image recognition systems and process visual data with modern computer vision techniques.",
    "thumbnail": "computer-vision.jpg",
    "instructor": {
      "name": "Michael Chen",
      "profileImage": "michael-chen.jpg"
    },
    "categoryId": "artificial-intelligence-machine-learning",
    "duration": "10 weeks · Self-paced",
    "difficulty": "Intermediate",
    "price": "Paid",
    "rating": 4.6,
    "reviewsCount": 19800,
    "language": "English",
    "platform": "Udacity",
    "tags": ["Computer Vision", "OpenCV", "Image Processing", "CNN", "AI"],
    "syllabus": [
      "Image Processing Basics",
      "Feature Detection and Matching",
      "Convolutional Neural Networks",
      "Object Detection and Recognition",
      "Advanced Computer Vision Applications"
    ]
  },

  // Cloud Computing & DevOps Courses
  {
    "title": "AWS Certified Solutions Architect",
    "description": "Master AWS cloud architecture and design scalable, fault-tolerant systems on Amazon Web Services.",
    "thumbnail": "aws-certified.jpg",
    "instructor": {
      "name": "A Cloud Guru",
      "profileImage": "a-cloud-guru.jpg"
    },
    "categoryId": "cloud-computing-devops",
    "duration": "25 hours · Self-paced",
    "difficulty": "Intermediate",
    "price": "Paid",
    "rating": 4.7,
    "reviewsCount": 185000,
    "language": "English",
    "platform": "A Cloud Guru",
    "tags": ["AWS", "Cloud Architecture", "DevOps", "Certification", "Cloud Computing"],
    "syllabus": [
      "AWS Core Services Overview",
      "Compute and Networking Services",
      "Storage and Database Services",
      "Security and Identity Management",
      "High Availability and Disaster Recovery"
    ]
  },
  {
    "title": "Docker and Kubernetes Mastery",
    "description": "Learn containerization with Docker and orchestration with Kubernetes for modern application deployment.",
    "thumbnail": "docker-kubernetes.jpg",
    "instructor": {
      "name": "Brendan Burns",
      "profileImage": "brendan-burns.jpg"
    },
    "categoryId": "cloud-computing-devops",
    "duration": "20 hours · Self-paced",
    "difficulty": "Intermediate",
    "price": "Paid",
    "rating": 4.8,
    "reviewsCount": 92000,
    "language": "English",
    "platform": "Udemy",
    "tags": ["Docker", "Kubernetes", "Containerization", "Orchestration", "DevOps"],
    "syllabus": [
      "Container Fundamentals with Docker",
      "Docker Compose for Multi-Container Apps",
      "Kubernetes Architecture",
      "Pods, Services, and Deployments",
      "CI/CD Integration"
    ]
  },
  {
    "title": "Azure Cloud Solutions Architect",
    "description": "Design and implement solutions on Microsoft Azure cloud platform with enterprise-grade security.",
    "thumbnail": "azure-architect.jpg",
    "instructor": {
      "name": "Scott Duffy",
      "profileImage": "scott-duffy.jpg"
    },
    "categoryId": "cloud-computing-devops",
    "duration": "30 hours · Self-paced",
    "difficulty": "Intermediate",
    "price": "Paid",
    "rating": 4.6,
    "reviewsCount": 78000,
    "language": "English",
    "platform": "Udemy",
    "tags": ["Azure", "Cloud Architecture", "Microsoft", "DevOps", "Cloud Computing"],
    "syllabus": [
      "Azure Core Services",
      "Virtual Networks and Security",
      "Storage Solutions",
      "Identity and Access Management",
      "Monitoring and Optimization"
    ]
  },
  {
    "title": "DevOps Engineering Professional",
    "description": "Master CI/CD pipelines, infrastructure as code, and automation tools for modern software delivery.",
    "thumbnail": "devops-engineering.jpg",
    "instructor": {
      "name": "Rafael Campos",
      "profileImage": "rafael-campos.jpg"
    },
    "categoryId": "cloud-computing-devops",
    "duration": "28 hours · Self-paced",
    "difficulty": "Advanced",
    "price": "Paid",
    "rating": 4.7,
    "reviewsCount": 45000,
    "language": "English",
    "platform": "Pluralsight",
    "tags": ["DevOps", "CI/CD", "Infrastructure as Code", "Automation", "Jenkins"],
    "syllabus": [
      "DevOps Fundamentals",
      "CI/CD Pipeline Design",
      "Infrastructure as Code with Terraform",
      "Monitoring and Logging",
      "Security and Compliance"
    ]
  },

  // Cybersecurity & Ethical Hacking Courses
  {
    "title": "Cybersecurity Fundamentals",
    "description": "Protect systems and data with essential cybersecurity principles and threat mitigation strategies.",
    "thumbnail": "cybersecurity-fundamentals.jpg",
    "instructor": {
      "name": "Kevin Mitnick",
      "profileImage": "kevin-mitnick.jpg"
    },
    "categoryId": "cybersecurity-ethical-hacking",
    "duration": "10 weeks · Self-paced",
    "difficulty": "Beginner",
    "price": "Paid",
    "rating": 4.7,
    "reviewsCount": 28500,
    "language": "English",
    "platform": "Coursera",
    "tags": ["Cybersecurity", "Network Security", "Threat Analysis", "Information Security", "Risk Management"],
    "syllabus": [
      "Introduction to Cybersecurity",
      "Network Security Fundamentals",
      "Cryptography and Encryption",
      "Threat Analysis and Risk Assessment",
      "Incident Response and Recovery"
    ]
  },
  {
    "title": "Ethical Hacking and Penetration Testing",
    "description": "Learn to identify vulnerabilities and secure systems through authorized penetration testing techniques.",
    "thumbnail": "ethical-hacking.jpg",
    "instructor": {
      "name": "Chris Hadnagy",
      "profileImage": "chris-hadnagy.jpg"
    },
    "categoryId": "cybersecurity-ethical-hacking",
    "duration": "12 weeks · Self-paced",
    "difficulty": "Intermediate",
    "price": "Paid",
    "rating": 4.8,
    "reviewsCount": 21000,
    "language": "English",
    "platform": "Udemy",
    "tags": ["Ethical Hacking", "Penetration Testing", "Vulnerability Assessment", "Security Tools", "Cybersecurity"],
    "syllabus": [
      "Ethical Hacking Fundamentals",
      "Reconnaissance and Information Gathering",
      "Vulnerability Scanning and Analysis",
      "Exploitation Techniques",
      "Reporting and Remediation Strategies"
    ]
  },
  {
    "title": "Network Security and Cryptography",
    "description": "Master encryption techniques and secure network architectures to protect enterprise data.",
    "thumbnail": "network-security.jpg",
    "instructor": {
      "name": "Bruce Schneier",
      "profileImage": "bruce-schneier.jpg"
    },
    "categoryId": "cybersecurity-ethical-hacking",
    "duration": "14 weeks · Self-paced",
    "difficulty": "Advanced",
    "price": "Paid",
    "rating": 4.9,
    "reviewsCount": 16800,
    "language": "English",
    "platform": "edX",
    "tags": ["Network Security", "Cryptography", "Encryption", "Security Protocols", "Enterprise Security"],
    "syllabus": [
      "Advanced Cryptographic Techniques",
      "Network Protocols and Security",
      "Firewalls and Intrusion Detection",
      "Secure Network Design",
      "Compliance and Security Auditing"
    ]
  },
  {
    "title": "Incident Response and Forensics",
    "description": "Develop skills to respond to security breaches and conduct digital forensics investigations.",
    "thumbnail": "incident-response.jpg",
    "instructor": {
      "name": "SANS Institute",
      "profileImage": "sans-institute.jpg"
    },
    "categoryId": "cybersecurity-ethical-hacking",
    "duration": "10 weeks · Self-paced",
    "difficulty": "Intermediate",
    "price": "Paid",
    "rating": 4.6,
    "reviewsCount": 13200,
    "language": "English",
    "platform": "Udacity",
    "tags": ["Incident Response", "Digital Forensics", "Security Operations", "Breach Investigation", "Cybersecurity"],
    "syllabus": [
      "Incident Response Fundamentals",
      "Digital Forensics Techniques",
      "Malware Analysis and Reverse Engineering",
      "Log Analysis and Threat Hunting",
      "Legal and Ethical Considerations"
    ]
  },

  // Blockchain & Web3 Courses
  {
    "title": "Blockchain Fundamentals",
    "description": "Understand blockchain technology, consensus mechanisms, and distributed ledger principles for Web3 applications.",
    "thumbnail": "blockchain-fundamentals.jpg",
    "instructor": {
      "name": "David Wilson",
      "profileImage": "david-wilson.jpg"
    },
    "categoryId": "blockchain-web3",
    "duration": "8 weeks · Self-paced",
    "difficulty": "Beginner",
    "price": "Paid",
    "rating": 4.5,
    "reviewsCount": 12400,
    "language": "English",
    "platform": "Coursera",
    "tags": ["Blockchain", "Cryptocurrency", "Ethereum", "Smart Contracts", "Web3"],
    "syllabus": [
      "Introduction to Blockchain Technology",
      "Cryptography and Hash Functions",
      "Consensus Mechanisms",
      "Cryptocurrencies and Tokens",
      "Smart Contracts and DApps"
    ]
  },
  {
    "title": "Ethereum and Smart Contracts",
    "description": "Master Solidity programming and develop decentralized applications on the Ethereum blockchain.",
    "thumbnail": "ethereum-smart-contracts.jpg",
    "instructor": {
      "name": "Robert Brown",
      "profileImage": "robert-brown.jpg"
    },
    "categoryId": "blockchain-web3",
    "duration": "10 weeks · Self-paced",
    "difficulty": "Intermediate",
    "price": "Paid",
    "rating": 4.7,
    "reviewsCount": 9800,
    "language": "English",
    "platform": "Udemy",
    "tags": ["Ethereum", "Solidity", "Smart Contracts", "DApps", "Web3"],
    "syllabus": [
      "Ethereum Architecture and EVM",
      "Solidity Programming Basics",
      "Smart Contract Development",
      "Testing and Deployment",
      "Building Decentralized Applications"
    ]
  },
  {
    "title": "DeFi and Decentralized Finance",
    "description": "Explore decentralized finance protocols, yield farming, and financial applications in the Web3 ecosystem.",
    "thumbnail": "defi-course.jpg",
    "instructor": {
      "name": "Lisa Anderson",
      "profileImage": "lisa-anderson.jpg"
    },
    "categoryId": "blockchain-web3",
    "duration": "12 weeks · Self-paced",
    "difficulty": "Intermediate",
    "price": "Paid",
    "rating": 4.6,
    "reviewsCount": 7600,
    "language": "English",
    "platform": "edX",
    "tags": ["DeFi", "Decentralized Finance", "Yield Farming", "Protocols", "Web3"],
    "syllabus": [
      "Introduction to Decentralized Finance",
      "DeFi Protocols and Platforms",
      "Liquidity Mining and Yield Farming",
      "Risk Management in DeFi",
      "Future of Decentralized Finance"
    ]
  },
  {
    "title": "NFT Creation and Marketplace Development",
    "description": "Learn to create, mint, and sell NFTs while building your own NFT marketplace from scratch.",
    "thumbnail": "nft-development.jpg",
    "instructor": {
      "name": "James Miller",
      "profileImage": "james-miller.jpg"
    },
    "categoryId": "blockchain-web3",
    "duration": "8 weeks · Self-paced",
    "difficulty": "Intermediate",
    "price": "Paid",
    "rating": 4.4,
    "reviewsCount": 5300,
    "language": "English",
    "platform": "Udacity",
    "tags": ["NFT", "Non-Fungible Tokens", "Marketplace", "Digital Art", "Web3"],
    "syllabus": [
      "Introduction to NFTs and Digital Assets",
      "Creating and Minting NFTs",
      "Smart Contracts for NFTs",
      "Building NFT Marketplaces",
      "Legal and Ethical Considerations"
    ]
  },

  // UI/UX Design Courses
  {
    "title": "UI/UX Design Specialization",
    "description": "Master user interface and user experience design principles with hands-on projects and case studies.",
    "thumbnail": "ui-ux-design.jpg",
    "instructor": {
      "name": "Calvin Lee",
      "profileImage": "calvin-lee.jpg"
    },
    "categoryId": "ui-ux-design",
    "duration": "20 weeks · Self-paced",
    "difficulty": "Beginner",
    "price": "Paid",
    "rating": 4.8,
    "reviewsCount": 45000,
    "language": "English",
    "platform": "Coursera",
    "tags": ["UI Design", "UX Design", "Figma", "Prototyping", "User Research"],
    "syllabus": [
      "Design Thinking Fundamentals",
      "User Research and Personas",
      "Wireframing and Prototyping",
      "Visual Design Principles",
      "Usability Testing"
    ]
  },
  {
    "title": "Advanced Figma Mastery",
    "description": "Create stunning designs and interactive prototypes with advanced Figma techniques and collaborative workflows.",
    "thumbnail": "figma-mastery.jpg",
    "instructor": {
      "name": "Andy Chung",
      "profileImage": "andy-chung.jpg"
    },
    "categoryId": "ui-ux-design",
    "duration": "12 hours · Self-paced",
    "difficulty": "Intermediate",
    "price": "Paid",
    "rating": 4.7,
    "reviewsCount": 28000,
    "language": "English",
    "platform": "Skillshare",
    "tags": ["Figma", "UI Design", "Prototyping", "Design Systems", "Collaboration"],
    "syllabus": [
      "Advanced Figma Features",
      "Design Systems and Components",
      "Interactive Prototyping",
      "Collaboration Workflows",
      "Design Handoff to Developers"
    ]
  },
  {
    "title": "Mobile App Design Principles",
    "description": "Design intuitive and engaging mobile interfaces following platform-specific guidelines and best practices.",
    "thumbnail": "mobile-app-design.jpg",
    "instructor": {
      "name": "Maggie Appleton",
      "profileImage": "maggie-appleton.jpg"
    },
    "categoryId": "ui-ux-design",
    "duration": "10 hours · Self-paced",
    "difficulty": "Intermediate",
    "price": "Paid",
    "rating": 4.6,
    "reviewsCount": 19000,
    "language": "English",
    "platform": "Udemy",
    "tags": ["Mobile Design", "iOS Design", "Android Design", "App UX", "Interaction Design"],
    "syllabus": [
      "Mobile Design Fundamentals",
      "iOS and Android Design Guidelines",
      "Touch Interaction Patterns",
      "Responsive Layouts",
      "Usability Testing for Mobile"
    ]
  },
  {
    "title": "Design Psychology and User Behavior",
    "description": "Apply cognitive psychology principles to create more intuitive and persuasive user experiences.",
    "thumbnail": "design-psychology.jpg",
    "instructor": {
      "name": "Susan Weinschenk",
      "profileImage": "susan-weinschenk.jpg"
    },
    "categoryId": "ui-ux-design",
    "duration": "8 hours · Self-paced",
    "difficulty": "Advanced",
    "price": "Paid",
    "rating": 4.8,
    "reviewsCount": 15000,
    "language": "English",
    "platform": "LinkedIn Learning",
    "tags": ["Design Psychology", "Cognitive Psychology", "User Behavior", "Persuasive Design", "Neuroscience"],
    "syllabus": [
      "Cognitive Psychology Fundamentals",
      "Perception and Visual Processing",
      "Decision Making and Choice Architecture",
      "Emotional Design Principles",
      "Behavioral Economics in UX"
    ]
  },

  // Graphic Design & Multimedia Courses
  {
    "title": "Graphic Design Mastery",
    "description": "Master industry-standard design tools and principles to create stunning visual content.",
    "thumbnail": "graphic-design.jpg",
    "instructor": {
      "name": "Martin Aranzabal",
      "profileImage": "martin-aranzabal.jpg"
    },
    "categoryId": "graphic-design-multimedia",
    "duration": "10 weeks · Self-paced",
    "difficulty": "Beginner",
    "price": "Paid",
    "rating": 4.7,
    "reviewsCount": 28900,
    "language": "English",
    "platform": "Udemy",
    "tags": ["Graphic Design", "Adobe Photoshop", "Adobe Illustrator", "Typography", "Branding"],
    "syllabus": [
      "Design Fundamentals and Principles",
      "Adobe Photoshop for Photo Editing",
      "Adobe Illustrator for Vector Graphics",
      "Typography and Layout Design",
      "Branding and Identity Design"
    ]
  },
  {
    "title": "Motion Graphics and Animation",
    "description": "Create dynamic motion graphics and animations for video production and digital media.",
    "thumbnail": "motion-graphics.jpg",
    "instructor": {
      "name": "Louise Cullen",
      "profileImage": "louise-cullen.jpg"
    },
    "categoryId": "graphic-design-multimedia",
    "duration": "12 weeks · Self-paced",
    "difficulty": "Intermediate",
    "price": "Paid",
    "rating": 4.6,
    "reviewsCount": 15600,
    "language": "English",
    "platform": "Skillshare",
    "tags": ["Motion Graphics", "Animation", "After Effects", "Video Editing", "Visual Effects"],
    "syllabus": [
      "Motion Graphics Fundamentals",
      "Adobe After Effects Basics",
      "Keyframe Animation Techniques",
      "Visual Effects and Compositing",
      "Exporting and Delivery Standards"
    ]
  },
  {
    "title": "3D Modeling and Rendering",
    "description": "Build realistic 3D models and stunning renders for games, films, and architectural visualization.",
    "thumbnail": "3d-modeling.jpg",
    "instructor": {
      "name": "Dan Roam",
      "profileImage": "dan-roam.jpg"
    },
    "categoryId": "graphic-design-multimedia",
    "duration": "14 weeks · Self-paced",
    "difficulty": "Intermediate",
    "price": "Paid",
    "rating": 4.8,
    "reviewsCount": 12400,
    "language": "English",
    "platform": "Domestika",
    "tags": ["3D Modeling", "Blender", "Rendering", "Texturing", "Digital Art"],
    "syllabus": [
      "3D Modeling Fundamentals",
      "Blender Interface and Workflow",
      "Sculpting and Detailing Techniques",
      "Materials and Texturing",
      "Lighting and Rendering"
    ]
  },
  {
    "title": "Digital Illustration Techniques",
    "description": "Develop your artistic skills and create professional digital illustrations with industry tools.",
    "thumbnail": "digital-illustration.jpg",
    "instructor": {
      "name": "Sara Wood",
      "profileImage": "sara-wood.jpg"
    },
    "categoryId": "graphic-design-multimedia",
    "duration": "8 weeks · Self-paced",
    "difficulty": "Beginner",
    "price": "Paid",
    "rating": 4.5,
    "reviewsCount": 18700,
    "language": "English",
    "platform": "Skillshare",
    "tags": ["Digital Illustration", "Procreate", "Adobe Fresco", "Character Design", "Concept Art"],
    "syllabus": [
      "Digital Illustration Fundamentals",
      "Procreate and Adobe Fresco Basics",
      "Color Theory and Composition",
      "Character Design Principles",
      "Portfolio Development and Presentation"
    ]
  },

  // Business & Entrepreneurship Courses
  {
    "title": "Entrepreneurship and Startup Fundamentals",
    "description": "Learn to build and launch your own startup with proven methodologies and business frameworks.",
    "thumbnail": "startup-fundamentals.jpg",
    "instructor": {
      "name": "Reid Hoffman",
      "profileImage": "reid-hoffman.jpg"
    },
    "categoryId": "business-entrepreneurship",
    "duration": "10 weeks · Self-paced",
    "difficulty": "Beginner",
    "price": "Paid",
    "rating": 4.8,
    "reviewsCount": 32000,
    "language": "English",
    "platform": "Coursera",
    "tags": ["Entrepreneurship", "Startup", "Business Planning", "Venture Capital", "Innovation"],
    "syllabus": [
      "Entrepreneurial Mindset and Vision",
      "Market Research and Validation",
      "Business Model Development",
      "Pitching to Investors",
      "Scaling and Growth Strategies"
    ]
  },
  {
    "title": "Strategic Business Management",
    "description": "Master strategic planning, organizational behavior, and business decision-making for growth.",
    "thumbnail": "strategic-management.jpg",
    "instructor": {
      "name": "Michael Porter",
      "profileImage": "michael-porter.jpg"
    },
    "categoryId": "business-entrepreneurship",
    "duration": "12 weeks · Self-paced",
    "difficulty": "Intermediate",
    "price": "Paid",
    "rating": 4.6,
    "reviewsCount": 18500,
    "language": "English",
    "platform": "edX",
    "tags": ["Strategic Management", "Business Strategy", "Leadership", "Decision Making", "Organizational Behavior"],
    "syllabus": [
      "Strategic Analysis and Planning",
      "Industry and Competitive Analysis",
      "Resource Allocation and Capabilities",
      "Organizational Design and Culture",
      "Performance Measurement and Control"
    ]
  },
  {
    "title": "Financial Analysis and Investment Strategy",
    "description": "Develop skills in financial modeling, valuation techniques, and investment portfolio management.",
    "thumbnail": "financial-analysis.jpg",
    "instructor": {
      "name": "Warren Buffett",
      "profileImage": "warren-buffett.jpg"
    },
    "categoryId": "business-entrepreneurship",
    "duration": "14 weeks · Self-paced",
    "difficulty": "Advanced",
    "price": "Paid",
    "rating": 4.9,
    "reviewsCount": 24500,
    "language": "English",
    "platform": "Udemy",
    "tags": ["Financial Analysis", "Investment", "Valuation", "Portfolio Management", "Finance"],
    "syllabus": [
      "Financial Statement Analysis",
      "Valuation Methods and Techniques",
      "Risk and Return Analysis",
      "Portfolio Construction and Management",
      "Behavioral Finance and Market Psychology"
    ]
  },
  {
    "title": "Digital Marketing Strategy",
    "description": "Master omnichannel marketing, customer acquisition, and brand positioning in the digital landscape.",
    "thumbnail": "digital-marketing.jpg",
    "instructor": {
      "name": "Seth Godin",
      "profileImage": "seth-godin.jpg"
    },
    "categoryId": "business-entrepreneurship",
    "duration": "8 weeks · Self-paced",
    "difficulty": "Intermediate",
    "price": "Paid",
    "rating": 4.7,
    "reviewsCount": 21000,
    "language": "English",
    "platform": "Coursera",
    "tags": ["Digital Marketing", "Brand Strategy", "Customer Acquisition", "Omnichannel", "Marketing"],
    "syllabus": [
      "Digital Marketing Fundamentals",
      "Customer Journey Mapping",
      "Content Marketing and SEO",
      "Social Media and Influencer Marketing",
      "Analytics and Performance Optimization"
    ]
  },

  // Marketing & Digital Marketing Courses
  {
    "title": "Digital Marketing Masterclass",
    "description": "Comprehensive guide to SEO, SEM, social media marketing, email marketing, and analytics.",
    "thumbnail": "digital-marketing-masterclass.jpg",
    "instructor": {
      "name": "Darren Rowse",
      "profileImage": "darren-rowse.jpg"
    },
    "categoryId": "marketing-digital-marketing",
    "duration": "15 hours · Self-paced",
    "difficulty": "Beginner",
    "price": "Paid",
    "rating": 4.6,
    "reviewsCount": 156000,
    "language": "English",
    "platform": "Udemy",
    "tags": ["Digital Marketing", "SEO", "SEM", "Social Media", "Email Marketing"],
    "syllabus": [
      "Digital Marketing Fundamentals",
      "Search Engine Optimization (SEO)",
      "Search Engine Marketing (SEM)",
      "Social Media Marketing Strategies",
      "Email Marketing and Automation"
    ]
  },
  {
    "title": "Advanced SEO and Content Marketing",
    "description": "Master advanced SEO techniques and content strategies to drive organic traffic and engagement.",
    "thumbnail": "advanced-seo.jpg",
    "instructor": {
      "name": "Rand Fishkin",
      "profileImage": "rand-fishkin.jpg"
    },
    "categoryId": "marketing-digital-marketing",
    "duration": "12 hours · Self-paced",
    "difficulty": "Intermediate",
    "price": "Paid",
    "rating": 4.8,
    "reviewsCount": 89000,
    "language": "English",
    "platform": "Moz",
    "tags": ["SEO", "Content Marketing", "Keyword Research", "Link Building", "Technical SEO"],
    "syllabus": [
      "Advanced Keyword Research",
      "Technical SEO Optimization",
      "Content Strategy and Creation",
      "Link Building Techniques",
      "SEO Analytics and Reporting"
    ]
  },
  {
    "title": "Social Media Marketing Strategy",
    "description": "Develop effective social media campaigns across platforms including Facebook, Instagram, LinkedIn, and TikTok.",
    "thumbnail": "social-media-marketing.jpg",
    "instructor": {
      "name": "Mari Smith",
      "profileImage": "mari-smith.jpg"
    },
    "categoryId": "marketing-digital-marketing",
    "duration": "10 hours · Self-paced",
    "difficulty": "Intermediate",
    "price": "Paid",
    "rating": 4.5,
    "reviewsCount": 67000,
    "language": "English",
    "platform": "Udemy",
    "tags": ["Social Media", "Facebook Marketing", "Instagram Marketing", "LinkedIn Marketing", "TikTok Marketing"],
    "syllabus": [
      "Social Media Strategy Development",
      "Platform-Specific Content Creation",
      "Paid Advertising on Social Platforms",
      "Community Management",
      "Analytics and Performance Metrics"
    ]
  },
  {
    "title": "Marketing Analytics and Data-Driven Decisions",
    "description": "Leverage data analytics tools to measure marketing performance and optimize campaigns for better ROI.",
    "thumbnail": "marketing-analytics.jpg",
    "instructor": {
      "name": "Avinash Kaushik",
      "profileImage": "avinash-kaushik.jpg"
    },
    "categoryId": "marketing-digital-marketing",
    "duration": "14 hours · Self-paced",
    "difficulty": "Advanced",
    "price": "Paid",
    "rating": 4.7,
    "reviewsCount": 42000,
    "language": "English",
    "platform": "Google",
    "tags": ["Marketing Analytics", "Google Analytics", "Data Analysis", "ROI Optimization", "Conversion Rate"],
    "syllabus": [
      "Marketing Analytics Fundamentals",
      "Google Analytics Implementation",
      "Conversion Tracking and Attribution",
      "A/B Testing and Experimentation",
      "Data-Driven Decision Making"
    ]
  },

  // Finance & Accounting Courses
  {
    "title": "Financial Planning and Analysis",
    "description": "Master financial planning, budgeting, and analysis techniques for personal and business finance.",
    "thumbnail": "financial-planning.jpg",
    "instructor": {
      "name": "Suze Orman",
      "profileImage": "suze-orman.jpg"
    },
    "categoryId": "finance-accounting",
    "duration": "12 weeks · Self-paced",
    "difficulty": "Beginner",
    "price": "Paid",
    "rating": 4.7,
    "reviewsCount": 38000,
    "language": "English",
    "platform": "MasterClass",
    "tags": ["Financial Planning", "Budgeting", "Investment", "Personal Finance", "Retirement Planning"],
    "syllabus": [
      "Financial Goal Setting",
      "Budgeting and Expense Tracking",
      "Investment Fundamentals",
      "Retirement Planning Strategies",
      "Tax Planning and Optimization"
    ]
  },
  {
    "title": "Corporate Financial Management",
    "description": "Learn corporate finance principles including capital structure, valuation, and financial decision-making.",
    "thumbnail": "corporate-finance.jpg",
    "instructor": {
      "name": "Aswath Damodaran",
      "profileImage": "aswath-damodaran.jpg"
    },
    "categoryId": "finance-accounting",
    "duration": "14 weeks · Self-paced",
    "difficulty": "Intermediate",
    "price": "Paid",
    "rating": 4.8,
    "reviewsCount": 25000,
    "language": "English",
    "platform": "Coursera",
    "tags": ["Corporate Finance", "Valuation", "Capital Structure", "Investment Analysis", "Financial Modeling"],
    "syllabus": [
      "Time Value of Money",
      "Risk and Return Analysis",
      "Capital Structure Decisions",
      "Valuation Techniques",
      "Working Capital Management"
    ]
  },
  {
    "title": "Advanced Accounting and Financial Reporting",
    "description": "Master advanced accounting principles, financial reporting standards, and audit procedures.",
    "thumbnail": "advanced-accounting.jpg",
    "instructor": {
      "name": "Joe Hoyle",
      "profileImage": "joe-hoyle.jpg"
    },
    "categoryId": "finance-accounting",
    "duration": "16 weeks · Self-paced",
    "difficulty": "Advanced",
    "price": "Paid",
    "rating": 4.6,
    "reviewsCount": 18000,
    "language": "English",
    "platform": "edX",
    "tags": ["Accounting", "Financial Reporting", "GAAP", "IFRS", "Audit"],
    "syllabus": [
      "Advanced Accounting Principles",
      "Financial Statement Analysis",
      "Revenue Recognition Standards",
      "Lease Accounting and Derivatives",
      "Internal Controls and Audit Procedures"
    ]
  },
  {
    "title": "Investment Banking and Financial Modeling",
    "description": "Learn financial modeling, valuation techniques, and deal structuring used in investment banking.",
    "thumbnail": "investment-banking.jpg",
    "instructor": {
      "name": "Rosenbaum Joshua",
      "profileImage": "rosenbaum-joshua.jpg"
    },
    "categoryId": "finance-accounting",
    "duration": "18 weeks · Self-paced",
    "difficulty": "Advanced",
    "price": "Paid",
    "rating": 4.9,
    "reviewsCount": 15000,
    "language": "English",
    "platform": "Wall Street Prep",
    "tags": ["Investment Banking", "Financial Modeling", "Valuation", "M&A", "LBO"],
    "syllabus": [
      "Financial Statement Analysis",
      "Comparable Company Analysis",
      "Precedent Transaction Analysis",
      "Discounted Cash Flow Valuation",
      "Leveraged Buyout Modeling"
    ]
  },

  // Leadership & Management Courses
  {
    "title": "Leadership and Team Management",
    "description": "Develop essential leadership skills to inspire teams and drive organizational performance.",
    "thumbnail": "leadership-management.jpg",
    "instructor": {
      "name": "John Maxwell",
      "profileImage": "john-maxwell.jpg"
    },
    "categoryId": "leadership-management",
    "duration": "8 weeks · Self-paced",
    "difficulty": "Intermediate",
    "price": "Paid",
    "rating": 4.7,
    "reviewsCount": 25600,
    "language": "English",
    "platform": "Coursera",
    "tags": ["Leadership", "Team Management", "Organizational Behavior", "Coaching", "Management"],
    "syllabus": [
      "Leadership Fundamentals and Styles",
      "Team Building and Motivation",
      "Communication and Feedback",
      "Conflict Resolution and Mediation",
      "Performance Management and Development"
    ]
  },
  {
    "title": "Strategic Project Management",
    "description": "Master project planning, execution, and delivery methodologies for complex initiatives.",
    "thumbnail": "project-management.jpg",
    "instructor": {
      "name": "PMP Certification Institute",
      "profileImage": "pmp-institute.jpg"
    },
    "categoryId": "leadership-management",
    "duration": "10 weeks · Self-paced",
    "difficulty": "Intermediate",
    "price": "Paid",
    "rating": 4.6,
    "reviewsCount": 19800,
    "language": "English",
    "platform": "edX",
    "tags": ["Project Management", "PMP", "Agile", "Scrum", "Strategic Planning"],
    "syllabus": [
      "Project Management Framework",
      "Scope and Requirements Management",
      "Time and Cost Management",
      "Risk and Quality Management",
      "Stakeholder Engagement and Communication"
    ]
  },
  {
    "title": "Change Management and Organizational Transformation",
    "description": "Lead organizational change initiatives and manage transitions effectively in dynamic environments.",
    "thumbnail": "change-management.jpg",
    "instructor": {
      "name": "John Kotter",
      "profileImage": "john-kotter.jpg"
    },
    "categoryId": "leadership-management",
    "duration": "12 weeks · Self-paced",
    "difficulty": "Advanced",
    "price": "Paid",
    "rating": 4.8,
    "reviewsCount": 14500,
    "language": "English",
    "platform": "Udemy",
    "tags": ["Change Management", "Organizational Development", "Transformation", "Leadership", "Strategy"],
    "syllabus": [
      "Change Management Fundamentals",
      "Kotter's 8-Step Change Model",
      "Stakeholder Analysis and Engagement",
      "Communication Strategies for Change",
      "Sustaining and Institutionalizing Change"
    ]
  },
  {
    "title": "Executive Coaching and Mentoring",
    "description": "Develop coaching competencies to guide high-potential employees and executives toward peak performance.",
    "thumbnail": "executive-coaching.jpg",
    "instructor": {
      "name": "Marshall Goldsmith",
      "profileImage": "marshall-goldsmith.jpg"
    },
    "categoryId": "leadership-management",
    "duration": "14 weeks · Self-paced",
    "difficulty": "Advanced",
    "price": "Paid",
    "rating": 4.9,
    "reviewsCount": 8700,
    "language": "English",
    "platform": "Coursera",
    "tags": ["Executive Coaching", "Mentoring", "Leadership Development", "Performance Management", "Professional Coaching"],
    "syllabus": [
      "Coaching Fundamentals and Ethics",
      "Assessment and Feedback Techniques",
      "Goal Setting and Action Planning",
      "Advanced Coaching Conversations",
      "Measuring Coaching Impact and ROI"
    ]
  },

  // Health & Fitness Courses
  {
    "title": "Health and Wellness Coaching",
    "description": "Become a certified wellness coach and help clients achieve optimal health and lifestyle goals.",
    "thumbnail": "health-wellness.jpg",
    "instructor": {
      "name": "Dr. Andrew Weil",
      "profileImage": "dr-andrew-weil.jpg"
    },
    "categoryId": "health-fitness",
    "duration": "12 weeks · Self-paced",
    "difficulty": "Beginner",
    "price": "Paid",
    "rating": 4.6,
    "reviewsCount": 9800,
    "language": "English",
    "platform": "Coursera",
    "tags": ["Health Coaching", "Nutrition", "Wellness", "Lifestyle Medicine", "Holistic Health"],
    "syllabus": [
      "Foundations of Health and Wellness",
      "Nutritional Science and Diet Planning",
      "Exercise Physiology and Fitness",
      "Stress Management and Mindfulness",
      "Coaching Techniques and Client Relations"
    ]
  },
  {
    "title": "Mental Health First Aid",
    "description": "Learn to recognize and respond to signs of mental health crises and provide initial support.",
    "thumbnail": "mental-health-first-aid.jpg",
    "instructor": {
      "name": "Dr. Tony Jantz",
      "profileImage": "dr-tony-jantz.jpg"
    },
    "categoryId": "health-fitness",
    "duration": "6 weeks · Self-paced",
    "difficulty": "Beginner",
    "price": "Paid",
    "rating": 4.7,
    "reviewsCount": 15600,
    "language": "English",
    "platform": "Udemy",
    "tags": ["Mental Health", "First Aid", "Crisis Intervention", "Psychology", "Wellness"],
    "syllabus": [
      "Understanding Mental Health and Stigma",
      "Common Mental Health Disorders",
      "Recognizing Warning Signs and Risk Factors",
      "Crisis Intervention and Support",
      "Resources and Referral Strategies"
    ]
  },
  {
    "title": "Nutrition and Diet Planning",
    "description": "Master evidence-based nutrition principles to create personalized diet plans for optimal health.",
    "thumbnail": "nutrition-diet.jpg",
    "instructor": {
      "name": "Dr. Michael Greger",
      "profileImage": "dr-michael-greger.jpg"
    },
    "categoryId": "health-fitness",
    "duration": "10 weeks · Self-paced",
    "difficulty": "Intermediate",
    "price": "Paid",
    "rating": 4.8,
    "reviewsCount": 12400,
    "language": "English",
    "platform": "edX",
    "tags": ["Nutrition", "Diet Planning", "Meal Prep", "Functional Foods", "Health"],
    "syllabus": [
      "Nutritional Science Fundamentals",
      "Macronutrients and Micronutrients",
      "Dietary Assessment and Analysis",
      "Specialized Diet Planning",
      "Nutrition Education and Counseling"
    ]
  },
  {
    "title": "Fitness Training and Exercise Science",
    "description": "Develop expertise in exercise programming, biomechanics, and strength training methodologies.",
    "thumbnail": "fitness-training.jpg",
    "instructor": {
      "name": "Dr. Andy Galpin",
      "profileImage": "dr-andy-galpin.jpg"
    },
    "categoryId": "health-fitness",
    "duration": "12 weeks · Self-paced",
    "difficulty": "Intermediate",
    "price": "Paid",
    "rating": 4.5,
    "reviewsCount": 11200,
    "language": "English",
    "platform": "Udacity",
    "tags": ["Fitness Training", "Exercise Science", "Strength Training", "Biomechanics", "Sports Nutrition"],
    "syllabus": [
      "Exercise Physiology and Biomechanics",
      "Program Design and Periodization",
      "Strength and Conditioning Principles",
      "Injury Prevention and Recovery",
      "Performance Assessment and Testing"
    ]
  },

  // Language Learning Courses
  {
    "title": "English for Career Development",
    "description": "Enhance your professional English communication skills for global career opportunities.",
    "thumbnail": "english-career.jpg",
    "instructor": {
      "name": "Andrew McKeown",
      "profileImage": "andrew-mckeown.jpg"
    },
    "categoryId": "language-learning",
    "duration": "8 weeks · Self-paced",
    "difficulty": "Beginner",
    "price": "Paid",
    "rating": 4.6,
    "reviewsCount": 22500,
    "language": "English",
    "platform": "Coursera",
    "tags": ["Business English", "Professional Communication", "Career Skills", "Language Learning", "English"],
    "syllabus": [
      "Business Communication Fundamentals",
      "Professional Writing and Email Etiquette",
      "Presentation and Public Speaking Skills",
      "Meeting and Negotiation Language",
      "Cross-Cultural Communication"
    ]
  },
  {
    "title": "Spanish for Business Professionals",
    "description": "Master business Spanish vocabulary and communication for international commerce and trade.",
    "thumbnail": "spanish-business.jpg",
    "instructor": {
      "name": "María González",
      "profileImage": "maria-gonzalez.jpg"
    },
    "categoryId": "language-learning",
    "duration": "10 weeks · Self-paced",
    "difficulty": "Intermediate",
    "price": "Paid",
    "rating": 4.5,
    "reviewsCount": 15600,
    "language": "Spanish",
    "platform": "edX",
    "tags": ["Spanish", "Business Spanish", "International Business", "Language Learning", "Communication"],
    "syllabus": [
      "Business Spanish Vocabulary",
      "Professional Correspondence",
      "Meetings and Presentations",
      "Negotiation and Sales Language",
      "Cultural Awareness in Business"
    ]
  },
  {
    "title": "Mandarin Chinese for Beginners",
    "description": "Start your journey to learn Mandarin Chinese with foundational vocabulary and pronunciation.",
    "thumbnail": "mandarin-beginners.jpg",
    "instructor": {
      "name": "David Moser",
      "profileImage": "david-moser.jpg"
    },
    "categoryId": "language-learning",
    "duration": "12 weeks · Self-paced",
    "difficulty": "Beginner",
    "price": "Paid",
    "rating": 4.7,
    "reviewsCount": 18900,
    "language": "Chinese",
    "platform": "Udemy",
    "tags": ["Mandarin", "Chinese", "Language Learning", "Pinyin", "Beginner Chinese"],
    "syllabus": [
      "Pinyin and Pronunciation",
      "Basic Grammar and Sentence Structure",
      "Everyday Vocabulary and Expressions",
      "Cultural Context and Etiquette",
      "Listening and Speaking Practice"
    ]
  },
  {
    "title": "French Language Immersion",
    "description": "Achieve fluency in French through immersive learning techniques and cultural insights.",
    "thumbnail": "french-immersion.jpg",
    "instructor": {
      "name": "Élodie Frege",
      "profileImage": "elodie-frege.jpg"
    },
    "categoryId": "language-learning",
    "duration": "16 weeks · Self-paced",
    "difficulty": "Intermediate",
    "price": "Paid",
    "rating": 4.8,
    "reviewsCount": 13400,
    "language": "French",
    "platform": "Babbel",
    "tags": ["French", "Language Learning", "Immersion", "Grammar", "Vocabulary"],
    "syllabus": [
      "Advanced Grammar and Syntax",
      "Idiomatic Expressions and Slang",
      "French Literature and Media",
      "Business and Professional French",
      "Regional Dialects and Cultural Variations"
    ]
  },

  // Music & Audio Courses
  {
    "title": "Music Theory Fundamentals",
    "description": "Master the basics of music theory including scales, chords, rhythm, and musical notation.",
    "thumbnail": "music-theory.jpg",
    "instructor": {
      "name": "Jason Allen",
      "profileImage": "jason-allen.jpg"
    },
    "categoryId": "music-audio",
    "duration": "8 weeks · Self-paced",
    "difficulty": "Beginner",
    "price": "Paid",
    "rating": 4.6,
    "reviewsCount": 32000,
    "language": "English",
    "platform": "Udemy",
    "tags": ["Music Theory", "Scales", "Chords", "Rhythm", "Musical Notation"],
    "syllabus": [
      "Musical Notation and Symbols",
      "Major and Minor Scales",
      "Chord Construction and Progressions",
      "Rhythm and Meter",
      "Form and Analysis"
    ]
  },
  {
    "title": "Audio Production and Sound Design",
    "description": "Learn professional audio production techniques and sound design for music, film, and games.",
    "thumbnail": "audio-production.jpg",
    "instructor": {
      "name": "Brian Lee White",
      "profileImage": "brian-lee-white.jpg"
    },
    "categoryId": "music-audio",
    "duration": "12 weeks · Self-paced",
    "difficulty": "Intermediate",
    "price": "Paid",
    "rating": 4.7,
    "reviewsCount": 18000,
    "language": "English",
    "platform": "LinkedIn Learning",
    "tags": ["Audio Production", "Sound Design", "DAW", "Mixing", "Recording"],
    "syllabus": [
      "Digital Audio Workstation Basics",
      "Microphone Techniques and Recording",
      "Editing and Signal Processing",
      "Mixing and Mastering Fundamentals",
      "Sound Design for Media"
    ]
  },
  {
    "title": "Piano for All Beginners",
    "description": "Learn to play piano from scratch with a comprehensive course covering technique, theory, and repertoire.",
    "thumbnail": "piano-beginners.jpg",
    "instructor": {
      "name": "Robin Hall",
      "profileImage": "robin-hall.jpg"
    },
    "categoryId": "music-audio",
    "duration": "12 weeks · Self-paced",
    "difficulty": "Beginner",
    "price": "Paid",
    "rating": 4.5,
    "reviewsCount": 15600,
    "language": "English",
    "platform": "Udemy",
    "tags": ["Piano", "Music Theory", "Beginner Music", "Instrumental Skills", "Music Education"],
    "syllabus": [
      "Piano Basics and Technique",
      "Music Theory Fundamentals",
      "Reading Sheet Music",
      "Playing Popular Songs",
      "Performance and Practice Tips"
    ]
  },
  {
    "title": "Guitar for All Beginners",
    "description": "Start playing guitar with a beginner-friendly course covering chords, strumming, and basic techniques.",
    "thumbnail": "guitar-beginners.jpg",
    "instructor": {
      "name": "Tom Morello",
      "profileImage": "tom-morello.jpg"
    },
    "categoryId": "music-audio",
    "duration": "10 weeks · Self-paced",
    "difficulty": "Beginner",
    "price": "Paid",
    "rating": 4.7,
    "reviewsCount": 12400,
    "language": "English",
    "platform": "Skillshare",
    "tags": ["Guitar", "Music Theory", "Beginner Music", "Instrumental Skills", "Music Education"],
    "syllabus": [
      "Guitar Basics and Setup",
      "Chord Progressions and Strumming",
      "Basic Techniques and Finger Exercises",
      "Playing Popular Songs",
      "Performance and Practice Tips"
    ]
  },

  // Photography & Video Courses
  {
    "title": "Photography Fundamentals",
    "description": "Master the basics of photography including composition, lighting, and camera techniques.",
    "thumbnail": "photography-fundamentals.jpg",
    "instructor": {
      "name": "Tim Wallace",
      "profileImage": "tim-wallace.jpg"
    },
    "categoryId": "photography-video",
    "duration": "10 weeks · Self-paced",
    "difficulty": "Beginner",
    "price": "Paid",
    "rating": 4.7,
    "reviewsCount": 28900,
    "language": "English",
    "platform": "Udemy",
    "tags": ["Photography", "Composition", "Lighting", "Camera Techniques", "Visual Arts"],
    "syllabus": [
      "Introduction to Photography",
      "Camera Basics and Settings",
      "Composition Principles",
      "Lighting Techniques",
      "Post-Processing and Editing"
    ]
  },
  {
    "title": "Video Production Masterclass",
    "description": "Create professional-quality videos with comprehensive techniques in shooting, editing, and sound.",
    "thumbnail": "video-production.jpg",
    "instructor": {
      "name": "Erik Spiekermann",
      "profileImage": "erik-spiekermann.jpg"
    },
    "categoryId": "photography-video",
    "duration": "12 weeks · Self-paced",
    "difficulty": "Intermediate",
    "price": "Paid",
    "rating": 4.6,
    "reviewsCount": 15600,
    "language": "English",
    "platform": "Skillshare",
    "tags": ["Video Production", "Shooting", "Editing", "Sound Design", "Visual Arts"],
    "syllabus": [
      "Video Production Fundamentals",
      "Camera Techniques and Composition",
      "Lighting and Set Design",
      "Editing and Post-Processing",
      "Sound Design and Audio Techniques"
    ]
  },
  {
    "title": "Advanced Portrait Photography",
    "description": "Capture stunning portraits with advanced techniques in lighting, posing, and post-processing.",
    "thumbnail": "portrait-photography.jpg",
    "instructor": {
      "name": "Lindsay Adler",
      "profileImage": "lindsay-adler.jpg"
    },
    "categoryId": "photography-video",
    "duration": "14 weeks · Self-paced",
    "difficulty": "Intermediate",
    "price": "Paid",
    "rating": 4.8,
    "reviewsCount": 12400,
    "language": "English",
    "platform": "Domestika",
    "tags": ["Portrait Photography", "Lighting", "Posing", "Post-Processing", "Visual Arts"],
    "syllabus": [
      "Portrait Photography Fundamentals",
      "Lighting Techniques for Portraits",
      "Posing and Composition",
      "Post-Processing and Retouching",
      "Portfolio Development and Presentation"
    ]
  },
  {
    "title": "Cinematography for Beginners",
    "description": "Learn the basics of cinematography including camera angles, movement, and visual storytelling.",
    "thumbnail": "cinematography.jpg",
    "instructor": {
      "name": "Derek Draper",
      "profileImage": "derek-draper.jpg"
    },
    "categoryId": "photography-video",
    "duration": "8 weeks · Self-paced",
    "difficulty": "Beginner",
    "price": "Paid",
    "rating": 4.5,
    "reviewsCount": 18700,
    "language": "English",
    "platform": "Skillshare",
    "tags": ["Cinematography", "Camera Angles", "Movement", "Visual Storytelling", "Visual Arts"],
    "syllabus": [
      "Cinematography Fundamentals",
      "Camera Angles and Composition",
      "Camera Movement Techniques",
      "Lighting and Exposure",
      "Visual Storytelling and Narrative"
    ]
  },

  // Writing & Content Creation Courses
  {
    "title": "Creative Writing Masterclass",
    "description": "Develop your writing skills and create compelling stories with professional guidance.",
    "thumbnail": "creative-writing.jpg",
    "instructor": {
      "name": "Esi Edugyan",
      "profileImage": "esi-edugyan.jpg"
    },
    "categoryId": "writing-content-creation",
    "duration": "12 weeks · Self-paced",
    "difficulty": "Beginner",
    "price": "Paid",
    "rating": 4.7,
    "reviewsCount": 32000,
    "language": "English",
    "platform": "Udemy",
    "tags": ["Creative Writing", "Storytelling", "Writing Skills", "Literary Fiction", "Creative Arts"],
    "syllabus": [
      "Creative Writing Fundamentals",
      "Character Development",
      "Plot Structure and Plotting",
      "Dialogue and Voice",
      "Revision and Editing"
    ]
  },
  {
    "title": "Content Marketing Strategy",
    "description": "Master content creation, distribution, and optimization for digital marketing success.",
    "thumbnail": "content-marketing.jpg",
    "instructor": {
      "name": "Neil Patel",
      "profileImage": "neil-patel.jpg"
    },
    "categoryId": "writing-content-creation",
    "duration": "10 weeks · Self-paced",
    "difficulty": "Intermediate",
    "price": "Paid",
    "rating": 4.6,
    "reviewsCount": 18500,
    "language": "English",
    "platform": "Udemy",
    "tags": ["Content Marketing", "Content Creation", "Digital Marketing", "SEO", "Content Strategy"],
    "syllabus": [
      "Content Marketing Fundamentals",
      "Content Creation Techniques",
      "Content Distribution Channels",
      "SEO and Keyword Optimization",
      "Analytics and Performance Metrics"
    ]
  },
  {
    "title": "Technical Writing and Documentation",
    "description": "Learn to write clear and concise technical documentation for software and products.",
    "thumbnail": "technical-writing.jpg",
    "instructor": {
      "name": "Suzanne Collins",
      "profileImage": "suzanne-collins.jpg"
    },
    "categoryId": "writing-content-creation",
    "duration": "14 weeks · Self-paced",
    "difficulty": "Intermediate",
    "price": "Paid",
    "rating": 4.8,
    "reviewsCount": 24500,
    "language": "English",
    "platform": "Coursera",
    "tags": ["Technical Writing", "Documentation", "Software Documentation", "Product Documentation", "Technical Communication"],
    "syllabus": [
      "Technical Writing Fundamentals",
      "Documentation Types and Formats",
      "Writing for Different Audiences",
      "Editing and Review Processes",
      "Tools and Technologies for Technical Writing"
    ]
  },
  {
    "title": "Journalism and News Writing",
    "description": "Master the principles of journalism and develop skills in news writing and reporting.",
    "thumbnail": "journalism.jpg",
    "instructor": {
      "name": "David Carr",
      "profileImage": "david-carr.jpg"
    },
    "categoryId": "writing-content-creation",
    "duration": "8 weeks · Self-paced",
    "difficulty": "Intermediate",
    "price": "Paid",
    "rating": 4.5,
    "reviewsCount": 21000,
    "language": "English",
    "platform": "Udemy",
    "tags": ["Journalism", "News Writing", "Reporting", "Media Literacy", "Journalistic Ethics"],
    "syllabus": [
      "Journalism Fundamentals",
      "News Writing Techniques",
      "Reporting and Research",
      "Media Literacy and Verification",
      "Ethics and Legal Considerations"
    ]
  },

  // Career Development Courses
  {
    "title": "Resume Writing and Job Search",
    "description": "Create a standout resume and ace your job search with professional tips and strategies.",
    "thumbnail": "resume-writing.jpg",
    "instructor": {
      "name": "Lynn Taylor",
      "profileImage": "lynn-taylor.jpg"
    },
    "categoryId": "career-development",
    "duration": "8 weeks · Self-paced",
    "difficulty": "Beginner",
    "price": "Paid",
    "rating": 4.7,
    "reviewsCount": 25600,
    "language": "English",
    "platform": "Udemy",
    "tags": ["Resume Writing", "Job Search", "Career Development", "Interview Preparation", "Professional Skills"],
    "syllabus": [
      "Resume Writing Fundamentals",
      "Tailoring Resumes for Different Jobs",
      "Job Search Strategies",
      "Interview Preparation",
      "Networking and Building Relationships"
    ]
  },
  {
    "title": "Professional Networking and LinkedIn Mastery",
    "description": "Maximize your professional network and build a strong LinkedIn presence for career growth.",
    "thumbnail": "linkedin-mastery.jpg",
    "instructor": {
      "name": "Liz Ryan",
      "profileImage": "liz-ryan.jpg"
    },
    "categoryId": "career-development",
    "duration": "10 weeks · Self-paced",
    "difficulty": "Intermediate",
    "price": "Paid",
    "rating": 4.6,
    "reviewsCount": 19800,
    "language": "English",
    "platform": "Udemy",
    "tags": ["Professional Networking", "LinkedIn", "Career Growth", "Online Presence", "Professional Skills"],
    "syllabus": [
      "Professional Networking Fundamentals",
      "LinkedIn Profile Optimization",
      "Building and Engaging Networks",
      "LinkedIn Messaging and Outreach",
      "Advanced LinkedIn Features"
    ]
  },
  {
    "title": "Leadership Skills for Career Advancement",
    "description": "Develop leadership skills to advance your career and take on more responsibility.",
    "thumbnail": "leadership-skills.jpg",
    "instructor": {
      "name": "John C. Maxwell",
      "profileImage": "john-maxwell.jpg"
    },
    "categoryId": "career-development",
    "duration": "12 weeks · Self-paced",
    "difficulty": "Intermediate",
    "price": "Paid",
    "rating": 4.8,
    "reviewsCount": 14500,
    "language": "English",
    "platform": "Coursera",
    "tags": ["Leadership Skills", "Career Advancement", "Professional Development", "Leadership", "Management"],
    "syllabus": [
      "Leadership Fundamentals",
      "Building Trust and Credibility",
      "Motivating and Inspiring Teams",
      "Effective Communication and Feedback",
      "Conflict Resolution and Problem Solving"
    ]
  },
  {
    "title": "Time Management and Productivity",
    "description": "Master time management techniques to increase productivity and achieve your goals.",
    "thumbnail": "time-management.jpg",
    "instructor": {
      "name": "Laura Vanderkam",
      "profileImage": "laura-vanderkam.jpg"
    },
    "categoryId": "career-development",
    "duration": "14 weeks · Self-paced",
    "difficulty": "Intermediate",
    "price": "Paid",
    "rating": 4.9,
    "reviewsCount": 8700,
    "language": "English",
    "platform": "Udemy",
    "tags": ["Time Management", "Productivity", "Goal Setting", "Work-Life Balance", "Professional Skills"],
    "syllabus": [
      "Time Management Fundamentals",
      "Prioritization and Goal Setting",
      "Productivity Techniques",
      "Delegation and Outsourcing",
      "Work-Life Balance Strategies"
    ]
  },

  // Education & Teaching Courses
  {
    "title": "Teaching English as a Foreign Language",
    "description": "Learn to teach English to non-native speakers with professional teaching methodologies.",
    "thumbnail": "tefl.jpg",
    "instructor": {
      "name": "Rachel Roberts",
      "profileImage": "rachel-roberts.jpg"
    },
    "categoryId": "education-teaching",
    "duration": "12 weeks · Self-paced",
    "difficulty": "Beginner",
    "price": "Paid",
    "rating": 4.7,
    "reviewsCount": 32000,
    "language": "English",
    "platform": "Udemy",
    "tags": ["TEFL", "English Teaching", "Language Teaching", "Professional Development", "Education"],
    "syllabus": [
      "TEFL Fundamentals",
      "Teaching Methodologies",
      "Classroom Management",
      "Assessment and Evaluation",
      "Professional Development"
    ]
  },
  {
    "title": "Online Teaching and Learning",
    "description": "Master online teaching techniques and create engaging virtual classrooms.",
    "thumbnail": "online-teaching.jpg",
    "instructor": {
      "name": "Dr. Barbara Gross Davis",
      "profileImage": "barbara-gross-davis.jpg"
    },
    "categoryId": "education-teaching",
    "duration": "10 weeks · Self-paced",
    "difficulty": "Intermediate",
    "price": "Paid",
    "rating": 4.6,
    "reviewsCount": 18500,
    "language": "English",
    "platform": "Coursera",
    "tags": ["Online Teaching", "Virtual Classrooms", "Distance Learning", "Education Technology", "Teaching"],
    "syllabus": [
      "Online Teaching Fundamentals",
      "Virtual Classroom Design",
      "Teaching Techniques for Online",
      "Assessment and Feedback",
      "Professional Development"
    ]
  },
  {
    "title": "Educational Technology and Tools",
    "description": "Explore educational technologies and tools to enhance teaching and learning.",
    "thumbnail": "edtech.jpg",
    "instructor": {
      "name": "Dr. Susan Patrick",
      "profileImage": "susan-patrick.jpg"
    },
    "categoryId": "education-teaching",
    "duration": "14 weeks · Self-paced",
    "difficulty": "Intermediate",
    "price": "Paid",
    "rating": 4.8,
    "reviewsCount": 24500,
    "language": "English",
    "platform": "edX",
    "tags": ["Educational Technology", "EdTech", "Teaching Tools", "Learning Tools", "Education"],
    "syllabus": [
      "Educational Technology Fundamentals",
      "Learning Management Systems",
      "Interactive Tools and Resources",
      "Assessment and Evaluation",
      "Professional Development"
    ]
  },
  {
    "title": "Curriculum Design and Development",
    "description": "Master curriculum design and development techniques for effective teaching.",
    "thumbnail": "curriculum-design.jpg",
    "instructor": {
      "name": "Dr. Grant Wiggins",
      "profileImage": "grant-wiggins.jpg"
    },
    "categoryId": "education-teaching",
    "duration": "8 weeks · Self-paced",
    "difficulty": "Intermediate",
    "price": "Paid",
    "rating": 4.5,
    "reviewsCount": 21000,
    "language": "English",
    "platform": "Udemy",
    "tags": ["Curriculum Design", "Teaching", "Education", "Instructional Design", "Professional Development"],
    "syllabus": [
      "Curriculum Design Fundamentals",
      "Instructional Design Techniques",
      "Assessment and Evaluation",
      "Professional Development",
      "Curriculum Implementation"
    ]
  },

  // Science & Engineering Courses
  {
    "title": "Physics Fundamentals",
    "description": "Master the basics of physics including mechanics, electricity, and magnetism.",
    "thumbnail": "physics.jpg",
    "instructor": {
      "name": "Dr. Walter Lewin",
      "profileImage": "walter-lewin.jpg"
    },
    "categoryId": "science-engineering",
    "duration": "10 weeks · Self-paced",
    "difficulty": "Beginner",
    "price": "Paid",
    "rating": 4.7,
    "reviewsCount": 28900,
    "language": "English",
    "platform": "MIT OpenCourseWare",
    "tags": ["Physics", "Mechanics", "Electricity", "Magnetism", "Science"],
    "syllabus": [
      "Physics Fundamentals",
      "Mechanics",
      "Electricity and Magnetism",
      "Thermodynamics",
      "Modern Physics"
    ]
  },
  {
    "title": "Chemistry Essentials",
    "description": "Learn the fundamentals of chemistry including atoms, molecules, and chemical reactions.",
    "thumbnail": "chemistry.jpg",
    "instructor": {
      "name": "Dr. Paula Yurkanis Bruice",
      "profileImage": "paula-yurkanis-bruice.jpg"
    },
    "categoryId": "science-engineering",
    "duration": "12 weeks · Self-paced",
    "difficulty": "Beginner",
    "price": "Paid",
    "rating": 4.6,
    "reviewsCount": 15600,
    "language": "English",
    "platform": "edX",
    "tags": ["Chemistry", "Atoms", "Molecules", "Chemical Reactions", "Science"],
    "syllabus": [
      "Chemistry Fundamentals",
      "Atomic Structure",
      "Molecular Structure",
      "Chemical Reactions",
      "Stoichiometry"
    ]
  },
  {
    "title": "Engineering Principles",
    "description": "Explore fundamental principles in various engineering disciplines including civil, mechanical, and electrical.",
    "thumbnail": "engineering.jpg",
    "instructor": {
      "name": "Dr. Richard C. Dorf",
      "profileImage": "richard-c-dorf.jpg"
    },
    "categoryId": "science-engineering",
    "duration": "14 weeks · Self-paced",
    "difficulty": "Intermediate",
    "price": "Paid",
    "rating": 4.8,
    "reviewsCount": 12400,
    "language": "English",
    "platform": "Coursera",
    "tags": ["Engineering", "Civil Engineering", "Mechanical Engineering", "Electrical Engineering", "Science"],
    "syllabus": [
      "Engineering Fundamentals",
      "Civil Engineering Principles",
      "Mechanical Engineering Principles",
      "Electrical Engineering Principles",
      "Engineering Ethics"
    ]
  },
  {
    "title": "Biology Essentials",
    "description": "Learn the basics of biology including cells, genetics, and ecology.",
    "thumbnail": "biology.jpg",
    "instructor": {
      "name": "Dr. Jane Goodall",
      "profileImage": "jane-goodall.jpg"
    },
    "categoryId": "science-engineering",
    "duration": "8 weeks · Self-paced",
    "difficulty": "Beginner",
    "price": "Paid",
    "rating": 4.5,
    "reviewsCount": 18700,
    "language": "English",
    "platform": "Udemy",
    "tags": ["Biology", "Cells", "Genetics", "Ecology", "Science"],
    "syllabus": [
      "Biology Fundamentals",
      "Cell Structure and Function",
      "Genetics",
      "Ecology",
      "Evolution"
    ]
  },

  // Personal Development Courses
  {
    "title": "Time Management and Productivity",
    "description": "Master time management techniques to increase productivity and achieve your goals.",
    "thumbnail": "time-management.jpg",
    "instructor": {
      "name": "Laura Vanderkam",
      "profileImage": "laura-vanderkam.jpg"
    },
    "categoryId": "personal-development",
    "duration": "14 weeks · Self-paced",
    "difficulty": "Intermediate",
    "price": "Paid",
    "rating": 4.9,
    "reviewsCount": 8700,
    "language": "English",
    "platform": "Udemy",
    "tags": ["Time Management", "Productivity", "Goal Setting", "Work-Life Balance", "Professional Skills"],
    "syllabus": [
      "Time Management Fundamentals",
      "Prioritization and Goal Setting",
      "Productivity Techniques",
      "Delegation and Outsourcing",
      "Work-Life Balance Strategies"
    ]
  },
  {
    "title": "Mindfulness and Meditation",
    "description": "Develop mindfulness and meditation practices for stress reduction and mental well-being.",
    "thumbnail": "mindfulness.jpg",
    "instructor": {
      "name": "Jon Kabat-Zinn",
      "profileImage": "jon-kabat-zinn.jpg"
    },
    "categoryId": "personal-development",
    "duration": "10 weeks · Self-paced",
    "difficulty": "Beginner",
    "price": "Paid",
    "rating": 4.7,
    "reviewsCount": 19800,
    "language": "English",
    "platform": "Udemy",
    "tags": ["Mindfulness", "Meditation", "Stress Reduction", "Mental Well-being", "Personal Development"],
    "syllabus": [
      "Mindfulness Fundamentals",
      "Meditation Techniques",
      "Stress Reduction Strategies",
      "Mindfulness in Daily Life",
      "Advanced Mindfulness Practices"
    ]
  },
  {
    "title": "Public Speaking and Presentation Skills",
    "description": "Master public speaking and presentation skills to communicate effectively in any setting.",
    "thumbnail": "public-speaking.jpg",
    "instructor": {
      "name": "Gary Vaynerchuk",
      "profileImage": "gary-vaynerchuk.jpg"
    },
    "categoryId": "personal-development",
    "duration": "12 weeks · Self-paced",
    "difficulty": "Intermediate",
    "price": "Paid",
    "rating": 4.8,
    "reviewsCount": 14500,
    "language": "English",
    "platform": "Udemy",
    "tags": ["Public Speaking", "Presentation Skills", "Communication", "Public Relations", "Personal Development"],
    "syllabus": [
      "Public Speaking Fundamentals",
      "Presentation Techniques",
      "Effective Communication",
      "Public Relations",
      "Advanced Presentation Skills"
    ]
  },
  {
    "title": "Personal Finance and Wealth Building",
    "description": "Master personal finance principles and strategies to build wealth and achieve financial independence.",
    "thumbnail": "personal-finance.jpg",
    "instructor": {
      "name": "Dave Ramsey",
      "profileImage": "dave-ramsey.jpg"
    },
    "categoryId": "personal-development",
    "duration": "8 weeks · Self-paced",
    "difficulty": "Beginner",
    "price": "Paid",
    "rating": 4.5,
    "reviewsCount": 21000,
    "language": "English",
    "platform": "Udemy",
    "tags": ["Personal Finance", "Wealth Building", "Financial Independence", "Investment", "Personal Development"],
    "syllabus": [
      "Personal Finance Fundamentals",
      "Budgeting and Expense Tracking",
      "Investment Strategies",
      "Wealth Building Techniques",
      "Financial Independence"
    ]
  }

];
