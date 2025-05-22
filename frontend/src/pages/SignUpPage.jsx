import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Loader2, Mail, MessageSquare, User, Lock, Eye, EyeOff } from "lucide-react";
import { toast } from "react-hot-toast";

import useAuthStore from "../store/useAuthStore";
import AuthImagePattern from "../components/AuthImagePattern";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { signUp, isSigningUp } = useAuthStore();
  const navigate = useNavigate();

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 8) return toast.error("Password must be at least 8 characters");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = validateForm();
    if (success === true) signUp(formData);
  };

  return (
    <div className="min-h-screen mt-10 flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-100 to-blue-100">
      <div className="w-full max-w-5xl min-h-[600px] flex rounded-3xl shadow-2xl overflow-hidden bg-white/0">
        {/* Left panel */}
        <AuthImagePattern
          title="Welcome Back!"
          subtitle="Enter your personal details to use all of site features."
          buttonText="SIGN IN"
          onButtonClick={() => navigate('/login')}
        />
        {/* Right panel */}
        <div className="flex-1 flex flex-col justify-center items-center bg-white rounded-r-3xl p-8 md:p-16 relative z-10">
          <div className="w-full max-w-md space-y-8">
            <div className="text-center mb-4">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Create Account</h2>
          
           
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium text-gray-700">Full Name</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center z-10 pointer-events-none">
                    <User className="size-5 text-indigo-300" />
                  </div>
                  <input
                    type="text"
                    className="input input-bordered w-full pl-10 bg-white border-gray-200 text-gray-800 placeholder-gray-400 focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  />
                </div>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium text-gray-700">Email</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center z-10 pointer-events-none">
                    <Mail className="size-5 text-indigo-300" />
                  </div>
                  <input
                    type="email"
                    className="input input-bordered w-full pl-10 bg-white border-gray-200 text-gray-800 placeholder-gray-400 focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium text-gray-700">Password</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex z-10 items-center pointer-events-none">
                    <Lock className="size-5 text-indigo-300" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="input input-bordered w-full pl-10 bg-white border-gray-200 text-gray-800 placeholder-gray-400 focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400"
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-indigo-300 hover:text-indigo-500"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="size-5" />
                    ) : (
                      <Eye className="size-5" />
                    )}
                  </button>
                </div>
              </div>
              <button
                type="submit"
                className="btn w-full bg-gradient-to-r from-indigo-500 to-blue-500 text-white hover:opacity-90 transition-all shadow-md rounded-full font-semibold text-lg"
                disabled={isSigningUp}
              >
                {isSigningUp ? (
                  <>
                    <Loader2 className="size-5 animate-spin" />
                    <span className="ml-2">Creating account...</span>
                  </>
                ) : (
                  "Sign Up"
                )}
              </button>
            </form>
            <div className="text-center">
              <p className="text-gray-500">
                Already have an account?{" "}
                <Link to="/login" className="text-indigo-500 hover:text-blue-500 transition-colors font-semibold">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
