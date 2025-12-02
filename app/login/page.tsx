"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { createSupabaseClient } from "@/lib/supabaseClient";
import HomeBackground from "./gms-home.png";
import GmsLogo from "../gms-logo.png";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createSupabaseClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (signInError) {
      setError(signInError.message);
      return;
    }

    router.push("/");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        backgroundImage: `linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.35)), url(${HomeBackground.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          backgroundColor: "#ffffff",
          border: "1px solid #e8e8e8",
          borderRadius: "16px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.05)",
          padding: "24px",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Image
              src={GmsLogo}
              alt="GMS logo"
              width={40}
              height={40}
              priority
              style={{ borderRadius: "8px" }}
            />
            <h1 style={{ margin: 0, fontSize: "20px", fontWeight: 600 }}>
              GMS Sales Concierge
            </h1>
          </div>
          <span
            style={{
              backgroundColor: "#7fdfb8",
              borderRadius: "999px",
              padding: "4px 10px",
              fontSize: "11px",
              fontWeight: 600,
              alignSelf: "flex-start",
            }}
          >
            Phase 1
          </span>
        </div>

        <p style={{ margin: 0, color: "#4b5563", fontSize: "14px" }}>
          Sign in with your email and password to access the Sales Assistant.
        </p>

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "12px" }}
        >
          <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <span
              style={{
                fontSize: "12px",
                fontWeight: 600,
                color: "#374151",
              }}
            >
              Email
            </span>
            <input
              type="email"
              value={email}
              required
              onChange={(event) => setEmail(event.target.value)}
              style={{
                padding: "10px 12px",
                borderRadius: "10px",
                border: "1px solid #e8e8e8",
                fontSize: "14px",
              }}
            />
          </label>

          <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <span
              style={{
                fontSize: "12px",
                fontWeight: 600,
                color: "#374151",
              }}
            >
              Password
            </span>
            <input
              type="password"
              value={password}
              required
              onChange={(event) => setPassword(event.target.value)}
              style={{
                padding: "10px 12px",
                borderRadius: "10px",
                border: "1px solid #e8e8e8",
                fontSize: "14px",
              }}
            />
          </label>

          {error ? (
            <div
              style={{
                color: "#b91c1c",
                fontSize: "13px",
                backgroundColor: "#fef2f2",
                border: "1px solid #fecaca",
                borderRadius: "10px",
                padding: "10px 12px",
              }}
            >
              {error}
            </div>
          ) : null}

          <button
            type="submit"
            disabled={loading}
            style={{
              backgroundColor: "#00c072",
              color: "#ffffff",
              border: "none",
              borderRadius: "12px",
              padding: "12px",
              fontSize: "15px",
              fontWeight: 600,
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.8 : 1,
            }}
          >
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
