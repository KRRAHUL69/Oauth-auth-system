"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../../store/authstore";
import { fetchCurrentUser } from "../../lib/api";

export default function Dashboard() {
  const router = useRouter();
  const { user, setUser, logout } = useAuthStore();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const data = await fetchCurrentUser();
        setUser(data);
      } catch (err) {
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [router, setUser]);

  const handleLogout = async () => {
    await fetch("http://localhost:5000/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    logout();
    router.push("/login");
  };

  if (loading) return <p style={{ textAlign: "center" }}>Loading...</p>;

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Dashboard</h2>
        <p style={styles.welcome}>
          Welcome <strong>{user?.name}</strong>
        </p>

        <button style={styles.button} onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f5f7fb",
  },

  card: {
    width: "350px",
    padding: "30px",
    borderRadius: "12px",
    background: "#ffffff",
    boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
    textAlign: "center",
  },

  title: {
    fontSize: "22px",
    fontWeight: "600",
    marginBottom: "10px",
    color: "#111827",
  },

  welcome: {
    marginTop: "8px",
    marginBottom: "20px",
    fontSize: "16px",
    color: "#374151",
  },

  button: {
    padding: "10px 16px",
    background: "#ef4444",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "500",
    transition: "0.2s",
  },
};