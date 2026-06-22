import { useState } from "react";
import { Link } from "react-router-dom";
import { ScrollReveal } from "../components/ScrollReveal";
import DecryptedText from "../components/DecryptedText";
import { useData } from "../contexts/DataContext";
import { useAuth } from "../contexts/AuthContext";
import * as Icons from "lucide-react";

export const Sectors = () => {
  const { sectorsData, refreshData } = useData();
  const { user, token } = useAuth();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newSector, setNewSector] = useState({ id: '', name: '', description: '' });

  const handleAddSector = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch('http://localhost:3001/api/sectors', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ ...newSector, icon: 'Shield' })
      });
      setNewSector({ id: '', name: '', description: '' });
      setIsModalOpen(false);
      refreshData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteSector = async (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (!window.confirm("Are you sure you want to delete this sector?")) return;
    try {
      await fetch(`http://localhost:3001/api/sectors/${id}`, { 
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      refreshData();
    } catch (err) {
      console.error(err);
    }
  };
  
  return (
    <div className="pt-24 sm:pt-32 pb-20 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 max-w-[1440px]">
        <ScrollReveal className="text-left mb-12 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 text-gray-900 dark:text-white">Services by <DecryptedText text="Sectors" animateOn="view" revealDirection="center" speed={100} maxIterations={20} parentClassName="text-transparent bg-clip-text bg-gradient-to-r from-gray-300 to-gray-500 inline-block" /></h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl">
            We provide specialized cybersecurity solutions tailored to the unique threats and compliance requirements of your industry.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sectorsData.map((sector, idx) => {
            const Icon = sector.icon;
            return (
              <ScrollReveal
                key={sector.id}
                delay={idx * 0.1}
              >
                <Link to={`/sectors/${sector.id}`} className="block h-full outline-none">
                  <div className="relative bg-white dark:bg-[#0a0e14] border border-gray-200 dark:border-white/5 rounded-3xl overflow-hidden group h-full min-h-[16rem] p-8 flex flex-col justify-between shadow-md dark:shadow-sm hover:shadow-xl dark:hover:shadow-sm hover:border-cyan-500/30 dark:hover:border-cyan-500/20 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] dark:hover:shadow-[0_0_30px_rgba(6,182,212,0.05)] hover:-translate-y-1 transition-all duration-300">
                    {user && (
                      <button 
                        onClick={(e) => handleDeleteSector(e, sector.id)}
                        className="absolute top-4 right-4 z-20 p-2 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-lg transition-colors"
                        title="Delete Sector"
                      >
                        <Icons.Trash2 className="w-4 h-4" />
                      </button>
                    )}
                    
                    <div>
                      <div className="p-3 rounded-xl bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white w-14 h-14 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:border-cyan-500/30 group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition-all duration-300">
                        <Icon className="h-6 w-6" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white leading-snug mb-3 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors duration-300">
                        {sector.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                        {sector.desc}
                      </p>
                    </div>

                    <div className="mt-6 flex items-center text-sm font-bold text-gray-500 dark:text-gray-400 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors duration-300">
                      {sector.services.length} Specialized Services <Icons.ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1.5 transition-transform duration-300" />
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            );
          })}
          {user && (
            <ScrollReveal delay={0.2} className="h-full">
              <button onClick={() => setIsModalOpen(true)} className="block w-full h-full outline-none text-left">
                <div className="relative bg-gray-50 dark:bg-white/5 border border-dashed border-gray-300 dark:border-white/20 rounded-3xl overflow-hidden hover:bg-gray-100 dark:hover:bg-white/10 hover:border-gray-400 dark:hover:border-white/40 transition-all duration-300 min-h-[16rem] flex flex-col items-center justify-center p-8 text-center text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white cursor-pointer">
                  <div className="p-4 rounded-full bg-gray-200 dark:bg-white/10 mb-4">
                    <Icons.Plus className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-bold">Add Sector</h3>
                  <p className="text-sm mt-2">Create new Main Sector</p>
                </div>
              </button>
            </ScrollReveal>
          )}
        </div>
      </div>

      {/* Add Sector Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-[#0a0e14] border border-gray-200 dark:border-white/10 rounded-3xl shadow-2xl w-full max-w-md overflow-hidden relative">
            <div className="p-6 border-b border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Add Main Sector</h3>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="p-2 text-gray-500 hover:bg-gray-200 dark:hover:bg-white/10 rounded-full transition-colors">
                <Icons.X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddSector} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-900 dark:text-gray-300 mb-2">Sector ID</label>
                <input required placeholder="e.g. telecom" value={newSector.id} onChange={e => setNewSector({...newSector, id: e.target.value})} className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-900 dark:text-gray-300 mb-2">Sector Name</label>
                <input required placeholder="e.g. Telecommunications" value={newSector.name} onChange={e => setNewSector({...newSector, name: e.target.value})} className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-900 dark:text-gray-300 mb-2">Description</label>
                <textarea required placeholder="Detailed description of the sector..." value={newSector.description} onChange={e => setNewSector({...newSector, description: e.target.value})} className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none" rows={4} />
              </div>
              <button type="submit" className="w-full flex justify-start items-center gap-2 bg-blue-500 text-white px-4 py-3 rounded-xl text-sm font-bold hover:bg-blue-400 transition-colors shadow-lg shadow-blue-500/20">
                <Icons.Plus className="w-5 h-5" /> Create Sector
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
