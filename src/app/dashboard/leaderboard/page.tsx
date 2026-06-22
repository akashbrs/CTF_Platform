"use client";

import React, { useState } from "react";
import { Trophy, ChevronLeft, ChevronRight, UserCircle, Crown, X, Target } from "lucide-react";

interface LeaderboardUser {
  rank: number;
  user: string;
  title: string;
  points: string;
  solved: number;
  accuracy: string;
  solvedChallenges: string[];
  isCrown?: boolean;
}

export default function LeaderboardPage() {
  const [selectedUser, setSelectedUser] = useState<LeaderboardUser | null>(null);

  const leaderboardData: LeaderboardUser[] = [
    { rank: 1, user: "0xCipher", title: "Elite Hacker", points: "5,420", solved: 128, accuracy: "98.6%", isCrown: true, solvedChallenges: ["SQL Injection 101", "Buffer Overflow Basics", "RSA Cryptography"] },
    { rank: 2, user: "CyberRonin", title: "Elite Hacker", points: "4,380", solved: 112, accuracy: "96.2%", solvedChallenges: ["RSA Cryptography"] },
    { rank: 3, user: "NullByte", title: "Elite Hacker", points: "3,960", solved: 105, accuracy: "95.1%", solvedChallenges: ["Buffer Overflow Basics"] },
    { rank: 4, user: "HackWraith", title: "Elite Hacker", points: "3,250", solved: 93, accuracy: "94.3%", solvedChallenges: ["Blind XSS Mastery"] },
    { rank: 5, user: "ByteBandit", title: "Elite Hacker", points: "2,890", solved: 88, accuracy: "93.0%", solvedChallenges: ["Heap Exploitation"] },
    { rank: 6, user: "Error404", title: "Elite Hacker", points: "2,450", solved: 75, accuracy: "92.1%", solvedChallenges: ["Steganography Magic"] },
    { rank: 7, user: "RootBreaker", title: "Elite Hacker", points: "2,150", solved: 64, accuracy: "91.0%", solvedChallenges: ["SQL Injection 101"] },
    { rank: 8, user: "CipherGhost", title: "Elite Hacker", points: "1,980", solved: 58, accuracy: "90.4%", solvedChallenges: ["RSA Cryptography"] },
    { rank: 9, user: "PentestPro", title: "Elite Hacker", points: "1,750", solved: 52, accuracy: "89.7%", solvedChallenges: ["Logic Flaw 101"] },
    { rank: 10, user: "ShadowN3t", title: "Elite Hacker", points: "1,620", solved: 46, accuracy: "88.9%", solvedChallenges: ["Bit Flipping"] },
  ];

  return (
    <>
      <div className="leaderboard-header animate-fade-in">
        <Trophy size={28} className="trophy-icon" />
        <h1>LEADERBOARD</h1>
      </div>

      <div className="leaderboard-table-container animate-fade-in" style={{ animationDelay: "0.1s" }}>
        <table className="leaderboard-table">
          <thead>
            <tr>
              <th className="leaderboard-th rank">RANK</th>
              <th className="leaderboard-th user">PLAYER</th>
              <th className="leaderboard-th points">POINTS</th>
              <th className="leaderboard-th challenges-solved">CHALLENGES SOLVED</th>
              <th className="leaderboard-th accuracy">ACCURACY</th>
            </tr>
          </thead>
          <tbody>
            {leaderboardData.map((row) => (
              <tr 
                key={row.rank} 
                className={`leaderboard-row ${row.rank === 1 ? 'top-1' : ''} rank-${row.rank > 3 ? 'other' : row.rank}`}
                onClick={() => setSelectedUser(row)}
                style={{ cursor: 'pointer' }}
              >
                <td className="leaderboard-td">
                  <div className="rank-badge">
                    {row.rank === 1 && <span style={{ color: '#fbbf24', display: 'flex', alignItems: 'center' }}><Trophy size={16}/> <span style={{position:'absolute', fontSize:'10px', color:'white', fontWeight:'bold', marginTop:'-2px'}}>{row.rank}</span></span>}
                    {row.rank === 2 && <span style={{ color: '#cbd5e1', display: 'flex', alignItems: 'center' }}><Trophy size={16}/> <span style={{position:'absolute', fontSize:'10px', color:'white', fontWeight:'bold', marginTop:'-2px'}}>{row.rank}</span></span>}
                    {row.rank === 3 && <span style={{ color: '#fb923c', display: 'flex', alignItems: 'center' }}><Trophy size={16}/> <span style={{position:'absolute', fontSize:'10px', color:'white', fontWeight:'bold', marginTop:'-2px'}}>{row.rank}</span></span>}
                    {row.rank > 3 && row.rank}
                  </div>
                </td>
                <td className="leaderboard-td">
                  <div className="user-cell">
                    <div className="user-avatar">
                      {row.rank <= 3 ? (
                        <UserCircle size={20} className="avatar-icon" />
                      ) : (
                        <div className="avatar-icon" style={{ opacity: 0.5 }}>
                          <UserCircle size={20} />
                        </div>
                      )}
                    </div>
                    <div className="user-name" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '2px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        {row.user}
                      </div>
                      <div style={{ fontSize: '11px', color: '#a855f7', fontWeight: 400 }}>{row.title}</div>
                    </div>
                  </div>
                </td>
                <td className="leaderboard-td points-val" style={{ textAlign: 'center', color: '#c084fc', fontFamily: 'Inter, sans-serif' }}>
                  {row.points}
                </td>
                <td className="leaderboard-td" style={{ textAlign: 'center', color: 'var(--text-white)' }}>
                  {row.solved}
                </td>
                <td className="leaderboard-td" style={{ textAlign: 'right', color: '#4ade80' }}>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '20px' }}>
                    {row.accuracy}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-dim)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="pagination">
          <button className="page-btn"><ChevronLeft size={16} /></button>
          <button className="page-btn active">1</button>
          <button className="page-btn">2</button>
          <button className="page-btn">3</button>
          <button className="page-btn">4</button>
          <button className="page-btn">5</button>
          <button className="page-btn"><ChevronRight size={16} /></button>
        </div>
      </div>

      {/* User Detail Modal */}
      {selectedUser && (
        <div className="modal-overlay" onClick={() => setSelectedUser(null)}>
          <div className="modal-content animate-fade-in" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedUser(null)}>
              <X size={20} />
            </button>
            <div className="modal-header">
              <div className="modal-avatar-lg">
                <UserCircle size={64} className={`avatar-icon rank-${selectedUser.rank <= 3 ? selectedUser.rank : 'other'}-icon`} />
                {selectedUser.isCrown && <Crown size={28} className="user-crown modal-crown" />}
              </div>
              <h2>{selectedUser.user}</h2>
              <div className="modal-rank">Rank #{selectedUser.rank}</div>
            </div>
            
            <div className="modal-stats">
              <div className="stat-box" style={{ marginBottom: '10px' }}>
                <div className="stat-icon-wrapper">
                  <Trophy size={24} className="stat-icon" style={{ color: '#fbbf24' }} />
                </div>
                <div className="stat-info">
                  <span className="stat-label">Total Points</span>
                  <span className="stat-value">{selectedUser.points}</span>
                </div>
              </div>
              
              <div className="solved-challenges-section">
                <div className="section-label" style={{ marginTop: '10px', marginBottom: '12px', color: 'var(--text-dim)', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Target size={16} style={{ color: '#4ade80' }} />
                  Solved Challenges ({selectedUser.solvedChallenges.length})
                </div>
                <div className="solved-challenges-list" style={{ maxHeight: '180px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px', paddingRight: '4px' }}>
                  {selectedUser.solvedChallenges.map((challenge: string, idx: number) => (
                    <div key={idx} className="solved-challenge-item" style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.05)', padding: '12px 16px', borderRadius: '12px', fontSize: '14px', color: 'var(--text-white)', display: 'flex', alignItems: 'center', gap: '12px', transition: 'all 0.2s ease' }}>
                      <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#4ade80', boxShadow: '0 0 8px rgba(74, 222, 128, 0.6)' }}></div>
                      {challenge}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
