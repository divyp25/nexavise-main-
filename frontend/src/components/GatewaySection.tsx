import { Shield, ArrowRight, Server, Lock } from "lucide-react";
import { useDecryptText } from "../hooks/useDecryptText";

export const GatewaySection = () => {
  const { displayText, elementRef } = useDecryptText("Defensive Control", 30, 3);

  return (
    <section className="relative py-16 sm:py-24 overflow-hidden">
      <div className="cyber-grid absolute inset-0 opacity-10 pointer-events-none" />
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-[1440px]">
        <div className="text-left max-w-3xl mb-12 sm:mb-20">
          <div className="inline-flex items-center justify-start gap-2 px-4 py-1.5 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-[11px] font-bold uppercase tracking-wider text-gray-900 dark:text-gray-200 mb-6">
            <Server className="h-3 w-3" />
            <span>CYBERSECURITY HUB PLATFORM GATEWAY</span>
          </div>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-gray-900 dark:text-gray-200 mb-4 sm:mb-6 tracking-tight"
          >
            Unified{" "}
            <span ref={elementRef} style={{ fontVariantNumeric: "tabular-nums" }}>
              {displayText || "\u00A0"}
            </span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg max-w-2xl">
            Navigate between our dedicated security operations modules. Audit certifications, analyze telemetry logs, or sandbox privacy webhooks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="p-8 rounded-3xl bg-white dark:bg-[#0a0e14] border border-gray-200 shadow-sm dark:shadow-none dark:border-white/5 relative overflow-hidden group hover:border-gray-300 dark:hover:border-white/10 transition-colors flex flex-col h-full">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-300/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="h-12 w-12 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 flex items-center justify-center mb-6">
              <Shield className="h-6 w-6 text-gray-900 dark:text-gray-200" />
            </div>
            
            <h3 className="text-2xl font-bold mb-4 font-display text-gray-900 dark:text-white">53 Security Capabilities</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-8 flex-grow">
              Complete portfolio encompassing VAPT testing, Red Teaming, source code review, GRC consulting, and system hardening, without the complexity of fragmented contracts.
            </p>
            
            <button className="flex items-center justify-between w-full px-5 py-3 rounded-xl border border-black/10 dark:border-white/10 text-gray-900 dark:text-white font-medium text-sm hover:bg-black/5 dark:bg-white/5 transition-colors mt-auto group/btn">
              <span>Explore Catalog</span>
              <ArrowRight className="h-4 w-4 text-gray-500 group-hover/btn:text-gray-900 dark:text-white transition-colors" />
            </button>
          </div>

          {/* Card 2 */}
          <div className="p-8 rounded-3xl bg-white dark:bg-[#0a0e14] border border-gray-200 shadow-sm dark:shadow-none dark:border-white/5 relative overflow-hidden group hover:border-gray-300 dark:hover:border-white/10 transition-colors flex flex-col h-full">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-300/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="h-12 w-12 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 flex items-center justify-center mb-6">
              <Server className="h-6 w-6 text-gray-900 dark:text-gray-200" />
            </div>
            
            <h3 className="text-2xl font-bold mb-4 font-display text-gray-900 dark:text-white">Managed Threat Center</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-8 flex-grow">
              Track live network death blocks, Tor requests, packet metrics, and review comparative operational delta radars in our simulation center.
            </p>
            
            <button className="flex items-center justify-between w-full px-5 py-3 rounded-xl border border-black/10 dark:border-white/10 text-gray-900 dark:text-white font-medium text-sm hover:bg-black/5 dark:bg-white/5 transition-colors mt-auto group/btn">
              <span>SOC Console</span>
              <ArrowRight className="h-4 w-4 text-gray-500 group-hover/btn:text-gray-900 dark:text-white transition-colors" />
            </button>
          </div>

          {/* Card 3 */}
          <div className="p-8 rounded-3xl bg-white dark:bg-[#0a0e14] border border-gray-200 shadow-sm dark:shadow-none dark:border-white/5 relative overflow-hidden group hover:border-gray-300 dark:hover:border-white/10 transition-colors flex flex-col h-full">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-300/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="h-12 w-12 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 flex items-center justify-center mb-6">
              <Lock className="h-6 w-6 text-gray-900 dark:text-gray-200" />
            </div>
            
            <h3 className="text-2xl font-bold mb-4 font-display text-gray-900 dark:text-white">AI Privacy Orchestrator</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-8 flex-grow">
              Audit PII classifiers across database columns, run automated Data Subject Rights (DSAR) sweeps, and sync ledger webhooks with Zero-Code integrations.
            </p>
            
            <button className="flex items-center justify-between w-full px-5 py-3 rounded-xl border border-black/10 dark:border-white/10 text-gray-900 dark:text-white font-medium text-sm hover:bg-black/5 dark:bg-white/5 transition-colors mt-auto group/btn">
              <span>Privacy Sandbox</span>
              <ArrowRight className="h-4 w-4 text-gray-500 group-hover/btn:text-gray-900 dark:text-white transition-colors" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
