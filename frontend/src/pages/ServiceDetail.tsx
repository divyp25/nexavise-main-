import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Shield, Lock, Eye, Network } from "lucide-react";
import * as Icons from "lucide-react";
import { useData } from "../contexts/DataContext";
import { ScrollReveal } from "../components/ScrollReveal";
import DecryptedText from "../components/DecryptedText";

export const ServiceDetail = () => {
  const { serviceId } = useParams();
  const { allServicesData, loading } = useData();

  if (loading) return <div className="min-h-screen bg-gray-50 dark:bg-background pt-32"></div>;

  const service = allServicesData.find(s => String(s.id) === String(serviceId));

  if (!service) {
    return (
      <div className="pt-32 pb-20 min-h-screen flex flex-col items-start justify-start">
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Service Not Found</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">The requested service could not be located.</p>
        <Link to="/services" className="inline-flex items-center bg-gray-800 dark:bg-gray-200 text-white px-6 py-3 rounded-full hover:bg-gray-800 dark:bg-gray-200 transition-colors">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Services
        </Link>
      </div>
    );
  }

  const ServiceIcon = (Icons[service.icon as keyof typeof Icons] || Icons.Shield) as React.ElementType;

  const getDynamicFeatures = (s: typeof service) => {
    const categoryFlavors: Record<string, {title: string, desc: (service: typeof s) => string}[]> = {
      Consulting: [
        { title: "Strategic Roadmap Development", desc: (s) => `We analyze your current posture and build a step-by-step roadmap tailored specifically for ${s.name}.` },
        { title: "Executive Alignment", desc: (s) => `Ensure your ${s.name} initiatives align with board-level business objectives and risk appetite.` },
        { title: "Policy & Framework Design", desc: (s) => `Custom-authored policies and procedures to support sustainable ${(s.category_id || s.category || '').toLowerCase()} practices.` },
        { title: "Continuous Maturity Tracking", desc: (s) => `Ongoing evaluation of your ${s.name} maturity to ensure continuous operational improvement.` }
      ],
      VAPT: [
        { title: "Deep-Dive Vulnerability Discovery", desc: (s) => `Comprehensive scanning and manual exploitation focused on ${s.name} vectors.` },
        { title: "Zero-Day & Logic Flaw Hunting", desc: (s) => `Going beyond automated tools to find complex business logic flaws within your ${(s.category_id || s.category || '').toLowerCase()} scope.` },
        { title: "Actionable Remediation Guidance", desc: (s) => `Step-by-step technical guidance to patch vulnerabilities found during the ${s.name} engagement.` },
        { title: "Post-Remediation Verification", desc: () => `Complimentary re-testing to ensure all identified vulnerabilities are securely closed.` }
      ],
      SOC: [
        { title: "24/7 Active Threat Hunting", desc: (s) => `Continuous monitoring and threat hunting dedicated to your ${s.name} requirements.` },
        { title: "Rapid Incident Containment", desc: (s) => `Automated playbooks and expert analysts ready to isolate threats related to ${s.name} within minutes.` },
        { title: "Advanced Telemetry Analysis", desc: (s) => `Deep correlation of logs and events to detect anomalous behavior in your ${(s.category_id || s.category || '').toLowerCase()} environment.` },
        { title: "Custom Alerting Rules", desc: (s) => `Tailored detection engineering to minimize false positives for ${s.name}.` }
      ],
      Training: [
        { title: "Role-Based Curriculum", desc: (s) => `Customized ${s.name} training modules designed for specific technical and non-technical roles.` },
        { title: "Hands-on Simulation Labs", desc: (s) => `Interactive environments where teams can practice ${s.name} scenarios safely.` },
        { title: "Progress & Skill Tracking", desc: (s) => `Detailed analytics on employee performance and competency in ${(s.category_id || s.category || '').toLowerCase()}.` },
        { title: "Industry Certification Prep", desc: (s) => `Material aligned with global standards to prepare your team for ${s.name} certifications.` }
      ],
      Compliance: [
        { title: "Gap Assessment & Scoping", desc: (s) => `Initial deep-dive to identify your exact standing against ${s.name} requirements.` },
        { title: "Control Implementation", desc: (s) => `Hands-on assistance in deploying the necessary technical and administrative controls for ${(s.category_id || s.category || '').toLowerCase()}.` },
        { title: "Evidence Collection Automation", desc: (s) => `Streamlined workflows to gather and organize artifacts required for ${s.name} audits.` },
        { title: "Audit Defense & Support", desc: (s) => `Direct support and representation during your official ${s.name} certification audits.` }
      ],
      Infrastructure: [
        { title: "Secure Architecture Design", desc: (s) => `Building robust, scalable, and secure foundations for your ${s.name} initiatives.` },
        { title: "Zero-Trust Integration", desc: (s) => `Applying continuous verification principles across your ${(s.category_id || s.category || '').toLowerCase()} deployments.` },
        { title: "Automated Drift Detection", desc: (s) => `Continuous monitoring to ensure your ${s.name} configurations remain securely baselined.` },
        { title: "High-Availability Resilience", desc: (s) => `Ensuring your ${s.name} solutions are highly available and resistant to targeted attacks.` }
      ]
    };

    const flavor = categoryFlavors[s.category_id || s.category] || categoryFlavors.Consulting;
    return flavor.map(f => ({ title: f.title, desc: f.desc(s) }));
  };

  const dynamicFeatures = getDynamicFeatures(service);

  return (
    <div className="pt-24 sm:pt-32 pb-20 min-h-screen bg-gray-50 dark:bg-background transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 max-w-[1440px]">
        <Link to="/services" className="inline-flex items-center text-gray-900 dark:text-white hover:text-gray-900 dark:text-gray-200 dark:hover:text-gray-900 dark:text-gray-200 mb-8 transition-colors font-semibold">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Services
        </Link>
        
        {/* Header Section */}
        <ScrollReveal className="mb-16 bg-white dark:bg-[#0a0e14] rounded-3xl p-8 md:p-12 border border-gray-200 dark:border-white/5 shadow-lg dark:shadow-none">
          <div className="flex flex-col md:flex-row items-start gap-8">
            <div className="p-6 rounded-2xl bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-gray-200 flex-shrink-0">
              <ServiceIcon className="h-16 w-16" />
            </div>
            <div>
              <div className="text-sm font-bold text-gray-900 dark:text-gray-200 uppercase tracking-widest mb-2">{service.category_id}</div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gray-900 dark:text-white leading-tight">
                <DecryptedText text={service.name} animateOn="view" revealDirection="center" speed={100} maxIterations={20} />
              </h1>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl leading-relaxed">
                {service.description}
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Features Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Key Capabilities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {dynamicFeatures.map((feature, idx) => {
              const icons = [<Shield />, <Lock />, <Eye />, <Network />];
              return (
                <ScrollReveal
                  key={idx}
                  delay={idx * 0.1}
                  className="flex items-start gap-4 p-8 bg-white dark:bg-[#0a0e14] rounded-2xl border border-gray-200 dark:border-white/5 shadow-md dark:shadow-none hover:border-black/10 dark:border-white/10 transition-all hover:shadow-lg h-full"
                >
                  <div className="text-gray-900 dark:text-gray-200 mt-1 p-2 rounded-lg bg-gray-100 dark:bg-white/5">
                    {icons[idx % icons.length]}
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{feature.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{feature.desc}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
