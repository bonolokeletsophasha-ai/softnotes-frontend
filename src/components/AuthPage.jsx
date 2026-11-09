import { useState } from "react";
import { LockKeyhole, Mail, Eye, EyeOff, Leaf } from "lucide-react";
import { signupUser, loginUser } from "../services/authService.js";

function AuthPage({ onAuthenticated }) {
  const [isLogin, setIsLogin] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");
    setLoading(true);

    try {
      let response;

      if (isLogin) {
        response = await loginUser(email, password);

        setSuccess("Welcome back! Opening your workspace...");

        onAuthenticated(response.user);
      } else {
        response = await signupUser(email, password);

        if (
          response.message?.toLowerCase().includes("verify your email")
        ) {
          setSuccess(response.message);
        } else {
          setSuccess("Your account has been created successfully!");

          onAuthenticated(response.user);
        }
      }
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    setEmail("");
    setPassword("");
    setError("");
    setSuccess("");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F2F4F1] px-5 py-10">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-xl md:grid-cols-2">

        {/* Left Panel */}
        <div className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-[#263C32] via-[#344E41] to-[#6B9678] p-12 text-white md:flex">

          <div>
            <div className="mb-16 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/15">
                <Leaf size={26} />
              </div>

              <div>
                <h1 className="text-2xl font-bold">SoftNotes</h1>
                <p className="text-sm text-[#DCEFE2]">
                  Your space, your thoughts.
                </p>
              </div>
            </div>

            <p className="mb-4 text-sm font-semibold tracking-widest text-[#DCEFE2]">
              A SPACE THAT IS YOURS
            </p>

            <h2 className="max-w-sm text-4xl font-bold leading-tight">
              Make room for every thought.
            </h2>

            <p className="mt-6 max-w-sm text-base leading-8 text-[#EAF3EC]">
              Keep your ideas, plans, reminders, and personal thoughts
              together in one simple and private space.
            </p>
          </div>

          <div className="border-t border-white/20 pt-6">
            <p className="text-sm text-[#DCEFE2]">
              A little space for everything on your mind.
            </p>
          </div>

          {/* Decorative Circles */}
          <div className="absolute -bottom-24 -right-20 h-72 w-72 rounded-full border border-white/10" />
          <div className="absolute -bottom-12 -right-8 h-48 w-48 rounded-full border border-white/10" />
        </div>

        {/* Right Panel */}
        <div className="flex items-center justify-center px-7 py-12 sm:px-12">

          <div className="w-full max-w-md">

            {/* Mobile Logo */}
            <div className="mb-10 flex items-center gap-3 md:hidden">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#344E41] text-white">
                <Leaf size={23} />
              </div>

              <div>
                <h1 className="text-xl font-bold text-[#26332B]">
                  SoftNotes
                </h1>

                <p className="text-xs text-slate-400">
                  Your space, your thoughts.
                </p>
              </div>
            </div>

            <div className="mb-8">
              <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-[#6B9678]">
                {isLogin ? "Welcome back" : "Get started"}
              </p>

              <h2 className="text-3xl font-bold text-[#26332B]">
                {isLogin ? "Sign in to SoftNotes" : "Create your account"}
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                {isLogin
                  ? "Enter your details to access your personal workspace."
                  : "Create an account and start keeping your thoughts organised."}
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div className="mb-5 rounded-xl border border-[#C8DFCE] bg-[#EAF3EC] px-4 py-3 text-sm text-[#344E41]">
                {success}
              </div>
            )}

            {/* Authentication Form */}
            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-[#344E41]"
                >
                  Email Address
                </label>

                <div className="flex items-center rounded-xl border border-[#DCE4DD] bg-[#F8FAF8] px-4 transition focus-within:border-[#6B9678] focus-within:ring-2 focus-within:ring-[#DCEFE2]">
                  <Mail size={19} className="text-slate-400" />

                  <input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full bg-transparent px-3 py-4 text-sm outline-none placeholder:text-slate-400"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-semibold text-[#344E41]"
                >
                  Password
                </label>

                <div className="flex items-center rounded-xl border border-[#DCE4DD] bg-[#F8FAF8] px-4 transition focus-within:border-[#6B9678] focus-within:ring-2 focus-within:ring-[#DCEFE2]">
                  <LockKeyhole size={19} className="text-slate-400" />

                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                    className="w-full bg-transparent px-3 py-4 text-sm outline-none placeholder:text-slate-400"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-slate-400 transition hover:text-[#344E41]"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff size={19} />
                    ) : (
                      <Eye size={19} />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center rounded-xl bg-[#344E41] px-5 py-4 text-sm font-semibold text-white transition hover:bg-[#263C32] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading
                  ? "Please wait..."
                  : isLogin
                  ? "Sign In"
                  : "Create Account"}
              </button>
            </form>

            {/* Switch Authentication Mode */}
            <div className="mt-8 text-center text-sm text-slate-500">
              {isLogin
                ? "Don't have an account?"
                : "Already have an account?"}

              <button
                onClick={switchMode}
                className="ml-2 font-semibold text-[#3F7657] transition hover:text-[#263C32]"
              >
                {isLogin ? "Create an account" : "Sign in"}
              </button>
            </div>

            <p className="mt-10 text-center text-xs text-slate-400">
              Your personal space, whenever you need it.
            </p>

          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;