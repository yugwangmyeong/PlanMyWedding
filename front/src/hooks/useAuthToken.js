export const useAuthToken = () => {
    const token = sessionStorage.getItem("token");
    const isLoggedIn = !!token;
  
    const getUsernameFromToken = (token) => {
      try {
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const jsonPayload = decodeURIComponent(
          atob(base64)
            .split("")
            .map((c) => `%${("00" + c.charCodeAt(0).toString(16)).slice(-2)}`)
            .join("")
        );
        const payload = JSON.parse(jsonPayload);
        return payload.username || "username";
      } catch {
        return "username";
      }
    };
  
    return {
      token,
      isLoggedIn,
      username: isLoggedIn ? getUsernameFromToken(token) : null,
    };
  };