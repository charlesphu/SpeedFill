import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
// import { createClient } from "@supabase/supabase-js";
import { supabase, getUser, logout } from "./supabase/auth";
// import { auth } from "../firebase";
// import { signOut } from "firebase/auth";

// export default async function useAuth() {
//   // const [user, setUser] = useState(null);
//   // setUser(getUser());
//   var user = getUser();

//   return {
//     user,
//     logout,
//   };
// }

export default function useAuth() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };

    getUser();

    // Listen for auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user || null);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return { user, logout };
}
