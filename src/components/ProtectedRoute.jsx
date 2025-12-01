import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function ProtectedRoute({ children }) {
  const { status } = useSession();
  const router = useRouter();

  // Still loading session
  if (status === "loading") {
    return <p>Loading...</p>;
  }

  // Unauthenticated user
  if (status === "unauthenticated") {
    router.push("/login");
    return null;
  }

  // Authenticated: show the protected page
  return children;
}
