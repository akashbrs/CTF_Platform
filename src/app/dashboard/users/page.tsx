"use client";

import React, { useState } from "react";
import { Users, Search, UserCheck, ShieldAlert, Circle, Award } from "lucide-react";

interface UserItem {
  id: number;
  username: string;
  role: string;
  solves: number;
  joined: string;
  status: "online" | "offline";
  avatarBg: string;
}

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  
  const usersList: UserItem[] = [
    { id: 1, username: "0xCipher", role: "Elite Hacker", solves: 128, joined: "June 21, 2026", status: "online", avatarBg: "rgba(168, 85, 247, 0.15)" },
    { id: 2, username: "CyberRonin", role: "Elite Hacker", solves: 112, joined: "June 21, 2026", status: "online", avatarBg: "rgba(59, 130, 246, 0.15)" },
    { id: 3, username: "NullByte", role: "Pro Hacker", solves: 105, joined: "June 21, 2026", status: "offline", avatarBg: "rgba(34, 197, 94, 0.15)" },
    { id: 4, username: "HackWraith", role: "Pro Hacker", solves: 93, joined: "June 22, 2026", status: "online", avatarBg: "rgba(249, 115, 22, 0.15)" },
    { id: 5, username: "ByteBandit", role: "Pro Hacker", solves: 88, joined: "June 22, 2026", status: "offline", avatarBg: "rgba(239, 68, 68, 0.15)" },
    { id: 6, username: "Error404", role: "Pro Hacker", solves: 75, joined: "June 22, 2026", status: "offline", avatarBg: "rgba(168, 85, 247, 0.15)" },
    { id: 7, username: "RootBreaker", role: "Novice", solves: 64, joined: "June 22, 2026", status: "online", avatarBg: "rgba(59, 130, 246, 0.15)" },
    { id: 8, username: "CipherGhost", role: "Novice", solves: 58, joined: "June 22, 2026", status: "offline", avatarBg: "rgba(34, 197, 94, 0.15)" },
    { id: 9, username: "PentestPro", role: "Novice", solves: 52, joined: "June 22, 2026", status: "offline", avatarBg: "rgba(249, 115, 22, 0.15)" },
    { id: 10, username: "ShadowN3t", role: "Novice", solves: 46, joined: "June 22, 2026", status: "online", avatarBg: "rgba(239, 68, 68, 0.15)" },
    { id: 11, username: "WebWrecker", role: "Novice", solves: 30, joined: "June 22, 2026", status: "offline", avatarBg: "rgba(168, 85, 247, 0.15)" },
    { id: 12, username: "PwnMaster", role: "Novice", solves: 25, joined: "June 22, 2026", status: "online", avatarBg: "rgba(59, 130, 246, 0.15)" }
  ];

  const filteredUsers = usersList.filter(user => 
    user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="users-layout animate-fade-in" style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '20px' }}>
      {/* Header Section */}
      <div className="leaderboard-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', flexWrap: 'wrap', gap: '15px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Users size={28} className="trophy-icon" style={{ color: '#a855f7' }} />
          <h1 style={{ fontSize: '18px', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--text-white)' }}>
            Registered Users
          </h1>
          <span style={{ background: 'rgba(168, 85, 247, 0.15)', color: '#c084fc', border: '1px solid rgba(168, 85, 247, 0.3)', fontSize: '12px', fontWeight: 'bold', padding: '4px 12px', borderRadius: '12px', marginLeft: '4px' }}>
            {usersList.length} Total
          </span>
        </div>

        {/* Search Bar */}
        <div style={{ position: 'relative', width: '100%', maxWidth: '300px' }}>
          <Search size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255, 255, 255, 0.4)' }} />
          <input 
            type="text" 
            placeholder="Search username or rank..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              height: '42px',
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '10px',
              paddingLeft: '40px',
              paddingRight: '16px',
              color: 'white',
              fontSize: '14px',
              outline: 'none',
              transition: 'all 0.2s ease'
            }}
            onFocus={e => e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 0.4)'}
            onBlur={e => e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)'}
          />
        </div>
      </div>

      {/* Users Grid */}
      <div style={{ flex: 1, overflowY: 'auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px', paddingRight: '8px', alignContent: 'start' }}>
        {filteredUsers.length > 0 ? (
          filteredUsers.map(user => (
            <div 
              key={user.id}
              style={{
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                borderRadius: '16px',
                padding: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                transition: 'all 0.2s ease',
                position: 'relative'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 0.25)';
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)';
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)';
                e.currentTarget.style.transform = 'none';
              }}
            >
              {/* Online/Offline Status Badge */}
              <div 
                title={user.status === "online" ? "Online" : "Offline"}
                style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '11px',
                  fontWeight: '600',
                  color: user.status === "online" ? '#4ade80' : 'rgba(255,255,255,0.3)',
                  background: user.status === "online" ? 'rgba(74, 222, 128, 0.08)' : 'rgba(255, 255, 255, 0.02)',
                  padding: '2px 8px',
                  borderRadius: '20px',
                  border: '1px solid',
                  borderColor: user.status === "online" ? 'rgba(74, 222, 128, 0.2)' : 'rgba(255, 255, 255, 0.05)'
                }}
              >
                <Circle size={6} fill="currentColor" />
                {user.status}
              </div>

              {/* Avatar Icon */}
              <div style={{
                width: '52px',
                height: '52px',
                borderRadius: '14px',
                background: user.avatarBg,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                border: '1px solid rgba(255,255,255,0.05)'
              }}>
                <span style={{ fontSize: '18px', fontWeight: 'bold', color: 'white', textShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>
                  {user.username.substring(0, 2).toUpperCase()}
                </span>
              </div>

              {/* User Details */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span style={{ fontWeight: '600', color: 'white', fontSize: '15px' }}>{user.username}</span>
                <span style={{ fontSize: '12px', color: '#a855f7', fontWeight: '500' }}>{user.role}</span>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '4px' }}>
                  <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.45)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Award size={12} style={{ color: '#bef264' }} />
                    {user.solves} Solves
                  </span>
                  <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)' }}>
                    Joined {user.joined.split(',')[0]}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: 'rgba(255, 255, 255, 0.35)' }}>
            <ShieldAlert size={48} style={{ margin: '0 auto 12px auto', opacity: 0.5 }} />
            <p style={{ fontSize: '15px' }}>No competitors match your search query.</p>
          </div>
        )}
      </div>
    </div>
  );
}
