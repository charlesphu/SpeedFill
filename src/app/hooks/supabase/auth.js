import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: { persistSession: true },
});

export async function signUpNewUser(email, password) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  if (error) {
    console.error("sign up error:", error.message);
    return { error };
  }
  return loginUser(email, password);
}

export async function handleSignInWithGoogle(response) {
  const { data, error } = await supabase.auth.signInWithIdToken({
    provider: "google",
    token: response.credential,
  });
  if (error) {
    console.error("Google sign-in error:", error.message);
    return { error };
  }
  return data.user;
}

export async function signUpWithGoogle() {
  // Placeholder function for future implementation
  return;
}

export async function loginUser(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error("Login error:", error.message);
    return { error };
  }

  return data.user;
}

export async function getUserID() {
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData?.user) {
    console.error(userError?.message || "User not found");
    return null;
  }
  const userId = userData.user.id;
  return userId;
}

export async function getUser() {
  const { data, error } = await supabase.auth.refreshSession();
  if (error) {
    console.error(error.message);
    return null;
  } else {
    return data.user.email;
  }
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error("sign out error: ", error.message);
  }
}
