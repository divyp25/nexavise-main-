import { useState, useMemo, useRef, useEffect } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, ChevronDown, X } from "lucide-react";
import { ScrollReveal } from "../components/ScrollReveal";
import { Helmet } from "react-helmet-async";
import { IndiaMap } from "../components/IndiaMap";
import { motion, AnimatePresence } from "framer-motion";
import { sectorsData } from "../lib/sectors-data";

const CustomSelect = ({ value, onChange, options, placeholder, disabled }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find((o: any) => o.value === value);

  return (
    <div className={`relative ${disabled ? 'opacity-50 pointer-events-none' : ''}`} ref={dropdownRef}>
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full bg-gray-50 dark:bg-[#0f151f] border ${isOpen ? 'border-gray-900 dark:border-gray-500' : 'border-gray-200 dark:border-white/10'} rounded-xl px-4 py-3 pr-10 text-gray-900 dark:text-white transition-colors cursor-pointer select-none flex items-center justify-between min-h-[50px]`}
      >
        <span className={!selectedOption ? "text-gray-500" : "text-gray-900 dark:text-white line-clamp-1"}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </div>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 w-full mt-2 bg-white dark:bg-[#0f151f] border border-gray-200 dark:border-white/10 rounded-xl shadow-2xl overflow-hidden"
          >
            <div className="max-h-[240px] overflow-y-auto custom-scrollbar">
              {options.map((option: any) => (
                <div
                  key={option.value}
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  className={`px-4 py-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-white/5 transition-colors text-sm line-clamp-2 ${value === option.value ? 'bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-white font-bold' : 'text-gray-700 dark:text-gray-300'}`}
                >
                  {option.label}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const Contact = () => {
  const [formData, setFormData] = useState({ 
    firstName: '', 
    lastName: '', 
    email: '', 
    phone: '',
    sector: '',
    service: '',
    message: '' 
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);

  const selectedSector = useMemo(() => 
    sectorsData.find(s => s.id === formData.sector), 
  [formData.sector]);

  const sectorOptions = useMemo(() => 
    sectorsData.map(s => ({ value: s.id, label: s.name })), 
  []);

  const serviceOptions = useMemo(() => 
    selectedSector ? selectedSector.services.map(s => ({ value: s.id, label: s.name })) : [], 
  [selectedSector]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      const res = await fetch('http://localhost:3001/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (res.ok) {
        setStatus('success');
        setFormData({ firstName: '', lastName: '', email: '', phone: '', sector: '', service: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 5000);
      }
    } catch (err) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <div className="min-h-screen pt-24 sm:pt-32 pb-20 relative overflow-hidden">
      <Helmet>
        <title>Contact | Nexavise</title>
        <meta name="description" content="Submit an inquiry to Nexavise for enterprise cybersecurity solutions." />
      </Helmet>
      
      <div className="absolute inset-0 z-[0] cyber-grid opacity-20 pointer-events-none" />
      <div className="orb orb-blue w-[500px] h-[500px] top-[10%] right-[-100px] z-[0] opacity-30" />

      <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
        <ScrollReveal className="text-left mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-display font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
            Get in Touch
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto lg:mx-0">
            Ready to secure your digital infrastructure? Our team of cybersecurity experts is standing by to discuss your needs.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column: Form + Contact Details */}
          <div className="flex flex-col gap-8">
            {/* Inquiry Form */}
            <ScrollReveal 
              className="bg-white/80 dark:bg-[#0a0e14]/80 backdrop-blur-xl border border-gray-200 dark:border-white/5 rounded-3xl p-8 shadow-2xl relative z-20"
            >
              <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-8">Submit an Inquiry</h2>
              
              <AnimatePresence mode="wait">
                {status === 'success' && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="bg-gray-600 dark:bg-gray-400 dark:bg-[#25D366]/10 border border-gray-200 dark:border-gray-700 dark:border-[#25D366]/20 text-gray-700 dark:text-gray-300 dark:text-[#25D366] p-4 rounded-xl flex items-center gap-3 mb-6"
                  >
                    <CheckCircle2 className="w-5 h-5 shrink-0" />
                    <p className="text-sm font-medium">Inquiry sent successfully! We'll be in touch soon.</p>
                  </motion.div>
                )}

                {status === 'error' && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-400 p-4 rounded-xl flex items-center gap-3 mb-6"
                  >
                    <AlertCircle className="w-5 h-5 shrink-0" />
                    <p className="text-sm font-medium">Failed to send inquiry. Please ensure the database is running.</p>
                  </motion.div>
                )}
              </AnimatePresence>

              <form className="space-y-4 sm:space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-2">First Name</label>
                    <input 
                      type="text" 
                      required
                      value={formData.firstName}
                      onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                      className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:border-gray-200 dark:border-gray-700 transition-colors" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-2">Last Name</label>
                    <input 
                      type="text" 
                      required
                      value={formData.lastName}
                      onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                      className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:border-gray-200 dark:border-gray-700 transition-colors" 
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-2">Email Address</label>
                    <input 
                      type="email" 
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:border-gray-200 dark:border-gray-700 transition-colors" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-2">Phone Number</label>
                    <input 
                      type="tel" 
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:border-gray-200 dark:border-gray-700 transition-colors" 
                      placeholder="Optional"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-2">Sector & Service</label>
                  <CustomSelect 
                    options={sectorOptions}
                    value={formData.sector}
                    onChange={(val: string) => { setFormData({...formData, sector: val, service: ''}); setIsServiceModalOpen(true); }}
                    placeholder="Select a Sector..."
                  />
                  {formData.service && (
                    <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 rounded-xl flex items-center justify-between text-blue-800 dark:text-blue-300">
                      <span className="text-sm">Selected Service: <strong>{serviceOptions.find((s: any) => s.value === formData.service)?.label}</strong></span>
                      <button type="button" onClick={() => setIsServiceModalOpen(true)} className="text-xs underline font-bold hover:text-blue-600 dark:hover:text-blue-200">Change</button>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-2">Message</label>
                  <textarea 
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full min-h-[120px] bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:border-gray-200 dark:border-gray-700 transition-colors resize-none" 
                    placeholder="Provide additional details regarding your inquiry..."
                  ></textarea>
                </div>
                <button 
                  disabled={status === 'loading'}
                  className="w-full flex items-center justify-start gap-2 bg-gray-800 dark:bg-gray-200 hover:bg-gray-700 dark:hover:bg-gray-300 disabled:bg-black/5 disabled:dark:bg-white/5 disabled:text-gray-400 disabled:dark:text-gray-500 text-white dark:text-gray-900 font-bold py-4 px-6 rounded-xl transition-colors mt-4 shadow-lg shadow-gray-400/20 dark:shadow-gray-800/50 hover:shadow-gray-400/20 dark:shadow-gray-800/50 disabled:shadow-none"
                >
                  <span>{status === 'loading' ? 'Submitting...' : 'Submit Inquiry'}</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </ScrollReveal>

            {/* Smaller Contact Details Under Form */}
            <ScrollReveal delay={0.2} className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              <div className="flex flex-col items-start text-left p-6 bg-white/50 dark:bg-[#0a0e14]/50 backdrop-blur-md rounded-2xl border border-gray-200 dark:border-white/5 shadow-lg hover:border-black/10 dark:border-white/10 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 flex items-center justify-center mb-3">
                  <Mail className="w-5 h-5 text-gray-900 dark:text-gray-200" />
                </div>
                <h3 className="text-gray-900 dark:text-white font-bold text-sm mb-1">Email Us</h3>
                <a href="mailto:nexaviseconsulting@gmail.com" className="text-[11px] text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors break-all">nexaviseconsulting@gmail.com</a>
              </div>

              <div className="flex flex-col items-start text-left p-6 bg-white/50 dark:bg-[#0a0e14]/50 backdrop-blur-md rounded-2xl border border-gray-200 dark:border-white/5 shadow-lg hover:border-black/10 dark:border-white/10 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 flex items-center justify-center mb-3">
                  <Phone className="w-5 h-5 text-gray-900 dark:text-gray-200" />
                </div>
                <h3 className="text-gray-900 dark:text-white font-bold text-sm mb-1">Call Us</h3>
                <a href="tel:+919720772035" className="text-[11px] text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">+91 9720772035</a>
              </div>

              <div className="flex flex-col items-start text-left p-6 bg-white/50 dark:bg-[#0a0e14]/50 backdrop-blur-md rounded-2xl border border-gray-200 dark:border-white/5 shadow-lg hover:border-black/10 dark:border-white/10 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 flex items-center justify-center mb-3">
                  <MapPin className="w-5 h-5 text-gray-900 dark:text-gray-200" />
                </div>
                <h3 className="text-gray-900 dark:text-white font-bold text-sm mb-1">Visit Us</h3>
                <p className="text-[11px] text-gray-600 dark:text-gray-400">Mumbai, India</p>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: India Map */}
          <div className="hidden lg:flex items-center justify-start relative h-[700px] z-10">
            <div className="absolute w-[120%] right-[-25%] h-full flex items-center justify-start">
              <IndiaMap className="w-full h-auto text-gray-900 dark:text-gray-200 drop-shadow-sm dark:shadow-md" />
            </div>
          </div>

        </div>
      </div>
      
      {/* Service Selection Modal */}
      <AnimatePresence>
        {isServiceModalOpen && selectedSector && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-[#0a0e14] border border-gray-200 dark:border-white/10 rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden relative flex flex-col max-h-[80vh]"
            >
              <div className="p-6 border-b border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 flex justify-between items-center shrink-0">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">Select a Service</h3>
                  <p className="text-xs text-blue-500 mt-1 uppercase tracking-widest">{selectedSector.name}</p>
                </div>
                <button type="button" onClick={() => setIsServiceModalOpen(false)} className="p-2 text-gray-500 hover:bg-gray-200 dark:hover:bg-white/10 rounded-full transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 overflow-y-auto custom-scrollbar flex-1">
                {serviceOptions.length === 0 ? (
                  <p className="text-gray-500 dark:text-gray-400">No services available for this sector.</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {serviceOptions.map((service: any) => (
                      <button
                        key={service.value}
                        type="button"
                        onClick={() => {
                          setFormData({...formData, service: service.value});
                          setIsServiceModalOpen(false);
                        }}
                        className={`text-left p-4 rounded-xl border transition-all ${formData.service === service.value ? 'border-blue-500 bg-blue-50 dark:bg-blue-500/10' : 'border-gray-200 dark:border-white/10 hover:border-blue-300 dark:hover:border-blue-500/50 bg-white dark:bg-white/5'}`}
                      >
                        <span className={`block font-bold text-sm ${formData.service === service.value ? 'text-blue-700 dark:text-blue-300' : 'text-gray-900 dark:text-white'}`}>{service.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
