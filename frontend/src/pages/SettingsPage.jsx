import React, { useState, useEffect } from 'react'
import { Moon, Sun, Palette } from 'lucide-react'

const SettingsPage = () => {
  const [theme, setTheme] = useState('light')

  const themes = [
    "light",
    "dark",
    "cupcake",
    "bumblebee",
    "emerald",
    "corporate",
    "synthwave",
    "retro",
    "cyberpunk",
    "valentine",
    "halloween",
    "garden",
    "forest",
    "aqua",
    "pastel",
    "fantasy",
    "wireframe",
    "black",
    "luxury",
    "dracula",
    "cmyk",
    "autumn",
    "business",
    "acid",
    "lemonade",
    "night",
    "coffee",
    "winter"
  ]

  useEffect(() => {
    // Get theme from localStorage or use default
    const savedTheme = localStorage.getItem('theme') || 'light'
    setTheme(savedTheme)
    document.documentElement.setAttribute('data-theme', savedTheme)
  }, [])

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
    localStorage.setItem('theme', newTheme)
  }

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-4xl mx-auto p-4">
        <div className="bg-base-300 rounded-xl p-6 space-y-8 shadow-lg">
          <div className="text-center">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Settings
            </h1>
            <p className="mt-2 text-base-content/70">Customize your experience</p>
          </div>

          {/* Theme Settings */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-lg font-medium">
              <Palette className="w-5 h-5" />
              Theme Settings
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {themes.map((themeName) => (
                <button
                  key={themeName}
                  onClick={() => handleThemeChange(themeName)}
                  className={`
                    p-4 rounded-lg border-2 transition-all duration-200
                    ${theme === themeName 
                      ? 'border-primary bg-primary/10' 
                      : 'border-base-content/10 hover:border-primary/50'
                    }
                  `}
                >
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-base-content/20 flex items-center justify-center">
                      {themeName === 'dark' ? (
                        <Moon className="w-4 h-4" />
                      ) : themeName === 'light' ? (
                        <Sun className="w-4 h-4" />
                      ) : (
                        <Palette className="w-4 h-4" />
                      )}
                    </div>
                    <span className="text-sm capitalize">{themeName}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Theme Preview Section */}
          <div className="mt-8">
            <h3 className="text-lg font-medium mb-4">Theme Preview</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Light Theme Preview */}
              <div className="p-4 bg-base-200 rounded-lg" data-theme="light">
                <h4 className="text-lg font-medium mb-4 flex items-center gap-2">
                  <Sun className="w-5 h-5" />
                  Light Theme
                </h4>
                <div className="space-y-4">
                  <button className="btn btn-primary w-full">Primary Button</button>
                  <button className="btn btn-secondary w-full">Secondary Button</button>
                  <div className="alert alert-info">
                    <span>This is an info alert</span>
                  </div>
                  <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                      <h2 className="card-title">Card Title</h2>
                      <p>This is a sample card component</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Dark Theme Preview */}
              <div className="p-4 bg-base-200 rounded-lg" data-theme="dark">
                <h4 className="text-lg font-medium mb-4 flex items-center gap-2">
                  <Moon className="w-5 h-5" />
                  Dark Theme
                </h4>
                <div className="space-y-4">
                  <button className="btn btn-primary w-full">Primary Button</button>
                  <button className="btn btn-secondary w-full">Secondary Button</button>
                  <div className="alert alert-info">
                    <span>This is an info alert</span>
                  </div>
                  <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                      <h2 className="card-title">Card Title</h2>
                      <p>This is a sample card component</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SettingsPage
