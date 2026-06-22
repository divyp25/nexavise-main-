import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowLeft, Shield, Lock, Eye, Network } from "lucide-react";
import { ScrollReveal } from "../components/ScrollReveal";
import { sectorsData } from "../lib/sectors-data";
import DecryptedText from "../components/DecryptedText";
import { CtaSection } from "../components/CtaSection";

export const SectorServiceDetail = () => {
  const { sectorId, serviceId } = useParams();

  const sector = sectorsData.find(s => s.id === sectorId);
  const service = sector?.services.find(s => s.id === serviceId);

  if (!sector || !service) {
    return <Navigate to="/sectors" replace />;
  }

  // Generate some generic robust features based on the service name
  const features = [
    {
      title: "Advanced Threat Detection",
      desc: `Continuous monitoring and threat hunting tailored to ${service.name.toLowerCase()} environments.`
    },
    {
      title: "Regulatory Compliance",
      desc: "Ensure adherence to local and international cybersecurity standards specific to your industry."
    },
    {
      title: "Zero-Trust Architecture",
      desc: "Implement strict access controls and micro-segmentation to prevent lateral movement."
    },
    {
      title: "Incident Response",
      desc: "Rapid containment and eradication protocols with an SLA-backed recovery process."
    }
  ];

  return (
    <div className="pt-24 sm:pt-32 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 max-w-[1440px]">
        <Link to={`/sectors/${sector.id}`} className="inline-flex items-center text-gray-900 dark:text-gray-200 hover:text-gray-900 dark:text-gray-200 mb-8 transition-colors font-bold text-sm tracking-wide">
          <ArrowLeft className="h-4 w-4 mr-2" /> BACK TO {sector.name.toUpperCase()}
        </Link>
        
        <ScrollReveal className="mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-[11px] font-bold uppercase tracking-wider text-gray-900 dark:text-gray-200 mb-6">
            <sector.icon className="h-4 w-4" />
            <span>{sector.name}</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 text-gray-900 dark:text-white leading-[1.1] tracking-tight">
            {service.name} <br />
            <DecryptedText text="Security Solutions" animateOn="view" revealDirection="center" speed={100} maxIterations={20} parentClassName="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-600 dark:from-gray-300 dark:to-gray-500 inline-block" />
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl leading-relaxed mb-10">
            {service.description} We offer enterprise-grade protection, continuous monitoring, and proactive defense mechanisms designed specifically for this domain.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link to="/contact" className="px-8 py-3.5 rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold text-[15px] hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors shadow-sm dark:shadow-md">
              Request a Consultation
            </Link>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2} className="mb-24">
          <h3 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white">Core Capabilities for {service.name}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, idx) => {
              const icons = [<Shield />, <Lock />, <Eye />, <Network />];
              return (
                <div
                  key={idx}
                  className="flex items-start gap-4 p-8 bg-white dark:bg-[#0a0e14] rounded-2xl border border-black/5 dark:border-white/5 shadow-sm dark:shadow-none hover:border-black/10 dark:hover:border-white/10 transition-all hover:shadow-md h-full"
                >
                  <div className="text-gray-900 dark:text-gray-200 mt-1 p-3 bg-black/5 dark:bg-white/5 rounded-xl">
                    {icons[idx % icons.length]}
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{feature.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{feature.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollReveal>
      </div>

      {/* Embedded CTA */}
      <CtaSection />
    </div>
  );
};
