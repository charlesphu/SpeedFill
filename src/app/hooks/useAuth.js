"use client"; 
import { useState, useEffect } from "react";
import { supabase, getUser, logout } from "./supabase/auth";

export default function useAuth() {
  const [user, setUser] = useState(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);

  useEffect(() => {
    if (!supabase || !supabase.auth) {
      console.error("Supabase is not initialized properly.");
      setIsLoadingUser(false);
      return;
    }

    const getUser = async () => {
      setIsLoadingUser(true);

      try {
        const { data, error } = await supabase.auth.getUser();
        if (error) {
          // console.error(error);
          setUser(null);
        } else {
          setUser(data.user);
        }
      } catch (error) {
        setUser(null);
      }

      setIsLoadingUser(false);
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

  return { user, logout, isLoadingUser };
}
