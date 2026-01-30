import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import UserLogin from "./pages/UserLogin";
import NGOLogin from "./pages/NGOLogin";
import UserDashboard from "./pages/UserDashboard";
import NGODashboard from "./pages/NGODashboard";
import CampaignsPage from "./pages/CampaignsPage";
import CampaignDetail from "./pages/CampaignDetail";
import NGOsPage from "./pages/NGOsPage";
import NGODetail from "./pages/NGODetail";
import NGOPricing from "./pages/NGOPricing";
import NGORegister from "./pages/NGORegister";
import ImpactPage from "./pages/ImpactPage";
import ContactPage from "./pages/ContactPage";
import VolunteerPage from "./pages/VolunteerPage";
import DonatePage from "./pages/DonatePage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Index />} />
          <Route path="/campaigns" element={<CampaignsPage />} />
          <Route path="/campaigns/:id" element={<CampaignDetail />} />
          <Route path="/ngos" element={<NGOsPage />} />
          <Route path="/ngos/:id" element={<NGODetail />} />
          <Route path="/impact" element={<ImpactPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/volunteer" element={<VolunteerPage />} />
          <Route path="/donate" element={<DonatePage />} />
          
          {/* User Auth */}
          <Route path="/login" element={<UserLogin />} />
          <Route path="/dashboard" element={<UserDashboard />} />
          
          {/* NGO Auth */}
          <Route path="/ngo/login" element={<NGOLogin />} />
          <Route path="/ngo/register" element={<NGORegister />} />
          <Route path="/ngo/pricing" element={<NGOPricing />} />
          <Route path="/ngo/dashboard" element={<NGODashboard />} />
          
          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
