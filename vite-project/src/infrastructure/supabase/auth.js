import { useState } from "react";
import { supabase } from "../infrastructure/supabase/supabaseClient";

function Login() {
  const [email, setEmail] = useState("");

  const handleLogin = async () => {
    await supabase.auth.signInWithOtp({ email });
    alert("Check your email for login link");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <input
        type="email"
        placeholder="Enter email"
        className="border p-2 mb-2"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button
        onClick={handleLogin}
        className="bg-blue-500 text-white p-2"
      >
        Send Magic Link
      </button>
    </div>
  );
}

export default Login;
