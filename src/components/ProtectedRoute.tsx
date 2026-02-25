// This component prevents users from accessing certain pages unless they are logged in.
import { Navigate } from "react-router-dom"; // This lets us redirect users to another page (e.g., login page)
import { useEffect, useState } from "react";
import type { PropsWithChildren } from "react"; // type-only import
import { supabase } from "../supabaseClient";


export default function ProtectedRoute({ children }: PropsWithChildren) {
  // Tracks whether the user is logged in
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    // Check if a valid session exists (e.g., user already logged in)
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session); // true if logged in, false if logged out
    });

    // Listen for future login/logout events (reactive updates)
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setIsAuthenticated(!!session);
      }
    );

    // Cleanup the listener when component unmounts
    return () => listener.subscription.unsubscribe();
  }, []);

  // While checking auth state, don't show anything (prevents flicker)
  if (isAuthenticated === null) {
    return null; // or return a loading spinner if you want =)
  }

  // If NOT logged in, redirect to Home page
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
    // OPTIONAL: Change "/"  to "/login" if you prefer sending users back to Login Page
    // return <Navigate to="/login" replace />;
  }

  // If logged in, allow page to render normally
  return <>{children}</>;
}
