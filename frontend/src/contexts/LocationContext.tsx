import React, { createContext, useContext, useState } from 'react';

export interface LocationData {
  id: string;
  name: string;
  region: string;
  code: string;
}

export const defaultLocations: LocationData[] = [
  { id: 'all-india', name: 'All India', region: 'National', code: 'IN' },
  { id: 'mum', name: 'Mumbai', region: 'Maharashtra', code: 'MH' },
  { id: 'del', name: 'Delhi', region: 'NCR', code: 'DL' },
  { id: 'blr', name: 'Bengaluru', region: 'Karnataka', code: 'KA' },
  { id: 'hyd', name: 'Hyderabad', region: 'Telangana', code: 'TS' },
  { id: 'maa', name: 'Chennai', region: 'Tamil Nadu', code: 'TN' },
  { id: 'pnq', name: 'Pune', region: 'Maharashtra', code: 'MH' },
  { id: 'amd', name: 'Ahmedabad', region: 'Gujarat', code: 'GJ' },
  { id: 'ccu', name: 'Kolkata', region: 'West Bengal', code: 'WB' },
];

interface LocationContextType {
  currentLocation: LocationData;
  setCurrentLocation: (loc: LocationData) => void;
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export const LocationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLocation, setCurrentLocationState] = useState<LocationData>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('user_location');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error("Failed to parse location from storage", e);
        }
      }
    }
    return defaultLocations[0];
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const setCurrentLocation = (loc: LocationData) => {
    setCurrentLocationState(loc);
    if (typeof window !== 'undefined') {
      localStorage.setItem('user_location', JSON.stringify(loc));
    }
  };

  return (
    <LocationContext.Provider value={{ currentLocation, setCurrentLocation, isModalOpen, setIsModalOpen }}>
      {children}
    </LocationContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useLocation = () => {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
};
