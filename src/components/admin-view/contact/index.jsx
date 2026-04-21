"use client";

import { AdminCard } from "../ui";
import { Mail, MessageSquare, Send } from "lucide-react";

export default function AdminContactView() {
  return (
    <div className="flex flex-col gap-6">
      <AdminCard title="Contact Section" subtitle="Your contact form is powered by EmailJS">
        <div className="flex flex-col items-center justify-center py-8 gap-4 text-center">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center"
            style={{ background: "rgba(0,161,224,0.1)", color: "#00A1E0" }}>
            <Mail size={32} />
          </div>
          <div>
            <h3 className="font-bold text-lg mb-2" style={{ color: "#F0F6FF" }}>Contact Form Active</h3>
            <p className="text-sm max-w-md leading-relaxed" style={{ color: "#8DA0BC" }}>
              The contact form on your portfolio is powered by EmailJS. 
              Messages from clients will be delivered directly to your email inbox.
              No backend configuration needed.
            </p>
          </div>
          <div className="flex items-center gap-2 mt-2 px-4 py-2 rounded-full"
            style={{ background: "rgba(0,212,170,0.1)", border: "1px solid rgba(0,212,170,0.2)" }}>
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#00D4AA" }} />
            <span className="text-sm font-semibold" style={{ color: "#00D4AA" }}>Contact form is live and active</span>
          </div>
        </div>
      </AdminCard>
    </div>
  );
}