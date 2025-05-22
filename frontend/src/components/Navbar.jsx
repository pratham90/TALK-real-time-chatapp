import { Link } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import { LogOut, MessageSquare, Settings, User } from "lucide-react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <header
      className="fixed w-full top-0 z-40 rounded-b-2xl shadow-xl  border-none bg-gradient-to-r from-indigo-400 via-purple-400 to-blue-100/80 backdrop-blur-lg overflow-hidden"
    >
      {/* Glass overlay */}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-md rounded-b-2xl"></div>
      <div className="container mx-auto px-4 h-16 relative z-10">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-all group">
              <div className="size-9 rounded-xl bg-gradient-to-br from-white/80 to-indigo-200 flex items-center justify-center transform group-hover:scale-105 transition-transform duration-300 shadow-lg">
                <MessageSquare className="w-5 h-5 text-indigo-600" />
              </div>
              <h1 className="text-lg font-bold bg-gradient-to-r from-white via-indigo-100 to-blue-200 text-transparent bg-clip-text drop-shadow">TALK</h1>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            {authUser && (
              <>
                <Link
                  to={"/settings"}
                  className="btn btn-sm bg-gradient-to-r from-indigo-400 to-blue-500 text-white gap-2 rounded-xl hover:opacity-90 transition-all shadow-md border-none"
                >
                  <Settings className="w-4 h-4" />
                  <span className="hidden sm:inline">Settings</span>
                </Link>
                <Link 
                  to={"/profile"} 
                  className="btn btn-sm bg-gradient-to-r from-indigo-400 to-blue-500 text-white gap-2 rounded-xl hover:opacity-90 transition-all shadow-md border-none"
                >
                  <User className="size-5" />
                  <span className="hidden sm:inline">Profile</span>
                </Link>

                <button 
                  className="flex gap-2 items-center cursor-pointer text-white hover:text-indigo-100 transition-colors" 
                  onClick={logout}
                >
                  <LogOut className="size-5 text-black" />
                  <span className="hidden text-black sm:inline">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;