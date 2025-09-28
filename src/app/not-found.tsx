export const dynamic = "force-dynamic";

export default function NotFound() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        textAlign: "center",
        backgroundColor: "#111",
        color: "white",
        fontFamily: "sans-serif",
      }}
    >
      <h1
        style={{
          fontSize: "2.5rem",
          fontWeight: "bold",
          borderBottom: "1px solid #333",
          paddingBottom: "1rem",
          marginBottom: "1rem",
        }}
      >
        404 - Page Not Found
      </h1>
      <p style={{ color: "#aaa", fontSize: "1.2rem" }}>
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  );
}
