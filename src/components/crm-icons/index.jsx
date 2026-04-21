"use client";

// Official Salesforce and HubSpot from react-icons/si
// Microsoft Dynamics 365 and Power Apps use official SVGs (react-icons/si doesn't have them)
import { SiSalesforce, SiHubspot } from "react-icons/si";

// Official Microsoft Dynamics 365 logo SVG
export function Dynamics365Icon({ size = 20, style }) {
  return (
    <svg viewBox="0 0 23 23" style={{ width: size, height: size, ...style }} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11.5 0L0 6.641v9.718L11.5 23l11.5-6.641V6.641z" fill="currentColor" opacity="0.3"/>
      <path d="M11.5 0L23 6.641 11.5 13.282 0 6.641z" fill="currentColor"/>
      <path d="M0 6.641l11.5 6.641v9.718L0 16.359z" fill="currentColor" opacity="0.65"/>
      <path d="M23 6.641L11.5 13.282v9.718L23 16.359z" fill="currentColor" opacity="0.45"/>
    </svg>
  );
}

// Official Power Apps / Microsoft Power Platform logo SVG
export function PowerAppsIcon({ size = 20, style }) {
  return (
    <svg viewBox="0 0 24 24" style={{ width: size, height: size, ...style }} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.75 2.75L21.25 8v8L12.75 21.25 4.25 16V8z" fill="currentColor" opacity="0.25"/>
      <path d="M12.75 2.75L21.25 8 12.75 13.25 4.25 8z" fill="currentColor"/>
      <path d="M4.25 8L12.75 13.25v8L4.25 16z" fill="currentColor" opacity="0.6"/>
    </svg>
  );
}

// Power BI icon
export function PowerBIIcon({ size = 20, style }) {
  return (
    <svg viewBox="0 0 24 24" style={{ width: size, height: size, ...style }} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="14" width="4" height="8" rx="1" fill="currentColor" opacity="0.5"/>
      <rect x="10" y="8" width="4" height="14" rx="1" fill="currentColor" opacity="0.75"/>
      <rect x="18" y="2" width="4" height="20" rx="1" fill="currentColor"/>
    </svg>
  );
}

// Zoho CRM icon (custom)
export function ZohoIcon({ size = 20, style }) {
  return (
    <svg viewBox="0 0 24 24" style={{ width: size, height: size, ...style }} fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="9" fill="currentColor" opacity="0.2"/>
      <path d="M8 16l8-8M8 8h8v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

// Re-export react-icons/si icons for convenience
export { SiSalesforce, SiHubspot };

// Unified platform icon resolver
export function PlatformIcon({ name, color, size = 20 }) {
  const n = (name || "").toLowerCase();
  const s = { color };
  if (n.includes("salesforce")) return <SiSalesforce size={size} style={s} />;
  if (n.includes("hubspot"))    return <SiHubspot    size={size} style={s} />;
  if (n.includes("dynamics"))   return <Dynamics365Icon size={size} style={s} />;
  if (n.includes("power apps")) return <PowerAppsIcon size={size} style={s} />;
  if (n.includes("power bi"))   return <PowerBIIcon size={size} style={s} />;
  if (n.includes("zoho"))       return <ZohoIcon size={size} style={s} />;
  // Fallback: colored dot
  return <span style={{ width: size/2, height: size/2, borderRadius: "50%", background: color, display: "inline-block" }} />;
}
