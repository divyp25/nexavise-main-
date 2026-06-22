import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ShieldCheck, Award, Zap, Users, Shield, Target, Lock, CheckCircle } from "lucide-react";
import { ScrollReveal } from "../components/ScrollReveal";

import { useDecryptText } from "../hooks/useDecryptText";

export const WhyUs = () => {
  const location = useLocation();
  const { displayText: nexaviseText, elementRef: nexaviseRef } = useDecryptText("Nexavise Consulting?", 30, 3);

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <div className="pt-24 sm:pt-32 pb-20 min-h-screen bg-background transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 max-w-[1440px]">
        
        {/* Hero Section */}
        <ScrollReveal className="text-left mb-24">
          <div className="inline-flex items-center justify-start gap-2 px-4 py-1.5 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-[11px] font-bold uppercase tracking-wider text-gray-900 dark:text-gray-200 mb-6">
            <Award className="h-4 w-4" />
            <span>The Nexavise Advantage</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-display mb-4 sm:mb-6 text-gray-900 dark:text-white tracking-tight">
            Why Partner With <br />
            <span ref={nexaviseRef} className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400 font-extrabold">
              {nexaviseText || "\u00A0"}
            </span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl leading-relaxed">
            We don't just find vulnerabilities—we engineer resilience. Our proven metrics and uncompromising service level agreements ensure your enterprise is always protected, compliant, and operational.
          </p>
        </ScrollReveal>

        {/* Resilience Metrics Section */}
        <div id="metrics" className="scroll-mt-32 mb-20 sm:mb-32">
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-8 sm:mb-10 border-b border-gray-200 dark:border-white/5 pb-4">
            <div className="p-3 rounded-2xl bg-black/5 dark:bg-white/5 text-gray-900 dark:text-white">
              <ShieldCheck className="h-8 w-8" />
            </div>
            <div>
              <h2 className="text-3xl font-bold font-display text-gray-900 dark:text-white">Resilience Metrics</h2>
              <p className="text-sm text-gray-500 mt-1 uppercase tracking-widest font-bold">PROVEN BY THE NUMBERS</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            <ScrollReveal delay={0.1}>
              <div className="p-8 rounded-3xl bg-white dark:bg-[#0a0e14] border border-gray-200 shadow-sm dark:shadow-none dark:border-white/5 text-left flex flex-col items-start justify-start transition-all hover:border-black/10 dark:border-white/10">
                <div className="p-4 rounded-full bg-gray-100 dark:bg-white/5 mb-6">
                  <Users className="h-8 w-8 text-gray-900 dark:text-gray-200" />
                </div>
                <span className="text-5xl font-black text-gray-900 dark:text-white mb-2">500+</span>
                <span className="text-xs text-gray-500 font-bold uppercase tracking-widest">Global Clients Secured</span>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">Trusted by enterprises across finance, healthcare, and technology sectors.</p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="p-8 rounded-3xl bg-white dark:bg-[#0a0e14] border border-gray-200 shadow-sm dark:shadow-none dark:border-white/5 text-left flex flex-col items-start justify-start transition-all hover:border-black/10 dark:border-white/10">
                <div className="p-4 rounded-full bg-blue-500/10 dark:bg-blue-500/10 mb-6">
                  <Shield className="h-8 w-8 text-blue-500" />
                </div>
                <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400 mb-2">99.98%</span>
                <span className="text-xs text-gray-500 font-bold uppercase tracking-widest">Attack Block Rate</span>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">Industry-leading threat mitigation through proactive hunting and zero-trust.</p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <div className="p-8 rounded-3xl bg-white dark:bg-[#0a0e14] border border-gray-200 shadow-sm dark:shadow-none dark:border-white/5 text-left flex flex-col items-start justify-start transition-all hover:border-black/10 dark:border-white/10">
                <div className="p-4 rounded-full bg-gray-100 dark:bg-white/5 mb-6">
                  <Target className="h-8 w-8 text-gray-600 dark:text-gray-400" />
                </div>
                <span className="text-5xl font-black text-gray-600 dark:text-gray-400 mb-2">15+ Yrs</span>
                <span className="text-xs text-gray-500 font-bold uppercase tracking-widest">Domain Experience</span>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">Decades of combined veteran experience defending critical infrastructure.</p>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Performance SLA Section */}
        <div id="sla" className="scroll-mt-32">
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-8 sm:mb-10 border-b border-gray-200 dark:border-white/5 pb-4">
            <div className="p-3 rounded-2xl bg-black/5 dark:bg-white/5 text-gray-900 dark:text-white">
              <Zap className="h-8 w-8" />
            </div>
            <div>
              <h2 className="text-3xl font-bold font-display text-gray-900 dark:text-white">Performance SLAs</h2>
              <p className="text-sm text-gray-500 mt-1 uppercase tracking-widest font-bold">UNCOMPROMISING DELIVERY</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <ScrollReveal delay={0.1}>
              <div className="p-8 rounded-3xl bg-white dark:bg-[#0a0e14] border border-gray-200 shadow-sm dark:shadow-none dark:border-white/5 hover:border-black/10 dark:border-white/10 transition-colors h-full">
                <div className="flex items-start gap-4">
                  <div className="mt-1 p-2 rounded-lg bg-red-50 dark:bg-red-500/10 text-red-500">
                    <Zap className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">15-Minute Emergency Response</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      When you hit our SOC Emergency Line, our crisis management team begins active threat isolation and containment procedures within 15 minutes, guaranteed.
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="p-8 rounded-3xl bg-white dark:bg-[#0a0e14] border border-gray-200 shadow-sm dark:shadow-none dark:border-white/5 hover:border-black/10 dark:border-white/10 transition-colors h-full">
                <div className="flex items-start gap-4">
                  <div className="mt-1 p-2 rounded-lg bg-gray-100 dark:bg-white/5 text-gray-900 dark:text-gray-200">
                    <Lock className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">4-Hour Project Scoping</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      Submit a request for any custom compliance roadmap or penetration testing engagement, and receive a comprehensive statement of work within 4 hours.
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <div className="p-8 rounded-3xl bg-white dark:bg-[#0a0e14] border border-gray-200 shadow-sm dark:shadow-none dark:border-white/5 hover:border-black/10 dark:border-white/10 transition-colors h-full">
                <div className="flex items-start gap-4">
                  <div className="mt-1 p-2 rounded-lg bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300">
                    <CheckCircle className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Zero-False Positive Guarantee</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      Our VAPT reports are manually vetted by senior analysts. We guarantee that every vulnerability reported is exploitable and relevant to your environment.
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.4}>
              <div className="p-8 rounded-3xl bg-white dark:bg-[#0a0e14] border border-gray-200 shadow-sm dark:shadow-none dark:border-white/5 hover:border-black/10 dark:border-white/10 transition-colors h-full">
                <div className="flex items-start gap-4">
                  <div className="mt-1 p-2 rounded-lg bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400">
                    <Award className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Audit Success Assurance</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      We stand by our compliance architectures. If an auditor flags a control we implemented as deficient, we remediate it at no additional consulting cost.
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>

      </div>
    </div>
  );
};
