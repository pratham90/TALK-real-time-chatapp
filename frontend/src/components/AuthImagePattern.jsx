import { MessageSquare } from "lucide-react";

const AuthImagePattern = ({ title, subtitle, buttonText, onButtonClick }) => {
  return (
    <div className="hidden lg:flex flex-col justify-center items-center p-12 bg-gradient-to-br from-indigo-400 via-purple-500 to-blue-500/80 rounded-l-3xl shadow-2xl relative overflow-hidden min-h-[600px] w-full max-w-xl">
      {/* Glassmorphism overlay */}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-md rounded-l-3xl"></div>
      {/* Decorative pattern */}
      <div className="absolute -top-10 -left-10 w-40 h-40 bg-gradient-to-br from-white/30 to-transparent rounded-full blur-2xl opacity-40 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tr from-blue-300/30 to-transparent rounded-full blur-2xl opacity-30"></div>
      {/* Content */}
      <div className="relative z-10 text-center w-full flex flex-col items-center">
        <div className="flex flex-col items-center gap-4 mb-8">
          <div className="size-24 rounded-3xl bg-gradient-to-br from-white/80 to-indigo-200 flex items-center justify-center transform hover:scale-105 transition-transform duration-300 shadow-xl">
            <MessageSquare className="size-12 text-indigo-600" />
          </div>
          <h1 className="text-4xl font-bold text-white drop-shadow-lg">
            {title}
          </h1>
          <p className="text-indigo-100 text-lg mb-6">
            {subtitle}
          </p>
          {buttonText && (
            <button
              onClick={onButtonClick}
              className="mt-2 px-8 py-3 rounded-full border-2 border-white text-white font-semibold bg-white/10 hover:bg-white/20 transition-all duration-200 shadow-lg focus:outline-none focus:ring-2 focus:ring-white/60 active:scale-95"
            >
              {buttonText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthImagePattern;