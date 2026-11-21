import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';
import { BookmarkProvider } from './context/BookmarkContext';

import EmergencyBanner from './components/EmergencyBanner';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SavedDrawer from './components/SavedDrawer';

import HomePage from './pages/HomePage';
import LawsPage from './pages/LawsPage';
import LawDetailPage from './pages/LawDetailPage';
import VictimSupportPage from './pages/VictimSupportPage';
import AiAssistantPage from './pages/AiAssistantPage';
import LawyersPage from './pages/LawyersPage';
import LawyerProfilePage from './pages/LawyerProfilePage';
import BookingPage from './pages/BookingPage';
import CourtsPage from './pages/CourtsPage';
import AwarenessPage from './pages/AwarenessPage';
import TemplatesPage from './pages/TemplatesPage';
import EmergencyPage from './pages/EmergencyPage';
import AmendmentsPage from './pages/AmendmentsPage';
import ClientDashboardPage from './pages/ClientDashboardPage';
import LawyerDashboardPage from './pages/LawyerDashboardPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <BookmarkProvider>
          <Router>
            <div className="flex flex-col min-h-screen bg-[#F8FAF9] text-slate-800 font-sans selection:bg-bdGreen-800 selection:text-white">
              <EmergencyBanner />
              <Navbar />
              <SavedDrawer />

              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/laws" element={<LawsPage />} />
                  <Route path="/laws/:id" element={<LawDetailPage />} />
                  <Route path="/victim-support" element={<VictimSupportPage />} />
                  <Route path="/ai-assistant" element={<AiAssistantPage />} />
                  <Route path="/lawyers" element={<LawyersPage />} />
                  <Route path="/lawyers/:id" element={<LawyerProfilePage />} />
                  <Route path="/booking/:lawyerId" element={<BookingPage />} />
                  <Route path="/courts" element={<CourtsPage />} />
                  <Route path="/compare-lawyers" element={<CourtsPage />} />
                  <Route path="/awareness" element={<AwarenessPage />} />
                  <Route path="/templates" element={<TemplatesPage />} />
                  <Route path="/emergency" element={<EmergencyPage />} />
                  <Route path="/amendments" element={<AmendmentsPage />} />
                  <Route path="/dashboard/client" element={<ClientDashboardPage />} />
                  <Route path="/dashboard/lawyer" element={<LawyerDashboardPage />} />
                  <Route path="/dashboard/admin" element={<AdminDashboardPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                </Routes>
              </main>

              <Footer />
            </div>
          </Router>
        </BookmarkProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}
