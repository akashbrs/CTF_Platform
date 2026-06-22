"use client";

import React, { useState, useRef } from "react";
import { 
  Flag, Globe, Lock, Cpu, Box, ChevronDown, Download, Lightbulb, Code, Puzzle, ChevronLeft, ChevronRight
} from "lucide-react";

export default function ChallengesPage() {
  const [activeChallenge, setActiveChallenge] = useState(1);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const categoryGridRef = useRef<HTMLDivElement>(null);

  const scrollCategories = (direction: 'left' | 'right') => {
    if (categoryGridRef.current) {
      const scrollAmount = 200;
      categoryGridRef.current.scrollBy({ 
        left: direction === 'left' ? -scrollAmount : scrollAmount, 
        behavior: 'smooth' 
      });
    }
  };

  const categories = [
    { id: 'osint', name: 'OSINT', icon: <Globe size={18} className="dropdown-icon osint" /> },
    { id: 'web', name: 'Web Exploitation', icon: <Code size={18} className="dropdown-icon web" /> },
    { id: 'crypto', name: 'Cryptography', icon: <Lock size={18} className="dropdown-icon crypto" /> },
    { id: 'reversing', name: 'Reverse Engineering', icon: <Cpu size={18} className="dropdown-icon reversing" /> },
    { id: 'misc', name: 'MISC', icon: <Puzzle size={18} className="dropdown-icon misc" /> },
  ];

  const challengesList = [
    { id: 1, title: "Caesar's Secret", category: "Crypto", categoryId: "crypto", points: "200 pts", iconClass: "icon-crypto", Icon: Lock },
    { id: 2, title: "Basic Reversing", category: "Reverse Engineering", categoryId: "reversing", points: "250 pts", iconClass: "icon-reversing", Icon: Cpu },
    { id: 3, title: "PNG Sleuth", category: "Forensics", categoryId: "misc", points: "300 pts", iconClass: "icon-forensics", Icon: Box },
    { id: 4, title: "Logic Check", category: "Misc", categoryId: "misc", points: "350 pts", iconClass: "icon-misc", Icon: Box },
    { id: 5, title: "Simple Overflow", category: "Pwn", categoryId: "misc", points: "400 pts", iconClass: "icon-pwn", Icon: Box },
    { id: 6, title: "Admin Panel", category: "Web", categoryId: "web", points: "450 pts", iconClass: "icon-web", Icon: Lock },
    { id: 7, title: "Brain Teaser", category: "Misc", categoryId: "misc", points: "500 pts", iconClass: "icon-crypto", Icon: Lightbulb },
    { id: 8, title: "Final Challenge", category: "Misc", categoryId: "misc", points: "1000 pts", iconClass: "icon-misc", Icon: Crown },
  ];

  const filteredChallenges = activeCategory === 'all' 
    ? challengesList 
    : challengesList.filter(c => c.categoryId === activeCategory);

  interface ChallengeTag {
    label: string;
    color: string;
    bg?: string;
  }

  interface ChallengeDetail {
    title: string;
    tags: ChallengeTag[];
    points: string;
    description: string[];
    attachment: { name: string; size: string } | null;
    format: string;
    hint: string;
    Icon: React.ElementType;
    iconClass: string;
  }

  const challengeDetails: Record<number, ChallengeDetail> = {
    1: {
      title: "CAESAR'S SECRET",
      tags: [{ label: "Crypto", color: "#c084fc", bg: "rgba(139, 92, 246, 0.2)" }, { label: "Easy", color: "#4ade80" }],
      points: "200 pts",
      description: ["I encrypted a message using a simple Caesar cipher.", "Can you decrypt it and find the flag?"],
      attachment: { name: "cipher.txt", size: "1.2 KB" },
      format: "CTF{...}",
      hint: "Shift the letters. That's all.",
      Icon: Lock,
      iconClass: "icon-crypto"
    },
    2: {
      title: "BASIC REVERSING",
      tags: [{ label: "Reversing", color: "#f87171", bg: "rgba(239, 68, 68, 0.2)" }, { label: "Medium", color: "#fbbf24" }],
      points: "250 pts",
      description: ["We found this executable file, but we forgot the password.", "Reverse engineer it and find the hardcoded flag."],
      attachment: { name: "crackme.exe", size: "45 KB" },
      format: "CTF{...}",
      hint: "Try looking at the strings or use a decompiler like Ghidra.",
      Icon: Cpu,
      iconClass: "icon-reversing"
    },
    3: {
      title: "PNG SLEUTH",
      tags: [{ label: "Forensics", color: "#4ade80", bg: "rgba(34, 197, 94, 0.2)" }, { label: "Medium", color: "#fbbf24" }],
      points: "300 pts",
      description: ["This image looks perfectly normal...", "Or does it? Find the hidden message within the pixels."],
      attachment: { name: "suspicious.png", size: "2.4 MB" },
      format: "CTF{...}",
      hint: "Check the least significant bits or run binwalk.",
      Icon: Box,
      iconClass: "icon-forensics"
    },
    4: {
      title: "LOGIC CHECK",
      tags: [{ label: "Misc", color: "#60a5fa", bg: "rgba(59, 130, 246, 0.2)" }, { label: "Easy", color: "#4ade80" }],
      points: "350 pts",
      description: ["Can you bypass this simple logic check?", "Submit the correct input to get the flag."],
      attachment: { name: "logic.py", size: "1 KB" },
      format: "CTF{...}",
      hint: "Understand what the code evaluates as true.",
      Icon: Box,
      iconClass: "icon-misc"
    },
    5: {
      title: "SIMPLE OVERFLOW",
      tags: [{ label: "Pwn", color: "#fb923c", bg: "rgba(249, 115, 22, 0.2)" }, { label: "Hard", color: "#ef4444" }],
      points: "400 pts",
      description: ["The buffer size is 64 bytes, but I'm reading 128.", "Overwrite the return address to call the win() function."],
      attachment: { name: "vuln.c", size: "3 KB" },
      format: "CTF{...}",
      hint: "Find the offset to EIP/RIP.",
      Icon: Box,
      iconClass: "icon-pwn"
    },
    6: {
      title: "ADMIN PANEL",
      tags: [{ label: "Web", color: "#f87171", bg: "rgba(239, 68, 68, 0.2)" }, { label: "Hard", color: "#ef4444" }],
      points: "450 pts",
      description: ["I built a secure login portal.", "Bypass the login to access the admin panel and grab the flag."],
      attachment: null,
      format: "CTF{...}",
      hint: "Have you checked for SQL Injection?",
      Icon: Lock,
      iconClass: "icon-web"
    },
    7: {
      title: "BRAIN TEASER",
      tags: [{ label: "Misc", color: "#c084fc", bg: "rgba(139, 92, 246, 0.2)" }, { label: "Medium", color: "#fbbf24" }],
      points: "500 pts",
      description: ["A sequence of numbers: 1, 11, 21, 1211, 111221.", "What is the flag based on the 10th iteration?"],
      attachment: null,
      format: "CTF{...}",
      hint: "Look-and-say sequence.",
      Icon: Lightbulb,
      iconClass: "icon-crypto"
    },
    8: {
      title: "FINAL CHALLENGE",
      tags: [{ label: "Misc", color: "#60a5fa", bg: "rgba(59, 130, 246, 0.2)" }, { label: "Extreme", color: "#ef4444" }],
      points: "1000 pts",
      description: ["The ultimate test of your skills.", "Combine everything you've learned to conquer the final boss."],
      attachment: { name: "boss.zip", size: "500 MB" },
      format: "CTF{...}",
      hint: "There is no hint for the final challenge.",
      Icon: Crown,
      iconClass: "icon-misc"
    }
  };

  const activeDetail = challengeDetails[activeChallenge];
  const ActiveIcon = activeDetail?.Icon || Box;

  // Dummy crown icon for the Final Challenge
  function Crown({ size, className }: { size: number, className?: string }) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <polygon points="2 4 14 4 22 4 18 14 12 20 6 14 2 4" />
      </svg>
    );
  }

  return (
    <div className="challenges-layout animate-fade-in">
      {/* Left Sidebar for Categories & Challenge List */}
      <div className="challenges-sidebar">
        <div className="leaderboard-header" style={{ marginBottom: "0", display: "flex", alignItems: "center" }}>
          <Flag size={24} className="trophy-icon" style={{ color: "#a855f7", fill: "#a855f7" }} />
          <h1 style={{ fontSize: "20px", marginLeft: "12px", fontWeight: "800" }}>CHALLENGES</h1>
          <span className="challenges-count" style={{ marginLeft: "auto", background: "rgba(139, 92, 246, 0.2)", color: "#c084fc", padding: "4px 12px", borderRadius: "12px", fontSize: "14px", fontWeight: "bold" }}>{filteredChallenges.length}</span>
        </div>

        <div className="category-slider-container" style={{ position: 'relative', display: 'flex', alignItems: 'center', width: '100%' }}>
          <button 
            className="category-slide-btn" 
            onClick={() => scrollCategories('left')}
            style={{ position: 'absolute', left: '-10px', zIndex: 5, background: 'rgba(15, 15, 25, 0.95)', border: '1px solid rgba(139, 92, 246, 0.4)', color: 'white', width: '28px', height: '28px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', boxShadow: '0 0 10px rgba(0,0,0,0.8)' }}
          >
            <ChevronLeft size={16} />
          </button>
          
          <div className="category-grid" ref={categoryGridRef} style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '8px', scrollbarWidth: 'none', flex: 1, padding: '0 15px' }}>
            <div 
              className={`category-pill ${activeCategory === 'all' ? 'active' : ''}`}
            onClick={() => {
              setActiveCategory('all');
              if (challengesList.length > 0) setActiveChallenge(challengesList[0].id);
              setShowHint(false);
            }}
          >
            <div style={{ display: 'flex', flexWrap: 'wrap', width: '16px', gap: '2px', justifyContent: 'center' }}>
              <div style={{ width: '6px', height: '6px', border: '1.5px solid #a855f7', borderRadius: '2px' }}></div>
              <div style={{ width: '6px', height: '6px', border: '1.5px solid #a855f7', borderRadius: '2px' }}></div>
              <div style={{ width: '6px', height: '6px', border: '1.5px solid #a855f7', borderRadius: '2px' }}></div>
              <div style={{ width: '6px', height: '6px', border: '1.5px solid #a855f7', borderRadius: '2px' }}></div>
            </div>
            All
          </div>
          {categories.map(cat => (
            <div 
              key={cat.id} 
              className={`category-pill ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => {
                setActiveCategory(cat.id);
                const newFiltered = challengesList.filter(c => c.categoryId === cat.id);
                if (newFiltered.length > 0) setActiveChallenge(newFiltered[0].id);
                setShowHint(false);
              }}
            >
              {cat.icon}
              {cat.name}
            </div>
          ))}
          </div>

          <button 
            className="category-slide-btn" 
            onClick={() => scrollCategories('right')}
            style={{ position: 'absolute', right: '-10px', zIndex: 5, background: 'rgba(15, 15, 25, 0.95)', border: '1px solid rgba(139, 92, 246, 0.4)', color: 'white', width: '28px', height: '28px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', boxShadow: '0 0 10px rgba(0,0,0,0.8)' }}
          >
            <ChevronRight size={16} />
          </button>
        </div>

        <div className="challenges-list">
          {filteredChallenges.length > 0 ? filteredChallenges.map(chal => (
            <div 
              key={chal.id} 
              className={`challenge-item ${activeChallenge === chal.id ? 'active' : ''}`}
              onClick={() => {
                setActiveChallenge(chal.id);
                setShowHint(false);
              }}
            >
              <div className="challenge-item-left">
                <div className="challenge-icon">
                  <chal.Icon size={22} className={chal.iconClass} />
                </div>
                <div className="challenge-info" style={{ marginLeft: '4px' }}>
                  <div className="challenge-title">{chal.title}</div>
                  <div className="challenge-category">{chal.category}</div>
                </div>
              </div>
              <div className="challenge-item-right">
                <div className="challenge-points">{chal.points}</div>
                <ChevronRight size={20} style={{ color: "rgba(255,255,255,0.2)" }} />
              </div>
            </div>
          )) : (
            <div style={{ padding: "20px", textAlign: "center", color: "rgba(255,255,255,0.5)", fontSize: "14px" }}>
              No challenges found for this category.
            </div>
          )}
        </div>
      </div>

      {/* Right Content for Challenge Details */}
      <div className="challenge-detail animate-fade-in" style={{ animationDelay: "0.1s" }} key={activeChallenge}>
        {/* Header section */}
        <div className="challenge-detail-header">
          <div className="detail-header-left">
            <div className="detail-icon-wrapper">
              <ActiveIcon className={activeDetail.iconClass} />
            </div>
            <div className="detail-title-group">
              <h2>{activeDetail.title}</h2>
              <div className="detail-tags">
                {activeDetail.tags.map((tag: ChallengeTag, idx: number) => (
                  <span 
                    key={idx} 
                    className="tag" 
                    style={{ color: tag.color, background: tag.bg || 'transparent', display: 'flex', alignItems: 'center', gap: '4px' }}
                  >
                    {!tag.bg && <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="none"><rect x="2" y="14" width="4" height="8"/><rect x="10" y="8" width="4" height="14"/><rect x="18" y="2" width="4" height="20"/></svg>}
                    {tag.label}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="detail-header-right">
            {activeDetail.points}
          </div>
        </div>

        {/* Description section */}
        <div className="challenge-section">
          <div className="section-label">
            <Box size={14} /> Description
          </div>
          <div className="description-text">
            {activeDetail.description.map((p: string, idx: number) => (
              <p key={idx}>{p}</p>
            ))}
          </div>
        </div>

        {/* Attachment section */}
        {activeDetail.attachment && (
          <div className="challenge-section">
            <div className="section-label">
              <Box size={14} style={{ transform: 'rotate(45deg)' }} /> Attachment
            </div>
            <div className="attachment-box">
              <div className="attachment-info">
                <div className="attachment-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                </div>
                <div className="attachment-details">
                  <h4>{activeDetail.attachment.name}</h4>
                  <span>{activeDetail.attachment.size}</span>
                </div>
              </div>
              <button className="download-btn">
                <Download size={16} />
                Download
              </button>
            </div>
          </div>
        )}

        {/* Flag Format section */}
        <div className="challenge-section">
          <div className="section-label">
            <Flag size={14} /> Flag Format
          </div>
          <div className="flag-format-text">{activeDetail.format}</div>
          <div className="flag-hint">Make sure your flag is in the correct format.</div>
        </div>

        {/* Submit section */}
        <div className="challenge-section">
          <div className="section-label">
            <ChevronRight size={14} /> Submit Flag
          </div>
          <div className="submit-box">
            <input type="text" className="flag-input" placeholder="Enter your flag here..." />
            <button className="flag-submit-btn">Submit</button>
          </div>
        </div>

        {/* Hint section */}
        <div className="challenge-section">
          <div className="hint-box">
            <div className="hint-header" onClick={() => setShowHint(!showHint)}>
              <div className="hint-header-left">
                <Lightbulb size={16} />
                <span>HINT</span>
              </div>
              <ChevronDown size={16} style={{ color: "rgba(255,255,255,0.4)", transform: showHint ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
            </div>
            {showHint && (
              <div className="hint-content animate-fade-in">
                {activeDetail.hint}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}


