export function getToken(): string | null {
  const token = localStorage.getItem("accessToken");
  if (!token) {
    return null;
  }
  try {
    const date = JSON.parse(atob(token.split(".")[1]));
    if (date.exp < new Date().getTime() / 1000) {
      localStorage.removeItem("accessToken");
      return null;
    }
  } catch {
    return null;
  }
  return token;
}

export function setToken(token: string): void {
  localStorage.setItem("accessToken", JSON.stringify(token));
}
