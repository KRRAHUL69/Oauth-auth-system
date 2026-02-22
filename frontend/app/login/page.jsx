
"use client";

import { useState } from "react";
import api from "@/lib/api";
import { useAuthStore } from "@/store/authstore";

export default function Login() {
  const setAuth = useAuthStore((s) => s.setAuth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const res = await api.post("/auth/login", { email, password });

    setAuth({ accessToken: res.data.accessToken });

    const user = await api.get("/auth/me");

    setAuth({ user: user.data });
  };

  return (
    <div>
      <input onChange={(e)=>setEmail(e.target.value)} />
      <input type="password" onChange={(e)=>setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}