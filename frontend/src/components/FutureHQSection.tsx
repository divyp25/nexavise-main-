import { Phone, Mail, Cpu } from 'lucide-react';
import { IndiaMap } from './IndiaMap';

export const FutureHQSection = () => {
  return (
    <div className="relative w-full py-24 bg-[#05080c] overflow-hidden border-t border-white/10 text-white">
      {/* Cyber Grid Background */}
      <div className="absolute inset-0 cyber-grid opacity-10 pointer-events-none" />
      
      {/* Gradient Ambient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-[1440px] relative z-10">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-xs font-bold uppercase tracking-wider text-cyan-400 mb-4 animate-[pulse_2s_infinite]">
            <Cpu className="h-4 w-4 text-cyan-400" />
            <span>GEO-SPATIAL OPERATIONS GRID</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight font-display mb-4">
            Geographic Presence
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-sm sm:text-base">
            Our active operations hubs and regional presence map.
          </p>
        </div>

        {/* Outer Panel Shell */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: India Map + HUD */}
          <div className="lg:col-span-7 flex flex-col justify-between bg-black/40 border border-white/15 rounded-3xl p-6 relative overflow-hidden backdrop-blur-md min-h-[450px] md:min-h-[550px]">
            {/* HUD Corner Tech Lines */}
            <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-cyan-500/50 rounded-tl-xl" />
            <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-cyan-500/50 rounded-tr-xl" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-cyan-500/50 rounded-bl-xl" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-cyan-500/50 rounded-br-xl" />
            
            {/* Top HUD Stats */}
            <div className="flex justify-between items-center border-b border-white/5 pb-4 z-20 font-mono text-[10px] text-cyan-400 tracking-wider">
              <div>LATITUDE: 28.6253° N</div>
              <div className="text-right">LONGITUDE: 79.8052° E</div>
            </div>

            {/* India Map */}
            <div className="flex-1 w-full flex items-center justify-center py-6 relative z-10">
              <IndiaMap className="w-full max-w-[440px] h-auto" />
            </div>

            {/* Bottom HUD Message & Stage Indicator */}
            <div className="border-t border-white/5 pt-4 z-20 flex flex-col sm:flex-row justify-between items-center gap-4 font-mono">
              <div className="text-xs text-cyan-300 animate-[pulse_1.5s_infinite] tracking-widest uppercase">
                HQ SECURE LINK: ACTIVE
              </div>
              <div className="flex gap-2">
                {[0, 1, 2, 3, 4, 5].map((step) => (
                  <div
                    key={step}
                    className="h-1.5 w-6 rounded-full bg-cyan-500"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Address Card */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            
            {/* Info Card */}
            <div className="p-8 rounded-3xl bg-[#090d14]/75 border border-cyan-500/20 shadow-[0_0_30px_rgba(6,182,212,0.1)] relative overflow-hidden backdrop-blur-lg flex-1 flex flex-col justify-between max-h-[480px]">
              {/* Card glowing borders */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-3xl blur opacity-30 pointer-events-none" />
              
              <div className="relative z-10">
                <h3 className="text-sm font-black text-cyan-400 tracking-widest uppercase mb-2">
                  India Operations (HQ)
                </h3>
                <h4 className="text-2xl font-black uppercase text-white mb-6">
                  Corporate Office
                </h4>
                
                <div className="space-y-6">
                  <div>
                    <p className="text-white font-extrabold text-lg tracking-wide">Nexavise Consulting Pvt Ltd</p>
                    <p className="text-gray-400 font-medium">Mohalla Karyasthan, Bilsanda</p>
                    <p className="text-gray-400 font-medium">Pilibhit – 262202, Uttar Pradesh, India</p>
                  </div>

                  <div className="border-t border-white/10 pt-6 space-y-4 font-mono text-sm">
                    <a
                      href="tel:+919720772035"
                      className="flex items-center gap-3 text-gray-300 hover:text-cyan-400 transition-colors font-bold"
                    >
                      <Phone className="h-4 w-4 text-cyan-400" />
                      +91 97207 72035
                    </a>
                    <a
                      href="mailto:nexaviseconsulting@gmail.com"
                      className="flex items-center gap-3 text-gray-300 hover:text-cyan-400 transition-colors font-bold"
                    >
                      <Mail className="h-4 w-4 text-cyan-400" />
                      nexaviseconsulting@gmail.com
                    </a>
                  </div>
                </div>
              </div>

              <div className="relative z-10 pt-6 mt-6 border-t border-white/10 flex justify-between items-center text-xs text-gray-400 uppercase tracking-widest font-mono">
                <span>EST. 2025</span>
                <span className="flex items-center gap-1.5 text-cyan-400 font-bold">
                  Active Connection <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
                </span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
