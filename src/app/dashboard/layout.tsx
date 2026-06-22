"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Trophy, Target, LogOut, Bell, User, X, Users } from "lucide-react";
import TopHeader from "@/components/TopHeader";
import "./dashboard.css";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuth, setIsAuth] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [isPersonalInfoOpen, setIsPersonalInfoOpen] = useState(false);
  const [userName, setUserName] = useState("0xCipher");
  const [editUserName, setEditUserName] = useState("0xCipher");

  useEffect(() => {
    const auth = sessionStorage.getItem('isAuthenticated');
    if (!auth) {
      router.push("/");
    } else {
      setTimeout(() => setIsAuth(true), 0);
    }
  }, [router]);

  useEffect(() => {
    if (!profileDropdownOpen) return;
    const closeDropdown = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.nav-user-profile')) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener('click', closeDropdown);
    return () => document.removeEventListener('click', closeDropdown);
  }, [profileDropdownOpen]);

  const handleLogout = () => {
    sessionStorage.removeItem('isAuthenticated');
    router.push("/");
  };

  if (!isAuth) return null;

  return (
      <div className="dashboard-wrapper">
      {/* Ambient glow backgrounds to match the overall theme */}
      <div className="ambient-glow-container">
        <div className="glow-circle glow-1"></div>
        <div className="glow-circle glow-2"></div>
      </div>

      {/* Top Header with Logo and Dean Profile */}
      <TopHeader />

      <div className="dashboard-container animate-fade-in" style={{ flexDirection: 'column' }}>
        {/* Top Tab Navigation */}
        <div className="dashboard-top-nav">
          <div className="top-tabs">
            <Link 
              href="/dashboard/challenges"
              className={`top-tab ${pathname.includes("challenges") ? "active" : ""}`}
            >
              <Target size={20} className="tab-icon" />
              Challenges
            </Link>
            <Link 
              href="/dashboard/leaderboard"
              className={`top-tab ${pathname.includes("leaderboard") ? "active" : ""}`}
            >
              <Trophy size={20} className="tab-icon" />
              Leaderboard
            </Link>
            <Link 
              href="/dashboard/notifications"
              className={`top-tab ${pathname.includes("notifications") ? "active" : ""}`}
            >
              <Bell size={20} className="tab-icon" />
              Notification
            </Link>
            <Link 
              href="/dashboard/users"
              className={`top-tab ${pathname.includes("users") ? "active" : ""}`}
            >
              <Users size={20} className="tab-icon" />
              User's
            </Link>
          </div>
          
          <div className="top-nav-right">
            <Link 
              href="/dashboard/notifications" 
              className="nav-notification-icon-btn"
              title="Notifications"
            >
              <Bell size={22} />
              <span className="nav-notification-dot"></span>
            </Link>
            <div 
              className="nav-user-profile" 
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              style={{ position: 'relative' }}
            >
              <div className="nav-user-avatar">
                <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: '#111', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                </div>
              </div>
              <div className="nav-user-info">
                <div className="nav-username">{userName}</div>
                <div className="nav-usertitle">Elite Hacker</div>
              </div>
              <svg 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="nav-user-chevron"
                style={{
                  transform: profileDropdownOpen ? 'rotate(180deg)' : 'none',
                  transition: 'transform 0.2s ease'
                }}
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>

              {profileDropdownOpen && (
                <div className="nav-profile-dropdown animate-fade-in" style={{ animationDuration: '0.2s' }} onClick={(e) => e.stopPropagation()}>
                  <button className="dropdown-info-btn" onClick={() => { setEditUserName(userName); setIsPersonalInfoOpen(true); setProfileDropdownOpen(false); }}>
                    <User size={20} />
                    <span>Personal Information</span>
                  </button>
                  <button className="dropdown-logout-btn" onClick={handleLogout}>
                    <LogOut size={20} />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <main className="main-content">
          {children}
        </main>
      </div>

      {/* Personal Information Modal */}
      {isPersonalInfoOpen && (
        <div className="modal-overlay" onClick={() => setIsPersonalInfoOpen(false)}>
          <div className="modal-content animate-fade-in" onClick={e => e.stopPropagation()} style={{ maxWidth: '440px' }}>
            <button className="modal-close" onClick={() => setIsPersonalInfoOpen(false)}>
              <X size={20} />
            </button>
            <div className="modal-header" style={{ marginBottom: '20px' }}>
              <div className="modal-avatar-lg">
                <User size={40} className="avatar-icon" style={{ color: '#a855f7' }} />
              </div>
              <h2 style={{ fontSize: '22px', fontWeight: '700', marginTop: '10px' }}>Personal Information</h2>
              <div className="modal-rank">User Profile Details</div>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '10px' }}>
              <div className="info-field-group">
                <label className="info-field-label">Name</label>
                <input 
                  type="text" 
                  className="info-field-input" 
                  value={editUserName} 
                  onChange={(e) => setEditUserName(e.target.value)} 
                  style={{ border: '1px solid rgba(139, 92, 246, 0.4)', background: 'rgba(255, 255, 255, 0.05)' }}
                />
              </div>
              <div className="info-field-group">
                <label className="info-field-label">Email ID</label>
                <input type="text" className="info-field-input" value="mruhcyber@gmail.com" readOnly disabled />
              </div>
              <div className="info-field-group">
                <label className="info-field-label">Roll Number</label>
                <input type="text" className="info-field-input" value="2211A0501" readOnly disabled />
              </div>
              <div className="info-field-group">
                <label className="info-field-label">Current Password</label>
                <input type="password" className="info-field-input" value="Mruh@cyber" readOnly disabled />
              </div>
              <div className="info-field-group">
                <label className="info-field-label">Updated Passwords</label>
                <input type="text" className="info-field-input" value="No updates recorded" readOnly disabled />
              </div>
            </div>

            <div style={{ marginTop: '25px', display: 'flex', justifyContent: 'flex-end' }}>
              <button 
                className="submit-btn" 
                style={{ width: 'auto', padding: '0 30px', height: '48px', fontSize: '15px' }}
                onClick={() => { setUserName(editUserName); setIsPersonalInfoOpen(false); }}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
