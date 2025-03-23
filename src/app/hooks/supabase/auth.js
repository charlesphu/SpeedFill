import { createClient } from "@supabase/supabase-js";

// Retrieve Supabase URL and Key from environment variables
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Create a Supabase client instance with session persistence enabled
export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: { persistSession: true },
});

// Function to sign up a new user with email and password
export async function signUpNewUser(email, password) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  if (error) {
    // console.error("sign up error:", error.message);
    return { error };
  }
  // show a email confirmation page instead
  return "Please check your email for the confirmation link";
  // return loginUser(email, password);
}

// Function to handle Google sign-in using an ID token
export async function handleSignInWithGoogle(response) {
  const { data, error } = await supabase.auth.signInWithIdToken({
    provider: "google",
    token: response.credential,
  });
  if (error) {
    // console.error("Google sign-in error:", error.message);
    return { error };
  }
  return data.user;
}

// Function to log in a user with email and password
export async function loginUser(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    // console.error("Login error:", error.message);
    return { error };
  }

  return data.user;
}

// Function to get the current user's ID
export async function getUserID() {
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData?.user) {
    // console.error(userError?.message || "User not found");
    return null;
  }
  const userId = userData.user.id;
  return userId;
}

// Function to get the current user's email
export async function getUser() {
  const { data, error } = await supabase.auth.refreshSession();
  if (error) {
    // console.error(error.message);
    return null;
  } else {
    return data.user.email;
  }
}

// Function to log out the current user
export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    // console.error("sign out error: ", error.message);
  }
}
