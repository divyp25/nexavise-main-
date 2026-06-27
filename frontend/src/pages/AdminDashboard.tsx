import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Activity, MessageSquare, Database, Plus, Trash2, ShieldCheck, RefreshCw, ChevronRight, ArrowLeft, Star, Pencil, X, Check } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

export const AdminDashboard = () => {
  const { user, token, signOut, loading } = useAuth();
  const { refreshData } = useData();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState<'analytics' | 'inquiries' | 'content' | 'about' | 'reviews'>('analytics');
  
  const [stats, setStats] = useState({ totalVisitors: 0, activeUsers: 0 });
  const [inquiries, setInquiries] = useState<any[]>([]);
  
  // About Page Data
  const [aboutCompany, setAboutCompany] = useState({ title: '', description: '' });
  const [teamMembers, setTeamMembers] = useState<any[]>([]);
  const [newTeamMember, setNewTeamMember] = useState({ name: '', role: '', bio: '', image_url: '' });
  const [isEditingCompany, setIsEditingCompany] = useState(false);

  // Reviews Data
  const [reviews, setReviews] = useState<any[]>([]);
  const [newReview, setNewReview] = useState({ text: '', author: '', role: '', rating: 5 });
  const [editingReviewId, setEditingReviewId] = useState<number | null>(null);
  const [editingReview, setEditingReview] = useState({ text: '', author: '', role: '', rating: 5 });
  
  const [reviewFilterName, setReviewFilterName] = useState('');
  const [reviewFilterRole, setReviewFilterRole] = useState('');
  const [reviewFilterStar, setReviewFilterStar] = useState<number | ''>('');
  const [reviewFilterStatus, setReviewFilterStatus] = useState('all');
  const [reviewPage, setReviewPage] = useState(1);
  const [isRefreshingReviews, setIsRefreshingReviews] = useState(false);
  
  // Data for Content Management
  const [sectors, setSectors] = useState<any[]>([]);
  const [sectorServices, setSectorServices] = useState<any[]>([]);
  const [serviceCategories, setServiceCategories] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  
  // Forms
  const [newSector, setNewSector] = useState({ id: '', name: '', icon: 'Shield', description: '' });
  const [newSectorService, setNewSectorService] = useState({ sector_id: '', name: '', description: '' });
  const [newServiceCategory, setNewServiceCategory] = useState({ id: '', name: '', icon: 'Shield', description: '' });
  const [newService, setNewService] = useState({ category_id: '', name: '', icon: 'Shield', description: '' });

  // Drill-down UI States
  const [selectedSector, setSelectedSector] = useState<any>(null);
  const [sectorMode, setSectorMode] = useState<'list' | 'add_sub' | 'manage_sub'>('list');
  
  const [selectedService, setSelectedService] = useState<any>(null);
  const [serviceMode, setServiceMode] = useState<'list' | 'add_sub' | 'manage_sub'>('list');

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    fetchStats();
    if (activeTab === 'inquiries') fetchInquiries();
    if (activeTab === 'content') {
      fetchSectors();
      fetchSectorServices();
      fetchServiceCategories();
      fetchServices();
    }
    if (activeTab === 'about') {
      fetchAboutData();
    }
    if (activeTab === 'reviews') {
      fetchReviews();
    }
  }, [activeTab]);

  const fetchStats = async () => {
    try {
      const res = await fetch('http://localhost:3001/api/stats');
      const data = await res.json();
      setStats(data);
    } catch (e) {}
  };

  const fetchAboutData = async () => {
    try {
      const res = await fetch('http://localhost:3001/api/about');
      const data = await res.json();
      if (data.company) setAboutCompany(data.company);
      if (Array.isArray(data.team)) setTeamMembers(data.team);
    } catch (e) {}
  };

  const handleUpdateCompany = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    try {
      const res = await fetch('http://localhost:3001/api/about/company', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(aboutCompany)
      });
      if (res.status === 401 || res.status === 403) {
        signOut();
        navigate('/login');
        return;
      }
      setIsEditingCompany(false);
      refreshData();
    } catch (e) {}
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setNewTeamMember(prev => ({ ...prev, image_url: reader.result as string }));
    };
    reader.readAsDataURL(file);
  };

  const handleAddTeamMember = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3001/api/about/team', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(newTeamMember)
      });
      if (res.status === 401 || res.status === 403) {
        signOut();
        navigate('/login');
        return;
      }
      setNewTeamMember({ name: '', role: '', bio: '', image_url: '' });
      fetchAboutData();
      refreshData();
    } catch (e) {}
  };

  const handleDeleteTeamMember = async (id: number) => {
    try {
      const res = await fetch(`http://localhost:3001/api/about/team/${id}`, { 
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.status === 401 || res.status === 403) {
        signOut();
        navigate('/login');
        return;
      }
      fetchAboutData();
      refreshData();
    } catch (e) {}
  };

  // Reviews Handlers
  const fetchReviews = async () => {
    setIsRefreshingReviews(true);
    try {
      const res = await fetch('http://localhost:3001/api/reviews/admin', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.status === 401 || res.status === 403) {
        signOut();
        navigate('/login');
        return;
      }
      const data = await res.json();
      if (Array.isArray(data)) setReviews(data);
    } catch (e) {
    } finally {
      setTimeout(() => {
        setIsRefreshingReviews(false);
      }, 500);
    }
  };


  const handleAddReview = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3001/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(newReview)
      });
      if (!res.ok) throw new Error('Network response was not ok');
      setNewReview({ text: '', author: '', role: '', rating: 5 });
      fetchReviews();
      refreshData();
    } catch (e) {
      console.error("Failed to add review:", e);
    }
  };

  const handleUpdateReviewStatus = async (id: number, status: string) => {
    try {
      await fetch(`http://localhost:3001/api/reviews/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ status })
      });
      fetchReviews();
      refreshData();
    } catch (e) {}
  };

  const handleUpdateReview = async (id: number) => {
    try {
      await fetch(`http://localhost:3001/api/reviews/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(editingReview)
      });
      setEditingReviewId(null);
      fetchReviews();
      refreshData();
    } catch (e) {}
  };

  const handleDeleteReview = async (id: number) => {
    try {
      await fetch(`http://localhost:3001/api/reviews/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      fetchReviews();
      refreshData();
    } catch (e) {}
  };

  const fetchInquiries = async () => {
    try {
      const res = await fetch('http://localhost:3001/api/inquiries', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (Array.isArray(data)) {
        setInquiries(data);
      } else {
        console.error("Failed to fetch inquiries:", data);
        setInquiries([]);
      }
    } catch (e) {
      console.error(e);
      setInquiries([]);
    }
  };

  const fetchSectors = async () => {
    try {
      const res = await fetch('http://localhost:3001/api/sectors');
      const data = await res.json();
      if (Array.isArray(data)) setSectors(data);
    } catch (e) {}
  };

  const fetchSectorServices = async () => {
    try {
      const res = await fetch('http://localhost:3001/api/sector_services');
      const data = await res.json();
      if (Array.isArray(data)) setSectorServices(data);
    } catch (e) {}
  };

  const fetchServiceCategories = async () => {
    try {
      const res = await fetch('http://localhost:3001/api/service_categories');
      const data = await res.json();
      if (Array.isArray(data)) setServiceCategories(data);
    } catch (e) {}
  };

  const fetchServices = async () => {
    try {
      const res = await fetch('http://localhost:3001/api/services');
      const data = await res.json();
      if (Array.isArray(data)) setServices(data);
    } catch (e) {}
  };

  const handleAddSector = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch('http://localhost:3001/api/sectors', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newSector)
      });
      setNewSector({ id: '', name: '', icon: 'Shield', description: '' });
      fetchSectors();
      refreshData();
    } catch (e) {}
  };

  const handleDeleteSector = async (id: string) => {
    try {
      await fetch(`http://localhost:3001/api/sectors/${id}`, { 
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      fetchSectors();
      refreshData();
    } catch (e) {}
  };

  const handleAddSectorService = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch('http://localhost:3001/api/sector_services', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newSectorService)
      });
      setNewSectorService({ sector_id: '', name: '', description: '' });
      fetchSectorServices();
      refreshData();
    } catch (e) {}
  };

  const handleDeleteSectorService = async (id: number) => {
    try {
      await fetch(`http://localhost:3001/api/sector_services/${id}`, { 
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      fetchSectorServices();
      refreshData();
    } catch (e) {}
  };

  const handleAddServiceCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch('http://localhost:3001/api/service_categories', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newServiceCategory)
      });
      setNewServiceCategory({ id: '', name: '', icon: 'Shield', description: '' });
      fetchServiceCategories();
      refreshData();
    } catch (e) {}
  };

  const handleDeleteServiceCategory = async (id: string) => {
    try {
      await fetch(`http://localhost:3001/api/service_categories/${id}`, { 
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      fetchServiceCategories();
      refreshData();
    } catch (e) {}
  };

  const handleAddService = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch('http://localhost:3001/api/services', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newService)
      });
      setNewService({ category_id: '', name: '', icon: 'Shield', description: '' });
      fetchServices();
      refreshData();
    } catch (e) {}
  };

  const handleDeleteService = async (id: number) => {
    try {
      await fetch(`http://localhost:3001/api/services/${id}`, { 
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      fetchServices();
      refreshData();
    } catch (e) {}
  };

  // Render Tabs
  const renderAnalytics = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-[#0a0e14] border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-xl flex items-center gap-6">
          <div className="w-16 h-16 rounded-full bg-cyan-500/10 flex items-center justify-center">
            <Users className="w-8 h-8 text-cyan-500" />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">Total Visitors</p>
            <h3 className="text-4xl font-black text-gray-900 dark:text-white">{stats.totalVisitors}</h3>
          </div>
        </div>
        <div className="bg-white dark:bg-[#0a0e14] border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-xl flex items-center gap-6">
          <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center">
            <Activity className="w-8 h-8 text-green-500" />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">Active Connections</p>
            <h3 className="text-4xl font-black text-gray-900 dark:text-white">{stats.activeUsers}</h3>
          </div>
        </div>
      </div>
    </div>
  );

  const renderInquiries = () => (
    <div className="bg-white dark:bg-[#0a0e14] border border-gray-200 dark:border-white/10 rounded-2xl shadow-xl overflow-hidden">
      <div className="p-6 border-b border-gray-200 dark:border-white/10 flex justify-between items-center bg-gray-50 dark:bg-white/5">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
          <MessageSquare className="w-5 h-5 text-cyan-500" /> 
          Contact Form Submissions
        </h3>
        <button onClick={fetchInquiries} className="p-2 rounded-lg bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors">
          <RefreshCw className="w-4 h-4 text-gray-600 dark:text-gray-400" />
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 dark:bg-black/20 text-xs uppercase tracking-widest text-gray-500">
              <th className="p-4 border-b border-gray-200 dark:border-white/10">Date</th>
              <th className="p-4 border-b border-gray-200 dark:border-white/10">Name</th>
              <th className="p-4 border-b border-gray-200 dark:border-white/10">Email</th>
              <th className="p-4 border-b border-gray-200 dark:border-white/10">Phone</th>
              <th className="p-4 border-b border-gray-200 dark:border-white/10">Sector/Service</th>
              <th className="p-4 border-b border-gray-200 dark:border-white/10">Message</th>
            </tr>
          </thead>
          <tbody>
            {(!inquiries || inquiries.length === 0) ? (
              <tr>
                <td colSpan={5} className="p-8 text-left text-gray-500">No inquiries yet.</td>
              </tr>
            ) : inquiries.map((inq, i) => (
              <tr key={i} className="border-b border-gray-200 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/5">
                <td className="p-4 text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
                  {new Date(inq.created_at).toLocaleString()}
                </td>
                <td className="p-4 text-sm font-bold text-gray-900 dark:text-white">
                  {inq.first_name} {inq.last_name}
                </td>
                <td className="p-4 text-sm text-gray-600 dark:text-gray-400">{inq.email}</td>
                <td className="p-4 text-sm text-gray-600 dark:text-gray-400">{inq.phone || 'N/A'}</td>
                <td className="p-4 text-xs">
                  <span className="block text-cyan-600 dark:text-cyan-400">{inq.sector || 'N/A'}</span>
                  <span className="block text-gray-500">{inq.service || 'N/A'}</span>
                </td>
                <td className="p-4 text-sm text-gray-600 dark:text-gray-400 max-w-xs truncate" title={inq.message}>
                  {inq.message}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderContent = () => (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
      {/* SECTORS COLUMN */}
      <div className="bg-white dark:bg-[#0a0e14] border border-gray-200 dark:border-white/10 rounded-2xl shadow-xl overflow-hidden min-h-[500px] flex flex-col">
        {sectorMode === 'list' ? (
          <>
            <div className="p-6 border-b border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                <Database className="w-5 h-5 text-blue-500" /> 
                Main Sectors
              </h3>
            </div>
            <div className="p-4 border-b border-gray-200 dark:border-white/10">
              <form onSubmit={handleAddSector} className="flex gap-2">
                <input required placeholder="ID" value={newSector.id} onChange={e => setNewSector({...newSector, id: e.target.value})} className="w-1/3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none" />
                <input required placeholder="Name" value={newSector.name} onChange={e => setNewSector({...newSector, name: e.target.value})} className="flex-1 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none" />
                <button type="submit" className="bg-blue-500 text-white px-3 py-2 rounded-lg text-sm font-bold hover:bg-blue-400 transition-colors">
                  <Plus className="w-4 h-4" />
                </button>
              </form>
            </div>
            <div className="flex-1 overflow-y-auto p-2">
              {sectors.map(s => (
                <div key={s.id} onClick={() => { setSelectedSector(s); setSectorMode('manage_sub'); }} className="cursor-pointer flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-white/5 rounded-xl group border-b border-transparent hover:border-gray-100 dark:hover:border-white/5 transition-colors">
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white text-sm">{s.name}</h4>
                    <p className="text-xs text-gray-500">{s.id}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={(e) => { e.stopPropagation(); handleDeleteSector(s.id); }} className="p-2 text-red-500 bg-red-50 dark:bg-red-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-100 dark:hover:bg-red-500/20">
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            <div className="p-6 border-b border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 flex items-center gap-4">
              <button onClick={() => { setSectorMode('list'); setSelectedSector(null); }} className="p-2 bg-white dark:bg-white/5 rounded-lg border border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/10 transition-colors">
                <ArrowLeft className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              </button>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{selectedSector?.name}</h3>
                <p className="text-xs text-blue-500">Sector Sub-Offerings</p>
              </div>
            </div>
            <div className="p-4 border-b border-gray-200 dark:border-white/10 flex gap-2">
              <button 
                onClick={() => setSectorMode('add_sub')}
                className={`flex-1 py-2 text-sm font-bold rounded-lg transition-colors ${sectorMode === 'add_sub' ? 'bg-blue-500 text-white' : 'bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-white/10'}`}
              >
                Add Offering
              </button>
              <button 
                onClick={() => setSectorMode('manage_sub')}
                className={`flex-1 py-2 text-sm font-bold rounded-lg transition-colors ${sectorMode === 'manage_sub' ? 'bg-blue-500 text-white' : 'bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-white/10'}`}
              >
                Manage Offerings
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              {sectorMode === 'add_sub' && (
                <form onSubmit={(e) => {
                  e.preventDefault();
                  newSectorService.sector_id = selectedSector.id;
                  handleAddSectorService(e);
                  setSectorMode('manage_sub');
                }} className="space-y-4">
                  <input required placeholder="Offering Name" value={newSectorService.name} onChange={e => setNewSectorService({...newSectorService, name: e.target.value})} className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2 text-sm text-gray-900 dark:text-white focus:outline-none" />
                  <textarea placeholder="Description (Optional)" value={newSectorService.description} onChange={e => setNewSectorService({...newSectorService, description: e.target.value})} className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2 text-sm text-gray-900 dark:text-white focus:outline-none resize-none" rows={3} />
                  <button type="submit" className="w-full flex justify-start items-center gap-2 bg-blue-500 text-white px-4 py-3 rounded-lg text-sm font-bold hover:bg-blue-400 transition-colors">
                    <Plus className="w-4 h-4" /> Save Sub-Offering
                  </button>
                </form>
              )}
              {sectorMode === 'manage_sub' && (
                <div className="space-y-2">
                  {sectorServices.filter(ss => ss.sector_id === selectedSector?.id).length === 0 ? (
                    <p className="text-left text-sm text-gray-500 mt-8">No offerings added yet.</p>
                  ) : (
                    sectorServices.filter(ss => ss.sector_id === selectedSector?.id).map(ss => (
                      <div key={ss.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-200 dark:border-white/10">
                        <span className="font-bold text-gray-900 dark:text-white text-sm">{ss.name}</span>
                        <button onClick={() => handleDeleteSectorService(ss.id)} className="p-2 text-red-500 bg-red-50 dark:bg-red-500/10 rounded-lg hover:bg-red-100 dark:hover:bg-red-500/20 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* SERVICES COLUMN */}
      <div className="bg-white dark:bg-[#0a0e14] border border-gray-200 dark:border-white/10 rounded-2xl shadow-xl overflow-hidden min-h-[500px] flex flex-col">
        {serviceMode === 'list' ? (
          <>
            <div className="p-6 border-b border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                <Database className="w-5 h-5 text-purple-500" /> 
                Main Services
              </h3>
            </div>
            <div className="p-4 border-b border-gray-200 dark:border-white/10">
              <form onSubmit={handleAddServiceCategory} className="flex gap-2">
                <input required placeholder="ID" value={newServiceCategory.id} onChange={e => setNewServiceCategory({...newServiceCategory, id: e.target.value})} className="w-1/3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none" />
                <input required placeholder="Name" value={newServiceCategory.name} onChange={e => setNewServiceCategory({...newServiceCategory, name: e.target.value})} className="flex-1 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none" />
                <button type="submit" className="bg-purple-500 text-white px-3 py-2 rounded-lg text-sm font-bold hover:bg-purple-400 transition-colors">
                  <Plus className="w-4 h-4" />
                </button>
              </form>
            </div>
            <div className="flex-1 overflow-y-auto p-2">
              {serviceCategories.map(sc => (
                <div key={sc.id} onClick={() => { setSelectedService(sc); setServiceMode('manage_sub'); }} className="cursor-pointer flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-white/5 rounded-xl group border-b border-transparent hover:border-gray-100 dark:hover:border-white/5 transition-colors">
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white text-sm">{sc.name}</h4>
                    <p className="text-xs text-gray-500">{sc.id}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={(e) => { e.stopPropagation(); handleDeleteServiceCategory(sc.id); }} className="p-2 text-red-500 bg-red-50 dark:bg-red-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-100 dark:hover:bg-red-500/20">
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            <div className="p-6 border-b border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 flex items-center gap-4">
              <button onClick={() => { setServiceMode('list'); setSelectedService(null); }} className="p-2 bg-white dark:bg-white/5 rounded-lg border border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/10 transition-colors">
                <ArrowLeft className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              </button>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{selectedService?.name}</h3>
                <p className="text-xs text-purple-500">Sub-Services</p>
              </div>
            </div>
            <div className="p-4 border-b border-gray-200 dark:border-white/10 flex gap-2">
              <button 
                onClick={() => setServiceMode('add_sub')}
                className={`flex-1 py-2 text-sm font-bold rounded-lg transition-colors ${serviceMode === 'add_sub' ? 'bg-purple-500 text-white' : 'bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-white/10'}`}
              >
                Add Sub-Service
              </button>
              <button 
                onClick={() => setServiceMode('manage_sub')}
                className={`flex-1 py-2 text-sm font-bold rounded-lg transition-colors ${serviceMode === 'manage_sub' ? 'bg-purple-500 text-white' : 'bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-white/10'}`}
              >
                Manage Sub-Services
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              {serviceMode === 'add_sub' && (
                <form onSubmit={(e) => {
                  e.preventDefault();
                  newService.category_id = selectedService.id;
                  handleAddService(e);
                  setServiceMode('manage_sub');
                }} className="space-y-4">
                  <input required placeholder="Service Name" value={newService.name} onChange={e => setNewService({...newService, name: e.target.value})} className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2 text-sm text-gray-900 dark:text-white focus:outline-none" />
                  <textarea placeholder="Description (Optional)" value={newService.description} onChange={e => setNewService({...newService, description: e.target.value})} className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2 text-sm text-gray-900 dark:text-white focus:outline-none resize-none" rows={3} />
                  <button type="submit" className="w-full flex justify-start items-center gap-2 bg-purple-500 text-white px-4 py-3 rounded-lg text-sm font-bold hover:bg-purple-400 transition-colors">
                    <Plus className="w-4 h-4" /> Save Sub-Service
                  </button>
                </form>
              )}
              {serviceMode === 'manage_sub' && (
                <div className="space-y-2">
                  {services.filter(s => s.category_id === selectedService?.id).length === 0 ? (
                    <p className="text-left text-sm text-gray-500 mt-8">No sub-services added yet.</p>
                  ) : (
                    services.filter(s => s.category_id === selectedService?.id).map(s => (
                      <div key={s.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-200 dark:border-white/10">
                        <span className="font-bold text-gray-900 dark:text-white text-sm">{s.name}</span>
                        <button onClick={() => handleDeleteService(s.id)} className="p-2 text-red-500 bg-red-50 dark:bg-red-500/10 rounded-lg hover:bg-red-100 dark:hover:bg-red-500/20 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );

  const renderAboutCMS = () => (
    <div className="space-y-8">
      {/* Company Info */}
      <div className="bg-white dark:bg-[#0a0e14] border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Database className="w-5 h-5 text-cyan-500" /> Company Description
          </h3>
          <button 
            onClick={() => {
              if (isEditingCompany) handleUpdateCompany();
              else setIsEditingCompany(true);
            }}
            className="text-xs font-bold bg-cyan-500/10 text-cyan-600 px-4 py-2 rounded-lg hover:bg-cyan-500/20"
          >
            {isEditingCompany ? 'Save Changes' : 'Edit Company'}
          </button>
        </div>
        {isEditingCompany ? (
          <div className="space-y-4">
            <input 
              type="text" 
              value={aboutCompany.title} 
              onChange={e => setAboutCompany({...aboutCompany, title: e.target.value})}
              className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-cyan-500 dark:text-white"
              placeholder="Company Title"
            />
            <textarea 
              value={aboutCompany.description} 
              onChange={e => setAboutCompany({...aboutCompany, description: e.target.value})}
              className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-cyan-500 min-h-[120px] dark:text-white"
              placeholder="Company Description"
            />
          </div>
        ) : (
          <div>
            <h4 className="text-md font-bold text-gray-900 dark:text-white mb-2">{aboutCompany.title || 'No Title'}</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">{aboutCompany.description || 'No Description'}</p>
          </div>
        )}
      </div>

      {/* Team Members */}
      <div className="bg-white dark:bg-[#0a0e14] border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-xl">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-6">
          <Users className="w-5 h-5 text-cyan-500" /> Team Members
        </h3>
        
        <form onSubmit={handleAddTeamMember} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 bg-black/5 dark:bg-white/5 p-4 rounded-xl">
          <input type="text" placeholder="Name" required value={newTeamMember.name} onChange={e => setNewTeamMember({...newTeamMember, name: e.target.value})} className="bg-white dark:bg-[#0a0e14] border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-cyan-500 dark:text-white" />
          <input type="text" placeholder="Role" required value={newTeamMember.role} onChange={e => setNewTeamMember({...newTeamMember, role: e.target.value})} className="bg-white dark:bg-[#0a0e14] border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-cyan-500 dark:text-white" />
          
          <div className="md:col-span-2 flex flex-col md:flex-row gap-4 items-center bg-white dark:bg-[#0a0e14] border border-black/10 dark:border-white/10 rounded-xl px-4 py-2">
            <input type="text" placeholder="Image URL (optional)" value={newTeamMember.image_url} onChange={e => setNewTeamMember({...newTeamMember, image_url: e.target.value})} className="flex-1 bg-transparent text-sm focus:outline-none dark:text-white w-full py-1" />
            <span className="text-gray-400 text-xs font-bold uppercase shrink-0">OR</span>
            <input type="file" accept="image/*" onChange={handleImageUpload} className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-cyan-50 file:text-cyan-700 hover:file:bg-cyan-100 shrink-0 cursor-pointer w-full md:w-auto" />
          </div>
          
          <textarea placeholder="Bio" required value={newTeamMember.bio} onChange={e => setNewTeamMember({...newTeamMember, bio: e.target.value})} className="bg-white dark:bg-[#0a0e14] border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-cyan-500 min-h-[80px] dark:text-white md:col-span-2" />
          <button type="submit" className="md:col-span-2 bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors">
            <Plus className="w-4 h-4" /> Add Team Member
          </button>
        </form>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {teamMembers.map(member => (
            <div key={member.id} className="p-4 border border-gray-200 dark:border-white/10 rounded-xl flex items-start justify-between gap-4">
              <div className="flex gap-4">
                <img src={member.image_url || 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=400&q=80'} alt={member.name} className="w-16 h-16 rounded-lg object-cover" />
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white">{member.name}</h4>
                  <p className="text-xs text-cyan-600 dark:text-cyan-400 font-bold mb-1">{member.role}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">{member.bio}</p>
                </div>
              </div>
              <button onClick={() => handleDeleteTeamMember(member.id)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
          {teamMembers.length === 0 && <p className="text-sm text-gray-500 col-span-2 py-4">No team members found.</p>}
        </div>
      </div>
    </div>
  );

  const renderReviewsCMS = () => (
    <div className="space-y-8">
      {/* Add Review Form */}
      <div className="bg-white dark:bg-[#0a0e14] border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-xl">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-6">
          <Plus className="w-5 h-5 text-cyan-500" /> Add New Review
        </h3>
        <form onSubmit={handleAddReview} className="space-y-4">
          <textarea
            required
            placeholder="Review text..."
            value={newReview.text}
            onChange={e => setNewReview({...newReview, text: e.target.value})}
            className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-cyan-500 min-h-[100px] dark:text-white"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              required
              type="text"
              placeholder="Author name"
              value={newReview.author}
              onChange={e => setNewReview({...newReview, author: e.target.value})}
              className="bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-cyan-500 dark:text-white"
            />
            <input
              required
              type="text"
              placeholder="Role (e.g. CTO, FinTech)"
              value={newReview.role}
              onChange={e => setNewReview({...newReview, role: e.target.value})}
              className="bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-cyan-500 dark:text-white"
            />
            <div className="flex items-center gap-2">
              <label className="text-xs text-gray-500 font-bold uppercase tracking-wider shrink-0">Rating</label>
              <div className="flex gap-1">
                {[1,2,3,4,5].map(star => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setNewReview({...newReview, rating: star})}
                    className="p-1 transition-colors"
                  >
                    <Star className={`w-5 h-5 ${star <= newReview.rating ? 'fill-cyan-400 text-cyan-400' : 'text-gray-300 dark:text-gray-600'}`} />
                  </button>
                ))}
              </div>
            </div>
          </div>
          <button type="submit" className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-6 rounded-xl flex items-center gap-2 transition-colors">
            <Plus className="w-4 h-4" /> Add Review
          </button>
        </form>
      </div>

      {/* Reviews List */}
      <div className="bg-white dark:bg-[#0a0e14] border border-gray-200 dark:border-white/10 rounded-2xl shadow-xl overflow-hidden">
        {(() => {
          const filteredReviews = reviews.filter(r => {
            const matchName = r.author?.toLowerCase().includes(reviewFilterName.toLowerCase()) ?? true;
            const matchRole = r.role?.toLowerCase().includes(reviewFilterRole.toLowerCase()) ?? true;
            const matchStar = reviewFilterStar === '' || r.rating === reviewFilterStar;
            const matchStatus = 
              reviewFilterStatus === 'all'
                ? (r.status !== 'rejected')
                : (reviewFilterStatus === 'pending' && (!r.status || r.status === 'pending')) ||
                  (reviewFilterStatus === 'approved' && r.status === 'approved') ||
                  (reviewFilterStatus === 'rejected' && r.status === 'rejected');
            return matchName && matchRole && matchStar && matchStatus;
          });

          const paginatedReviews = filteredReviews.slice((reviewPage - 1) * 10, reviewPage * 10);
          const totalPages = Math.ceil(filteredReviews.length / 10);

          return (
            <>
              <div className="p-6 border-b border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <Star className="w-5 h-5 text-cyan-500" /> Review Management ({filteredReviews.length})
                  </h3>
                  <button 
                    onClick={fetchReviews} 
                    disabled={isRefreshingReviews} 
                    className="p-2 rounded-lg bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors disabled:opacity-50"
                  >
                    <RefreshCw className={`w-4 h-4 text-gray-600 dark:text-gray-400 ${isRefreshingReviews ? 'animate-spin' : ''}`} />
                  </button>
                </div>
                <div className="flex flex-col md:flex-row gap-4">
                  <input
                    type="text"
                    placeholder="Filter by Name"
                    value={reviewFilterName}
                    onChange={e => { setReviewFilterName(e.target.value); setReviewPage(1); }}
                    className="bg-white dark:bg-[#0a0e14] border border-gray-200 dark:border-white/10 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-cyan-500 flex-1"
                  />
                  <input
                    type="text"
                    placeholder="Filter by Role"
                    value={reviewFilterRole}
                    onChange={e => { setReviewFilterRole(e.target.value); setReviewPage(1); }}
                    className="bg-white dark:bg-[#0a0e14] border border-gray-200 dark:border-white/10 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-cyan-500 flex-1"
                  />
                  <select
                    value={reviewFilterStar}
                    onChange={e => { setReviewFilterStar(e.target.value === '' ? '' : Number(e.target.value)); setReviewPage(1); }}
                    className="bg-white dark:bg-[#0a0e14] border border-gray-200 dark:border-white/10 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="">All Stars</option>
                    <option value="5">5 Stars</option>
                    <option value="4">4 Stars</option>
                    <option value="3">3 Stars</option>
                    <option value="2">2 Stars</option>
                    <option value="1">1 Star</option>
                  </select>
                  <select
                    value={reviewFilterStatus}
                    onChange={e => { setReviewFilterStatus(e.target.value); setReviewPage(1); }}
                    className="bg-white dark:bg-[#0a0e14] border border-gray-200 dark:border-white/10 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="all">All Statuses</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
              </div>
              <div className="divide-y divide-gray-100 dark:divide-white/5">
                {paginatedReviews.length === 0 ? (
                  <div className="p-8 text-center text-gray-500 text-sm">No reviews match your filters.</div>
                ) : (
                  paginatedReviews.map(review => (
              <div key={review.id} className="p-6 transition-colors">
                {editingReviewId === review.id ? (
                  <div className="space-y-4">
                    <textarea
                      value={editingReview.text}
                      onChange={e => setEditingReview({...editingReview, text: e.target.value})}
                      className="w-full bg-black/5 dark:bg-white/5 border border-cyan-500/50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-cyan-500 min-h-[80px] dark:text-white"
                    />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <input
                        type="text"
                        value={editingReview.author}
                        onChange={e => setEditingReview({...editingReview, author: e.target.value})}
                        className="bg-black/5 dark:bg-white/5 border border-cyan-500/50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-cyan-500 dark:text-white"
                      />
                      <input
                        type="text"
                        value={editingReview.role}
                        onChange={e => setEditingReview({...editingReview, role: e.target.value})}
                        className="bg-black/5 dark:bg-white/5 border border-cyan-500/50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-cyan-500 dark:text-white"
                      />
                      <div className="flex items-center gap-2">
                        <label className="text-xs text-gray-500 font-bold uppercase tracking-wider shrink-0">Rating</label>
                        <div className="flex gap-1">
                          {[1,2,3,4,5].map(star => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => setEditingReview({...editingReview, rating: star})}
                              className="p-1 transition-colors"
                            >
                              <Star className={`w-5 h-5 ${star <= editingReview.rating ? 'fill-cyan-400 text-cyan-400' : 'text-gray-300 dark:text-gray-600'}`} />
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleUpdateReview(review.id)}
                        className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg text-sm transition-colors"
                      >
                        <Check className="w-4 h-4" /> Save
                      </button>
                      <button
                        onClick={() => setEditingReviewId(null)}
                        className="flex items-center gap-2 bg-gray-200 dark:bg-white/10 hover:bg-gray-300 dark:hover:bg-white/20 text-gray-700 dark:text-gray-300 font-bold py-2 px-4 rounded-lg text-sm transition-colors"
                      >
                        <X className="w-4 h-4" /> Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    {/* Left & Middle details */}
                    <div className="flex-1 flex items-start gap-4">
                      {/* User Avatar */}
                      <div className="w-12 h-12 rounded-full bg-cyan-950/40 border border-cyan-500/20 flex items-center justify-center text-cyan-400 font-black text-lg shrink-0">
                        {review.author?.charAt(0).toUpperCase()}
                      </div>

                      {/* Name, Badge, Time, Rating & Text */}
                      <div className="space-y-2 text-left">
                        {/* Name and Role Info */}
                        <div className="flex flex-col">
                          <h4 className="font-extrabold text-gray-900 dark:text-white text-xl leading-tight">
                            {review.author}
                          </h4>
                          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mt-1">
                            <span className="font-semibold text-cyan-400">
                              {review.role || "Customer"}
                            </span>
                            <span>•</span>
                            <span>
                              {review.created_at 
                                ? new Date(review.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
                                : "Just now"}
                            </span>
                          </div>
                        </div>

                        {/* Stars and Rating value */}
                        <div className="flex items-center gap-2 pt-1">
                          <div className="flex gap-0.5">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`w-4 h-4 ${
                                  star <= review.rating
                                    ? "fill-cyan-400 text-cyan-400"
                                    : "text-gray-300 dark:text-gray-700"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-xs text-gray-500 font-bold">
                            ({review.rating}.0)
                          </span>
                        </div>

                        {/* Review text */}
                        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed pt-1">
                          {review.text}
                        </p>
                      </div>
                    </div>

                    {/* Right side controls (Approve/Reject Toggle & Action buttons) */}
                    <div className="flex flex-col items-center md:items-end gap-3 shrink-0">
                      {/* Approve / Toggle / Reject Switch */}
                      <div className="flex items-center gap-3">
                        {/* Pending Label before Approve when status is pending */}
                        {(!review.status || review.status === "pending") && (
                          <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md border bg-cyan-500/10 text-cyan-500 border-cyan-500/20 mr-1 animate-pulse">
                            Pending
                          </span>
                        )}

                        <span 
                          onClick={() => handleUpdateReviewStatus(review.id, "approved")}
                          className={`text-xs font-bold cursor-pointer transition-colors ${
                            review.status === "approved" 
                              ? "text-green-500 font-extrabold" 
                              : "text-gray-500 hover:text-gray-300 font-medium"
                          }`}
                        >
                          Approve
                        </span>

                        {/* Standard 2-way toggle switch (Approve <-> Reject) */}
                        <button
                          type="button"
                          onClick={() => 
                            handleUpdateReviewStatus(
                              review.id, 
                              review.status === "approved" ? "rejected" : "approved"
                            )
                          }
                          className={`w-14 h-7 rounded-full p-1 transition-colors duration-300 flex items-center relative focus:outline-none ${
                            review.status === "approved" 
                              ? "bg-green-600" 
                              : "bg-red-600"
                          }`}
                        >
                          <div
                            className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-300 ${
                              review.status === "approved" ? "translate-x-7" : "translate-x-0"
                            }`}
                          />
                        </button>

                        <span 
                          onClick={() => handleUpdateReviewStatus(review.id, "rejected")}
                          className={`text-xs font-bold cursor-pointer transition-colors ${
                            review.status === "rejected" 
                              ? "text-red-500 font-extrabold" 
                              : "text-gray-500 hover:text-gray-300 font-medium"
                          }`}
                        >
                          Reject
                        </span>
                      </div>

                      {/* Action buttons (No status badge underneath toggle switch) */}
                      <div className="flex items-center gap-1 mt-1">
                        <button
                          onClick={() => {
                            setEditingReviewId(review.id);
                            setEditingReview({
                              text: review.text,
                              author: review.author,
                              role: review.role,
                              rating: review.rating,
                            });
                          }}
                          className="p-1.5 text-gray-400 hover:text-cyan-400 hover:bg-cyan-500/10 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteReview(review.id)}
                          className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
        {totalPages > 1 && (
          <div className="p-4 border-t border-gray-200 dark:border-white/10 flex justify-center items-center gap-4 bg-gray-50 dark:bg-white/5">
            <button
              onClick={() => setReviewPage(p => Math.max(1, p - 1))}
              disabled={reviewPage === 1}
              className="px-4 py-2 rounded-lg bg-white dark:bg-[#0a0e14] border border-gray-200 dark:border-white/10 disabled:opacity-50 text-sm font-bold text-gray-700 dark:text-gray-300 transition-colors hover:bg-gray-50 dark:hover:bg-white/10"
            >
              Previous
            </button>
            <span className="text-sm font-bold text-gray-600 dark:text-gray-400">
              Page {reviewPage} of {totalPages}
            </span>
            <button
              onClick={() => setReviewPage(p => Math.min(totalPages, p + 1))}
              disabled={reviewPage === totalPages}
              className="px-4 py-2 rounded-lg bg-white dark:bg-[#0a0e14] border border-gray-200 dark:border-white/10 disabled:opacity-50 text-sm font-bold text-gray-700 dark:text-gray-300 transition-colors hover:bg-gray-50 dark:hover:bg-white/10"
            >
              Next
            </button>
          </div>
        )}
      </>
    );
  })()}
      </div>
    </div>
  );

  if (loading) return <div className="min-h-screen bg-white dark:bg-[#0a0e14] pt-32"></div>;
  if (!user) return null;

  return (
    <div className="min-h-screen pt-16 sm:pt-24 pb-20 bg-gray-50 dark:bg-[#05080c] relative">
      <Helmet>
        <title>Admin Dashboard | Nexavise</title>
      </Helmet>
      
      {/* Background Graphic */}
      <div className="absolute inset-0 z-[0] cyber-grid opacity-10 pointer-events-none" />
      <div className="orb orb-cyan w-[800px] h-[800px] top-[-200px] right-[-200px] z-[0] opacity-20 pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 max-w-[1440px] relative z-10">
        <div className="flex flex-col md:flex-row gap-6 md:gap-8">
          
          {/* SIDEBAR */}
          <div className="w-full md:w-64 flex-shrink-0">
            <div className="bg-white dark:bg-[#0a0e14] border border-gray-200 dark:border-white/10 rounded-2xl p-3 sm:p-4 shadow-xl md:sticky md:top-32">
              <div className="hidden md:flex mb-8 px-4 items-center gap-3">
                <ShieldCheck className="w-8 h-8 text-cyan-500" />
                <div>
                  <h2 className="font-bold text-gray-900 dark:text-white">Admin Hub</h2>
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest">Command Center</p>
                </div>
              </div>

              <nav className="flex md:flex-col flex-row overflow-x-auto gap-1 sm:gap-2 pb-1 md:pb-0 space-x-1 md:space-x-0 md:space-y-2 custom-scrollbar">
                <button 
                  onClick={() => setActiveTab('analytics')}
                  className={`flex-shrink-0 flex items-center gap-2 md:gap-3 px-3 md:px-4 py-2.5 md:py-3 rounded-xl font-bold text-xs md:text-sm transition-colors whitespace-nowrap ${activeTab === 'analytics' ? 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5'}`}
                >
                  <Activity className="w-4 h-4 shrink-0" /> Analytics
                </button>
                <button 
                  onClick={() => setActiveTab('inquiries')}
                  className={`flex-shrink-0 flex items-center gap-2 md:gap-3 px-3 md:px-4 py-2.5 md:py-3 rounded-xl font-bold text-xs md:text-sm transition-colors whitespace-nowrap ${activeTab === 'inquiries' ? 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5'}`}
                >
                  <MessageSquare className="w-4 h-4 shrink-0" /> Inquiries
                </button>
                <button 
                  onClick={() => setActiveTab('content')}
                  className={`flex-shrink-0 flex items-center gap-2 md:gap-3 px-3 md:px-4 py-2.5 md:py-3 rounded-xl font-bold text-xs md:text-sm transition-colors whitespace-nowrap ${activeTab === 'content' ? 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5'}`}
                >
                  <Database className="w-4 h-4 shrink-0" /> Content CMS
                </button>
                <button 
                  onClick={() => setActiveTab('about')}
                  className={`flex-shrink-0 flex items-center gap-2 md:gap-3 px-3 md:px-4 py-2.5 md:py-3 rounded-xl font-bold text-xs md:text-sm transition-colors whitespace-nowrap ${activeTab === 'about' ? 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5'}`}
                >
                  <Users className="w-4 h-4 shrink-0" /> About Page CMS
                </button>
                <button 
                  onClick={() => setActiveTab('reviews')}
                  className={`flex-shrink-0 flex items-center gap-2 md:gap-3 px-3 md:px-4 py-2.5 md:py-3 rounded-xl font-bold text-xs md:text-sm transition-colors whitespace-nowrap ${activeTab === 'reviews' ? 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5'}`}
                >
                  <Star className="w-4 h-4 shrink-0" /> Reviews CMS
                </button>
              </nav>
            </div>
          </div>

          {/* MAIN CONTENT */}
          <div className="flex-1">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'analytics' && renderAnalytics()}
              {activeTab === 'inquiries' && renderInquiries()}
              {activeTab === 'content' && renderContent()}
              {activeTab === 'about' && renderAboutCMS()}
              {activeTab === 'reviews' && renderReviewsCMS()}
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
};
