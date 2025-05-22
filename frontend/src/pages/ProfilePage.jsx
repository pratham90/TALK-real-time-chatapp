import React from 'react'
import { Camera, User, Mail } from 'lucide-react'
import useAuthStore from '../store/useAuthStore'
import { useState } from 'react'
import img from "../assets/avatar.jpg"


const ProfilePage = () => {
  const {authUser, updateProfile, isUpdatingProfile} = useAuthStore()
  const [selectedImg, setSelectedImg] = useState(null)
  
  const handleImageUpload = (e) => {
   const file = e.target.files[0];
   if(!file) return;

   const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = async () => {
    const base64Image = reader.result;
    setSelectedImg(base64Image); 
    await updateProfile({profilePic:base64Image});
  
  }
}
  
  return (
    <div className="min-h-screen pt-20 bg-base-100">
      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className="bg-base-300 rounded-xl p-6 space-y-8 shadow-lg">
          <div className="text-center">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Profile</h1>
            <p className="mt-2 text-base-content/70">Your profile information</p>
          </div>

          {/* avatar upload section */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative group">
              <img
                src={selectedImg || authUser.profilePic || img}
                alt="Profile"
                className="size-32 rounded-full object-cover border-4 border-primary/20 transition-all duration-300 group-hover:border-primary/40"
              />
              <label
                htmlFor="avatar-upload"
                className={`
                  absolute bottom-0 right-0 
                  bg-primary hover:bg-primary/80
                  p-2 rounded-full cursor-pointer 
                  transition-all duration-200
                  ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
                  shadow-lg hover:shadow-xl
                `}
              >
                <Camera className="w-5 h-5 text-base-500" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <p className="text-sm text-base-content/60">
              {isUpdatingProfile ? "Uploading..." : "Click the camera icon to update your photo"}
            </p>
          </div>

          <div className="space-y-6">
            <div className="space-y-1.5">
              <div className="text-sm text-base-content/60 flex items-center gap-2">
                <User className="w-4 h-4" />
                Full Name
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border border-base-content/10 hover:border-primary/20 transition-colors duration-200">{authUser?.fullName}</p>
            </div>

            <div className="space-y-1.5">
              <div className="text-sm text-base-content/60 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border border-base-content/10 hover:border-primary/20 transition-colors duration-200">{authUser?.email}</p>
            </div>
          </div>

          <div className="mt-6 bg-base-200 rounded-xl p-6 shadow-inner">
            <h2 className="text-lg font-semibold mb-4 text-primary">Account Information</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-2 border-b border-base-content/10">
                <span className="text-base-content/70">Member Since</span>
                <span className="font-medium">{authUser.createdAt?.split("T")[0]}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-base-content/70">Account Status</span>
                <span className="text-success font-medium">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
