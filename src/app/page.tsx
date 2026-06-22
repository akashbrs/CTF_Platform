"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { User, IdCard, Mail, Lock, Eye, EyeOff, Loader2, CheckCircle2, AlertTriangle, Shield, MessageCircle } from "lucide-react";
import TopHeader from "@/components/TopHeader";

export default function Home() {
  const router = useRouter();
  const [tab, setTab] = useState<"signup" | "login" | "forgot" | "otp" | "reset_password">("login"); // Default to login tab

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) {
       return;
    }
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Focus next
    if (value !== "" && index < 5) {
       otpInputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  // Password eye toggles
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    fullName: "",
    rollNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Action states
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form submission handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    // Client-side validations
    if (tab === "signup") {
      if (!formData.fullName.trim()) {
        setError("Please enter your full name.");
        return;
      }
      if (!formData.rollNumber.trim()) {
        setError("Please enter your roll number.");
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match!");
        return;
      }
      if (formData.password.length < 6) {
        setError("Password should be at least 6 characters long.");
        return;
      }
    } else if (tab === "login") {
      if (formData.email !== "mruhcyber@gmail.com" || formData.password !== "Mruh@cyber") {
        setError("Invalid credentials. Try again.");
        return;
      }
    } else if (tab === "forgot") {
      if (!formData.email.trim()) {
        setError("Please enter your email.");
        return;
      }
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          setTab("otp");
        }, 1000);
      }, 1000);
      return;
    } else if (tab === "otp") {
      if (otp.some(digit => digit === "")) {
        setError("Please enter the complete 6-digit OTP.");
        return;
      }
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          setTab("reset_password");
        }, 1000);
      }, 1000);
      return;
    } else if (tab === "reset_password") {
      if (formData.password.length < 6) {
        setError("Password should be at least 6 characters long.");
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match!");
        return;
      }
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          setTab("login");
          setFormData({ ...formData, password: "", confirmPassword: "" });
        }, 1000);
      }, 1000);
      return;
    }

    // Simulate premium dashboard loading and verification sequence
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);

      setTimeout(() => {
        sessionStorage.setItem('isAuthenticated', 'true');
        router.push("/dashboard/challenges");
      }, 1000);
    }, 2000);
  };

  const handleTabChange = (newTab: "signup" | "login" | "forgot" | "otp" | "reset_password") => {
    setTab(newTab);
    setError(null);
    setSuccess(false);
    setFormData({
      fullName: "",
      rollNumber: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <div className="page-container">
      {/* Background glow meshes */}
      <div className="ambient-glow-container">
        <div className="glow-circle glow-1"></div>
        <div className="glow-circle glow-2"></div>
        <div className="glow-circle glow-3"></div>
      </div>

      {/* Top Header with Logo and Dean Profile */}
      <TopHeader />

      {/* Center Auth Card */}
      <div className="auth-card animate-fade-in">
        {/* Left Info Panel */}
        <section className="left-panel">
          <div className="left-panel-content">
            <h1 className="animate-fade-in">
              {tab === "signup" ? "Sign Up" : tab === "forgot" ? "Reset Your Password" : tab === "otp" ? "Verify Your OTP" : tab === "reset_password" ? "Create New Password" : "Welcome Back"}
            </h1>
            <p className="subtitle animate-fade-in">
              {tab === "signup"
                ? "Create your account and get started."
                : tab === "forgot"
                  ? "Enter your email address and we'll send you a link to reset your password."
                  : tab === "otp"
                    ? "Enter the 6-digit OTP sent to your email address."
                    : tab === "reset_password"
                      ? "Please enter your new password below."
                      : "Login to continue to your account."}
            </p>
          </div>

          <div className="left-panel-footer animate-fade-in">
            {tab === "forgot" || tab === "reset_password" ? (
              <div className="icon-glow-circle-left">
                <Lock size={24} color="#8b5cf6" />
              </div>
            ) : tab === "otp" ? (
              <div className="icon-glow-circle-left">
                <Shield size={24} color="#8b5cf6" />
              </div>
            ) : tab === "signup" ? (
              <>
                Already have an account?
                <span className="link" onClick={() => handleTabChange("login")}>
                  Login
                </span>
              </>
            ) : (
              <>
                Don&apos;t have an account?
                <span className="link" onClick={() => handleTabChange("signup")}>
                  Sign Up
                </span>
              </>
            )}
          </div>
        </section>

        {/* Divider */}
        <div className="vertical-divider"></div>

        {/* Right Form Panel */}
        <section className="right-panel">
          {/* Tabs */}
          <div className="tabs-container">
            {tab === "forgot" ? (
              <button className="tab-btn active" style={{ cursor: 'default' }}>
                FORGOT PASSWORD
              </button>
            ) : tab === "otp" ? (
              <button className="tab-btn active" style={{ cursor: 'default' }}>
                ENTER OTP
              </button>
            ) : tab === "reset_password" ? (
              <button className="tab-btn active" style={{ cursor: 'default' }}>
                NEW PASSWORD
              </button>
            ) : (
              <>
                <button
                  className={`tab-btn ${tab === "signup" ? "active" : ""}`}
                  onClick={() => handleTabChange("signup")}
                >
                  Sign Up
                </button>
                <button
                  className={`tab-btn ${tab === "login" ? "active" : ""}`}
                  onClick={() => handleTabChange("login")}
                >
                  Login
                </button>
              </>
            )}
          </div>

          {/* Form */}
          {tab === "reset_password" ? (
            <form className="auth-form" onSubmit={handleSubmit}>
              <div className="reset-password-content animate-fade-in" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', width: '100%' }}>
                <div className="icon-glow-circle-center">
                  <Lock size={28} color="#8b5cf6" />
                </div>

                <h2 className="forgot-heading">Set New Password</h2>
                <p className="forgot-subtitle" style={{ marginBottom: '15px' }}>
                  Your new password must be different from previous used passwords.
                </p>

                {/* Password */}
                <div className="form-group" style={{ width: '100%', textAlign: 'left', marginBottom: '10px' }}>
                  <label className="form-label">Password</label>
                  <div className="input-wrapper">
                    <div className="input-icon-left">
                      <Lock size={20} />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-input"
                      placeholder="Enter new password"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                      required
                    />
                    <button
                      type="button"
                      className="input-icon-right"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div className="form-group" style={{ width: '100%', textAlign: 'left', marginBottom: '15px' }}>
                  <label className="form-label">Confirm Password</label>
                  <div className="input-wrapper">
                    <div className="input-icon-left">
                      <Lock size={20} />
                    </div>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      className="form-input"
                      placeholder="Confirm new password"
                      value={formData.confirmPassword}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          confirmPassword: e.target.value,
                        })
                      }
                      required
                    />
                    <button
                      type="button"
                      className="input-icon-right"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={20} />
                      ) : (
                        <Eye size={20} />
                      )}
                    </button>
                  </div>
                </div>

                {error && (
                  <div className="error-message animate-fade-in" style={{ width: '100%', marginBottom: '15px' }}>
                    <AlertTriangle size={16} />
                    <span>{error}</span>
                  </div>
                )}

                <button
                  type="submit"
                  className="submit-btn"
                  disabled={loading || success}
                >
                  {loading ? (
                    <div className="btn-content">
                      <Loader2 className="spinner" size={20} />
                      <span>Updating...</span>
                    </div>
                  ) : success ? (
                    <div className="btn-content">
                      <CheckCircle2 size={20} />
                      <span>Password Updated!</span>
                    </div>
                  ) : (
                    "RESET PASSWORD"
                  )}
                </button>

                <div className="or-divider" style={{ width: '100%', margin: '25px 0' }}>
                  <div className="or-line"></div>
                  <span className="or-text">OR</span>
                  <div className="or-line"></div>
                </div>

                <div className="bottom-signup-text">
                  Return to
                  <span className="link" style={{ marginLeft: '8px' }} onClick={() => handleTabChange("login")}>
                    Login
                  </span>
                </div>
              </div>
            </form>
          ) : tab === "otp" ? (
            <form className="auth-form" onSubmit={handleSubmit}>
              <div className="otp-content animate-fade-in" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', width: '100%' }}>
                <div className="icon-glow-circle-center">
                  <MessageCircle size={28} color="#8b5cf6" />
                </div>

                <p className="otp-subtitle" style={{ fontSize: '18px', color: 'var(--text-gray)', marginBottom: '5px' }}>
                  We&apos;ve sent a 6-digit OTP to
                </p>
                <p className="otp-email" style={{ fontSize: '18px', color: 'var(--purple-accent)', fontWeight: 600, marginBottom: '5px' }}>
                  {formData.email || "example@email.com"}
                </p>
                <p className="otp-instruction" style={{ fontSize: '18px', color: 'var(--text-gray)', marginBottom: '35px' }}>
                  Enter the OTP below to verify your identity.
                </p>

                <div className="form-group" style={{ width: '100%', textAlign: 'left' }}>
                  <label className="form-label" style={{ marginBottom: '12px', display: 'block' }}>ENTER OTP</label>
                  <div className="otp-inputs-container" style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', marginBottom: '20px' }}>
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        ref={(el) => {
                          otpInputRefs.current[index] = el;
                        }}
                        type="text"
                        maxLength={1}
                        className="otp-input"
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(index, e)}
                        style={{
                          width: '64px',
                          height: '72px',
                          borderRadius: '12px',
                          border: '1px solid var(--border-color)',
                          background: 'rgba(255, 255, 255, 0.02)',
                          color: 'var(--text-white)',
                          fontSize: '32px',
                          textAlign: 'center',
                          outline: 'none',
                          transition: 'all 0.3s ease'
                        }}
                      />
                    ))}
                  </div>
                </div>

                <div className="resend-text" style={{ width: '100%', textAlign: 'left', fontSize: '16px', color: 'var(--text-gray)', marginBottom: '25px' }}>
                  Didn&apos;t receive the code? <span style={{ color: 'var(--purple-accent)', cursor: 'pointer' }}>Resend OTP (00:30)</span>
                </div>

                {error && (
                  <div className="error-message animate-fade-in" style={{ width: '100%', marginBottom: '15px' }}>
                    <AlertTriangle size={16} />
                    <span>{error}</span>
                  </div>
                )}

                <button
                  type="submit"
                  className="submit-btn"
                  disabled={loading || success}
                >
                  {loading ? (
                    <div className="btn-content">
                      <Loader2 className="spinner" size={20} />
                      <span>Verifying...</span>
                    </div>
                  ) : success ? (
                    <div className="btn-content">
                      <CheckCircle2 size={20} />
                      <span>Verified!</span>
                    </div>
                  ) : (
                    "VERIFY OTP"
                  )}
                </button>

                <div className="or-divider" style={{ width: '100%', margin: '25px 0' }}>
                  <div className="or-line"></div>
                  <span className="or-text">OR</span>
                  <div className="or-line"></div>
                </div>

                <div className="bottom-signup-text">
                  Return to
                  <span className="link" style={{ marginLeft: '8px' }} onClick={() => handleTabChange("login")}>
                    Login
                  </span>
                </div>
              </div>
            </form>
          ) : tab === "forgot" ? (
            <form className="auth-form" onSubmit={handleSubmit}>
              <div className="forgot-password-content animate-fade-in" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', width: '100%' }}>
                <div className="icon-glow-circle-center">
                  <Lock size={28} color="#8b5cf6" />
                </div>

                <h2 className="forgot-heading">Forgot Password?</h2>
                <p className="forgot-subtitle">
                  No worries! Enter your email address and we&apos;ll send you a link to reset it.
                </p>

                <div className="form-group" style={{ width: '100%', marginTop: '10px', textAlign: 'left' }}>
                  <label className="form-label">Email ID</label>
                  <div className="input-wrapper">
                    <div className="input-icon-left">
                      <Mail size={20} />
                    </div>
                    <input
                      type="email"
                      className="form-input"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>

                {error && (
                  <div className="error-message animate-fade-in" style={{ width: '100%', marginTop: '15px' }}>
                    <AlertTriangle size={16} />
                    <span>{error}</span>
                  </div>
                )}

                <button
                  type="submit"
                  className="submit-btn"
                  style={{ marginTop: '20px' }}
                  disabled={loading || success}
                >
                  {loading ? (
                    <div className="btn-content">
                      <Loader2 className="spinner" size={20} />
                      <span>Processing...</span>
                    </div>
                  ) : success ? (
                    <div className="btn-content">
                      <CheckCircle2 size={20} />
                      <span>Success!</span>
                    </div>
                  ) : (
                    "SEND RESET LINK"
                  )}
                </button>

                <div className="or-divider" style={{ width: '100%', margin: '25px 0' }}>
                  <div className="or-line"></div>
                  <span className="or-text">OR</span>
                  <div className="or-line"></div>
                </div>

                <div className="bottom-signup-text">
                  Remember your password?
                  <span className="link" style={{ marginLeft: '8px' }} onClick={() => handleTabChange("login")}>
                    Login
                  </span>
                </div>
              </div>
            </form>
          ) : (
            <form className="auth-form" onSubmit={handleSubmit}>
              {tab === "signup" && (
                <>
                  {/* Full Name */}
                  <div className="form-group animate-fade-in">
                    <label className="form-label">Full Name</label>
                    <div className="input-wrapper">
                      <div className="input-icon-left">
                        <User size={20} />
                      </div>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="Enter your full name"
                        value={formData.fullName}
                        onChange={(e) =>
                          setFormData({ ...formData, fullName: e.target.value })
                        }
                        required
                      />
                    </div>
                  </div>

                  {/* Roll Number */}
                  <div className="form-group animate-fade-in">
                    <label className="form-label">Roll Number</label>
                    <div className="input-wrapper">
                      <div className="input-icon-left">
                        <IdCard size={20} />
                      </div>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="Enter your roll number"
                        value={formData.rollNumber}
                        onChange={(e) =>
                          setFormData({ ...formData, rollNumber: e.target.value })
                        }
                        required
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Email Address / ID */}
              <div className="form-group animate-fade-in">
                <label className="form-label">
                  {tab === "signup" ? "Email Address" : "Email ID"}
                </label>
                <div className="input-wrapper">
                  <div className="input-icon-left">
                    <Mail size={20} />
                  </div>
                  <input
                    type="email"
                    className="form-input"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="form-group animate-fade-in">
                <label className="form-label">Password</label>
                <div className="input-wrapper">
                  <div className="input-icon-left">
                    <Lock size={20} />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-input"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    required
                  />
                  <button
                    type="button"
                    className="input-icon-right"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>

                {tab === "login" && (
                  <div className="forgot-password-container">
                    <span className="forgot-password-link" onClick={() => handleTabChange("forgot")}>Forgot Password?</span>
                  </div>
                )}
              </div>

              {/* Confirm Password (only for Signup) */}
              {tab === "signup" && (
                <div className="form-group animate-fade-in">
                  <label className="form-label">Confirm Password</label>
                  <div className="input-wrapper">
                    <div className="input-icon-left">
                      <Lock size={20} />
                    </div>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      className="form-input"
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          confirmPassword: e.target.value,
                        })
                      }
                      required
                    />
                    <button
                      type="button"
                      className="input-icon-right"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={20} />
                      ) : (
                        <Eye size={20} />
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* Alert Messages */}
              {error && (
                <div className="error-message animate-fade-in">
                  <AlertTriangle size={16} />
                  <span>{error}</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="submit-btn animate-fade-in"
                disabled={loading || success}
              >
                {loading ? (
                  <div className="btn-content">
                    <Loader2 className="spinner" size={20} />
                    <span>Processing...</span>
                  </div>
                ) : success ? (
                  <div className="btn-content">
                    <CheckCircle2 size={20} />
                    <span>Success!</span>
                  </div>
                ) : tab === "signup" ? (
                  "Create Account"
                ) : (
                  "Login"
                )}
              </button>

              {/* Additional Footer for Login Tab */}
              {tab === "login" && (
                <>
                  <div className="or-divider animate-fade-in">
                    <div className="or-line"></div>
                    <span className="or-text">OR</span>
                    <div className="or-line"></div>
                  </div>

                  <div className="bottom-signup-text animate-fade-in">
                    Don&apos;t have an account?
                    <span className="link" onClick={() => handleTabChange("signup")}>
                      Sign Up
                    </span>
                  </div>
                </>
              )}
            </form>
          )}
        </section>
      </div>
    </div>
  );
}
