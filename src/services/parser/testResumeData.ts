import { CanonicalProfile } from '../../types/profile';

/**
 * Standard Comprehensive Test Resume Dataset
 * Used to test and validate all 24 visual website templates.
 * Contains 3 experiences, 3 education records, 18 categorized skills,
 * 4 deep projects, 3 certifications, 3 achievements, publications & services.
 */
export const COMPREHENSIVE_TEST_RESUME: CanonicalProfile = {
  personal: {
    name: 'Sarah Chen-Vanderbilt',
    professionalTitle: 'Principal Systems Architect & AI Engineer',
    headline: 'Architecting distributed ultra-low latency platforms and autonomous frontier AI inference engines.',
    email: 'sarah.chen@zenithexample.com',
    phone: '+1 (415) 890-4321',
    location: 'San Francisco, CA & Remote',
    website: 'https://sarahchen.engineering',
    profileImage: null,
    bio: 'Systems architect and full-stack technologist with 8+ years designing high-throughput distributed engines, edge AI models, and fault-tolerant infrastructure serving 40M+ monthly active requests.',
    openToWork: true,
    targetRoles: ['Principal Architect', 'Staff Software Engineer', 'Head of AI Engineering']
  },
  summary: 'Principal Systems Architect & AI Engineer with extensive experience across distributed consensus, GPU acceleration, and reactive web applications.',
  whatIBuild: [
    {
      id: 'wib_1',
      number: '01',
      title: 'High-Throughput Streaming Engines',
      description: 'Distributed event processing pipelines delivering sub-5ms p99 latency across cross-regional clusters.',
      tags: ['Rust', 'Kafka', 'Go', 'gRPC']
    },
    {
      id: 'wib_2',
      number: '02',
      title: 'Frontier AI & Edge Inference',
      description: 'Quantized LLM deployment and real-time vision pipelines running on heterogeneous hardware.',
      tags: ['PyTorch', 'ONNX', 'CUDA', 'TypeScript']
    },
    {
      id: 'wib_3',
      number: '03',
      title: 'Full-Stack Modern Platforms',
      description: 'Reactive web applications built with TypeScript, micro-frontends, and accessible design systems.',
      tags: ['React', 'Next.js', 'Tailwind', 'GraphQL']
    }
  ],
  education: [
    {
      id: 'edu_1',
      institution: 'Stanford University',
      degree: 'Master of Science in Computer Science',
      field: 'Distributed Systems & Machine Learning',
      startDate: '2019',
      endDate: '2021',
      grade: '3.94 GPA',
      location: 'Stanford, CA',
      coursework: ['Advanced Distributed Systems', 'Deep Multi-Task Learning', 'Operating Systems Principles'],
      highlights: ['Graduate Teaching Assistant for CS244B Distributed Systems', 'Dean’s Honor List']
    },
    {
      id: 'edu_2',
      institution: 'University of California, Berkeley',
      degree: 'Bachelor of Science in Electrical Engineering & Computer Science',
      field: 'Computer Science & Software Architecture',
      startDate: '2015',
      endDate: '2019',
      grade: '3.88 GPA · Magna Cum Laude',
      location: 'Berkeley, CA',
      coursework: ['Data Structures & Algorithms', 'Database System Implementation', 'Computer Networks'],
      highlights: ['President of Open Source Software Society', 'Upsilon Pi Epsilon Honor Society']
    },
    {
      id: 'edu_3',
      institution: 'MIT Professional Education',
      degree: 'Post-Graduate Professional Certificate',
      field: 'Quantum Computing & Advanced Algorithmic Complexity',
      startDate: '2022',
      endDate: '2023',
      grade: 'Distinction',
      location: 'Cambridge, MA (Hybrid)',
      coursework: ['Quantum Algorithms', 'Cryptographic Security Verification']
    }
  ],
  experience: [
    {
      id: 'exp_1',
      company: 'AetherScale Technologies',
      role: 'Principal Systems Architect',
      location: 'San Francisco, CA',
      startDate: '2022',
      endDate: 'Present',
      current: true,
      description: 'Lead engineering architect directing a 24-person platform team building next-generation distributed transaction routers and edge intelligence services.',
      highlights: [
        'Architected real-time routing mesh reducing p99 API latency from 48ms to 7.2ms at 250,000 req/sec.',
        'Spearheaded zero-trust multi-region cluster migration on AWS & GCP, saving $1.4M in annual compute spend.',
        'Mentored 12 senior engineers and authored foundational platform RFCs adopted company-wide.'
      ],
      technologies: ['Rust', 'Go', 'Kubernetes', 'Apache Kafka', 'PostgreSQL', 'TypeScript']
    },
    {
      id: 'exp_2',
      company: 'Helix Labs AI',
      role: 'Senior Staff ML & Platform Engineer',
      location: 'Palo Alto, CA',
      startDate: '2020',
      endDate: '2022',
      current: false,
      description: 'Owned the core model inference orchestration layer and developer tooling pipeline for generative foundation models.',
      highlights: [
        'Engineered an asynchronous tensor caching layer in C++ and Python boosting model inference speed by 3.8x.',
        'Built automated canary evaluation pipelines testing 40+ model checkpoints daily against gold benchmarks.',
        'Integrated WebSockets and Server-Sent Events enabling smooth token streaming across 4M active clients.'
      ],
      technologies: ['Python', 'PyTorch', 'TensorRT', 'Docker', 'Redis', 'React', 'FastAPI']
    },
    {
      id: 'exp_3',
      company: 'NextGen Cloud Systems',
      role: 'Software Engineer II (Full-Stack)',
      location: 'San Jose, CA',
      startDate: '2018',
      endDate: '2020',
      current: false,
      description: 'Full-stack development for high-availability enterprise observability dashboards and automated incident management tools.',
      highlights: [
        'Rewrote core metrics visualization dashboard in React and WebGL, rendering 100,000 datapoints at 60 FPS.',
        'Designed microservice orchestration pipelines handling automated rollback upon synthetic test failure.'
      ],
      technologies: ['TypeScript', 'React', 'Node.js', 'GraphQL', 'Docker', 'Jest']
    }
  ],
  projects: [
    {
      id: 'proj_1',
      slug: 'zenith-vortex-mesh',
      name: 'VortexMesh: Autonomous Distributed Service Mesh',
      tagline: 'Sub-millisecond p99 proxy and adaptive telemetry router',
      category: 'systems',
      description: 'An ultra-lightweight service mesh engine written in Rust and eBPF that dynamically balances inter-service gRPC traffic with zero kernel context switches.',
      problem: 'Legacy Envoy sidecars introduced 18ms latency overhead per hop in dense container clusters.',
      solution: 'Engineered an eBPF kernel-bypass transport layer with automated circuit breaking and live topology heatmaps.',
      role: 'Creator & Lead Architect',
      technologies: ['Rust', 'eBPF', 'gRPC', 'WebAssembly', 'Prometheus', 'React'],
      startDate: '2024',
      endDate: '2025',
      github: 'https://github.com/example/vortex-mesh',
      liveUrl: 'https://vortexmesh.dev',
      features: [
        'Kernel bypass traffic interception with 0.8ms overhead',
        'Hot-reloadable WASM security inspection filters',
        'Interactive real-time 3D node topology graph'
      ],
      keyMetrics: ['4.2x Throughput Gain', '< 1ms Overhead', '100% Zero-Loss Failover'],
      featured: true,
      interactiveType: 'standard'
    },
    {
      id: 'proj_2',
      slug: 'neural-flow-copilot',
      name: 'NeuralFlow: Local LLM Orchestration Engine',
      tagline: 'Private on-device model routing with speculative decoding',
      category: 'ai',
      description: 'A developer-first local AI platform capable of running quantized 70B models with instant speculative token generation, private memory vector store, and VS Code companion.',
      problem: 'Enterprise developers lacked a private, lightning-fast on-device copilot compliant with strict privacy regulations.',
      solution: 'Constructed an optimized Metal/CUDA quantized execution engine coupled with hierarchical RAG memory indexing.',
      role: 'Sole Developer',
      technologies: ['PyTorch', 'C++', 'CUDA', 'Python', 'TypeScript', 'TailwindCSS'],
      startDate: '2024',
      endDate: 'Present',
      github: 'https://github.com/example/neural-flow',
      liveUrl: 'https://neuralflow.ai',
      features: [
        'Hybrid GPU/CPU offloading with 4-bit AWQ quantization',
        'Local SQLite-Vec embedding index with semantic reranking',
        'Clean responsive desktop and mobile web interface'
      ],
      keyMetrics: ['120 tokens/sec', '100% Client-Side Privacy', '8.4k GitHub Stars'],
      featured: true,
      interactiveType: 'ai'
    },
    {
      id: 'proj_3',
      slug: 'hyper-canvas-os',
      name: 'HyperCanvas: Spatial Engineering Workspace',
      tagline: 'Infinite infinite-canvas systems architecture simulator',
      category: 'web',
      description: 'A browser-based spatial computing studio for visualizing large-scale software systems, running live stress tests, and simulating cloud infrastructure failure scenarios.',
      problem: 'Static architecture diagrams in Confluence decay immediately and fail to simulate cascade outage conditions.',
      solution: 'Built an infinite WebGL canvas where system blocks run live synthetic traffic simulations with interactive dials.',
      role: 'Full-Stack Creator',
      technologies: ['TypeScript', 'React', 'WebGL', 'Zustand', 'Node.js', 'WebSockets'],
      startDate: '2023',
      endDate: '2024',
      github: 'https://github.com/example/hyper-canvas',
      liveUrl: 'https://hypercanvas.design',
      features: [
        'Smooth 60 FPS zoomable infinite canvas with spatial clustering',
        'Live chaos testing injection module simulating latency spikes',
        'One-click Terraform and Kubernetes YAML export'
      ],
      keyMetrics: ['60 FPS at 10k nodes', '40k Active Engineers', 'Product Hunt #1 of the Day'],
      featured: true,
      interactiveType: 'web'
    },
    {
      id: 'proj_4',
      slug: 'pulse-guard-security',
      name: 'PulseGuard: Zero-Trust Identity Gateway',
      tagline: 'Cryptographic biometric access control & anomaly detector',
      category: 'backend',
      description: 'High-assurance OAuth2/OIDC gateway providing behavioral anomaly detection, hardware security key validation, and automated breach mitigation.',
      problem: 'Credential stuffing and session token hijacking bypassed traditional MFA mechanisms.',
      solution: 'Created an intelligent risk-scoring gateway with continuous behavioral biometrics and instant session revocation.',
      role: 'Security Architect',
      technologies: ['Go', 'Redis', 'PostgreSQL', 'WebAuthn', 'Docker', 'GraphQL'],
      startDate: '2023',
      endDate: '2023',
      github: 'https://github.com/example/pulse-guard',
      liveUrl: 'https://pulseguard.security',
      features: [
        'FIDO2 / WebAuthn hardware token enforcement',
        'Continuous ML anomaly score recalculation per HTTP request',
        'Sub-3ms authorization decision cache'
      ],
      keyMetrics: ['Zero Account Takeovers', '99.999% Gateway SLA', '25M Handshakes Daily'],
      featured: false,
      interactiveType: 'backend'
    }
  ],
  skills: {
    languages: ['TypeScript', 'Rust', 'Go', 'Python', 'C++', 'SQL', 'Bash'],
    frameworks: ['React', 'Next.js', 'Node.js', 'FastAPI', 'PyTorch', 'TailwindCSS', 'GraphQL'],
    tools: ['Kubernetes', 'Docker', 'AWS', 'GCP', 'Kafka', 'Redis', 'PostgreSQL', 'Git', 'Terraform', 'Prometheus'],
    aiMl: ['Distributed Training', 'LLM Fine-Tuning', 'Quantization (AWQ/GGUF)', 'RAG Pipelines', 'Vector Databases'],
    databases: ['PostgreSQL', 'Redis', 'ClickHouse', 'Qdrant', 'MongoDB'],
    softSkills: ['System Design Leadership', 'Engineering Mentorship', 'Cross-Functional Strategy', 'RFC Writing', 'Public Speaking'],
    all: [
      'Rust', 'TypeScript', 'Go', 'Python', 'C++', 'React', 'Next.js', 'Kubernetes',
      'Docker', 'AWS', 'Kafka', 'PyTorch', 'PostgreSQL', 'Redis', 'Distributed Systems',
      'Machine Learning', 'GraphQL', 'Terraform'
    ]
  },
  certifications: [
    {
      id: 'cert_1',
      name: 'AWS Certified Solutions Architect – Professional (SAP-C02)',
      issuer: 'Amazon Web Services',
      issueDate: '2023',
      expiryDate: '2026',
      credentialId: 'AWS-PSA-9948210',
      url: 'https://aws.amazon.com/verification'
    },
    {
      id: 'cert_2',
      name: 'Certified Kubernetes Administrator (CKA)',
      issuer: 'Cloud Native Computing Foundation (CNCF)',
      issueDate: '2022',
      expiryDate: '2025',
      credentialId: 'CKA-883921-LF',
      url: 'https://www.cncf.io/certification/cka/'
    },
    {
      id: 'cert_3',
      name: 'Stanford Deep Learning Specialization Certificate',
      issuer: 'Stanford Online / DeepLearning.AI',
      issueDate: '2021',
      credentialId: 'STF-DL-77312',
      url: 'https://deeplearning.ai'
    }
  ],
  achievements: [
    {
      id: 'ach_1',
      title: 'Global TechCrunch Disrupt Hackathon Winner',
      description: 'Awarded 1st Place overall out of 340 international teams for building an autonomous crisis response coordination network.',
      date: '2024',
      issuer: 'TechCrunch'
    },
    {
      id: 'ach_2',
      title: 'US Patent: Adaptive Microservice Topology Balancing',
      description: 'Invented a deterministic queuing model for mitigating cascading latency failures in high-volume microservice fabrics.',
      date: '2023',
      issuer: 'USPTO Patent #11,842,910'
    },
    {
      id: 'ach_3',
      title: 'Keynote Speaker at KubeCon North America',
      description: 'Presented "Scaling Rust Microservices to 10M Operations with Zero GC Spikes" to 3,500+ attendees.',
      date: '2023',
      issuer: 'Linux Foundation / CNCF'
    }
  ],
  publications: [
    {
      id: 'pub_1',
      title: 'Decentralized Microservice Load Balancing in Asynchronous Cloud Fabrics',
      publisher: 'IEEE Transactions on Cloud Computing',
      date: '2024',
      url: 'https://doi.org/10.1109/TCC.2024.09214',
      description: 'Formal mathematical analysis and production benchmarks of adaptive routing algorithms under burst load.'
    },
    {
      id: 'pub_2',
      title: 'Low-Bit Quantization Strategies for Edge LLM Inference',
      publisher: 'Conference on Neural Information Processing Systems (NeurIPS Workshop)',
      date: '2023',
      url: 'https://arxiv.org/abs/2311.08421',
      description: 'Empirical evaluation of 4-bit versus 8-bit weight matrices across diverse consumer GPU architectures.'
    }
  ],
  services: [
    {
      id: 'serv_1',
      title: 'Principal Architecture Advisory',
      description: 'Comprehensive technical review of distributed architectures, high-load bottlenecks, and cloud cost optimization.',
      technologies: ['Kubernetes', 'AWS', 'Rust', 'Kafka'],
      deliverables: ['Full Architecture Audit Report', 'Latency Optimization Roadmap', 'Cost Reduction Plan']
    },
    {
      id: 'serv_2',
      title: 'Frontier AI & LLM Systems Integration',
      description: 'End-to-end design and deployment of private on-premise or cloud LLM inference engines, RAG pipelines, and evaluation metrics.',
      technologies: ['PyTorch', 'Vector Search', 'vLLM', 'FastAPI'],
      deliverables: ['Production Inference Deployment', 'Custom RAG Pipeline', 'Safety & Benchmark Harness']
    }
  ],
  testimonials: [
    {
      id: 'test_1',
      name: 'Marcus Reynolds',
      role: 'VP of Engineering',
      company: 'AetherScale Technologies',
      content: 'Sarah is one of those rare 1-in-a-million engineers who can dive into raw kernel eBPF code at 2 AM and then present a brilliant 5-year platform roadmap to the board at 9 AM. She transformed our entire infrastructure.'
    },
    {
      id: 'test_2',
      name: 'Elena Rostova',
      role: 'Head of Product',
      company: 'Helix Labs',
      content: 'Working with Sarah was a masterclass in velocity and precision. She delivered our core streaming inference service three weeks ahead of schedule with 99.999% uptime on launch day.'
    }
  ],
  hackathons: [
    {
      id: 'hack_1',
      name: 'TechCrunch Disrupt Hackathon',
      project: 'CrisisRelay Distributed Mesh',
      award: '1st Place Grand Winner ($50,000)',
      date: '2024',
      description: 'Constructed an offline mesh network using WebRTC and Bluetooth Low Energy enabling disaster relief teams to coordinate rescue logistics without cell service.',
      technologies: ['Rust', 'WebRTC', 'TypeScript', 'React Native']
    },
    {
      id: 'hack_2',
      name: 'MIT HackNation AI Summit',
      project: 'NeuroAudit',
      award: 'Best Technical AI Architecture',
      date: '2023',
      description: 'Automated bias detection and safety hallucination mitigation harness for open-source foundation models.',
      technologies: ['Python', 'PyTorch', 'Next.js', 'FastAPI']
    }
  ],
  socialLinks: {
    github: 'https://github.com/example-sarahchen',
    linkedin: 'https://linkedin.com/in/example-sarahchen',
    twitter: 'https://twitter.com/sarahchen_dev',
    portfolio: 'https://sarahchen.engineering',
    email: 'sarah.chen@zenithexample.com'
  }
};
