import { DepartmentProjectIdea } from '../types';

export const BRAND = {
  name: '3 Sixtey',
  fullName: '3 Sixtey – Project and Media Solution',
  tagline: 'Project and Media Solution',
  phone: '+919025132379',
  phoneDisplay: '+91 9025132379',
  whatsapp: '919025132379',
  email: 'projectmediasolutionsixty@gmail.com',
  adminEmail: 'gokilas333@gmail.com',
  address: 'Tamil Nadu, India',
  founder: 'Kogilasundhararaj',
};

export const ADMIN_EMAILS = [
  'gokilas333@gmail.com',
];

export const DEPARTMENT_PROJECTS: Record<string, { label: string; description: string; ideas: DepartmentProjectIdea[] }> = {
  CSE: {
    label: 'Computer Science (CSE)',
    description: 'Cutting-edge AI, Deep Learning, Cloud Architecture, and Web3 architectures with IEEE conference paper compliance.',
    ideas: [
      {
        title: 'Deep Learning Multi-Modal Medical Diagnostics',
        domain: 'Artificial Intelligence / Healthcare',
        techStack: ['Python', 'PyTorch', 'FastAPI', 'React', 'Docker'],
        description: 'Analyzes chest X-rays, MRI scans, and electronic health records with grad-CAM explainability for clinical doctors.',
        ieeeCompliant: true,
        deliverables: ['Full Source Code', 'IEEE Format Paper', 'Final PPT', 'Viva Defense Q&A Guide']
      },
      {
        title: 'Decentralized Zero-Knowledge Identity Verification',
        domain: 'Blockchain & Cryptography',
        techStack: ['Solidity', 'Ethereum', 'ZK-SNARKs', 'Node.js', 'Next.js'],
        description: 'Privacy-preserving academic credential verification platform eliminating certificate forgery for universities.',
        ieeeCompliant: true,
        deliverables: ['Smart Contracts', 'Web Portal', 'Thesis Report (80+ Pages)', 'Architecture Diagram']
      },
      {
        title: 'Real-Time Edge AI Video Surveillance Anomaly Detector',
        domain: 'Computer Vision',
        techStack: ['YOLOv10', 'OpenCV', 'TensorRT', 'Flask', 'WebSockets'],
        description: 'Autonomous detection of weapon detection, restricted perimeter breaches, and stampede risk with instant alerts.',
        ieeeCompliant: true,
        deliverables: ['Working Model', 'Dataset & Weights', 'Report with Plagiarism Check', 'Live Demo Setup']
      }
    ]
  },
  IT: {
    label: 'Information Technology (IT)',
    description: 'Enterprise Cloud Systems, Cybersecurity SIEM, Big Data Pipelines, and Full-Stack Microservices.',
    ideas: [
      {
        title: 'Cloud-Native Automated DevOps CI/CD Vulnerability Scanner',
        domain: 'DevSecOps & Cloud',
        techStack: ['Kubernetes', 'Go', 'Docker', 'Trivy', 'React'],
        description: 'Automates security vulnerability audits, secret scanning, and automated patch recommendations in live git repositories.',
        ieeeCompliant: true,
        deliverables: ['Helm Charts', 'Microservices Backend', 'Documentation with Test Cases', 'PPT & Viva Prep']
      },
      {
        title: 'Intelligent Supply Chain Forensics with Event-Driven Kafka',
        domain: 'Big Data & Distributed Systems',
        techStack: ['Apache Kafka', 'Spark', 'Python', 'PostgreSQL', 'Tailwind'],
        description: 'Predicts supply chain bottlenecks, tracking cold-storage transit conditions with high throughput IoT telemetry.',
        ieeeCompliant: true,
        deliverables: ['Pipeline Scripts', 'Interactive Dashboard', 'IEEE Paper Manuscript', 'System Guide']
      },
      {
        title: 'AI-Powered Phishing & DNS Tunneling Detection Engine',
        domain: 'Cybersecurity',
        techStack: ['Python', 'Scikit-Learn', 'Wireshark PCAP', 'FastAPI'],
        description: 'Inspects high-speed packet captures and URL telemetry to neutralize zero-day spear-phishing attacks.',
        ieeeCompliant: true,
        deliverables: ['Trained Classifier', 'Admin Dashboard', 'IEEE Style Report', 'Viva Question Bank']
      }
    ]
  },
  ECE: {
    label: 'Electronics & Communication (ECE)',
    description: 'Embedded Systems, IoT Edge Computing, Signal Processing, Robotics, and LoRa Telemetry.',
    ideas: [
      {
        title: 'LoRaWAN Long-Range Smart Disaster Early-Warning Node',
        domain: 'IoT & Telemetry',
        techStack: ['ESP32', 'LoRa SX1278', 'C++', 'MQTT', 'Node-RED'],
        description: 'Mesh network of remote battery-powered sensor nodes detecting landslide and flood precursors up to 15km line-of-sight.',
        ieeeCompliant: true,
        deliverables: ['Circuit Schematic (KiCad)', 'Firmware Code', 'Hardware Testing Log', 'Viva Defense PPT']
      },
      {
        title: 'Edge AI Smart Prosthetic Bionic Arm via EMG Signals',
        domain: 'Biomedical & Embedded',
        techStack: ['Arduino Nano 33 BLE', 'TinyML', 'EMG Sensor', 'Servo Motors'],
        description: 'Decodes forearm muscle neural impulses on-device with sub-50ms latency to articulate prosthetic finger grip gestures.',
        ieeeCompliant: true,
        deliverables: ['3D CAD STL Files', 'TinyML Model', 'Hardware Connection Guide', 'IEEE Paper']
      },
      {
        title: 'Autonomous Drone Precision Agricultural Spraying System',
        domain: 'Robotics & UAV',
        techStack: ['Pixhawk', 'Raspberry Pi', 'OpenCV NDVI', 'Python'],
        description: 'Detects crop disease stress via multispectral camera and activates micro-nozzle actuators only on afflicted leaves.',
        ieeeCompliant: true,
        deliverables: ['Flight Controller Config', 'Image Algorithm', 'Project Documentation', 'Video Demonstration']
      }
    ]
  },
  EEE: {
    label: 'Electrical & Electronics (EEE)',
    description: 'Smart Grids, Renewable Microgrids, Power Electronics, EV Charging, and Battery Management Systems.',
    ideas: [
      {
        title: 'Solar Microgrid Maximum Power Point Tracker (MPPT) with IoT',
        domain: 'Renewable Power Systems',
        techStack: ['MATLAB/Simulink', 'STM32', 'Buck-Boost Converter', 'Blynk'],
        description: 'Perturb & Observe MPPT algorithm maximizing photovoltaic efficiency by 24% under partial shading conditions.',
        ieeeCompliant: true,
        deliverables: ['Simulink Model (.slx)', 'Hardware Firmware', 'Waveform Analysis Report', 'Viva PPT']
      },
      {
        title: 'Smart EV Battery Management System (BMS) with State-of-Charge AI',
        domain: 'Electric Vehicles',
        techStack: ['ESP32', 'CAN Bus', 'Kalman Filter', 'Python', 'Grafana'],
        description: 'Monitors cell thermal runaway, balancing voltages, and predicts accurate remaining state-of-health (SoH).',
        ieeeCompliant: true,
        deliverables: ['PCB Gerber Files', 'Simulation Logs', 'Comprehensive Thesis', 'Viva Prep Pack']
      },
      {
        title: 'Wireless Dynamic Induction Power Transfer for Moving Electric Vehicles',
        domain: 'Wireless Power Transfer',
        techStack: ['HF Inverter', 'Resonant Coils', 'MATLAB', 'Microcontroller'],
        description: 'High-frequency resonant inductive coupling system powering electric vehicles continuously as they roll over road pads.',
        ieeeCompliant: true,
        deliverables: ['Coil Design Calculations', 'Hardware Demo Unit', 'IEEE Conference Paper', 'PPT Deck']
      }
    ]
  },
  Mechanical: {
    label: 'Mechanical Engineering',
    description: 'FEA Simulation, Computational Fluid Dynamics (CFD), Autonomous Mechatronics, and 3D Rapid Prototyping.',
    ideas: [
      {
        title: 'Topology Optimization & FEA of Lightweight EV Chassis Subframe',
        domain: 'Structural CAD/FEA',
        techStack: ['ANSYS Workbench', 'SolidWorks', 'Topology Optimization'],
        description: 'Reduces structural mass by 32% while maintaining crashworthiness and torsional stiffness standards.',
        ieeeCompliant: true,
        deliverables: ['3D CAD Models (STEP)', 'ANSYS Stress/Strain Reports', 'Thesis Document', 'Viva Slides']
      },
      {
        title: 'Four-Wheel Steering Crab-Drive Autonomous Mobile Warehouse Robot',
        domain: 'Robotics & Mechatronics',
        techStack: ['SolidWorks', 'ROS2', 'Stepper Motors', 'Lead Acid/LiFePO4'],
        description: 'Zero-turn radius automated guided vehicle for tight warehouse aisle transport with obstacle avoidance sensors.',
        ieeeCompliant: true,
        deliverables: ['Fabrication Drawings', 'Kinematic Calculations', 'Full Project Report', 'Assembly Video']
      },
      {
        title: 'CFD Aerodynamic Drag Reduction on High-Speed Transit with Vortex Generators',
        domain: 'Thermal & Fluid Dynamics',
        techStack: ['ANSYS Fluent', 'CFD Meshing', 'Wind Tunnel Analysis'],
        description: 'Simulates turbulence boundary layer separation and minimizes drag coefficient across varying Reynolds numbers.',
        ieeeCompliant: true,
        deliverables: ['Fluent Case & Data Files', 'Pressure Distribution Plots', 'Complete IEEE Paper', 'Viva Prep']
      }
    ]
  },
  Civil: {
    label: 'Civil Engineering',
    description: 'Structural Analysis (ETABS), BIM Modeling, Green Concrete Materials, and GIS Hydrology.',
    ideas: [
      {
        title: 'IoT Structural Health Monitoring of Bridges using Strain & Vibration Telemetry',
        domain: 'Smart Infrastructure',
        techStack: ['ESP32', 'Piezoelectric Accelerometer', 'Cloud IoT', 'ETABS'],
        description: 'Real-time resonant modal frequency analysis to detect micro-cracks and structural fatigue before catastrophic failure.',
        ieeeCompliant: true,
        deliverables: ['Sensor Deployment Schematics', 'Cloud Dashboard', 'Structural Engineering Report', 'Viva PPT']
      },
      {
        title: 'Seismic Performance Evaluation of Multi-Storey Building with Base Isolators',
        domain: 'Earthquake Engineering',
        techStack: ['ETABS', 'SAP2000', 'Non-linear Time History Analysis'],
        description: 'Compares inter-storey drift and base shear in Zone V earthquake conditions with lead-rubber bearing dampers.',
        ieeeCompliant: true,
        deliverables: ['ETABS Model (.edb)', 'Bending Moment & Shear Envelopes', 'Comprehensive Thesis', 'Viva Deck']
      },
      {
        title: 'Sustainable Geopolymer Concrete utilizing Industrial Fly Ash and Slag',
        domain: 'Materials & Green Construction',
        techStack: ['Compressive Testing', 'Mix Design', 'SEM Characterization'],
        description: 'Zero-cement binder formulation achieving 45 MPa 28-day compressive strength with 70% lower carbon footprint.',
        ieeeCompliant: true,
        deliverables: ['Mix Proportion Ratios', 'Strength Test Comparison Data', 'Project Documentation', 'Viva Guide']
      }
    ]
  },
  ArtsAndScience: {
    label: 'Arts & Science / Polytechnic',
    description: 'Computational Physics, Bioinformatics, Fintech Analytics, Business Intelligence, and Web Portals.',
    ideas: [
      {
        title: 'Genomic Sequence Alignment and Mutation Hotspot Predictor',
        domain: 'Bioinformatics / Data Science',
        techStack: ['Python', 'Biopython', 'BLAST API', 'Streamlit', 'Pandas'],
        description: 'Interactive web platform analyzing DNA/RNA FASTA sequences for genetic mutation variants and oncology markers.',
        ieeeCompliant: true,
        deliverables: ['Python Pipeline', 'Web Interface', 'Research Project Thesis', 'Viva Presentation']
      },
      {
        title: 'Autonomous Algorithmic Trading & Portfolio Optimizer',
        domain: 'FinTech & Mathematics',
        techStack: ['Python', 'Monte Carlo Simulation', 'QuantConnect', 'React'],
        description: 'Implements Modern Portfolio Theory (Markowitz efficient frontier) with automated backtesting and risk assessment.',
        ieeeCompliant: true,
        deliverables: ['Algorithm Scripts', 'Backtest Performance Logs', 'Project Report', 'Viva Q&A Deck']
      },
      {
        title: 'Multi-Vendor Hyperlocal Artisan E-Commerce Platform',
        domain: 'Web & Mobile Applications',
        techStack: ['React', 'Node.js', 'MongoDB', 'Stripe/Razorpay', 'Tailwind'],
        description: 'Full-stack marketplace with real-time inventory tracking, vendor payouts, and dynamic courier dispatch integration.',
        ieeeCompliant: true,
        deliverables: ['Complete Web App', 'API Documentation (Postman)', 'Project Report (Anna Univ Format)', 'Viva Guide']
      }
    ]
  }
};

export const SERVICES = {
  projects: [
    {
      id: 'final-year',
      title: 'Final-Year Projects',
      tagline: 'Comprehensive, flawless projects with 100% academic acceptance',
      description: 'End-to-end engineering & polytechnic capstone solutions. We build working software, IoT hardware, simulation models, and train you line-by-line so you ace every faculty review.',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
      badge: 'All degree',
      features: ['Full working source code & hardware', 'Plagiarism-free thesis & report', 'Complete viva preparation & code walkthrough', '100% execution guarantee on your laptop']
    },
    {
      id: 'mini-projects',
      title: 'Mini Projects',
      tagline: 'Semester-ready fast turnaround with verified working code',
      description: 'Need a working mini-project in 48-72 hours? We provide rapid, polished projects across Web, Mobile, IoT, Embedded, and Machine Learning tailored to your syllabus.',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
      badge: '2nd & 3rd Year',
      features: ['Instant project setup & execution', 'Clean, comment-annotated code', 'Synopsis, abstract & mini report included', 'Budget-friendly pricing for students']
    },
    {
      id: 'web-app-ai-dev',
      title: 'Web, App & AI Development',
      tagline: 'Production-grade software using modern frameworks',
      description: 'React, Next.js, Flutter, React Native, Python FastAPI, TensorFlow, PyTorch, Node.js, and cloud backends built with clean architecture and responsive UI.',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
      badge: 'Full Stack',
      features: ['Modern tech stack (React / Flutter / FastAPI)', 'Responsive design across all devices', 'Cloud deployment (Vercel / AWS / Firebase)', 'Complete Git repository & README']
    },
    {
      id: 'documentation-ppt',
      title: 'Documentation, PPT & Report Design',
      tagline: 'Anna University & college template compliant documentation',
      description: 'Zero headache documentation. Formatted exactly per your college guidelines with standard margins, index, literature review, UML diagrams, test cases, and high-impact presentation decks.',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80',
      badge: 'Academic Standard',
      features: ['Turnitin plagiarism under 10%', 'Professional slide decks with animations', 'UML, ER diagrams & architecture charts', 'Hard-bound book formatting ready']
    },
    {
      id: 'viva-prep',
      title: 'Viva & Review Guidance',
      tagline: 'Confidence and deep understanding to answer external examiners',
      description: 'One-on-one virtual coaching to master your project architecture, code execution, algorithm rationale, and expected examiner cross-examination questions.',
      image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80',
      badge: '1-on-1 Coaching',
      features: ['Exhaustive 100+ Q&A viva cheat sheet', 'Mock viva sessions before review day', 'Live troubleshooting support', 'Confidence building & presentation tips']
    },
    {
      id: 'portfolio-sites',
      title: 'Student Portfolio Websites',
      tagline: 'Stand out in campus placements and off-campus interviews',
      description: 'Sleek, award-level personal portfolio websites featuring 3D interactions, live project demonstrations, downloadable resume, and contact forms to impress recruiters.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
      badge: 'Career Accelerator',
      features: ['Custom domain (.dev / .me) setup', 'Integrated live project demos', 'SEO & mobile optimized', 'Free lifetime hosting on Vercel/Netlify']
    }
  ],
  media: [
    {
      id: 'video-editing',
      title: 'Video Editing & Cinematic Reels',
      tagline: 'High-retention editing for creators, brands & college events',
      description: 'Pacing that hooks viewers in 2 seconds. Seamless transitions, sound design, SFX, viral subtitles, and color grading tuned for Instagram, YouTube, and event LED screens.',
      image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80',
      badge: '4K Ultra HD',
      features: ['Viral Instagram Reels & YouTube Shorts', 'College symposium promo teasers', 'Color grading in DaVinci Resolve', 'Custom sound design & audio mastering']
    },
    {
      id: 'posters-banners',
      title: 'Poster & Banner Design',
      tagline: 'Striking visuals that command attention and boost event footfall',
      description: 'High-resolution posters for college symposiums, tech fests, conferences, hackathons, DJ nights, and corporate roll-up flex banners with zero pixelation.',
      image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=1200&q=80',
      badge: 'Print & Digital',
      features: ['300 DPI print-ready CMYK & RGB', 'Social media sizes (1:1, 9:16, 16:9)', 'Custom 3D typography & illustration', 'Ultra-fast 24h delivery available']
    },
    {
      id: 'logo-brand-design',
      title: 'Logo & Brand Identity',
      tagline: 'Signature copper, luxury, and modern brand aesthetic',
      description: 'Distinctive vector brand identities, brand style manuals, custom typography, stationery, and business presentation templates that position your brand as industry leaders.',
      image: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=1200&q=80',
      badge: 'Vector AI / SVG',
      features: ['Original vector marks & wordmarks', 'Brand color palettes & typography guide', 'Favicons & social media kit', 'Full commercial copyright ownership']
    },
    {
      id: 'social-media-management',
      title: 'Social Media Management',
      tagline: 'Grow your brand with creative social media strategies',
      description: 'Complete social media management, engaging content creation, promotional posters, reels, captions, content planning, and consistent brand-focused posting across social platforms.',
      image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80',
      badge: 'Social Media Growth',
      features: ['Social media content planning & scheduling',
    'Creative posts, posters & reels',
    'Captions, hashtags & engagement strategies',
    'Brand promotion & profile management']
    },
  ]
};

export const WORK_ITEMS = [
  {
    id: 'work-1',
    title: 'Pulse 2025 National Symposium',
    category: 'Posters',
    image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=1200&q=80',
    video: 'https://assets.mixkit.co/videos/preview/mixkit-abstract-laser-lights-background-animation-41484-large.mp4',
    client: 'Engineering College Fest',
    tags: ['Graphic Design', 'Print Media', 'Typography']
  },
  {
    id: 'work-2',
    title: 'Autonomous Drone Precision Agrotech',
    category: 'Projects',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
    video: 'https://assets.mixkit.co/videos/preview/mixkit-circuit-board-with-moving-electrons-41315-large.mp4',
    client: 'Final Year ECE Team',
    tags: ['IoT', 'Embedded AI', 'IEEE 2025']
  },
  {
    id: 'work-3',
    title: 'Metallic 3D Crown Logo Reveal',
    category: '3D',
    image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80',
    video: 'https://assets.mixkit.co/videos/preview/mixkit-gold-particles-moving-in-the-dark-40919-large.mp4',
    client: '3 Sixtey Signature',
    tags: ['Blender 3D', 'Raytracing', 'Metallic Shader']
  },
  {
    id: 'work-4',
    title: 'Viral Hackathon Promo Reel',
    category: 'Videos',
    image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80',
    video: 'https://assets.mixkit.co/videos/preview/mixkit-dj-mixing-music-at-a-nightclub-43306-large.mp4',
    client: 'Tech Fest Committee',
    tags: ['Premiere Pro', 'Sound Design', '9:16 Vertical']
  },
  {
    id: 'work-5',
    title: 'AI Multi-Modal Medical X-Ray Classifier',
    category: 'Projects',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
    video: 'https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-screens-with-graphs-and-data-31913-large.mp4',
    client: 'CSE Final Year Team',
    tags: ['PyTorch', 'React', 'Explainable AI']
  },
  {
    id: 'work-6',
    title: 'Exploded Mechanical Gear Assembly',
    category: '3D',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    video: 'https://assets.mixkit.co/videos/preview/mixkit-futuristic-robotic-arm-moving-in-a-laboratory-41487-large.mp4',
    client: 'Mechanical Capstone',
    tags: ['SolidWorks', 'Cinema 4D', 'Animation']
  },
  {
    id: 'work-7',
    title: 'Inter-College Esports Championship Poster',
    category: 'Posters',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80',
    video: 'https://assets.mixkit.co/videos/preview/mixkit-glowing-digital-network-lines-41308-large.mp4',
    client: 'Youth Sports League',
    tags: ['Photoshop', 'Neon Glitch', 'Poster']
  },
  {
    id: 'work-8',
    title: 'Brand Launch & Commercial Showreel',
    category: 'Videos',
    image: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=1200&q=80',
    video: 'https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-video-editor-working-with-software-43407-large.mp4',
    client: 'Creative Startup',
    tags: ['Color Grading', 'After Effects', '4K Commercial']
  }
];

export const MARQUEE_TOOLS = [
  { name: 'Premiere Pro', category: 'Media' },
  { name: 'After Effects', category: 'Motion' },
  { name: 'Blender 3D', category: '3D' },
  { name: 'Photoshop', category: 'Design' },
  { name: 'Illustrator', category: 'Vector' },
  { name: 'React', category: 'Development' },
  { name: 'TypeScript', category: 'Code' },
  { name: 'Python', category: 'AI/ML' },
  { name: 'PyTorch', category: 'Deep Learning' },
  { name: 'OpenCV', category: 'Computer Vision' },
  { name: 'ESP32 / Arduino', category: 'IoT' },
  { name: 'MATLAB Simulink', category: 'Simulation' },
  { name: 'ANSYS FEA', category: 'Engineering' },
  { name: 'ETABS', category: 'Structural' },
  { name: 'Tailwind CSS', category: 'UI/UX' },
  { name: 'Firebase', category: 'Cloud' },
];

export const STATS = [
  { label: 'Projects Delivered', value: 380, suffix: '+', description: 'Across CSE, ECE, EEE, Mech, Civil & IT' },
  { label: 'Happy Students', value: 920, suffix: '+', description: 'From premier engineering & polytechnic colleges' },
  { label: 'Videos & Reels Edited', value: 450, suffix: '+', description: 'Viral reels, teasers, and brand films' },
  { label: 'Academic Acceptance', value: 100, suffix: '%', description: 'Zero rejections in college reviews and viva' }
];

export const HOW_IT_WORKS = [
  {
    step: '01',
    title: 'Share Your Requirement',
    description: 'Reach out via WhatsApp or call. Tell us your college, department, project title or topic idea, submission deadline, or media brief.'
  },
  {
    step: '02',
    title: 'Get Custom Quote & Roadmap',
    description: 'We review your syllabus guidelines, provide guaranteed feasibility, deliverable timelines, and transparent student-friendly pricing.'
  },
  {
    step: '03',
    title: 'We Build & Guide',
    description: 'Our senior engineers develop clean code, simulate models, and format your complete thesis while keeping you updated with live progress videos.'
  },
  {
    step: '04',
    title: 'Live Execution & Viva Defense',
    description: 'We run the project live on your laptop via remote desktop, deliver hard-bound docs and PPT, and coach you one-on-one for review success.'
  }
];

export const FAQS = [
  {
    q: 'Will you run the project on my laptop before college submission?',
    a: 'Yes, 100%. We provide a full remote setup (via AnyDesk/TeamViewer/Google Meet) where we install all compilers, dependencies, libraries, and run the project live on your system. We also record a dedicated walkthrough video for you.'
  },
  {
    q: 'Do you provide complete documentation, PPT, and thesis reports?',
    a: 'Absolutely. We provide complete college-format documentation with zero plagiarism (Turnitin certified), system architecture diagrams, UML diagrams, test cases, and a sleek presentation deck formatted to Anna University or your university template.'
  },
  {
    q: 'What if our project guide asks unexpected questions during review?',
    a: 'We provide an exhaustive Viva Defense Q&A guide with 100+ questions covering code logic, algorithm mechanics, limitations, and future enhancements. Furthermore, we conduct a mock viva coaching call before your final review.'
  },
  {
    q: 'How fast can you deliver urgent mini projects or video editing?',
    a: 'For urgent requirements, we have express 24-hour and 48-hour delivery options for verified mini projects, event posters, and promotional reels.'
  },
  {
    q: 'What media services do you provide for college symposiums and clubs?',
    a: 'We craft complete event packages: high-impact print posters, animated social media flyers, Instagram teaser reels with trending music, countdown motion graphics, LED backdrop video loops, and custom cinematic logo reveals.'
  },
  {
    q: 'How do payments work for college students?',
    a: 'We offer student-friendly milestone payments. You start with an initial token advance, see live progress demos at intermediate review stages, and pay the remaining balance only upon complete satisfaction and live execution.'
  }
];
