"use client";

import type { CSSProperties } from "react";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { ChatKitPanel } from "@/components/ChatKitPanel";
import { useRouter } from "next/navigation";
import { createSupabaseClient } from "@/lib/supabaseClient";
import GmsLogo from "./gms-logo.png";

export default function App() {
  const router = useRouter();
  const supabase = useMemo(() => createSupabaseClient(), []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  // --- Inline styles using your palette ---
  const pageStyle: CSSProperties = {
    minHeight: "100vh",
    backgroundColor: "#ffffff",
    color: "#000000",
    display: "flex",
    flexDirection: "column",
  };

  const headerStyle: CSSProperties = {
    width: "100%",
    borderBottom: "1px solid #e8e8e8",
    backgroundColor: "#d9f6ea",
  };

  const headerInnerStyle: CSSProperties = {
    maxWidth: "960px",
    margin: "0 auto",
    padding: "12px 16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "12px",
    fontSize: "14px",
    fontWeight: 600,
  };

  const headerTitleStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontSize: "16px",
    fontWeight: 600,
  };

  const headerRightStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  };

  const betaPillStyle: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    borderRadius: "999px",
    backgroundColor: "#7fdfb8",
    padding: "4px 10px",
    fontSize: "11px",
    fontWeight: 500,
  };

  const mainStyle: CSSProperties = {
    flex: 1,
  };

  const contentWrapperStyle: CSSProperties = {
    maxWidth: "960px",
    margin: "0 auto",
    padding: "24px 16px 32px",
    display: "grid",
    gridTemplateColumns: "minmax(0, 1.1fr) minmax(0, 1.3fr)",
    alignItems: "flex-start",
    gap: "24px",
  };

  const leftColumnStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  };

  const headingStyle: CSSProperties = {
    fontSize: "26px",
    fontWeight: 600,
    margin: 0,
  };

  const subTextStyle: CSSProperties = {
    fontSize: "14px",
    lineHeight: 1.5,
    color: "#4b5563",
    margin: 0,
  };

  const labelStyle: CSSProperties = {
    fontSize: "11px",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    color: "#6b7280",
  };

  const chipsRowStyle: CSSProperties = {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
  };

  const chipStyle: CSSProperties = {
    borderRadius: "999px",
    border: "1px solid transparent",
    backgroundColor: "#d9f6ea",
    padding: "6px 12px",
    fontSize: "12px",
    cursor: "default",
  };

  const noteStyle: CSSProperties = {
    fontSize: "11px",
    color: "#6b7280",
    lineHeight: 1.5,
  };

  const rightColumnStyle: CSSProperties = {
    borderRadius: "16px",
    border: "1px solid #e8e8e8",
    backgroundColor: "#ffffff",
    boxShadow: "0 8px 24px rgba(0,0,0,0.04)",
    overflow: "hidden",
    minHeight: "420px",
    display: "flex",
    flexDirection: "column",
  };

  const [isNarrowLayout, setIsNarrowLayout] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const updateLayout = () => {
      setIsNarrowLayout(window.innerWidth <= 768);
    };

    updateLayout();
    window.addEventListener("resize", updateLayout);
    return () => {
      window.removeEventListener("resize", updateLayout);
    };
  }, []);

  const contentStyleResponsive: CSSProperties = isNarrowLayout
    ? {
        ...contentWrapperStyle,
        gridTemplateColumns: "minmax(0,1fr)",
      }
    : contentWrapperStyle;

  const quickPrompts = [
    "Viber Pitch Deck",
    "WhatsApp Demo Video",
    "Hyber product manual",
    "RCS Product Overview",
    "Gen AI Content Builder",
    "Email API Slides",
    "SSO Portal Guide",
    "Viber Business Calls training"
  ];

  return (
    <div style={pageStyle}>
      {/* Top bar */}
      <header style={headerStyle}>
        <div style={headerInnerStyle}>
          <div style={headerTitleStyle}>
            <Image
              src={GmsLogo}
              alt="GMS logo"
              width={40}
              height={40}
              priority
              style={{ borderRadius: "8px" }}
            />
            <div>GMS Sales Concierge</div>
          </div>
          <div style={headerRightStyle}>
            <span style={betaPillStyle}>Phase 1</span>
            <button
              type="button"
              onClick={handleLogout}
              style={{
                borderRadius: "10px",
                border: "1px solid #e8e8e8",
                backgroundColor: "#ffffff",
                padding: "6px 12px",
                fontSize: "12px",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main style={mainStyle}>
        <div style={contentStyleResponsive}>
          {/* Left column */}
          <section style={leftColumnStyle}>
            <div>
              <h1 style={headingStyle}>GMS Sales Assistant</h1>
              <p style={subTextStyle}>
                Phase-1: Ask for any GMS sales asset and I’ll return its SharePoint URL.
              </p>
            </div>

            <div>
              <div style={labelStyle}>Try asking for</div>
              <div style={chipsRowStyle}>
                {quickPrompts.map((label) => (
                  <button
                    key={label}
                    type="button"
                    style={chipStyle}
                    // purely visual for now; ChatKit already has starter prompts
                    onClick={() => {
                      console.log("Clicked quick prompt:", label);
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <p style={noteStyle}>
              Note: This assistant is designed only to surface official GMS
              SharePoint links. It won’t summarize or open documents.
            </p>
          </section>

          {/* Right column – ChatKit panel */}
          <section style={rightColumnStyle}>
                
            
            <ChatKitPanel
              theme="light"
              onWidgetAction={async () => {
                // no-op for now
              }}
              onResponseEnd={() => {
                // no-op for now
              }}
              onThemeRequest={() => {
                // no-op for now
              }}
            />
          </section>
        </div>
      </main>
    </div>
  );
}
