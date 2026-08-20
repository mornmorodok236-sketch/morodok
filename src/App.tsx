/* ================================================
   APP.TSX - NEW VERSION v2.0 (2026-08-21)
   (contains useAuth + demoRole)
   ================================================ */
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { PageType, UserRole } from './types';
import { useAuth } from './lib/auth';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HeroSection } from './components/home/HeroSection';
import { FeaturesSection } from './components/home/FeaturesSection';
import { RiskManagementSection } from './components/home/RiskManagementSection';
import { TechnologySection } from './components/home/TechnologySection';
import { FaqSection } from './components/home/FaqSection';
import { ProductPage } from './components/product/ProductPage';
import { LoginPage } from './components/auth/LoginPage';
import { RegisterPage } from './components/auth/RegisterPage';
import { UserDashboard } from './components/dashboard/UserDashboard';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { Terminal, Shield, ArrowUp } from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  // Demo mode: role is managed by local state as before
  // Real mode: role comes from Supabase Auth
  const [demoRole, setDemoRole] = useState<UserRole>('guest');
  const { isDemoMode, role: authRole, loading: authLoading, session, profile, signOut } = useAuth();
  const userRole: UserRole = isDemoMode ? demoRole : authRole;
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Real mode: setting role to 'guest' performs a genuine sign-out
  const setUserRole = (role: UserRole) => {
    if (isDemoMode) {
      setDemoRole(role);
    } else if (role === 'guest') {
      void signOut();
      setCurrentPage('home');
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Real mode: after Login/Register succeeds (profile loaded)
  // -> navigate to the proper dashboard by role
  useEffect(() => {
    if (isDemoMode || authLoading) return;
    if (session && profile && (currentPage === 'login' || currentPage === 'register')) {
      setCurrentPage(authRole === 'admin' ? 'admin' : 'dashboard');
    }
  }, [isDemoMode, authLoading, session, profile, currentPage, authRole]);

  // Real mode: route guard — block dashboard/admin for guests
  useEffect(() => {
    if (isDemoMode || authLoading) return;
    if (currentPage === 'dashboard' && !session) setCurrentPage('login');
    if (currentPage === 'admin' && authRole !== 'admin') setCurrentPage(session ? 'dashboard' : 'login');
  }, [isDemoMode, authLoading, session, authRole, currentPage]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#090D16] text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-black">
      {/* Top Navigation */}
      <Navbar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        userRole={userRole}
        setUserRole={setUserRole}
      />

      {/* Main Page Content Router */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <div className="space-y-0">
            <HeroSection setCurrentPage={setCurrentPage} />
            <FeaturesSection />
            <RiskManagementSection />
            <TechnologySection />
            <FaqSection setCurrentPage={setCurrentPage} />
          </div>
        )}

        {currentPage === 'product' && (
          <ProductPage setCurrentPage={setCurrentPage} />
        )}

        {currentPage === 'login' && (
          <LoginPage setCurrentPage={setCurrentPage} setUserRole={setUserRole} />
        )}

        {currentPage === 'register' && (
          <RegisterPage setCurrentPage={setCurrentPage} setUserRole={setUserRole} />
        )}

        {currentPage === 'dashboard' && (
          <UserDashboard setCurrentPage={setCurrentPage} />
        )}

        {currentPage === 'admin' && (
          <AdminDashboard setCurrentPage={setCurrentPage} />
        )}
      </main>

      {/* Footer */}
      <Footer setCurrentPage={setCurrentPage} />

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 p-3 rounded-xl bg-slate-900/90 hover:bg-cyan-950 border border-slate-700 hover:border-cyan-400 text-cyan-400 shadow-xl transition-all"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
