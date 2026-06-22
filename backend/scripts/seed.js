const db = require('../db');

// Hardcoded initial data directly matching the frontend
const groupedServices = {
  "Consulting": [
    { name: "vCISO Advisory", description: "Executive-level security strategy without the full-time cost." },
    { name: "Risk Assessment", description: "Comprehensive evaluation of your security posture." },
    { name: "Security Architecture", description: "Designing resilient systems from the ground up." },
    { name: "M&A Due Diligence", description: "Cyber risk evaluation during mergers and acquisitions." }
  ],
  "VAPT": [
    { name: "Network Pentesting", description: "Identifying vulnerabilities in your infrastructure." },
    { name: "Web App Pentesting", description: "Deep-dive security testing for custom web applications." },
    { name: "Mobile App Testing", description: "Securing iOS and Android applications." },
    { name: "Cloud Security Review", description: "AWS, Azure, and GCP misconfiguration analysis." }
  ],
  "SOC": [
    { name: "24/7 Monitoring", description: "Continuous threat detection and alert triage." },
    { name: "Incident Response", description: "Rapid containment and eradication of active threats." },
    { name: "Threat Hunting", description: "Proactive searching for hidden adversaries." },
    { name: "Log Management", description: "Centralized logging and SIEM integration." }
  ],
  "Training": [
    { name: "Awareness Training", description: "Educating employees on phishing and social engineering." },
    { name: "Secure Coding", description: "Training developers to write secure applications." },
    { name: "Executive Briefings", description: "Cyber risk education for the C-suite and board." },
    { name: "Phishing Simulations", description: "Controlled attacks to test employee vigilance." }
  ],
  "Compliance": [
    { name: "ISO 27001", description: "Implementation and readiness for ISO certification." },
    { name: "SOC 2 Readiness", description: "Preparing your organization for SOC 2 audits." },
    { name: "GDPR/CCPA", description: "Data privacy compliance and mapping." },
    { name: "HIPAA Compliance", description: "Securing PHI and meeting healthcare regulations." }
  ],
  "Infrastructure": [
    { name: "Firewall Management", description: "Configuration and optimization of edge security." },
    { name: "Endpoint Protection", description: "Deployment and management of EDR/XDR solutions." },
    { name: "Zero Trust Architecture", description: "Implementing identity-first security models." },
    { name: "Network Segmentation", description: "Isolating critical assets to limit blast radius." }
  ]
};

const serviceCategoriesData = [
  { id: "Consulting", name: "Consulting", icon: "Briefcase", description: "Strategic framework alignment & advisory" },
  { id: "VAPT", name: "VAPT", icon: "Crosshair", description: "Comprehensive vulnerability & penetration testing" },
  { id: "SOC", name: "SOC", icon: "Activity", description: "24/7 active monitoring & incident response" },
  { id: "Training", name: "Training", icon: "GraduationCap", description: "Staff augmentation & security awareness" },
  { id: "Compliance", name: "Compliance", icon: "FileCheck", description: "ISO, GDPR, SOC 2, and regulatory frameworks" },
  { id: "Infrastructure", name: "Infrastructure", icon: "Server", description: "Hardening, EDR, SIEM & data protection" }
];

const sectorsData = [
  {
    id: "finance",
    name: "Finance & Banking",
    icon: "Landmark",
    desc: "Securing transactions and achieving PCI-DSS compliance.",
    services: [
      "Payment Gateway Pentesting",
      "PCI-DSS Compliance",
      "Swift Network Audits",
      "Fraud Detection Architecture"
    ]
  },
  {
    id: "healthcare",
    name: "Healthcare",
    icon: "HeartPulse",
    desc: "Protecting patient data and ensuring HIPAA compliance.",
    services: [
      "HIPAA Compliance Audits",
      "Medical Device Security",
      "EHR System Pentesting",
      "Telehealth Security"
    ]
  },
  {
    id: "technology",
    name: "Technology & SaaS",
    icon: "Cpu",
    desc: "Securing cloud infrastructure and agile development pipelines.",
    services: [
      "Cloud Security Posture Management",
      "DevSecOps Integration",
      "API Security Testing",
      "SOC 2 Readiness"
    ]
  },
  {
    id: "manufacturing",
    name: "Manufacturing",
    icon: "Building2",
    desc: "Protecting ICS/SCADA systems from cyber-physical threats.",
    services: [
      "OT/ICS Security Assessments",
      "Supply Chain Risk Management",
      "Network Segmentation",
      "Ransomware Resilience"
    ]
  },
  {
    id: "retail",
    name: "Retail & E-commerce",
    icon: "ShoppingCart",
    desc: "Securing customer data and high-volume transaction platforms.",
    services: [
      "E-commerce Platform Pentesting",
      "Point-of-Sale (POS) Security",
      "Customer Data Privacy (GDPR/CCPA)",
      "Seasonal Traffic DDoS Protection"
    ]
  },
  {
    id: "aviation",
    name: "Aviation & Aerospace",
    icon: "Plane",
    desc: "Securing flight systems and critical infrastructure.",
    services: [
      "Aviation Cybersecurity Guidelines (DO-326A)",
      "Airport Network Security",
      "Supply Chain Audits",
      "Physical Security Integration"
    ]
  }
];

async function seed() {
  try {
    console.log('Clearing old data...');
    await db.query('TRUNCATE TABLE services CASCADE');
    await db.query('TRUNCATE TABLE service_categories CASCADE');
    await db.query('TRUNCATE TABLE sector_services CASCADE');
    await db.query('TRUNCATE TABLE sectors CASCADE');

    console.log('Seeding Service Categories...');
    for (const cat of serviceCategoriesData) {
      await db.query(
        'INSERT INTO service_categories (id, name, icon, description) VALUES ($1, $2, $3, $4)',
        [cat.id, cat.name, cat.icon, cat.description]
      );
    }

    console.log('Seeding Services...');
    for (const [categoryName, services] of Object.entries(groupedServices)) {
      for (const svc of services) {
        await db.query(
          'INSERT INTO services (category_id, name, description, icon) VALUES ($1, $2, $3, $4)',
          [categoryName, svc.name, svc.description, 'Shield']
        );
      }
    }

    console.log('Seeding Sectors...');
    for (const sector of sectorsData) {
      await db.query(
        'INSERT INTO sectors (id, name, icon, description) VALUES ($1, $2, $3, $4)',
        [sector.id, sector.name, sector.icon, sector.desc]
      );

      console.log(`Seeding Sector Services for ${sector.name}...`);
      for (const sName of sector.services) {
        await db.query(
          'INSERT INTO sector_services (sector_id, name, description) VALUES ($1, $2, $3)',
          [sector.id, sName, '']
        );
      }
    }

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
}

seed();
