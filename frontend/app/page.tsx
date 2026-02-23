"use client";

import { CSSProperties } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../store/authstore";

export default function Home() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        
        <h1 style={styles.title}>🔐 Secure Auth System</h1>
        
        <p style={styles.subtitle}>
          OAuth 2.0 based fullstack authentication system built with
          Next.js, Node.js, JWT, Redis and MongoDB.
        </p>

        {/* CTA Buttons */}
        <div style={styles.buttonGroup}>
          {!isAuthenticated && (
            <>
              <button style={styles.primaryBtn} onClick={() => router.push("/register")}>
                Register
              </button>

              <button style={styles.secondaryBtn} onClick={() => router.push("/login")}>
                Login
              </button>
            </>
          )}

          {isAuthenticated && (
            <button style={styles.primaryBtn} onClick={() => router.push("/dashboard")}>
              Go to Dashboard
            </button>
          )}
        </div>

        {/* Features */}
        <div style={styles.features}>
          <h3>🚀 Features</h3>

          <ul style={styles.list}>
            <li>✔ Secure Login & Registration</li>
            <li>✔ JWT Access & Refresh Tokens</li>
            <li>✔ API Rate Limiting</li>
            <li>✔ IP Whitelisting</li>
            <li>✔ Redis Token Management</li>
            <li>✔ Protected Routes</li>
          </ul>
        </div>

      </div>
    </div>
  );
}

const styles: { [key: string]: CSSProperties } = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f4f6fb",
  },

  card: {
    width: "420px",
    padding: "40px",
    background: "#ffffff",            
    borderRadius: "12px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
    textAlign: "center",
    color: "#111827",                 
  },

  title: {
    fontSize: "26px",
    marginBottom: "10px",
    color: "#111827",                
    fontWeight: "600",
  },

  subtitle: {
    fontSize: "14px",
    marginBottom: "25px",
    color: "#6b7280",               
  },

  buttonGroup: {
    display: "flex",
    gap: "10px",
    justifyContent: "center",
    marginBottom: "25px",
  },

  primaryBtn: {
    padding: "10px 16px",
    background: "#4f46e5",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "500",
  },

  secondaryBtn: {
    padding: "10px 16px",
    background: "#e5e7eb",
    color: "#111827",                
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "500",
  },

  features: {
    textAlign: "left",
    color: "#111827",              
  },

  list: {
    marginTop: "10px",
    paddingLeft: "18px",
    lineHeight: "1.8",
    color: "#374151",              
  },
};