import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://nrkwgjlgdudnkyqxoglt.supabase.co";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5ya3dnamxnZHVkbmt5cXhvZ2x0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAzNTk1MTYsImV4cCI6MjA1NTkzNTUxNn0.EWMcHnA4aiAAmv5y4IIz3xEuSr6zgg5XN3P5tWLc2PQ";

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
    return null;
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
    return null;
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
    return null;
  }

  console.log("User logged in:", data.user);
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
  } else {
    console.log("signed out");
  }
}
