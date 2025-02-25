import { createClient } from "@supabase/supabase-js";
export const supabase = createClient(
  "https://nrkwgjlgdudnkyqxoglt.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5ya3dnamxnZHVkbmt5cXhvZ2x0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAzNTk1MTYsImV4cCI6MjA1NTkzNTUxNn0.EWMcHnA4aiAAmv5y4IIz3xEuSr6zgg5XN3P5tWLc2PQ",
  {
    auth: { persistSession: true },
  }
);

export async function signUpNewUser(email, password) {
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
    //   options: {
    //     emailRedirectTo: 'https://example.com/welcome',
    //   },
  });
  console.log("User signed up");
  loginUser(email, password);
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

export async function getUser() {
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (error) {
    console.error(error.message);
  } else {
    const userEmail = userData.user.email;
    return userEmail;
  }
}
