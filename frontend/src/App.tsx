import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { AccessibilityBar } from "./components/AccessibilityBar";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { Contact } from "./pages/Contact";
import { Services } from "./pages/Services";
import { ServiceDetail } from "./pages/ServiceDetail";
import { Sectors } from "./pages/Sectors";
import { SectorDetail } from "./pages/SectorDetail";
import { SectorServiceDetail } from "./pages/SectorServiceDetail";
import { ServiceCategoryDetail } from "./pages/ServiceCategoryDetail";
import { WhyUs } from "./pages/WhyUs";
import { AdminDashboard } from "./pages/AdminDashboard";
import { Login } from "./pages/Login";
import { AboutUs } from "./pages/AboutUs";
import { LegalPolicy } from "./pages/LegalPolicy";
import { Helmet } from 'react-helmet-async';
import { ThemeProvider } from "./contexts/ThemeContext";
import { LocationProvider } from "./contexts/LocationContext";
import { LocationModal } from "./components/LocationModal";
import { CookieBanner } from "./components/CookieBanner";
import { AuthProvider } from "./contexts/AuthContext";
import { DataProvider } from "./contexts/DataContext";


function App() {
  return (
    <ThemeProvider>
      <LocationProvider>
        <AuthProvider>
          <DataProvider>
            <div className="min-h-screen text-foreground flex flex-col justify-between overflow-x-hidden selection:bg-cyan-500/30 transition-colors duration-300">
              <Helmet>
                <title>Nexavise | Enterprise Cybersecurity Hub</title>
                <meta name="description" content="Comprehensive GRC advisory, VAPT testing, and managed SOC." />
              </Helmet>
              
              <AccessibilityBar />
              <Navbar />
              
              <main id="main-content" className="flex-grow">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/services/category/:categoryId" element={<ServiceCategoryDetail />} />
                  <Route path="/services/category/:categoryId/:serviceId" element={<ServiceDetail />} />
                  <Route path="/why-us" element={<WhyUs />} />
                  <Route path="/about" element={<AboutUs />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/sectors" element={<Sectors />} />
                  <Route path="/sectors/:sectorId" element={<SectorDetail />} />
                  <Route path="/sectors/:sectorId/:serviceId" element={<SectorServiceDetail />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/admin" element={<AdminDashboard />} />
                  <Route path="/privacy-policy" element={<LegalPolicy />} />
                  <Route path="/terms-of-service" element={<LegalPolicy />} />
                  <Route path="/cookie-policy" element={<LegalPolicy />} />
                </Routes>
              </main>
              
              <LocationModal />

              <CookieBanner />
              <Footer />
            </div>
          </DataProvider>
        </AuthProvider>
      </LocationProvider>
    </ThemeProvider>
  );
}

export default App;
