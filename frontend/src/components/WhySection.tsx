import { ShieldCheck, Award, Users, Clock, Globe, Headphones } from "lucide-react";
import { useDecryptText } from "../hooks/useDecryptText";

export const WhySection = () => {
  const { displayText: cyberText, elementRef: cyberRef } = useDecryptText("Cybersecurity", 30, 3);

  return (
    <section className="py-16 sm:py-24 relative">
      <div className="container mx-auto px-4 sm:px-6 max-w-[1440px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-16">
          
          {/* Left Column */}
          <div>
            <div className="inline-flex items-center justify-start px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-[11px] font-bold uppercase tracking-wider text-blue-500 dark:text-blue-400 mb-8">
              WHY CHOOSE US
            </div>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-gray-900 dark:text-white mb-6 sm:mb-8 leading-[1.2] tracking-tight">
              Your Trusted Partner in <br />
              <span ref={cyberRef} className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400 font-extrabold">
                {cyberText || "\u00A0"}
              </span>
            </h2>
            
            <p className="text-gray-600 dark:text-gray-400 text-lg mb-12 leading-relaxed text-justify">
              At Nexavise Consulting, we don't just identify vulnerabilities—we build resilient security postures that evolve with emerging threats. Our holistic approach combines cutting-edge technology with strategic expertise.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-6 rounded-2xl bg-white dark:bg-[#0a0e14] border border-gray-200 shadow-sm dark:shadow-none dark:border-white/5 text-left flex flex-col items-start justify-start">
                <span className="text-3xl font-black text-gray-900 dark:text-gray-200 mb-2">500+</span>
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Clients Secured</span>
              </div>
              <div className="p-6 rounded-2xl bg-white dark:bg-[#0a0e14] border border-gray-200 shadow-sm dark:shadow-none dark:border-white/5 text-left flex flex-col items-start justify-start">
                <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400 mb-2">99.9%</span>
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Threat Detection</span>
              </div>
              <div className="p-6 rounded-2xl bg-white dark:bg-[#0a0e14] border border-gray-200 shadow-sm dark:shadow-none dark:border-white/5 text-left flex flex-col items-start justify-start">
                <span className="text-3xl font-black text-gray-900 dark:text-white mb-2">15+</span>
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Years Experience</span>
              </div>
            </div>
          </div>

          {/* Right Column Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Card 1 */}
            <div className="p-8 rounded-3xl bg-white dark:bg-[#0a0e14] border border-gray-200 shadow-sm dark:shadow-none dark:border-white/5 hover:border-gray-300 dark:hover:border-white/10 transition-colors">
              <div className="h-12 w-12 rounded-xl bg-gray-500/10 border border-gray-500/20 dark:bg-white/5 dark:border-white/10 flex items-center justify-center mb-6">
                <Users className="h-6 w-6 text-gray-700 dark:text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Expert Team</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                Certified security professionals with decades of combined experience across industries.
              </p>
            </div>

            {/* Card 2 */}
            <div className="p-8 rounded-3xl bg-white dark:bg-[#0a0e14] border border-gray-200 shadow-sm dark:shadow-none dark:border-white/5 hover:border-gray-300 dark:hover:border-white/10 transition-colors">
              <div className="h-12 w-12 rounded-xl bg-gray-500/10 border border-gray-500/20 dark:bg-white/5 dark:border-white/10 flex items-center justify-center mb-6">
                <Award className="h-6 w-6 text-gray-700 dark:text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Proven Track Record</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                Successfully secured enterprises across banking, healthcare, and technology sectors.
              </p>
            </div>

            {/* Card 3 */}
            <div className="p-8 rounded-3xl bg-white dark:bg-[#0a0e14] border border-gray-200 shadow-sm dark:shadow-none dark:border-white/5 hover:border-gray-300 dark:hover:border-white/10 transition-colors">
              <div className="h-12 w-12 rounded-xl bg-gray-500/10 border border-gray-500/20 dark:bg-white/5 dark:border-white/10 flex items-center justify-center mb-6">
                <Clock className="h-6 w-6 text-gray-700 dark:text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Rapid Response</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                24/7 incident response and monitoring to minimize threat exposure time.
              </p>
            </div>

            {/* Card 4 */}
            <div className="p-8 rounded-3xl bg-white dark:bg-[#0a0e14] border border-gray-200 shadow-sm dark:shadow-none dark:border-white/5 hover:border-gray-300 dark:hover:border-white/10 transition-colors">
              <div className="h-12 w-12 rounded-xl bg-gray-500/10 border border-gray-500/20 dark:bg-white/5 dark:border-white/10 flex items-center justify-center mb-6">
                <Globe className="h-6 w-6 text-gray-700 dark:text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Global Compliance</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                Expertise in international standards including GDPR, HIPAA, PCI DSS, and more.
              </p>
            </div>

            {/* Card 5 */}
            <div className="p-8 rounded-3xl bg-white dark:bg-[#0a0e14] border border-gray-200 shadow-sm dark:shadow-none dark:border-white/5 hover:border-gray-300 dark:hover:border-white/10 transition-colors">
              <div className="h-12 w-12 rounded-xl bg-gray-500/10 border border-gray-500/20 dark:bg-white/5 dark:border-white/10 flex items-center justify-center mb-6">
                <ShieldCheck className="h-6 w-6 text-gray-700 dark:text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Tailored Solutions</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                Customized security strategies aligned with your business objectives.
              </p>
            </div>

            {/* Card 6 */}
            <div className="p-8 rounded-3xl bg-white dark:bg-[#0a0e14] border border-gray-200 shadow-sm dark:shadow-none dark:border-white/5 hover:border-gray-300 dark:hover:border-white/10 transition-colors">
              <div className="h-12 w-12 rounded-xl bg-gray-500/10 border border-gray-500/20 dark:bg-white/5 dark:border-white/10 flex items-center justify-center mb-6">
                <Headphones className="h-6 w-6 text-gray-700 dark:text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Dedicated Support</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                Personal account managers and continuous support throughout engagement.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
