

export const allServicesData = [
  { id: 1, category: "Consulting", name: "Governance Risk and Compliance Consulting", description: "Strategic framework alignment, risk assessments, and compliance roadmap development.", icon: "Shield" },
  { id: 2, category: "Consulting", name: "Third Party Risk Management", description: "Vendor security assessments, supply chain risk mapping, and ongoing monitoring.", icon: "Briefcase" },
  { id: 3, category: "Consulting", name: "Business Continuity & Disaster Recovery", description: "Resilience planning, impact analysis, and technical recovery playbooks.", icon: "FileText" },
  { id: 4, category: "Consulting", name: "Virtual CISO Services", description: "Executive-level security leadership, strategy execution, and board reporting.", icon: "UserCheck" },
  { id: 5, category: "Consulting", name: "Cybersecurity Consulting and Advisory", description: "Holistic security architecture, maturity assessments, and capability design.", icon: "Target" },
  
  { id: 6, category: "VAPT", name: "Vulnerability Assessment & Penetration Testing", description: "Comprehensive infrastructure and application vulnerability discovery.", icon: "Crosshair" },
  { id: 7, category: "VAPT", name: "Web Application Security Testing", description: "OWASP Top 10 exploits, business logic flaws, and API vulnerability scans.", icon: "Globe" },
  { id: 8, category: "VAPT", name: "Mobile Application Security Testing", description: "Static and dynamic analysis of iOS and Android application packages.", icon: "Smartphone" },
  { id: 9, category: "VAPT", name: "Cloud Security Assessment and Testing", description: "AWS, Azure, and GCP configuration reviews and architecture hardening.", icon: "Cloud" },
  { id: 10, category: "VAPT", name: "Network & Infrastructure Security Testing", description: "Internal and external network penetration testing and pivot simulations.", icon: "Network" },
  { id: 11, category: "VAPT", name: "Wireless Security Testing", description: "WLAN cracking, rogue access point detection, and signal leakage analysis.", icon: "Wifi" },
  { id: 12, category: "VAPT", name: "Thick Client & Software Security Testing", description: "Reverse engineering, memory corruption, and privilege escalation testing.", icon: "Box" },
  { id: 13, category: "VAPT", name: "Source Code Review & Secure Code Analysis", description: "Automated SAST and manual inspection to find logic and injection flaws.", icon: "Code" },
  { id: 14, category: "VAPT", name: "Threat Modeling & Cyber Risk Assessment", description: "STRIDE methodology application and architectural weakness identification.", icon: "Target" },
  { id: 15, category: "VAPT", name: "Red, Blue, and Purple Teaming", description: "Full-scope simulated attacks, defensive tuning, and collaborative exercises.", icon: "Users" },
  { id: 16, category: "VAPT", name: "Vulnerability Management Services", description: "Continuous scanning, false-positive elimination, and patch prioritization.", icon: "ListChecks" },
  
  { id: 17, category: "SOC", name: "SOC as a Service and Managed SOC", description: "24/7/365 active monitoring, log correlation, and threat detection.", icon: "Activity" },
  { id: 18, category: "SOC", name: "Incident Response and Malware Analysis", description: "Rapid breach containment, reverse engineering, and threat eradication.", icon: "ShieldAlert" },
  { id: 19, category: "SOC", name: "Digital Forensics & Cyber Crime Investigation", description: "Disk imaging, timeline reconstruction, and legal evidence preservation.", icon: "Search" },
  { id: 20, category: "SOC", name: "Phishing & Ransomware Simulation", description: "Employee awareness testing and payload execution behavioral monitoring.", icon: "Mail" },
  { id: 21, category: "SOC", name: "Dark Web & Deep Web Monitoring", description: "Credential leak detection, VIP threat monitoring, and data sale alerts.", icon: "Eye" },
  
  { id: 22, category: "Consulting", name: "Cyber Insurance Consulting", description: "Policy requirement alignment, risk quantification, and claim preparedness.", icon: "FileCheck" },
  
  { id: 23, category: "Training", name: "Cybersecurity Talent & Staff Augmentation", description: "Vetted security engineers and analysts for short or long-term projects.", icon: "Users" },
  { id: 24, category: "Training", name: "Security Awareness & Employee Training", description: "Customized security curriculum, secure coding modules, and awareness testing.", icon: "MonitorPlay" },
  { id: 25, category: "Training", name: "Certification & Academic Programs", description: "Professional bootcamp training for CISSP, CISA, CEH, and OSCP.", icon: "GraduationCap" },
  
  { id: 26, category: "Compliance", name: "ISO 27001 Implementation & Certification", description: "ISMS policy development, risk registers, and audit readiness support.", icon: "Award" },
  { id: 27, category: "Compliance", name: "ISO 27701 Implementation & Privacy", description: "PIMS framework adoption mapped directly to global privacy regulations.", icon: "FileCheck" },
  { id: 28, category: "Compliance", name: "GDPR Compliance and Readiness", description: "Data flow mapping, DPA drafting, and European Union privacy compliance.", icon: "Globe" },
  { id: 29, category: "Compliance", name: "DPDP Act 2023 Compliance India", description: "Consent management, data fiduciary alignment, and Indian privacy law.", icon: "Scale" },
  { id: 30, category: "Compliance", name: "CCPA Compliance", description: "California consumer privacy rights implementation and opt-out flows.", icon: "CheckCircle" },
  { id: 31, category: "Compliance", name: "SOC 1 and SOC 2 Audits", description: "Trust Service Criteria mapping, gap analysis, and evidence automation.", icon: "Lock" },
  { id: 32, category: "Compliance", name: "PCI DSS Compliance", description: "Cardholder data environment scoping, remediation, and ROC preparation.", icon: "Briefcase" },
  { id: 33, category: "Compliance", name: "HIPAA Compliance", description: "ePHI security controls, privacy rules, and healthcare regulation alignment.", icon: "Activity" },
  { id: 34, category: "Compliance", name: "NIST and COBIT Compliance", description: "NIST CSF adoption, maturity scoring, and enterprise IT governance.", icon: "Target" },
  { id: 35, category: "Compliance", name: "SEBI Cyber Security Compliance", description: "Broker-dealer security frameworks and Indian stock exchange mandates.", icon: "Briefcase" },
  { id: 36, category: "Compliance", name: "RBI Cyber Security Compliance", description: "Banking sector IT frameworks, payment system audits, and SWIFT security.", icon: "Briefcase" },
  { id: 37, category: "Compliance", name: "Microsoft and Other Attestation Audits", description: "SSAE-18, ISAE 3402, and vendor-specific security attestations.", icon: "CheckCircle" },
  
  { id: 38, category: "VAPT", name: "Application Security Services", description: "DevSecOps pipeline integration, dynamic testing, and container security.", icon: "Code" },
  
  { id: 39, category: "Infrastructure", name: "Infrastructure Hardening & Security", description: "CIS benchmark deployment, OS lockdown, and secure baseline builds.", icon: "Server" },
  { id: 40, category: "Infrastructure", name: "Firewall Implementation & Management", description: "Next-gen firewall rule tuning, architecture design, and VPN configuration.", icon: "Shield" },
  { id: 41, category: "Infrastructure", name: "Endpoint Detection and Response EDR", description: "Agent deployment, behavioral rule tuning, and host-based isolation.", icon: "MonitorPlay" },
  { id: 42, category: "Infrastructure", name: "Security Information & Event Management SIEM", description: "Log parsing, use-case development, and correlation rule tuning.", icon: "Terminal" },
  { id: 43, category: "Infrastructure", name: "Data Loss Prevention DLP", description: "Data discovery, policy creation, and exfiltration blocking controls.", icon: "Database" },
  { id: 44, category: "Infrastructure", name: "Mobile Device Management MDM", description: "BYOD containerization, remote wipe policies, and conditional access.", icon: "Smartphone" },
  { id: 45, category: "Infrastructure", name: "AI Powered Privacy & Consent Management", description: "Automated cookie banners, consent registries, and preference centers.", icon: "Fingerprint" },
  { id: 46, category: "Infrastructure", name: "Consent Orchestration & Audit Trail", description: "Cryptographic logging of user opt-ins and third-party data sharing.", icon: "Key" },
  { id: 47, category: "Infrastructure", name: "Automated Data Subject Rights Handling", description: "Zero-code DSAR fulfillment, automated deletion, and access requests.", icon: "Zap" },
  { id: 48, category: "Infrastructure", name: "Data Lineage Mapping & PII Classification", description: "Automated discovery of structured and unstructured sensitive data.", icon: "Network" },
  { id: 49, category: "Infrastructure", name: "Privacy Risk Intelligence & Regulatory Monitor", description: "Real-time updates on changing global privacy laws and risk impacts.", icon: "Eye" },
  { id: 50, category: "Infrastructure", name: "Third Party Vendor Risk Scoring", description: "Automated security posture assessments and continuous risk rating.", icon: "Target" },
  
  { id: 51, category: "Compliance", name: "Compliance Reporting and Dashboards", description: "Real-time posture visibility, executive reports, and audit trails.", icon: "Activity" },
  
  { id: 52, category: "Infrastructure", name: "Zero Code API & Webhook Integrations", description: "Seamless security tool connectivity without custom engineering.", icon: "Zap" },
  { id: 53, category: "Infrastructure", name: "Data Lifecycle Management Retention & Purge", description: "Automated archiving and cryptographic shredding of expired data.", icon: "HardDrive" }
];

export const groupedServices = allServicesData.reduce((acc, curr) => {
  if (!acc[curr.category]) {
    acc[curr.category] = [];
  }
  acc[curr.category].push(curr);
  return acc;
}, {} as Record<string, typeof allServicesData>);
