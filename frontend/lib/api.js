export const fetchCurrentUser = async () => {
    const token = localStorage.getItem("accessToken");
  
    if (!token) {
      throw new Error("No token found");
    }
  
    const res = await fetch("http://localhost:5000/api/auth/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    });
  
    if (!res.ok) {
      const text = await res.text(); 
      console.log("ERROR RESPONSE:", text);
      throw new Error("Unauthorized");
    }
  
    return res.json();
  };