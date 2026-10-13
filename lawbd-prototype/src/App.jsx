import React, { useState, useMemo, useEffect } from 'react';
import EmergencyBanner from './components/EmergencyBanner.jsx';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import ProblemFinderWizard from './components/ProblemFinderWizard.jsx';
import LawsSection from './components/LawsSection.jsx';
import LawDetailsModal from './components/LawDetailsModal.jsx';
import LawyersSection from './components/LawyersSection.jsx';
import LawyerProfileModal from './components/LawyerProfileModal.jsx';
import LawyerComparisonModal from './components/LawyerComparisonModal.jsx';
import AppointmentModal from './components/AppointmentModal.jsx';
import DirectMessageModal from './components/DirectMessageModal.jsx';
import BookingsManagementModal from './components/BookingsManagementModal.jsx';
import DocumentChecklistSection from './components/DocumentChecklistSection.jsx';
import FaqSection from './components/FaqSection.jsx';
import DictionarySection from './components/DictionarySection.jsx';
import SavedDrawer from './components/SavedDrawer.jsx';
import NotificationDrawer from './components/NotificationDrawer.jsx';
import Footer from './components/Footer.jsx';

import { lawCategories, lawsList } from './data/lawsData.js';
import { lawyersList, lawyerSpecialties, bangladeshDivisions } from './data/lawyersData.js';

export default function App() {
  // Navigation & Scroll
  function scrollToSection(id) {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  // Toast Notification
  const [toastMessage, setToastMessage] = useState('');
  function showToast(msg) {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  }

  // Search State
  const [heroSearch, setHeroSearch] = useState('');

  // Laws Section State
  const [activeLawCategory, setActiveLawCategory] = useState('all');
  const [lawSearchQuery, setLawSearchQuery] = useState('');
  const [selectedLawModal, setSelectedLawModal] = useState(null);

  // Lawyers Section State
  const [activeSpecialty, setActiveSpecialty] = useState('All Specialties');
  const [activeDivision, setActiveDivision] = useState('All Locations');
  const [activeCourt, setActiveCourt] = useState('All Court Levels');
  const [lawyerSortBy, setLawyerSortBy] = useState('top-rated');
  const [lawyerSearchQuery, setLawyerSearchQuery] = useState('');
  const [selectedLawyerProfile, setSelectedLawyerProfile] = useState(null);
  const [selectedLawyerBooking, setSelectedLawyerBooking] = useState(null);
  const [selectedLawyerMessage, setSelectedLawyerMessage] = useState(null);
  const [comparedLawyerIds, setComparedLawyerIds] = useState([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);

  // Saved / Bookmarks State
  const [savedLaws, setSavedLaws] = useState(() => {
    try {
      const saved = localStorage.getItem('lawbd_saved_laws');
      return saved ? JSON.parse(saved) : ['law-cheque-dishonour', 'law-land-disputes'];
    } catch {
      return ['law-cheque-dishonour', 'law-land-disputes'];
    }
  });

  const [savedLawyers, setSavedLawyers] = useState(() => {
    try {
      const saved = localStorage.getItem('lawbd_saved_lawyers');
      return saved ? JSON.parse(saved) : [1];
    } catch {
      return [1];
    }
  });

  const [isSavedDrawerOpen, setIsSavedDrawerOpen] = useState(false);

  // Persist bookmarks
  useEffect(() => {
    localStorage.setItem('lawbd_saved_laws', JSON.stringify(savedLaws));
  }, [savedLaws]);

  useEffect(() => {
    localStorage.setItem('lawbd_saved_lawyers', JSON.stringify(savedLawyers));
  }, [savedLawyers]);

  // Bookings State
  const [bookings, setBookings] = useState(() => {
    try {
      const saved = localStorage.getItem('lawbd_bookings');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return [
      {
        id: 'LBD-2026-8914',
        lawyerId: 1,
        lawyerName: 'Adv. Barrister Tanvir Hasan',
        lawyerInitials: 'TH',
        lawyerCourt: 'Supreme Court of Bangladesh (High Court Division)',
        chamberAddress: 'Room #412, Supreme Court Bar Association Annex Building, Ramna, Dhaka',
        mode: 'Video Consultation',
        date: '2026-10-16',
        time: '11:30 AM',
        fee: '৳1,800',
        problemCategory: 'Criminal Law & Anticipatory Bail',
        problemDescription: 'Consultation regarding pre-arrest protection and FIR vetting.',
        clientName: 'Ahona Rahman',
        clientPhone: '01711-234567',
        clientEmail: 'ahona@example.com',
        clientDistrict: 'Dhaka',
        status: 'Confirmed',
        createdAt: '2026-10-14T00:00:00.000Z'
      }
    ];
  });

  const [isBookingsModalOpen, setIsBookingsModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('lawbd_bookings', JSON.stringify(bookings));
  }, [bookings]);

  // Notifications State
  const [notifications, setNotifications] = useState([
    {
      id: 'n-1',
      title: 'Consultation Confirmed',
      message: 'Your video consultation with Adv. Barrister Tanvir Hasan is scheduled for Oct 16 at 11:30 AM. Video room link is ready in My Bookings.',
      time: '10 mins ago',
      type: 'booking',
      read: false
    },
    {
      id: 'n-2',
      title: 'Legal Statute Update',
      message: 'New rules implemented under the Land Crime Prevention and Redress Act 2023 for reporting illegal land grabbing.',
      time: '2 hours ago',
      type: 'alert',
      read: false
    },
    {
      id: 'n-3',
      title: 'Limitation Window Reminder',
      message: 'Remember that Section 138 NI Act requires serving a formal legal notice within 30 days of receiving the bank cheque return memo.',
      time: '1 day ago',
      type: 'alert',
      read: true
    }
  ]);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const unreadNotificationsCount = notifications.filter((n) => !n.read).length;

  function markAllNotificationsRead() {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    showToast('All notifications marked as read');
  }

  function clearAllNotifications() {
    setNotifications([]);
    showToast('Notifications cleared');
  }

  // Filtered Laws logic
  const filteredLaws = useMemo(() => {
    return lawsList.filter((law) => {
      const matchesCategory = activeLawCategory === 'all' || law.category === activeLawCategory;
      const q = (lawSearchQuery || heroSearch).toLowerCase().trim();
      if (!q) return matchesCategory;

      const combined = `${law.title} ${law.banglaTitle} ${law.simpleSummary} ${law.categoryLabel} ${law.tag} ${law.acts.join(' ')} ${law.penalties}`.toLowerCase();
      return matchesCategory && combined.includes(q);
    });
  }, [activeLawCategory, lawSearchQuery, heroSearch]);

  // Filtered Lawyers logic
  const filteredLawyers = useMemo(() => {
    let result = lawyersList.filter((lawyer) => {
      const matchesSpecialty =
        activeSpecialty === 'All Specialties' ||
        lawyer.specialties.includes(activeSpecialty);

      const matchesDivision =
        activeDivision === 'All Locations' ||
        lawyer.division === activeDivision;

      let matchesCourt = true;
      if (activeCourt === 'High Court Division (Supreme Court)') {
        matchesCourt = lawyer.courtLevel.includes('Supreme Court') || lawyer.courtLevel.includes('High Court');
      } else if (activeCourt === 'District & Sessions Judge Court') {
        matchesCourt = lawyer.courtLevel.includes('District') || lawyer.courtLevel.includes('Judge Court');
      } else if (activeCourt === 'Specialized Tribunals (Cyber/Labour/Family)') {
        matchesCourt = lawyer.courtLevel.includes('Tribunal') || lawyer.courtLevel.includes('Labour') || lawyer.courtLevel.includes('Family');
      }

      const q = lawyerSearchQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        lawyer.name.toLowerCase().includes(q) ||
        lawyer.chamberAddress.toLowerCase().includes(q) ||
        lawyer.specialties.some((s) => s.toLowerCase().includes(q)) ||
        lawyer.qualification.toLowerCase().includes(q);

      return matchesSpecialty && matchesDivision && matchesCourt && matchesQuery;
    });

    // Sorting
    return result.sort((a, b) => {
      if (lawyerSortBy === 'lowest-fee') {
        return a.feeVideo - b.feeVideo;
      }
      if (lawyerSortBy === 'experience') {
        return b.experienceYears - a.experienceYears;
      }
      if (lawyerSortBy === 'most-reviews') {
        return b.reviewsCount - a.reviewsCount;
      }
      // default: top-rated
      return b.rating - a.rating;
    });
  }, [activeSpecialty, activeDivision, activeCourt, lawyerSortBy, lawyerSearchQuery]);

  // Bookmarking handlers
  function toggleSaveLaw(id) {
    setSavedLaws((prev) => {
      const exists = prev.includes(id);
      if (exists) {
        showToast('Removed law from saved topics');
        return prev.filter((item) => item !== id);
      } else {
        showToast('Saved law to bookmarks');
        return [...prev, id];
      }
    });
  }

  function toggleSaveLawyer(id) {
    setSavedLawyers((prev) => {
      const exists = prev.includes(id);
      if (exists) {
        showToast('Removed lawyer from saved list');
        return prev.filter((item) => item !== id);
      } else {
        showToast('Saved lawyer to bookmarks');
        return [...prev, id];
      }
    });
  }

  // Comparison handlers
  function toggleCompareLawyer(id) {
    setComparedLawyerIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((i) => i !== id);
      }
      if (prev.length >= 3) {
        showToast('You can compare a maximum of 3 advocates at a time.');
        return prev;
      }
      const updated = [...prev, id];
      showToast(`Selected ${updated.length} of 3 advocates for comparison.`);
      return updated;
    });
  }

  const comparedLawyersList = useMemo(() => {
    return lawyersList.filter((l) => comparedLawyerIds.includes(l.id));
  }, [comparedLawyerIds]);

  // Booking handlers
  function handleBookingSuccess(newBooking) {
    setBookings((prev) => [newBooking, ...prev]);
    // Add notification
    setNotifications((prev) => [
      {
        id: `n-${Date.now()}`,
        title: 'New Consultation Booked',
        message: `Appointment with ${newBooking.lawyerName} for ${newBooking.date} at ${newBooking.time} has been registered (${newBooking.id}).`,
        time: 'Just now',
        type: 'booking',
        read: false
      },
      ...prev
    ]);
    showToast(`Appointment booked successfully! Reference: ${newBooking.id}`);
  }

  function handleCancelBooking(bookingId) {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: 'Cancelled' } : b))
    );
    showToast('Appointment has been cancelled.');
  }

  function handleRescheduleBooking(bookingId, newDate) {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, date: newDate, status: 'Rescheduled' } : b))
    );
    showToast(`Appointment rescheduled to ${newDate}.`);
  }

  // Direct message handler
  function handleDirectMessageSent({ lawyerName, senderName }) {
    setNotifications((prev) => [
      {
        id: `n-${Date.now()}`,
        title: 'Message Delivered',
        message: `Your inquiry has been submitted to Advocate ${lawyerName}. Expect a response on your phone/WhatsApp.`,
        time: 'Just now',
        type: 'message',
        read: false
      },
      ...prev
    ]);
    showToast(`Message sent to ${lawyerName}!`);
  }

  // Navigation from Hero or Cross-links
  function handleFindSpecialist(specialtyName) {
    setActiveSpecialty(specialtyName || 'All Specialties');
    scrollToSection('lawyers');
  }

  function handleViewLawById(lawId) {
    const found = lawsList.find((l) => l.id === lawId);
    if (found) {
      setSelectedLawModal(found);
    }
  }

  function handleHeroSearchSubmit(e) {
    e.preventDefault();
    setLawSearchQuery(heroSearch);
    scrollToSection('laws');
  }

  function handleSelectQuickTag(tagTerm) {
    setHeroSearch(tagTerm);
    setLawSearchQuery(tagTerm);
    scrollToSection('laws');
  }

  return (
    <div className="app-root">
      {/* 1. Emergency Helpline Strip */}
      <EmergencyBanner />

      {/* 2. Top Navigation */}
      <Navbar
        savedCount={savedLaws.length + savedLawyers.length}
        bookingsCount={bookings.filter((b) => b.status === 'Confirmed').length}
        unreadNotifications={unreadNotificationsCount}
        onOpenSaved={() => setIsSavedDrawerOpen(true)}
        onOpenBookings={() => setIsBookingsModalOpen(true)}
        onToggleNotifications={() => setIsNotificationOpen(!isNotificationOpen)}
        onNavigate={scrollToSection}
      />

      <main>
        {/* 3. Hero Section with Search & Live Visual */}
        <Hero
          searchQuery={heroSearch}
          onSearchChange={setHeroSearch}
          onSearchSubmit={handleHeroSearchSubmit}
          onSelectQuickTag={handleSelectQuickTag}
          onStartWizard={() => scrollToSection('wizard')}
          onExploreLaws={() => scrollToSection('laws')}
        />

        {/* 4. Guided Problem Finder Wizard */}
        <ProblemFinderWizard
          lawyers={lawyersList}
          onSelectLawyer={(lawyer) => setSelectedLawyerBooking(lawyer)}
          onSelectLaw={handleViewLawById}
        />

        {/* 5. Explore Laws by Issue Section */}
        <LawsSection
          laws={filteredLaws}
          categories={lawCategories}
          activeCategory={activeLawCategory}
          onCategoryChange={setActiveLawCategory}
          searchQuery={lawSearchQuery}
          onSearchChange={setLawSearchQuery}
          onViewLawDetails={(law) => setSelectedLawModal(law)}
          onFindSpecialist={handleFindSpecialist}
          savedLaws={savedLaws}
          onToggleSaveLaw={toggleSaveLaw}
        />

        {/* 6. Find & Book Lawyers Section */}
        <LawyersSection
          lawyers={filteredLawyers}
          specialties={lawyerSpecialties}
          divisions={bangladeshDivisions}
          activeSpecialty={activeSpecialty}
          onSpecialtyChange={setActiveSpecialty}
          activeDivision={activeDivision}
          onDivisionChange={setActiveDivision}
          activeCourt={activeCourt}
          onCourtChange={setActiveCourt}
          sortBy={lawyerSortBy}
          onSortChange={setLawyerSortBy}
          searchLawyerQuery={lawyerSearchQuery}
          onSearchLawyerChange={setLawyerSearchQuery}
          onSelectLawyer={(lawyer) => setSelectedLawyerProfile(lawyer)}
          onOpenBooking={(lawyer) => setSelectedLawyerBooking(lawyer)}
          onOpenDirectMessage={(lawyer) => setSelectedLawyerMessage(lawyer)}
          savedLawyers={savedLawyers}
          onToggleSaveLawyer={toggleSaveLawyer}
          comparedLawyerIds={comparedLawyerIds}
          onToggleCompare={toggleCompareLawyer}
          onOpenComparison={() => setIsCompareModalOpen(true)}
        />

        {/* 7. Legal Document Checklists Section */}
        <DocumentChecklistSection
          onFindLawyersForTopic={(topic) => {
            scrollToSection('lawyers');
          }}
        />

        {/* 8. Frequently Asked Questions Section */}
        <FaqSection
          onOpenProblemFinder={() => scrollToSection('wizard')}
        />

        {/* 9. Bilingual Legal Dictionary */}
        <DictionarySection />
      </main>

      {/* 10. Footer */}
      <Footer onNavigate={scrollToSection} />

      {/* MODALS & DRAWERS */}

      {/* Law Details Modal */}
      {selectedLawModal && (
        <LawDetailsModal
          law={selectedLawModal}
          onClose={() => setSelectedLawModal(null)}
          onFindSpecialist={handleFindSpecialist}
          isSaved={savedLaws.includes(selectedLawModal.id)}
          onToggleSave={toggleSaveLaw}
        />
      )}

      {/* Lawyer Profile Modal */}
      {selectedLawyerProfile && (
        <LawyerProfileModal
          lawyer={selectedLawyerProfile}
          onClose={() => setSelectedLawyerProfile(null)}
          onOpenBooking={(lawyer) => setSelectedLawyerBooking(lawyer)}
          onOpenDirectMessage={(lawyer) => setSelectedLawyerMessage(lawyer)}
          isSaved={savedLawyers.includes(selectedLawyerProfile.id)}
          onToggleSave={toggleSaveLawyer}
        />
      )}

      {/* Lawyer Comparison Modal */}
      {isCompareModalOpen && (
        <LawyerComparisonModal
          lawyers={comparedLawyersList}
          onClose={() => setIsCompareModalOpen(false)}
          onOpenBooking={(lawyer) => setSelectedLawyerBooking(lawyer)}
          onRemoveLawyer={toggleCompareLawyer}
        />
      )}

      {/* Appointment Booking Modal */}
      {selectedLawyerBooking && (
        <AppointmentModal
          lawyer={selectedLawyerBooking}
          onClose={() => setSelectedLawyerBooking(null)}
          onBookingSuccess={handleBookingSuccess}
        />
      )}

      {/* Direct Message Modal */}
      {selectedLawyerMessage && (
        <DirectMessageModal
          lawyer={selectedLawyerMessage}
          onClose={() => setSelectedLawyerMessage(null)}
          onMessageSent={handleDirectMessageSent}
        />
      )}

      {/* Bookings Management Modal */}
      {isBookingsModalOpen && (
        <BookingsManagementModal
          bookings={bookings}
          onClose={() => setIsBookingsModalOpen(false)}
          onCancelBooking={handleCancelBooking}
          onRescheduleBooking={handleRescheduleBooking}
          onExploreLawyers={() => scrollToSection('lawyers')}
        />
      )}

      {/* Saved Drawer */}
      <SavedDrawer
        isOpen={isSavedDrawerOpen}
        onClose={() => setIsSavedDrawerOpen(false)}
        savedLaws={savedLaws}
        lawsList={lawsList}
        savedLawyers={savedLawyers}
        lawyersList={lawyersList}
        onViewLawDetails={(law) => setSelectedLawModal(law)}
        onSelectLawyer={(lawyer) => setSelectedLawyerProfile(lawyer)}
        onOpenBooking={(lawyer) => setSelectedLawyerBooking(lawyer)}
        onRemoveSavedLaw={toggleSaveLaw}
        onRemoveSavedLawyer={toggleSaveLawyer}
      />

      {/* Notification Drawer */}
      <NotificationDrawer
        isOpen={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
        notifications={notifications}
        onMarkAllRead={markAllNotificationsRead}
        onClearAll={clearAllNotifications}
        onOpenBookings={() => setIsBookingsModalOpen(true)}
      />

      {/* Global Toast */}
      {toastMessage && (
        <div className="global-toast" role="status">
          <span className="toast-icon">✓</span>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
