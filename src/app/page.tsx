"use client";
import Link from "next/link";
import { useFlagsmith, useFlags } from "flagsmith/react";
import { useEffect } from "react";

export default function Page() {
  const flagsmith = useFlagsmith();
  const flags = useFlags(["login_page"]);

  useEffect(() => {
    async function setRoleTrait() {
      const userRole = Math.random() < 0.5 ? "admin" : "user";
      await flagsmith.setTrait("role", userRole);
    }
    setRoleTrait();
  }, [flagsmith]);

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
      {!flags.login_page.enabled ? (
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
      ) : (
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
      )}
    </main>
  );
}
