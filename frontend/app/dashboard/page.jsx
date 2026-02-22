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
        setUser(data.user);
      } catch (err) {
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

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
        <h2>Dashboard</h2>
        <p>Welcome, {user?.id}</p>

        <button style={styles.button} onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: { height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" },
  card: { padding: "30px", background: "#fff", borderRadius: "10px", boxShadow: "0 10px 25px rgba(0,0,0,0.1)" },
  button: { marginTop: "15px", padding: "10px", background: "#ef4444", color: "#fff", border: "none", borderRadius: "6px" }
};