"use client"; 
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
// import { createClient } from "@supabase/supabase-js";
import { supabase, getUser, logout } from "./supabase/auth";

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
    if (!supabase || !supabase.auth) {
      console.error("Supabase is not initialized properly.");
      return;
    }

    const getUser = async () => {
      try {
        const { data, error } = await supabase.auth.getUser();
        if (error) throw error;
        setUser(data.user);
      } catch (error) {
        // console.error("Error fetching user:", error.message);
        setUser(null);
        return;
      }
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
