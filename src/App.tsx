
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from './contexts/AuthContext';
import { SuperAdminProvider } from './contexts/SuperAdminContext';

// Pages
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import DirectoryList from "./pages/Directory/DirectoryList";
import DirectoryDetail from "./pages/Directory/DirectoryDetail";
import PersonalHub from "./pages/Personal/PersonalHub";
import BusinessHub from "./pages/Business/BusinessHub";
import BusinessAdInput from "./pages/Business/BusinessAdInput";
import ClassifiedsHub from "./pages/Classifieds/ClassifiedsHub";
import EventsHub from "./pages/Events/EventsHub";
import Protected from "./pages/Protected";
import NotFound from "./pages/NotFound";
import DetailsPage from "./pages/Details/DetailsPage";
import UserProfile from "./pages/Profile/UserProfile";
import SuperAdminDashboard from "./pages/Admin/SuperAdminDashboard";

// Design Pages
import BusinessDesigner from "./pages/Design/BusinessDesigner";
import ClassifiedDesigner from "./pages/Design/ClassifiedDesigner";
import EventDesigner from "./pages/Design/EventDesigner";
import PersonalDesigner from "./pages/Design/PersonalDesigner";
import BannerDesigner from "./pages/Design/BannerDesigner";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <SuperAdminProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/auth/login" element={<Login />} />
              <Route path="/auth/register" element={<Register />} />
              <Route path="/directory" element={<Protected><DirectoryList /></Protected>} />
              <Route path="/directory/:id" element={<Protected><DirectoryDetail /></Protected>} />
              <Route path="/personal" element={<Protected><PersonalHub /></Protected>} />
              <Route path="/business" element={<Protected><BusinessHub /></Protected>} />
              <Route path="/business/advertise" element={<Protected><BusinessAdInput /></Protected>} />
              <Route path="/classifieds" element={<Protected><ClassifiedsHub /></Protected>} />
              <Route path="/events" element={<Protected><EventsHub /></Protected>} />
              <Route path="/details/:id" element={<Protected><DetailsPage /></Protected>} />
              <Route path="/profile" element={<Protected><UserProfile /></Protected>} />
              <Route path="/admin/super" element={<Protected><SuperAdminDashboard /></Protected>} />
              
              {/* Design Routes */}
              <Route path="/design/business" element={<Protected><BusinessDesigner /></Protected>} />
              <Route path="/design/classifieds" element={<Protected><ClassifiedDesigner /></Protected>} />
              <Route path="/design/events" element={<Protected><EventDesigner /></Protected>} />
              <Route path="/design/personal" element={<Protected><PersonalDesigner /></Protected>} />
              <Route path="/design/banners" element={<Protected><BannerDesigner /></Protected>} />
              
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </SuperAdminProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
