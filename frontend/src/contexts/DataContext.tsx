import React, { createContext, useContext, useEffect, useState } from 'react';
import * as Icons from 'lucide-react';
import { sectorsData as defaultSectors } from '../lib/sectors-data';
import { allServicesData as defaultServices, groupedServices as defaultGrouped } from '../lib/services-data';

interface DataContextType {
  sectorsData: any[];
  serviceCategories: any[];
  allServicesData: any[];
  groupedServices: Record<string, any[]>;
  aboutInfo: any;
  teamMembers: any[];
  loading: boolean;
  refreshData: () => Promise<void>;
}

const defaultCategories = Object.keys(defaultGrouped).map((key) => ({
  id: key.toLowerCase(),
  name: key,
  desc: `${key} Services`,
  icon: Icons.Shield
}));

const DataContext = createContext<DataContextType>({
  sectorsData: defaultSectors,
  serviceCategories: defaultCategories,
  allServicesData: defaultServices,
  groupedServices: defaultGrouped,
  aboutInfo: { title: 'Our Mission & Vision', description: 'We are dedicated to providing the highest level of enterprise cybersecurity solutions globally.' },
  teamMembers: [],
  loading: true,
  refreshData: async () => {},
});

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [sectorsData, setSectorsData] = useState<any[]>(defaultSectors);
  const [serviceCategories, setServiceCategories] = useState<any[]>(defaultCategories);
  const [allServicesData, setAllServicesData] = useState<any[]>(defaultServices);
  const [groupedServices, setGroupedServices] = useState<Record<string, any[]>>(defaultGrouped);
  const [aboutInfo, setAboutInfo] = useState<any>({ title: 'Our Mission & Vision', description: 'We are dedicated to providing the highest level of enterprise cybersecurity solutions globally.' });
  const [teamMembers, setTeamMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const refreshData = async () => {
    try {
      const [categoriesRes, servicesRes, sectorsRes, sectorServicesRes, aboutRes] = await Promise.all([
        fetch('/api/service_categories').catch(() => null),
        fetch('/api/services').catch(() => null),
        fetch('/api/sectors').catch(() => null),
        fetch('/api/sector_services').catch(() => null),
        fetch('/api/about').catch(() => null)
      ]);

      if (categoriesRes && categoriesRes.ok && servicesRes && servicesRes.ok) {
        let categories = await categoriesRes.json();
        let services = await servicesRes.json();
        
        if (categories.length > 0) {
          categories = categories.map((c: any) => ({
            ...c,
            icon: (Icons as any)[c.icon] || Icons.Shield,
            desc: c.description
          }));
          
          setServiceCategories(categories);
          setAllServicesData(services);
          const grouped = services.reduce((acc: any, curr: any) => {
            const cat = categories.find((c: any) => c.id === curr.category_id);
            const catName = cat ? cat.name : curr.category_id;
            if (!acc[catName]) acc[catName] = [];
            acc[catName].push(curr);
            return acc;
          }, {});
          setGroupedServices(grouped);
        }
      }

      if (sectorsRes && sectorsRes.ok && sectorServicesRes && sectorServicesRes.ok) {
        let sectors = await sectorsRes.json();
        let sectorServices = await sectorServicesRes.json();
        
        if (sectors.length > 0) {
          sectors = sectors.map((s: any) => ({
            ...s,
            icon: (Icons as any)[s.icon] || Icons.Shield,
            desc: s.description,
            services: sectorServices.filter((ss: any) => ss.sector_id === s.id)
          }));
          setSectorsData(sectors);
        }
      }

      if (aboutRes && aboutRes.ok) {
        const aboutData = await aboutRes.json();
        if (aboutData.company) setAboutInfo(aboutData.company);
        if (aboutData.team) setTeamMembers(aboutData.team);
      }
    } catch (e) {
      console.error("Failed to fetch live data", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  return (
    <DataContext.Provider value={{ sectorsData, serviceCategories, allServicesData, groupedServices, aboutInfo, teamMembers, loading, refreshData }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
