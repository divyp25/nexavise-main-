import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as Icons from "lucide-react";
import {
  Menu, X, ChevronDown,
  Award, Zap, PhoneCall, FileText, Sun, Moon
} from "lucide-react";
import { Link } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import { useLocation } from "../contexts/LocationContext";
import { useAuth } from "../contexts/AuthContext";
import { useData } from "../contexts/DataContext";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { currentLocation, setIsModalOpen } = useLocation();
  const { user, signOut } = useAuth();
  const { sectorsData, groupedServices } = useData();
  const [fontSizeOffset, setFontSizeOffset] = useState(0);
  const [isFontHovered, setIsFontHovered] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--a11y-scale', String(1 + (fontSizeOffset * 0.1)));
  }, [fontSizeOffset]);

  const handleDecreaseFont = () => setFontSizeOffset(prev => Math.max(prev - 1, -2));
  const handleResetFont = () => setFontSizeOffset(0);
  const handleIncreaseFont = () => setFontSizeOffset(prev => Math.min(prev + 2, 3));

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    {
      name: "Services",
      href: "/services",
      dropdown: (
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-80 bg-white dark:bg-[#0a0e14] border border-black/10 dark:border-white/10 rounded-3xl p-5 shadow-2xl backdrop-blur-xl space-y-4 z-50 mt-2">
          {Object.keys(groupedServices).map((category) => {
            let Icon = Icons.Shield;
            let desc = "";
            switch (category) {
              case "Consulting": Icon = Icons.Briefcase; desc = "Strategic framework alignment & advisory"; break;
              case "VAPT": Icon = Icons.Crosshair; desc = "Comprehensive vulnerability & penetration testing"; break;
              case "SOC": Icon = Icons.Activity; desc = "24/7 active monitoring & incident response"; break;
              case "Training": Icon = Icons.GraduationCap; desc = "Staff augmentation & security awareness"; break;
              case "Compliance": Icon = Icons.FileCheck; desc = "ISO, GDPR, SOC 2, and regulatory frameworks"; break;
              case "Infrastructure": Icon = Icons.Server; desc = "Hardening, EDR, SIEM & data protection"; break;
            }

            return (
              <Link key={category} to={`/services/category/${category.toLowerCase()}`} onClick={() => setActiveDropdown(null)} className="flex items-start gap-3.5 group">
                <div className="p-2 rounded-lg bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-gray-900 dark:text-gray-200 group-hover:bg-black/5 dark:bg-white/5 transition-all">
                  <Icon className="h-4.5 w-4.5" />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wide group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">{category}</h5>
                  <p className="text-[10px] text-gray-600 dark:text-gray-400 mt-0.5 leading-normal">{desc}</p>
                </div>
              </Link>
            );
          })}
        </div>
      ),
    },

    {
      name: "Why Us",
      href: "/why-us",
      dropdown: (
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-80 bg-white dark:bg-[#0a0e14] border border-black/10 dark:border-white/10 rounded-3xl p-5 shadow-2xl backdrop-blur-xl space-y-4 z-50 mt-2">
          <Link to="/why-us#metrics" onClick={() => setActiveDropdown(null)} className="flex items-start gap-3.5 group">
            <div className="p-2 rounded-lg bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-gray-900 dark:text-gray-200 group-hover:bg-black/5 dark:bg-white/5 transition-all">
              <Award className="h-4.5 w-4.5" />
            </div>
            <div>
              <h5 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wide group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">Resilience Metrics</h5>
              <p className="text-[10px] text-gray-600 dark:text-gray-400 mt-0.5 leading-normal">SLA benchmarks: 500+ clients, 99.98% block rate, 15+ years experience.</p>
            </div>
          </Link>

          <Link to="/why-us#sla" onClick={() => setActiveDropdown(null)} className="flex items-start gap-3.5 group">
            <div className="p-2 rounded-lg bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-gray-900 dark:text-gray-200 group-hover:bg-black/5 dark:bg-white/5 transition-all">
              <Zap className="h-4.5 w-4.5" />
            </div>
            <div>
              <h5 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wide group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">Performance SLA</h5>
              <p className="text-[10px] text-gray-600 dark:text-gray-400 mt-0.5 leading-normal">Emergency trigger response in 15 minutes, standard scoping in 4 hours.</p>
            </div>
          </Link>
        </div>
      ),
    },
    {
      name: "About Us",
      href: "/about",
    },
    {
      name: "Sectors",
      href: "/sectors",
      dropdown: (
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-80 bg-white dark:bg-[#0a0e14] border border-black/10 dark:border-white/10 rounded-3xl p-5 shadow-2xl backdrop-blur-xl space-y-4 z-50 mt-2">
          {sectorsData.map((sector) => {
            const Icon = (Icons as any)[sector.icon] || Icons.Shield;
            return (
              <Link key={sector.id} to={`/sectors/${sector.id}`} onClick={() => setActiveDropdown(null)} className="flex items-start gap-3.5 group">
                <div className="p-2 rounded-lg bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-gray-900 dark:text-gray-200 group-hover:bg-black/5 dark:bg-white/5 transition-all">
                  <Icon className="h-4.5 w-4.5" />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wide group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">{sector.name}</h5>
                  <p className="text-[10px] text-gray-600 dark:text-gray-400 mt-0.5 leading-normal truncate w-48">{sector.description || sector.desc}</p>
                </div>
              </Link>
            )
          })}
        </div>
      ),
    },
    {
      name: "Contact",
      href: "/contact",
      dropdown: (
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-80 bg-white dark:bg-[#0a0e14] border border-black/10 dark:border-white/10 rounded-3xl p-5 shadow-2xl backdrop-blur-xl space-y-4 z-50 mt-2">
          <Link to="/contact" className="flex items-start gap-3.5 group">
            <div className="p-2 rounded-lg bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-gray-900 dark:text-gray-200 group-hover:bg-black/5 dark:bg-white/5 transition-all">
              <FileText className="h-4.5 w-4.5" />
            </div>
            <div>
              <h5 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wide group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors uppercase tracking-wide">Contact Us</h5>
              <p className="text-[10px] text-gray-600 dark:text-gray-400 mt-0.5 leading-normal">Send a message directly to our team.</p>
            </div>
          </Link>

          <a href="tel:+18005550199" onClick={() => setActiveDropdown(null)} className="flex items-start gap-3.5 group">
            <div className="p-2 rounded-lg bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-gray-900 dark:text-gray-200 group-hover:bg-black/5 dark:bg-white/5 transition-all">
              <PhoneCall className="h-4.5 w-4.5" />
            </div>
            <div>
              <h5 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wide group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">SOC Emergency Line</h5>
              <p className="text-[10px] text-gray-600 dark:text-gray-400 mt-0.5 leading-normal">Crisis hotlink dedicated to network breach isolations.</p>
            </div>
          </a>
        </div>
      ),
    },
  ];

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-500 ${isScrolled
          ? "bg-white/90 dark:bg-[#0a0e14]/90 backdrop-blur-xl border-b border-black/10 dark:border-white/10 shadow-lg py-1"
          : "bg-slate-100 dark:bg-[#0a0e14] backdrop-blur-sm border-b border-black/5 dark:border-white/5 py-3"
        }`}
      style={{ zoom: 'var(--a11y-scale, 1)' } as React.CSSProperties}
    >
      <div className="container mx-auto px-4 sm:px-6 max-w-[1440px]">
        <div className="flex items-center justify-between h-20">

          <Link to="/" className="flex items-center cursor-pointer -ml-1 sm:-ml-2">
            <img src="/logo.png" alt="Nexavise Consulting" className="h-14 sm:h-20 w-auto object-contain scale-[1.75] sm:scale-[2.25] origin-left dark:invert-0 dark:hue-rotate-0 invert hue-rotate-180 transition-all duration-300" />
          </Link>

          <div className="hidden lg:flex items-center gap-8 h-full">
            {navLinks.map((link) => (
              <div
                key={link.name}
                className="relative h-full flex items-center group cursor-pointer"
                onMouseEnter={() => setActiveDropdown(link.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {link.href !== "#" ? (
                  <Link to={link.href} className="flex items-center gap-1 text-[13px] font-bold tracking-wide text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:text-white transition-colors uppercase">
                    {link.name} <ChevronDown className="h-3.5 w-3.5 text-gray-500 group-hover:text-gray-900 dark:text-white transition-colors" />
                  </Link>
                ) : (
                  <div className="flex items-center gap-1 text-[13px] font-bold tracking-wide text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:text-white transition-colors uppercase">
                    {link.name} <ChevronDown className="h-3.5 w-3.5 text-gray-500 group-hover:text-gray-900 dark:text-white transition-colors" />
                  </div>
                )}

                <AnimatePresence>
                  {activeDropdown === link.name && link.dropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 z-50 cursor-default"
                    >
                      {link.dropdown}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-4 pr-12 2xl:pr-0">
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-1.5 p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 text-gray-600 dark:text-gray-300 transition-colors"
            >
              <Icons.MapPin className="h-4.5 w-4.5" />
              <span className="text-[11px] font-bold uppercase tracking-wider">{currentLocation.code}</span>
            </button>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 text-gray-600 dark:text-gray-300 transition-colors"
            >
              {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </button>

            {user && (
              <div className="relative group cursor-pointer">
                <div className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 font-bold text-[13px] tracking-wide hover:bg-cyan-500/20 transition-colors">
                  <Icons.ShieldAlert className="h-4 w-4" />
                  Hi, Admin <ChevronDown className="h-3 w-3 ml-1 opacity-50 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="absolute top-full right-0 pt-2 w-48 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all pointer-events-none group-hover:pointer-events-auto">
                  <div className="bg-white dark:bg-[#0a0e14] border border-black/10 dark:border-white/10 rounded-2xl shadow-xl flex flex-col py-2">
                    <div className="px-4 py-2 border-b border-black/5 dark:border-white/5 mb-2">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Signed in as</p>
                      <p className="text-xs text-gray-900 dark:text-white truncate">{user.email}</p>
                    </div>
                    <Link to="/admin" className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-gray-700 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                      <Icons.LayoutDashboard className="h-4 w-4" />
                      Dashboard
                    </Link>
                    <button onClick={signOut} className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 text-left transition-colors">
                      <Icons.LogOut className="h-4 w-4" />
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            )}



          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden text-gray-900 dark:text-white p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Font Size Adjuster (Fixed to Right Edge of Navbar) */}
      <div
        className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 items-center bg-[#0a0e14] border border-r-0 border-black/10 dark:border-white/10 shadow-2xl rounded-l-2xl overflow-hidden h-10"
        onMouseEnter={() => setIsFontHovered(true)}
        onMouseLeave={() => setIsFontHovered(false)}
      >
        <AnimatePresence>
          {isFontHovered && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 'auto', opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-center overflow-hidden whitespace-nowrap pl-2 space-x-1 bg-[#0a0e14]"
            >
              <button
                onClick={handleDecreaseFont}
                aria-label="Decrease Font Size"
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-[10px] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${fontSizeOffset < 0 ? 'bg-white/10 text-cyan-400' : 'hover:bg-white/5 text-gray-400'}`}
              >
                A-
              </button>
              <button
                onClick={handleResetFont}
                aria-label="Reset Font Size"
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${fontSizeOffset === 0 ? 'bg-white/10 text-cyan-400' : 'hover:bg-white/5 text-gray-400'}`}
              >
                A
              </button>
              <button
                onClick={handleIncreaseFont}
                aria-label="Increase Font Size"
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-[14px] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${fontSizeOffset > 0 ? 'bg-white/10 text-cyan-400' : 'hover:bg-white/5 text-gray-400'}`}
              >
                A+
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="w-10 h-10 flex items-center justify-center font-bold text-sm text-white cursor-pointer bg-[#0a0e14]">
          Aa
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden absolute top-full left-0 right-0 bg-white dark:bg-[#0a0e14]/95 backdrop-blur-xl border-t border-black/10 dark:border-white/10 overflow-y-auto shadow-2xl max-h-[calc(100vh-80px)] custom-scrollbar"
          >
            <div className="px-6 py-8 flex flex-col gap-6 pb-24">

              <div className="flex flex-col gap-6">
                <div className="space-y-4">
                  <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Services</h3>
                  <div className="space-y-3 pl-4 border-l border-black/5 dark:border-white/5">
                    {Object.keys(groupedServices).map((category) => (
                      <Link key={category} to={`/services#${category.toLowerCase()}`} className="block text-[11px] font-bold text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:text-white" onClick={() => setIsOpen(false)}>
                        {category}
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-black/5 dark:border-white/5">
                  <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Why Us</h3>
                  <div className="space-y-3 pl-4 border-l border-black/5 dark:border-white/5">
                    <Link to="/why-us#metrics" className="block text-[11px] font-bold text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:text-white uppercase" onClick={() => setIsOpen(false)}>Resilience Metrics</Link>
                    <Link to="/why-us#sla" className="block text-[11px] font-bold text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:text-white uppercase" onClick={() => setIsOpen(false)}>Performance SLA</Link>
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-black/5 dark:border-white/5">
                  <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Company</h3>
                  <div className="space-y-3 pl-4 border-l border-black/5 dark:border-white/5">
                    <Link to="/about" className="block text-[11px] font-bold text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:text-white uppercase" onClick={() => setIsOpen(false)}>About Us</Link>
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-black/5 dark:border-white/5">
                  <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Sectors</h3>
                  <div className="space-y-3 pl-4 border-l border-black/5 dark:border-white/5">
                    {sectorsData.map(sector => (
                      <Link key={sector.id} to={`/sectors/${sector.id}`} className="block text-[11px] font-bold text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:text-white uppercase" onClick={() => setIsOpen(false)}>
                        {sector.name}
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-black/5 dark:border-white/5">
                  <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Contact</h3>
                  <div className="space-y-3 pl-4 border-l border-black/5 dark:border-white/5">
                    <Link to="/contact" className="block text-[11px] font-bold text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:text-white uppercase" onClick={() => setIsOpen(false)}>Contact Us</Link>
                    <a href="tel:+18005550199" className="block text-[11px] font-bold text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:text-white uppercase" onClick={() => setIsOpen(false)}>SOC Emergency Line</a>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-4 mt-6 pt-6 border-t border-black/10 dark:border-white/10">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="flex items-center justify-start gap-2 px-6 py-3 rounded-full bg-black/5 dark:bg-white/5 text-gray-900 dark:text-white font-bold text-[13px] tracking-wide w-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
                >
                  <Icons.MapPin className="h-4 w-4" /> {currentLocation.name}
                </button>
                {user && (
                  <div className="flex flex-col gap-2">
                    <Link to="/admin" onClick={() => setIsOpen(false)} className="flex items-center justify-start gap-2 px-6 py-3 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-bold text-[13px] tracking-wide w-full hover:bg-cyan-500/20 transition-colors">
                      <Icons.LayoutDashboard className="h-4 w-4" /> ADMIN DASHBOARD
                    </Link>
                    <button onClick={() => { signOut(); setIsOpen(false); }} className="flex items-center justify-start gap-2 px-6 py-3 rounded-full bg-red-500/10 text-red-500 font-bold text-[13px] tracking-wide w-full hover:bg-red-500/20 transition-colors">
                      <Icons.LogOut className="h-4 w-4" /> SIGN OUT
                    </button>
                  </div>
                )}

              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
