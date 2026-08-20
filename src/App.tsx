/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { PageType, UserRole } from './types';
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
  const [userRole, setUserRole] = useState<UserRole>('guest');
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

