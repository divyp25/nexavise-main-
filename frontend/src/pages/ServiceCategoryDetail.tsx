import { useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ScrollReveal } from "../components/ScrollReveal";
import DecryptedText from "../components/DecryptedText";
import { useData } from "../contexts/DataContext";
import { useAuth } from "../contexts/AuthContext";
import * as Icons from "lucide-react";

export const ServiceCategoryDetail = () => {
  const { categoryId } = useParams();
  const { serviceCategories, groupedServices, refreshData, loading } = useData();
  const { user, token } = useAuth();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newService, setNewService] = useState({ name: '', description: '' });

  if (loading) return <div className="min-h-screen bg-white dark:bg-[#0a0e14] pt-32"></div>;

  const categoryData = serviceCategories.find(c => c.id === categoryId);
  const services = groupedServices[categoryData?.name] || [];

  if (!categoryData) {
    return <Navigate to="/services" replace />;
  }

  const handleAddService = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch('http://localhost:3001/api/services', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ ...newService, category_id: categoryData.id, icon: 'Shield' })
      });
      setNewService({ name: '', description: '' });
      setIsModalOpen(false);
      refreshData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteService = async (e: React.MouseEvent, id: number) => {
    e.preventDefault();
    e.stopPropagation();
    if (!window.confirm("Are you sure you want to delete this service?")) return;
    try {
      await fetch(`http://localhost:3001/api/services/${id}`, { 
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      refreshData();
    } catch (err) {
      console.error(err);
    }
  };

  const Icon = categoryData.icon || Icons.Shield;

  return (
    <div className="pt-24 sm:pt-32 pb-20 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 max-w-[1440px]">
        <Link to="/services" className="inline-flex items-center text-gray-900 dark:text-gray-200 hover:text-gray-900 dark:text-gray-200 mb-8 transition-colors font-bold text-sm tracking-wide">
          <ArrowLeft className="h-4 w-4 mr-2" /> BACK TO SERVICES
        </Link>
        
        <ScrollReveal className="mb-16 bg-white dark:bg-[#0a0e14] rounded-3xl p-8 md:p-12 border border-black/5 dark:border-white/5 shadow-sm dark:shadow-none relative overflow-hidden">
          <div className="absolute top-0 right-0 p-16 opacity-10 dark:opacity-[0.07] pointer-events-none text-gray-900 dark:text-white">
            <Icon className="w-64 h-64" />
          </div>
          <div className="relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
              {categoryData.name} <DecryptedText text="Services" animateOn="view" revealDirection="center" speed={100} maxIterations={20} parentClassName="text-transparent bg-clip-text bg-gradient-to-r from-gray-300 to-gray-500 inline-block" />
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl leading-relaxed">
              {categoryData.desc} Explore our specialized offerings tailored exactly to your requirements below.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service: any, idx: number) => {
            const ServiceIcon = (Icons as any)[service.icon] || Icons.ShieldCheck;
            
            return (
              <ScrollReveal
                key={service.id}
                delay={idx * 0.05}
                className="h-full"
              >
                <Link to={`/services/category/${categoryData.id}/${service.id}`} className="block h-full outline-none">
                  <div className="relative bg-white dark:bg-[#0a0e14] border border-gray-200 dark:border-white/5 rounded-3xl overflow-hidden group h-full min-h-[16rem] p-8 flex flex-col justify-between shadow-md dark:shadow-sm hover:shadow-xl dark:hover:shadow-sm hover:border-blue-500/30 dark:hover:border-blue-500/20 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] dark:hover:shadow-[0_0_30px_rgba(59,130,246,0.05)] hover:-translate-y-1 transition-all duration-300">
                    {user && (
                      <button 
                        onClick={(e) => handleDeleteService(e, service.id)}
                        className="absolute top-4 right-4 z-20 p-2 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-lg transition-colors"
                        title="Delete Service"
                      >
                        <Icons.Trash2 className="w-4 h-4" />
                      </button>
                    )}
                    
                    <div>
                      <div className="p-3 rounded-xl bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white w-14 h-14 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:border-blue-500/30 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-all duration-300">
                        <ServiceIcon className="h-6 w-6" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-snug mb-3 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors duration-300">
                        {service.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                        {service.description}
                      </p>
                    </div>

                    <div className="mt-6 flex items-center text-sm font-bold text-gray-500 dark:text-gray-400 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors duration-300">
                      View Details <Icons.ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1.5 transition-transform duration-300" />
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
                  <h3 className="text-lg font-bold">Add Service</h3>
                  <p className="text-sm mt-2">Instantly add to {categoryData.name}</p>
                </div>
              </button>
            </ScrollReveal>
          )}
        </div>
      </div>

      {/* Add Service Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-[#0a0e14] border border-gray-200 dark:border-white/10 rounded-3xl shadow-2xl w-full max-w-md overflow-hidden relative">
            <div className="p-6 border-b border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Add Sub-Service</h3>
                <p className="text-xs text-gray-500 mt-1 uppercase tracking-widest">{categoryData.name}</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="p-2 text-gray-500 hover:bg-gray-200 dark:hover:bg-white/10 rounded-full transition-colors">
                <Icons.X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddService} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-900 dark:text-gray-300 mb-2">Service Name</label>
                <input required placeholder="e.g. Threat Hunting" value={newService.name} onChange={e => setNewService({...newService, name: e.target.value})} className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-900 dark:text-gray-300 mb-2">Description</label>
                <textarea placeholder="Detailed description of the service (optional)..." value={newService.description} onChange={e => setNewService({...newService, description: e.target.value})} className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none" rows={4} />
              </div>
              <button type="submit" className="w-full flex justify-start items-center gap-2 bg-blue-500 text-white px-4 py-3 rounded-xl text-sm font-bold hover:bg-blue-400 transition-colors shadow-lg shadow-blue-500/20">
                <Icons.Plus className="w-5 h-5" /> Add to {categoryData.name}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
