import {
  Trees,
  HardHat,
  Factory,
  Cpu,
  Stethoscope,
  Briefcase
} from 'lucide-react';

export const sectorsData = [
  {
    id: "agriculture",
    name: "Agriculture & Forestry",
    icon: Trees,
    desc: "Cybersecurity and tech compliance for agricultural and forestry operations.",
    services: [
      { id: "agricultural-or-forestry", name: "Agricultural or Forestry", description: "Specialized solutions for large-scale agricultural and forestry operations." },
      { id: "crop-products", name: "Crop Products", description: "Secure supply chain tracking and data protection for crop products." }
    ]
  },
  {
    id: "construction",
    name: "Construction & Civil Works",
    icon: HardHat,
    desc: "Comprehensive civil construction, infrastructure, and engineering works.",
    services: [
      { id: "civil-construction-goods", name: "Civil Construction Goods", description: "Securing the procurement and supply chain of construction goods." },
      { id: "civil-works", name: "Civil Works", description: "General civil works protection and infrastructure compliance." },
      { id: "civil-works-bridges", name: "Civil Works - Bridges", description: "Security audits for bridge construction and infrastructure networks." },
      { id: "civil-works-buildings", name: "Civil Works - Buildings", description: "Smart building security and smart-grid integration compliance." },
      { id: "civil-works-canal", name: "Civil Works - Canal", description: "Critical infrastructure protection for canal and water management." },
      { id: "civil-works-lift-irrigation-scheme", name: "Civil Works - Lift Irrigation Scheme", description: "SCADA system security for large scale irrigation systems." },
      { id: "civil-works-others", name: "Civil Works - Others", description: "Miscellaneous civil works infrastructure protection." },
      { id: "civil-works-roads", name: "Civil Works - Roads", description: "Traffic management system and road network cybersecurity." },
      { id: "civil-works-water-works", name: "Civil Works - Water Works", description: "Water treatment plant ICS/SCADA vulnerability management." },
      { id: "composite-works", name: "Composite Works", description: "Integrated security for composite engineering and works." },
      { id: "construction-works", name: "Construction Works", description: "On-site network security and access control for construction zones." },
      { id: "crane-services", name: "Crane Services", description: "IoT security for smart cranes and heavy lifting machinery." },
      { id: "paint-enamel-works", name: "Paint / Enamel Works", description: "Secure supply chain tracking for paint and enamel works." },
      { id: "pipe-laying-works", name: "Pipe Laying Works", description: "Infrastructure compliance and IoT monitoring for pipe laying works." },
      { id: "pipes-and-pipe-related-activities", name: "Pipes and Pipe related activities", description: "Pipeline network security and telemetry data protection." },
      { id: "power-energy-projects-product", name: "Power/Energy Projects/Product", description: "Critical infrastructure cybersecurity for energy grid projects." },
      { id: "road-works", name: "Road Works", description: "Smart highway and road network infrastructure security." },
      { id: "solar-street-lights", name: "Solar Street Lights", description: "IoT network security for automated smart street lighting systems." },
      { id: "stone-works", name: "Stone Works", description: "Logistics tracking and data protection for masonry and stone works." },
      { id: "street-lighting", name: "Street Lighting", description: "Municipal grid integration compliance and security for street lighting." },
      { id: "supply-and-erection", name: "Supply and Erection", description: "Secure data management for construction supply and erection processes." },
      { id: "supply-erection-and-commissioning", name: "Supply, Erection and Commissioning", description: "End-to-end site security and audit for erection and commissioning." },
      { id: "water-equipments-meter-drilling-boring", name: "Water Equipments/ Meter/ Drilling/ Boring", description: "Smart water meter IoT security and drilling asset protection." },
      { id: "water-supply", name: "Water Supply", description: "SCADA and municipal water supply infrastructure protection." }
    ]
  },
  {
    id: "manufacturing",
    name: "Manufacturing & Industrial",
    icon: Factory,
    desc: "Securing industrial control systems and manufacturing supply chains.",
    services: [
      { id: "bearings", name: "Bearings", description: "Data protection for precision engineering and bearing manufacturing." },
      { id: "chemicals-minerals", name: "Chemicals/Minerals", description: "Safety and security compliance for chemical and mineral processing." },
      { id: "iron-steel-materials", name: "Iron/Steel Materials", description: "Industrial security for heavy metallurgy and steel production." },
      { id: "machineries", name: "Machineries", description: "Firmware analysis and security for heavy machinery." },
      { id: "mechanical-engineering-items", name: "Mechanical Engineering Items", description: "IP protection and secure manufacturing for mechanical components." },
      { id: "metal-fabrication", name: "Metal Fabrication", description: "Network isolation and monitoring for automated fabrication facilities." },
      { id: "mining", name: "Mining", description: "Remote site network security and operational technology protection." },
      { id: "pumps-motors", name: "Pumps/Motors", description: "Embedded device security for industrial pumps and motors." },
      { id: "scrap-disposables", name: "Scrap/Disposables", description: "Secure tracking and logistics for industrial scrap management." },
      { id: "textile", name: "Textile", description: "Data security and compliance for automated textile manufacturing operations." }
    ]
  },
  {
    id: "information-technology",
    name: "Information Technology & Electronics",
    icon: Cpu,
    desc: "Advanced threat protection for hardware and IT service providers.",
    services: [
      { id: "computer-hw", name: "Computer- H/W", description: "Supply chain security and hardware vulnerability assessments." },
      { id: "electronics-equipment", name: "Electronics Equipment", description: "IoT and embedded device security testing." },
      { id: "information-technology", name: "Information Technology", description: "Comprehensive IT infrastructure and cloud security." },
      { id: "info-tech-services", name: "Info. Tech. Services", description: "Managed security services and secure IT service delivery." },
      { id: "network-communication-equip", name: "Network /Communication Equip", description: "Vulnerability analysis and perimeter security for network communication hardware." },
      { id: "security-system", name: "Security System", description: "Penetration testing and auditing of deployed physical security systems." }
    ]
  },
  {
    id: "healthcare",
    name: "Medical & Healthcare",
    icon: Stethoscope,
    desc: "Securing patient data, medical devices, and HIPAA compliance.",
    services: [
      { id: "consumables-hospital-lab", name: "Consumables (Hospital / Lab)", description: "Secure tracking and procurement for medical consumables." },
      { id: "medical-equipments-waste", name: "Medical Equipments/Waste", description: "IoMT (Internet of Medical Things) security and waste tracking compliance." },
      { id: "medicines", name: "Medicines", description: "Pharmaceutical supply chain security and anti-counterfeiting systems." },
      { id: "public-health-products", name: "Public Health Products", description: "Regulatory compliance and data protection for public health product manufacturing." }
    ]
  },
  {
    id: "general-services",
    name: "General Services & Miscellaneous",
    icon: Briefcase,
    desc: "Tailored security solutions for various service industries.",
    services: [
      { id: "consultancy", name: "Consultancy", description: "Secure communication and client data protection for consultancy firms." },
      { id: "electrical-work-equipment", name: "Electrical Work/ Equipment", description: "Smart grid and electrical equipment cybersecurity." },
      { id: "electrical-works", name: "Electrical Works", description: "Infrastructure protection for electrical grid works." },
      { id: "fire-safety", name: "Fire & Safety", description: "Securing automated fire detection and suppression networks." },
      { id: "food-products", name: "Food Products", description: "Food supply chain and processing plant operational security." },
      { id: "hotel-catering", name: "Hotel/ Catering", description: "Guest data protection and secure payment processing for hospitality." },
      { id: "housekeeping-cleaning", name: "Housekeeping/ Cleaning", description: "Vendor risk management and access control." },
      { id: "manpower-supply", name: "Manpower Supply", description: "Secure HR data processing and employee record protection." },
      { id: "miscellaneous", name: "Miscellaneous", description: "Customized security assessments for unique operations." },
      { id: "miscellaneous-services", name: "Miscellaneous Services", description: "Broad-spectrum cybersecurity for specialized services." },
      { id: "miscellaneous-works", name: "Miscellaneous Works", description: "On-demand security consulting for unclassified works." },
      { id: "photostat-services", name: "Photostat services", description: "Data security and network isolation for commercial photostat hubs." },
      { id: "repair-and-maintenance-servic", name: "Repair and Maintenance Servic", description: "Vendor remote access security for maintenance personnel." },
      { id: "repair-and-maintenance-works", name: "Repair and Maintenance Works", description: "On-site security protocols for facility maintenance and repair operations." },
      { id: "shipping-transportation-vehi", name: "Shipping/ Transportation/ Vehi", description: "Fleet tracking and maritime cybersecurity solutions." },
      { id: "solid-waste-management", name: "Solid Waste Management", description: "Smart city compliance and IoT security for solid waste management systems." },
      { id: "stationery", name: "Stationery", description: "Supply chain security and vendor portal protection for stationery suppliers." },
      { id: "supply-of-materials", name: "Supply of Materials", description: "Procurement system hardening and fraud detection for material supply." },
      { id: "support-maintenance-service", name: "Support/Maintenance Service", description: "Secure helpdesk infrastructure and IT support maintenance security." },
      { id: "survey", name: "Survey", description: "Data protection and secure storage for geographic and topographical surveys." },
      { id: "survey-and-investigation-services", name: "Survey and Investigation services", description: "Encrypted evidence storage and intelligence platform security." },
      { id: "vehicles-vehicle-spares", name: "Vehicles/Vehicle Spares", description: "Automotive supply chain cybersecurity and connected vehicle data protection." }
    ]
  }
];
