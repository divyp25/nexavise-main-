import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, ArrowRight, AlertCircle, ShieldCheck, Eye, EyeOff } from 'lucide-react';
import { ScrollReveal } from '../components/ScrollReveal';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), password: password.trim() })
      });
      
      const data = await res.json();
      
      if (res.ok && data.success) {
        login(data.token, data.user);
        setSuccessMsg('Authentication successful. Redirecting to Home...');
        setTimeout(() => { 
          navigate('/'); 
        }, 1500);
      } else {
        setError(data.error || 'Invalid credentials');
      }
    } catch (err: any) {
      setError('Connection to backend failed. Is the server running?');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-16 sm:pt-20 flex bg-white dark:bg-[#0a0e14]">
      {/* Left Pane - Branding & Graphic */}
      <div className="hidden lg:flex w-1/2 relative bg-gray-50 dark:bg-black/20 overflow-hidden border-r border-black/5 dark:border-white/5">
        <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none" />
        <div className="orb orb-blue w-[600px] h-[600px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[0] opacity-20" />
        
        <div className="relative z-10 w-full h-full flex flex-col justify-start px-16 xl:px-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <ShieldCheck className="w-16 h-16 text-cyan-500 mb-8" />
            <h1 className="text-4xl xl:text-5xl font-display font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              Nexavise <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Admin Portal</span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-12 max-w-lg">
              Secure, centralized control for the Nexavise platform. Access visitor analytics, manage content, and review secure inquiries.
            </p>
            
            <div className="flex items-center gap-4 text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">
              <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-cyan-500"></div> Zero Trust Architecture</span>
              <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-blue-500"></div> End-to-End Encrypted</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right Pane - Auth Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center lg:justify-start p-6 sm:p-8 relative overflow-hidden">
        <div className="w-full max-w-md relative">
          <ScrollReveal>
            <div className="text-left mb-10 relative">
              <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-2">
                Restricted Access
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Please authenticate to access the command center.
              </p>
            </div>

            <AnimatePresence mode="wait">
              {error && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-400 p-4 rounded-xl flex items-start gap-3 mb-6 text-sm"
                >
                  <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                  <p>{error}</p>
                </motion.div>
              )}

              {successMsg && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-[#25D366]/10 border border-[#25D366]/20 text-[#25D366] p-4 rounded-xl flex items-center justify-start gap-3 mb-6 text-sm font-bold"
                >
                  <ShieldCheck className="w-5 h-5 shrink-0" />
                  <p>{successMsg}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {!successMsg && (
              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <label className="block text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-2">Admin Email</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-gray-900 dark:text-white focus:outline-none focus:border-cyan-500 dark:focus:border-cyan-500 transition-colors" 
                      placeholder="admin@nexavise.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-2">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input 
                      type={showPassword ? "text" : "password"} 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl pl-12 pr-12 py-3.5 text-gray-900 dark:text-white focus:outline-none focus:border-cyan-500 dark:focus:border-cyan-500 transition-colors" 
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <button 
                  disabled={loading}
                  type="submit"
                  className="w-full flex items-center justify-start gap-2 bg-cyan-500 hover:bg-cyan-400 disabled:bg-black/5 disabled:dark:bg-white/5 disabled:text-gray-400 disabled:dark:text-gray-500 text-slate-950 font-bold py-4 px-6 rounded-xl transition-colors mt-8 shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] group disabled:shadow-none"
                >
                  <span>{loading ? 'Authenticating...' : 'Secure Access'}</span>
                  {!loading && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                </button>
              </form>
            )}
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
};
