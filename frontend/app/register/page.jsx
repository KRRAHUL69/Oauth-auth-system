"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // handle input change
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // simple validation
  const validate = () => {
    if (!form.name || !form.email || !form.password) {
      return "All fields are required";
    }
    if (form.password.length < 6) {
      return "Password must be at least 6 characters";
    }
    if (!form.email.includes("@")) {
      return "Invalid email format";
    }
    return null;
  };

  // submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Registration failed");
      }

      setSuccess("Registration successful! Redirecting to login...");

      // redirect to login after 2 seconds
      setTimeout(() => {
        router.push("/login");
      }, 2000);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Create Account</h2>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            style={styles.input}
          />

          <button type="submit" disabled={loading} style={styles.button}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        {error && <p style={styles.error}>{error}</p>}
        {success && <p style={styles.success}>{success}</p>}

        <p style={styles.footer}>
          Already have an account?{" "}
          <span style={styles.link} onClick={() => router.push("/login")}>
            Login
          </span>
        </p>
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
      borderRadius: "10px",
      background: "#fff",
      boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
    },
    title: {
      marginBottom: "20px",
      textAlign: "center",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      gap: "12px",
    },
    input: {
      padding: "10px",
      borderRadius: "6px",
      border: "1px solid #ddd",
    },
    button: {
      padding: "10px",
      background: "#4f46e5",
      color: "#fff",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
    },
    error: {
      color: "red",
      marginTop: "10px",
      textAlign: "center",
    },
    success: {
      color: "green",
      marginTop: "10px",
      textAlign: "center",
    },
    footer: {
      marginTop: "15px",
      textAlign: "center",
    },
    link: {
      color: "#4f46e5",
      cursor: "pointer",
      fontWeight: "bold",
    },
  };