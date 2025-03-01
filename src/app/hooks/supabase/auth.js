import { createClient } from "@supabase/supabase-js";

// export async function createSupabaseClient() {
//   const supabase = createClient(
//     "https://nrkwgjlgdudnkyqxoglt.supabase.co",
//     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5ya3dnamxnZHVkbmt5cXhvZ2x0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAzNTk1MTYsImV4cCI6MjA1NTkzNTUxNn0.EWMcHnA4aiAAmv5y4IIz3xEuSr6zgg5XN3P5tWLc2PQ",
//     {
//       auth: { persistSession: true },
//     }
//   );

//   return supabase;
// }
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
  if (error) {
    console.error("sign up error:", error.message);
    return null;
  }
  console.log("User signed up");
  loginUser(email, password);
}

export async function handleSignInWithGoogle(response) {
  const { data, error } = await supabase.auth.signInWithIdToken({
    provider: "google",
    token: response.credential,
  });
}

export async function signUpWithGoogle() {
  return;
}

// export async function signUpWithGoogle() {
//   GoogleSignin.configure({
//     scopes: ["https://www.googleapis.com/auth/drive.readonly"],
//     webClientId:
//       "1079200485193-afu5mjpbv3qhsucg51dqdj3j40aha8r0.apps.googleusercontent.com",
//   });

//   try {
//     await GoogleSignin.hasPlayServices();
//     const userInfo = await GoogleSignin.signIn();
//     if (userInfo.data.idToken) {
//       const { data, error } = await supabase.auth.signInWithIdToken({
//         provider: "google",
//         token: userInfo.data.idToken,
//       });
//       console.log(error, data);
//     } else {
//       throw new Error("no ID token present!");
//     }
//   } catch (error) {
//     if (error.code === statusCodes.SIGN_IN_CANCELLED) {
//       // user cancelled the login flow
//     } else if (error.code === statusCodes.IN_PROGRESS) {
//       // operation (e.g. sign in) is in progress already
//     } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
//       // play services not available or outdated
//     } else {
//       // some other error happened
//     }
//   }
// }

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
  // updateClient();
  const { data, error } = await supabase.auth.refreshSession();
  if (error) {
    // console.error("update session error: ", error.message);
    return null;
  } else {
    return data.user.email;
  }
  // const { data: userData, error: userError } = await supabase.auth.getUser();
  // if (userError) {
  //   console.error(userError.message);
  // } else {
  //   const userEmail = userData.user.email;
  //   return userEmail;
  // }
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error("sign out error: ", error.message);
  } else {
    console.log("signed out");
  }
}
