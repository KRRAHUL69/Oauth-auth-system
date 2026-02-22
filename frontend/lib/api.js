export const fetchCurrentUser = async () => {
    const token = localStorage.getItem("accessToken");
  
    const res = await fetch("http://localhost:5000/api/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    });
  
    if (!res.ok) throw new Error("Unauthorized");
  
    return res.json();
  };