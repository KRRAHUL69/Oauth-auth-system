"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
        credentials: "include", // important for refresh cookie
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      // save access token
      localStorage.setItem("accessToken", data.accessToken);

      // redirect to dashboard
      router.push("/dashboard");

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Login</h2>

        <form onSubmit={handleLogin} style={styles.form}>
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            style={styles.input}
          />

          <button style={styles.button} disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {error && <p style={styles.error}>{error}</p>}

        <p style={styles.footer}>
          Dont have an account?{" "}
          <span onClick={() => router.push("/register")} style={styles.link}>
            Register
          </span>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: { height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" },
  card: { width: "350px", padding: "30px", borderRadius: "10px", background: "#fff", boxShadow: "0 10px 25px rgba(0,0,0,0.1)" },
  title: { textAlign: "center", marginBottom: "20px" },
  form: { display: "flex", flexDirection: "column", gap: "12px" },
  input: { padding: "10px", border: "1px solid #ddd", borderRadius: "6px" },
  button: { padding: "10px", background: "#4f46e5", color: "#fff", border: "none", borderRadius: "6px" },
  error: { color: "red", marginTop: "10px", textAlign: "center" },
  footer: { marginTop: "10px", textAlign: "center" },
  link: { color: "#4f46e5", cursor: "pointer" }
};