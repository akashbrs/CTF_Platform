"use client";

import React, { useState } from "react";
import { Bell, Info, AlertTriangle, Unlock, MessageSquare, Clock, Check } from "lucide-react";

interface NotificationItem {
  id: number;
  type: "system" | "hint" | "solve" | "alert" | "unlock";
  title: string;
  message: string;
  time: string;
  unread: boolean;
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 1,
      type: "unlock",
      title: "Final Challenge Unlocked",
      message: "The 'Final Challenge' (1000 pts) is now open for all competitors. Show us what you've got!",
      time: "10 mins ago",
      unread: true,
    },
    {
      id: 2,
      type: "hint",
      title: "New Hint Released",
      message: "A new hint has been released for 'Logic Check'. Go check the challenge page to view it.",
      time: "45 mins ago",
      unread: true,
    },
    {
      id: 3,
      type: "solve",
      title: "First Blood on Admin Panel",
      message: "Player CyberRonin has solved 'Admin Panel' and grabbed the First Blood bonus points!",
      time: "2 hours ago",
      unread: false,
    },
    {
      id: 4,
      type: "alert",
      title: "Scheduled Maintenance",
      message: "The flag submission API will be briefly down for 5 minutes of backend maintenance at 00:00 UTC.",
      time: "5 hours ago",
      unread: false,
    },
    {
      id: 5,
      type: "system",
      title: "Welcome to CTF 2026",
      message: "The competition has officially started. Read the rules, play fair, and have fun!",
      time: "1 day ago",
      unread: false,
    },
  ]);

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, unread: false })));
  };

  const toggleRead = (id: number) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, unread: !n.unread } : n));
  };

  const getIcon = (type: NotificationItem["type"]) => {
    switch (type) {
      case "unlock":
        return <Unlock size={18} style={{ color: "#a855f7" }} />;
      case "hint":
        return <Info size={18} style={{ color: "#3b82f6" }} />;
      case "solve":
        return <MessageSquare size={18} style={{ color: "#22c55e" }} />;
      case "alert":
        return <AlertTriangle size={18} style={{ color: "#ef4444" }} />;
      default:
        return <Bell size={18} style={{ color: "#e2e8f0" }} />;
    }
  };

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <div className="notifications-layout animate-fade-in" style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '20px' }}>
      <div className="leaderboard-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Bell size={28} className="trophy-icon" style={{ color: '#a855f7' }} />
          <h1 style={{ fontSize: '18px', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--text-white)' }}>
            Notifications
          </h1>
          {unreadCount > 0 && (
            <span style={{ background: '#a855f7', color: 'white', fontSize: '12px', fontWeight: 'bold', padding: '2px 8px', borderRadius: '10px', marginLeft: '4px', boxShadow: '0 0 10px rgba(168, 85, 247, 0.4)' }}>
              {unreadCount} new
            </span>
          )}
        </div>
        {unreadCount > 0 && (
          <button 
            onClick={markAllRead}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: 'rgba(139, 92, 246, 0.1)',
              border: '1px solid rgba(139, 92, 246, 0.3)',
              color: '#c084fc',
              padding: '8px 16px',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(139, 92, 246, 0.2)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(139, 92, 246, 0.1)'}
          >
            <Check size={14} />
            Mark all as read
          </button>
        )}
      </div>

      <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px', paddingRight: '8px' }}>
        {notifications.map(notif => (
          <div 
            key={notif.id}
            onClick={() => toggleRead(notif.id)}
            style={{
              display: 'flex',
              gap: '16px',
              padding: '20px',
              background: notif.unread ? 'rgba(139, 92, 246, 0.05)' : 'rgba(255, 255, 255, 0.02)',
              border: '1px solid',
              borderColor: notif.unread ? 'rgba(139, 92, 246, 0.25)' : 'rgba(255, 255, 255, 0.06)',
              borderRadius: '16px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              position: 'relative'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = notif.unread ? 'rgba(139, 92, 246, 0.4)' : 'rgba(255, 255, 255, 0.12)';
              e.currentTarget.style.background = notif.unread ? 'rgba(139, 92, 246, 0.08)' : 'rgba(255, 255, 255, 0.04)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = notif.unread ? 'rgba(139, 92, 246, 0.25)' : 'rgba(255, 255, 255, 0.06)';
              e.currentTarget.style.background = notif.unread ? 'rgba(139, 92, 246, 0.05)' : 'rgba(255, 255, 255, 0.02)';
            }}
          >
            {notif.unread && (
              <div style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#a855f7',
                boxShadow: '0 0 10px rgba(168, 85, 247, 0.8)'
              }}></div>
            )}
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              background: 'rgba(0, 0, 0, 0.3)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              border: '1px solid rgba(255, 255, 255, 0.05)'
            }}>
              {getIcon(notif.type)}
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: '600', color: notif.unread ? '#ffffff' : 'rgba(255,255,255,0.7)', fontSize: '15px' }}>
                  {notif.title}
                </span>
                <span style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.3)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Clock size={12} />
                  {notif.time}
                </span>
              </div>
              <p style={{ fontSize: '13px', color: notif.unread ? 'rgba(255,255,255,0.65)' : 'rgba(255,255,255,0.45)', lineHeight: '1.5' }}>
                {notif.message}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
