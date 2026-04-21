"use client";

import { useState } from "react";
import { SiSalesforce, SiHubspot } from "react-icons/si";

/* ─── Premium CRM Brand Mark — no HB, uses official logos ──────── */
function CRMMonogram() {
  // Pre-calculated static positions for the 3 orbital dots (top, bottom-left, bottom-right)
  // avoids Math.sin/cos hydration float mismatch between SSR and client
  const DOTS = [
    { color: "#00A1E0", top: "2px",  left: "50%",  transform: "translateX(-50%)"  }, // 12-o'clock
    { color: "#FF7A59", top: "75%",  left: "4px",  transform: "translateY(-50%)"  }, // bottom-left
    { color: "#8B5CF6", top: "75%",  right: "4px", transform: "translateY(-50%)"  }, // bottom-right
  ];

  return (
    <div className="relative flex items-center justify-center" style={{ width: 72, height: 72 }}>
      {/* Outer rotating ring */}
      <svg className="absolute inset-0" width="72" height="72" viewBox="0 0 72 72"
        style={{ animation: "spin 12s linear infinite" }}>
        <defs>
          <linearGradient id="rg1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stopColor="#00A1E0" stopOpacity="0.9" />
            <stop offset="50%"  stopColor="#6C63FF" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#FF7A59" stopOpacity="0.9" />
          </linearGradient>
        </defs>
        <circle cx="36" cy="36" r="33" fill="none" stroke="url(#rg1)"
          strokeWidth="1.5" strokeDasharray="8 4" strokeLinecap="round" />
      </svg>
      {/* Inner counter ring */}
      <svg className="absolute inset-0" width="72" height="72" viewBox="0 0 72 72"
        style={{ animation: "spin 8s linear infinite reverse" }}>
        <defs>
          <linearGradient id="rg2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stopColor="#6C63FF" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#00D4AA" stopOpacity="0.5" />
          </linearGradient>
        </defs>
        <circle cx="36" cy="36" r="26" fill="none" stroke="url(#rg2)"
          strokeWidth="1" strokeDasharray="4 6" strokeLinecap="round" />
      </svg>

      {/* Center — 3 stacked logos instead of HB text */}
      <div className="relative z-10 flex items-center justify-center rounded-2xl"
        style={{
          width: 44, height: 44,
          background: "linear-gradient(135deg, rgba(0,13,26,0.9), rgba(12,24,41,0.95))",
          border: "1px solid rgba(0,161,224,0.3)",
          boxShadow: "0 0 20px rgba(0,161,224,0.3), 0 0 40px rgba(108,99,255,0.15)",
        }}>
        <div className="flex items-center gap-[3px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/salesforce-logo.png" alt="SF" style={{ width: 11, height: 11, objectFit: "contain" }} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/hubspot-logo.png"    alt="HS" style={{ width: 10, height: 10, objectFit: "contain" }} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/powerapps-logo.png"  alt="PA" style={{ width: 9,  height: 9,  objectFit: "contain" }} />
        </div>
      </div>

      {/* 3 static glow dots at fixed positions */}
      {DOTS.map((d, i) => (
        <div key={i} className="absolute rounded-full"
          style={{
            width: 5, height: 5,
            background: d.color,
            top: d.top, left: d.left, right: d.right,
            transform: d.transform,
            boxShadow: `0 0 6px 2px ${d.color}`,
          }} />
      ))}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}


/* ─── Steps ─────────────────────────────────────────────────────── */
const STEP_LOGIN   = "login";
const STEP_VERIFY  = "verify";   // security question
const STEP_RESET   = "reset";    // new credentials
const STEP_SUCCESS = "success";

export default function Login({ formData, setFormData, handlelogin }) {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading]           = useState(false);
  const [step, setStep]                 = useState(STEP_LOGIN);
  const [answer, setAnswer]             = useState("");
  const [newUser, setNewUser]           = useState("");
  const [newPass, setNewPass]           = useState("");
  const [showNew, setShowNew]           = useState(false);
  const [msg, setMsg]                   = useState({ text: "", ok: true });

  /* ── Login submit ── */
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMsg({ text: "", ok: true });
    await handlelogin();
    setLoading(false);
  }

  /* ── Verify security answer ── */
  async function handleVerify(e) {
    e.preventDefault();
    setLoading(true);
    setMsg({ text: "", ok: true });
    try {
      const res  = await fetch("/api/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ step: "verify", answer }),
      });
      const data = await res.json();
      if (data.success) {
        setStep(STEP_RESET);
        setMsg({ text: "", ok: true });
      } else {
        setMsg({ text: data.message, ok: false });
      }
    } catch { setMsg({ text: "Connection error. Try again.", ok: false }); }
    setLoading(false);
  }

  /* ── Reset credentials ── */
  async function handleReset(e) {
    e.preventDefault();
    if (newPass.length < 6) { setMsg({ text: "Password must be at least 6 characters.", ok: false }); return; }
    setLoading(true);
    setMsg({ text: "", ok: true });
    try {
      const res  = await fetch("/api/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ step: "reset", newUsername: newUser, newPassword: newPass }),
      });
      const data = await res.json();
      if (data.success) {
        setStep(STEP_SUCCESS);
        setMsg({ text: data.message, ok: true });
      } else {
        setMsg({ text: data.message, ok: false });
      }
    } catch { setMsg({ text: "Connection error. Try again.", ok: false }); }
    setLoading(false);
  }

  /* ── Shared input style ── */
  const inputClass = "w-full py-3.5 rounded-xl text-sm outline-none transition-all";
  const inputStyle = {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)",
    color: "#F0F6FF", fontFamily: "inherit",
  };
  const focusInput  = e => { e.target.style.borderColor = "#00A1E0"; e.target.style.boxShadow = "0 0 0 3px rgba(0,161,224,0.12)"; };
  const blurInput   = e => { e.target.style.borderColor = "rgba(255,255,255,0.08)"; e.target.style.boxShadow = "none"; };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden" style={{ background: "#050D1A" }}>
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full opacity-20 animate-pulse"
          style={{ background: "radial-gradient(circle, #00A1E0, transparent 70%)", filter: "blur(80px)" }} />
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full opacity-15 animate-pulse"
          style={{ background: "radial-gradient(circle, #FF7A59, transparent 70%)", filter: "blur(80px)", animationDelay: "1s" }} />
        <div className="absolute top-[40%] right-[20%] w-[300px] h-[300px] rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #8B5CF6, transparent 70%)", filter: "blur(60px)" }} />
        <div className="absolute inset-0" style={{
          backgroundImage: "linear-gradient(rgba(0,161,224,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,161,224,0.03) 1px, transparent 1px)",
          backgroundSize: "48px 48px"
        }} />
      </div>

      <div className="relative z-10 w-full max-w-md px-6">
        {/* Logo & Brand */}
        <div className="flex flex-col items-center mb-8">
          <CRMMonogram />
          <span className="text-3xl font-black tracking-tighter mt-4" style={{
            background: "linear-gradient(to right, #fff, rgba(0,161,224,0.8))",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
          }}>
            Huzefa<span style={{ color: "#00A1E0", WebkitTextFillColor: "#00A1E0" }}>.</span>
          </span>
          <span className="text-xs font-bold tracking-[0.3em] uppercase mt-1" style={{ color: "#00A1E0" }}>
            Admin Portal
          </span>
        </div>

        {/* Card */}
        <div className="rounded-3xl p-8" style={{
          background: "rgba(12,24,41,0.85)",
          border: "1px solid rgba(255,255,255,0.06)",
          backdropFilter: "blur(24px)",
          boxShadow: "0 40px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(0,161,224,0.1)"
        }}>

          {/* ── Feedback message ── */}
          {msg.text && (
            <div className="mb-5 px-4 py-3 rounded-xl text-sm font-medium" style={{
              background: msg.ok ? "rgba(0,212,170,0.08)" : "rgba(255,80,80,0.08)",
              border: `1px solid ${msg.ok ? "rgba(0,212,170,0.25)" : "rgba(255,80,80,0.25)"}`,
              color: msg.ok ? "#00D4AA" : "#FF6B6B",
            }}>
              {msg.text}
            </div>
          )}

          {/* ══ STEP: Login ══════════════════════════════════════════ */}
          {step === STEP_LOGIN && (
            <>
              <h2 className="text-xl font-bold mb-1" style={{ color: "#F0F6FF" }}>Welcome back</h2>
              <p className="text-sm mb-7" style={{ color: "#8DA0BC" }}>Sign in to manage your portfolio</p>

              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                {/* Username */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#8DA0BC" }}>Username</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: "#3D5170" }}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                      </svg>
                    </span>
                    <input type="text" value={formData.username || ""} placeholder="admin"
                      onChange={e => setFormData({ ...formData, username: e.target.value })}
                      className={`${inputClass} pl-11 pr-4`} style={inputStyle}
                      onFocus={focusInput} onBlur={blurInput} />
                  </div>
                </div>

                {/* Password */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#8DA0BC" }}>Password</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: "#3D5170" }}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                      </svg>
                    </span>
                    <input type={showPassword ? "text" : "password"} value={formData.password || ""} placeholder="••••••••"
                      onChange={e => setFormData({ ...formData, password: e.target.value })}
                      className={`${inputClass} pl-11 pr-12`} style={inputStyle}
                      onFocus={focusInput} onBlur={blurInput} />
                    <button type="button" onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 transition-colors"
                      style={{ color: showPassword ? "#00A1E0" : "#3D5170" }}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                        {showPassword
                          ? <><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></>
                          : <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>
                        }
                      </svg>
                    </button>
                  </div>
                </div>

                <button type="submit" disabled={loading}
                  className="w-full py-3.5 rounded-xl font-bold text-sm text-white mt-1 transition-all duration-200"
                  style={{
                    background: loading ? "rgba(0,161,224,0.5)" : "linear-gradient(135deg, #00A1E0, #6C63FF)",
                    boxShadow: loading ? "none" : "0 0 30px rgba(0,161,224,0.3)",
                    cursor: loading ? "not-allowed" : "pointer"
                  }}>
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                      </svg>
                      Signing in...
                    </span>
                  ) : "Sign In"}
                </button>

                <button type="button" onClick={() => { setStep(STEP_VERIFY); setMsg({ text: "", ok: true }); }}
                  className="text-xs font-semibold text-center transition-all hover:opacity-100"
                  style={{ color: "#3D5170" }}>
                  Forgot credentials? <span style={{ color: "#00A1E0" }}>Reset here →</span>
                </button>
              </form>
            </>
          )}

          {/* ══ STEP: Security Question ══════════════════════════════ */}
          {step === STEP_VERIFY && (
            <>
              <button onClick={() => { setStep(STEP_LOGIN); setMsg({ text: "", ok: true }); }}
                className="flex items-center gap-1.5 text-xs mb-6 transition-colors hover:opacity-80"
                style={{ color: "#3D5170" }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
                  <path d="M19 12H5M12 19l-7-7 7-7"/>
                </svg>
                Back to login
              </button>
              <h2 className="text-xl font-bold mb-1" style={{ color: "#F0F6FF" }}>Identity Verification</h2>
              <p className="text-sm mb-7" style={{ color: "#8DA0BC" }}>Answer your security question to reset credentials</p>

              <form onSubmit={handleVerify} className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#8DA0BC" }}>Security Question</label>
                  <div className="px-4 py-3.5 rounded-xl text-sm font-semibold" style={{
                    background: "rgba(0,161,224,0.06)", border: "1px solid rgba(0,161,224,0.18)", color: "#00A1E0"
                  }}>
                    What is your House#?
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#8DA0BC" }}>Your Answer</label>
                  <input type="text" value={answer} onChange={e => setAnswer(e.target.value)}
                    placeholder="Enter your answer..."
                    className={`${inputClass} px-4`} style={inputStyle}
                    onFocus={focusInput} onBlur={blurInput} />
                </div>

                <button type="submit" disabled={loading || !answer.trim()}
                  className="w-full py-3.5 rounded-xl font-bold text-sm text-white transition-all duration-200"
                  style={{
                    background: (!answer.trim() || loading) ? "rgba(0,161,224,0.35)" : "linear-gradient(135deg, #00A1E0, #6C63FF)",
                    boxShadow: (!answer.trim() || loading) ? "none" : "0 0 30px rgba(0,161,224,0.3)",
                    cursor: (!answer.trim() || loading) ? "not-allowed" : "pointer"
                  }}>
                  {loading ? "Verifying..." : "Verify Identity"}
                </button>
              </form>
            </>
          )}

          {/* ══ STEP: Reset Credentials ══════════════════════════════ */}
          {step === STEP_RESET && (
            <>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(0,212,170,0.15)", border: "1px solid rgba(0,212,170,0.35)" }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="#00D4AA" strokeWidth="2.5" className="w-3 h-3">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <span className="text-xs font-semibold" style={{ color: "#00D4AA" }}>Identity verified — set new credentials</span>
              </div>

              <h2 className="text-xl font-bold mb-1" style={{ color: "#F0F6FF" }}>Set New Credentials</h2>
              <p className="text-sm mb-7" style={{ color: "#8DA0BC" }}>Your new username and password will be used to log in</p>

              <form onSubmit={handleReset} className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#8DA0BC" }}>New Username</label>
                  <input type="text" value={newUser} onChange={e => setNewUser(e.target.value)}
                    placeholder="Choose a username..."
                    className={`${inputClass} px-4`} style={inputStyle}
                    onFocus={focusInput} onBlur={blurInput} />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#8DA0BC" }}>New Password</label>
                  <div className="relative">
                    <input type={showNew ? "text" : "password"} value={newPass} onChange={e => setNewPass(e.target.value)}
                      placeholder="Min. 6 characters..."
                      className={`${inputClass} pl-4 pr-12`} style={inputStyle}
                      onFocus={focusInput} onBlur={blurInput} />
                    <button type="button" onClick={() => setShowNew(!showNew)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 transition-colors"
                      style={{ color: showNew ? "#00A1E0" : "#3D5170" }}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                        {showNew
                          ? <><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></>
                          : <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>
                        }
                      </svg>
                    </button>
                  </div>
                  {newPass && (
                    <div className="flex gap-1 mt-1">
                      {[1,2,3,4].map(n => (
                        <div key={n} className="flex-1 h-1 rounded-full transition-all"
                          style={{ background: newPass.length >= n * 3 ? (newPass.length >= 10 ? "#00D4AA" : "#00A1E0") : "rgba(255,255,255,0.08)" }} />
                      ))}
                    </div>
                  )}
                </div>

                <button type="submit" disabled={loading || !newUser.trim() || !newPass.trim()}
                  className="w-full py-3.5 rounded-xl font-bold text-sm text-white transition-all duration-200"
                  style={{
                    background: (!newUser.trim() || !newPass.trim() || loading) ? "rgba(0,212,170,0.35)" : "linear-gradient(135deg, #00D4AA, #00A1E0)",
                    boxShadow: (!newUser.trim() || !newPass.trim() || loading) ? "none" : "0 0 30px rgba(0,212,170,0.3)",
                    cursor: (!newUser.trim() || !newPass.trim() || loading) ? "not-allowed" : "pointer"
                  }}>
                  {loading ? "Saving..." : "Save New Credentials"}
                </button>
              </form>
            </>
          )}

          {/* ══ STEP: Success ════════════════════════════════════════ */}
          {step === STEP_SUCCESS && (
            <div className="flex flex-col items-center text-center py-4">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mb-5"
                style={{ background: "rgba(0,212,170,0.12)", border: "2px solid rgba(0,212,170,0.35)" }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="#00D4AA" strokeWidth="2.5" className="w-8 h-8">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
              <h2 className="text-xl font-bold mb-2" style={{ color: "#F0F6FF" }}>Credentials Updated!</h2>
              <p className="text-sm mb-7" style={{ color: "#8DA0BC" }}>
                {msg.text || "Your username and password have been updated. Please sign in with your new credentials."}
              </p>
              <button onClick={() => { setStep(STEP_LOGIN); setMsg({ text: "", ok: true }); setAnswer(""); setNewUser(""); setNewPass(""); }}
                className="px-8 py-3 rounded-xl font-bold text-sm text-white transition-all duration-200"
                style={{ background: "linear-gradient(135deg, #00A1E0, #6C63FF)", boxShadow: "0 0 24px rgba(0,161,224,0.3)" }}>
                Go to Login
              </button>
            </div>
          )}

          {/* Platform strip */}
          {step === STEP_LOGIN && (
            <div className="mt-7 pt-5 border-t flex items-center justify-center gap-4" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
              <span className="text-xs" style={{ color: "#3D5170" }}>Managing</span>
              <SiSalesforce className="w-4 h-4" style={{ color: "#00A1E0" }} />
              <SiHubspot    className="w-4 h-4" style={{ color: "#FF7A59" }} />
              <svg viewBox="0 0 23 23" className="w-4 h-4" style={{ color: "#8B5CF6" }}>
                <path d="M11.5 0L0 6.5v10L11.5 23 23 16.5v-10z" fill="currentColor" opacity=".3"/>
                <path d="M11.5 0l11.5 6.5-11.5 6.5L0 6.5z" fill="currentColor"/>
                <path d="M0 6.5l11.5 6.5v10L0 16.5z" fill="currentColor" opacity=".6"/>
              </svg>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}