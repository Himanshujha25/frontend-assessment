export default function Layout({ children }) {
  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: 20 }}>
      {children}
    </div>
  );
}
