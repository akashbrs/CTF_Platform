"use client";

import React, { useState } from "react";
import Image from "next/image";

export default function TopHeader() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <header className="top-header animate-fade-in" style={{ width: '100%', maxWidth: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 20, marginBottom: '15px', padding: '0 24px' }}>
        <div className="main-logo-container" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'flex-start', paddingLeft: '10px' }}>
          <Image
            src="/blindspot_horizontal_logo.png"
            alt="Blindspot CTF Platform"
            className="blindspot-logo"
            width={320}
            height={120}
            style={{
              objectFit: 'contain',
              filter: 'drop-shadow(0 0 12px rgba(139, 92, 246, 0.9)) drop-shadow(0 0 24px rgba(59, 130, 246, 0.7)) drop-shadow(0 0 36px rgba(139, 92, 246, 0.5))'
            }}
            priority
          />
        </div>

        <div className="logo-container" style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginBottom: 0 }}>
          <Image
            src="/logo.png"
            alt="Malla Reddy University Logo"
            className="university-logo"
            width={280}
            height={120}
            style={{
              objectFit: 'contain',
              filter: 'drop-shadow(0 0 8px rgba(0, 255, 255, 0.8)) drop-shadow(0 0 16px rgba(0, 255, 255, 0.6)) drop-shadow(0 0 24px rgba(0, 255, 255, 0.4))'
            }}
            priority
          />
          <div style={{
            marginTop: '4px',
            fontSize: '18px',
            fontWeight: '700',
            color: '#ffffff',
            textShadow: '0 0 8px rgba(0, 255, 255, 0.8), 0 0 16px rgba(0, 255, 255, 0.6), 0 0 24px rgba(0, 255, 255, 0.4)',
            letterSpacing: '1.5px',
            textTransform: 'uppercase'
          }}>
            Department of Cybersecurity
          </div>
        </div>

        <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', paddingRight: '10px' }}>
          <div className="dean-profile" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ fontWeight: '600', color: '#f8fafc', fontSize: '16px', letterSpacing: '0.3px', lineHeight: '1.2' }}>Dr. G Anand Kumar</div>
              <div style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.5)', fontWeight: '400', marginTop: '4px', letterSpacing: '0.5px' }}>Dean of CS, IOT, ECE</div>
            </div>
            <div
              style={{ width: '56px', height: '56px', borderRadius: '50%', overflow: 'hidden', boxShadow: '0 8px 20px rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.08)', cursor: 'pointer', transition: 'transform 0.2s' }}
              onClick={() => setIsModalOpen(true)}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <Image
                src="/deansir.jpg"
                alt="Dr. G Anand Kumar"
                width={56}
                height={56}
                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                priority
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Image Modal */}
      {isModalOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            backdropFilter: 'blur(10px)',
            zIndex: 9999,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'zoom-out'
          }}
          onClick={() => setIsModalOpen(false)}
        >
          <div
            style={{
              position: 'relative',
              width: '80vw',
              height: '80vh',
              maxWidth: '600px',
              maxHeight: '800px',
              borderRadius: '24px',
              overflow: 'hidden',
              boxShadow: '0 25px 50px rgba(0,0,0,0.8)',
              border: '1px solid rgba(255,255,255,0.1)'
            }}
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the image itself
          >
            <Image
              src="/deansir.jpg"
              alt="Dr. G Anand Kumar"
              fill
              style={{ objectFit: 'cover' }}
              priority
            />

            <button
              onClick={() => setIsModalOpen(false)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'rgba(0,0,0,0.5)',
                color: 'white',
                border: 'none',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                fontSize: '20px',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backdropFilter: 'blur(5px)'
              }}
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </>
  );
}
