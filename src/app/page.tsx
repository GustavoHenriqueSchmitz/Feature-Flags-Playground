import Link from "next/link";
import { get } from "@vercel/edge-config";

export default async function Page() {
  const showLoginPage = await get<boolean>("show_login_page");

  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        fontFamily: "sans-serif",
        backgroundColor: "#111",
        color: "white",
      }}
    >
      <h1
        style={{ fontSize: "2.5rem", fontWeight: "bold", marginBottom: "1rem" }}
      >
        Welcome to the Application
      </h1>
      <p style={{ color: "#aaa", marginBottom: "2rem" }}>
        Please log in to access your dashboard.
      </p>

      {showLoginPage ? (
        <Link
          href="/login"
          style={{
            padding: "0.75rem 1.5rem",
            backgroundColor: "#0070f3",
            color: "white",
            textDecoration: "none",
            borderRadius: "8px",
            fontSize: "1rem",
            fontWeight: "600",
          }}
        >
          Go to Login Page
        </Link>
      ) : (
        <Link
          href="/about"
          style={{
            padding: "0.75rem 1.5rem",
            backgroundColor: "#0070f3",
            color: "white",
            textDecoration: "none",
            borderRadius: "8px",
            fontSize: "1rem",
            fontWeight: "600",
          }}
        >
          Go to About Page
        </Link>
      )}
    </main>
  );
}
