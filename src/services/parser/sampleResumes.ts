export interface SampleResume {
  id: string;
  name: string;
  role: string;
  category: 'Software Engineer' | 'Student / AI' | 'Senior Fullstack' | 'Designer / Creative';
  avatarInitials: string;
  badge: string;
  rawText: string;
}

export const SAMPLE_RESUMES: SampleResume[] = [
  {
    id: 'bipin-yadav',
    name: 'Bipin Yadav',
    role: 'Software Engineer (AI & Web Systems)',
    category: 'Software Engineer',
    avatarInitials: 'BY',
    badge: 'Featured Resume',
    rawText: `BIPIN YADAV
Software Engineer | Salem, Tamil Nadu, India
Email: bipinsagarmatha321@gmail.com
LinkedIn: linkedin.com/in/bipin-yadav-dev | GitHub: github.com/bipinyadav-dev

CAREER SUMMARY
Computer Science and Engineering student at Sona College of Technology with a strong focus on Artificial Intelligence, Machine Learning, and scalable web-based systems. Passionate about engineering practical, high-impact digital solutions for real-world challenges including telemedicine, disaster forecasting, fintech, and intelligent assistants.

EDUCATION
Bachelor of Technology in Computer Science and Engineering
Sona College of Technology, Salem, Tamil Nadu, India
2023 – 2027 | CGPA: 7.8 / 10.0
Core Coursework: Artificial Intelligence, Machine Learning, Data Structures & Algorithms, Database Management Systems (DBMS), Object-Oriented Programming, Web Technologies.

TECHNICAL SKILLS
- Programming Languages: Python, C, JavaScript, Java, SQL
- AI & Machine Learning: Artificial Intelligence, Machine Learning, OpenCV, LangChain, Model Training
- Web & Backend: HTML5, CSS3, JavaScript, Flask, REST APIs
- Databases: MongoDB, Relational DBMS
- Developer Tools & Environments: VS Code, PyCharm, IntelliJ IDEA, Trae, Windsurf, UiPath, Git

KEY PROJECTS
1. AI-Powered Hospital Management and Telemedicine System (2025)
- Engineered a telemedicine platform designed to connect rural patients with qualified doctors.
- Integrated AI medical report analysis for preliminary diagnostics and patient triage.
- Implemented real-time facial recognition and accident detection modules using OpenCV and computer vision.
- Developed automated emergency SMS alerts and seamless doctor appointment booking workflows.
- Technologies: Python, Flask, OpenCV, Machine Learning, MongoDB, JavaScript.

2. AI-Based Flood Prediction and Alert System (2025)
- Developed an early flood forecasting and automated emergency alert pipeline analyzing historical hydrological data.
- Integrated OpenWeatherMap API for live real-time weather tracking, atmospheric telemetry, and precipitation trends.
- Built interactive live map visualization for high-risk flood zone detection.
- Dispatched instant emergency notifications and risk advisories to local communities.
- Technologies: Python, Machine Learning, OpenWeatherMap API, Flask, JavaScript, Mapbox.

3. AI-Powered FinTech Assistant (2025)
- Designed an intelligent financial advisory system handling banking inquiries, personal loan eligibility, and wealth planning.
- Processed live financial telemetry, market comparisons, and personalized financial product recommendations.
- Integrated LangChain and Flask for conversational context retention and secure banking query assistance.
- Technologies: Python, AI, Machine Learning, LangChain, Flask, REST APIs.

4. Jarvis-Style AI Machine Learning Assistant (2025)
- Developed a high-performance conversational AI assistant with voice/text interaction and terminal-style workflows.
- Integrated live web search retrieval and Wikipedia verification using Zenserp and SerpAPI.
- Engineered automated task execution, real-time knowledge retrieval, and modular command triggers.
- Technologies: Python, Flask, Zenserp, SerpAPI, Machine Learning, NLP.

EXPERIENCE & HACKATHON PARTICIPATION
National Hackathon Participant | MIT Chennai & Anna University (2024 – 2025)
- Participated in prestigious national hackathons including SAMHITA'25 at MIT Chennai.
- Collaborated in multi-disciplinary teams to architect AI-driven web systems under 36-hour competitive sprints.
- Spearheaded rapid API integrations, backend orchestration, and live product demonstrations for judging panels.

CERTIFICATIONS & RECOGNITIONS
- SAMHITA'25 Hackathon — MIT Chennai (2025)
- Java Course Completion Certificate — Infosys Springboard
- Srinivasa Ramanujan Mathematical Competition Award — Indian Society for Technical Education (ISTE)
- NPTEL Certification — Enhancing Communication Skills

EXTRACURRICULAR ACTIVITIES & AUTOMATION
- Robotic Process Automation (RPA) & Workflow Automation using n8n and UiPath (07/2025 – 08/2025)
- 3D Interactive Game Development using Unity (06/2025 – 08/2025)`
  },
  {
    id: 'sarah-lin',
    name: 'Sarah Lin',
    role: 'Senior Staff Software Engineer',
    category: 'Senior Fullstack',
    avatarInitials: 'SL',
    badge: 'Distributed Systems',
    rawText: `SARAH LIN
Senior Staff Software Engineer
San Francisco, CA | sarah.lin.eng@gmail.com
GitHub: github.com/sarahlin-dev | LinkedIn: linkedin.com/in/sarah-lin-staff

PROFESSIONAL SUMMARY
High-impact software engineering leader with 7+ years of experience designing resilient distributed systems, real-time data pipelines, and developer tooling at scale.

WORK EXPERIENCE
Staff Software Engineer | Stripe (2022 – Present)
- Spearheaded core payment routing orchestration processing $4.2B+ monthly gross volume across 40+ countries.
- Reduced multi-region p99 latency from 145ms to 32ms by redesigning caching topology in Go and Redis clusters.

Senior Software Engineer | Datadog (2019 – 2022)
- Built high-throughput telemetry ingestion pipelines processing 2.5M metrics/sec using Kafka and Rust.

EDUCATION
B.S. in Computer Science & Electrical Engineering | UC Berkeley (2013 – 2017) | GPA: 3.92 / 4.0`
  },
  {
    id: 'elena-rostova',
    name: 'Elena Rostova',
    role: 'Design Engineer & Creative Technologist',
    category: 'Designer / Creative',
    avatarInitials: 'ER',
    badge: 'Creative Technologist',
    rawText: `ELENA ROSTOVA
Design Engineer & Creative Technologist
Berlin, Germany | elena.design@rostova.studio
Portfolio: rostova.studio | Behance: behance.net/elenarostova

ABOUT
Specializing in 3D WebGL experiences, responsive design systems, and award-winning digital identities.

EXPERIENCE
Lead Creative Technologist | Studio Monolith (2021 – Present)
- Crafted bespoke 3D interactive web experiences winning 4 Awwwards Site of the Day and 2 FWA recognitions.

EDUCATION
Master of Arts in Interaction Design | Bauhaus-Universität Weimar (2017 – 2019)`
  }
];
